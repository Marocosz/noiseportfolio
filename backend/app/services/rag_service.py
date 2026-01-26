"""
SERVIÇO DE RAG (Retrieval-Augmented Generation)
--------------------------------------------------
Objetivo:
    Gerenciar a criação, manutenção e consulta do "Cérebro" (Banco Vetorial) da IA.
    É responsável por transformar arquivos de texto estáticos (Markdown) em vetores
    pesquisáveis (Embeddings) e recuperar as informações mais relevantes para uma pergunta.

Atuação no Sistema:
    - Backend / Service: Camada de infraestrutura que abstrai o banco de dados vetorial.
    - Scripting: Pode ser executado via script (`ingest.py`) para popular o banco.

Responsabilidades:
    1. Ler arquivos de documentação (Profile, Projetos) do disco.
    2. Quebrar textos grandes em pedaços menores (Chunks).
    3. Gerar vetores numéricos usando Google Embeddings.
    4. Gerenciar persistência no ChromaDB (Vector Store).
    5. Realizar buscas por similaridade semântica.

Integrações Externas:
    - Google Generative AI (Embeddings): Transforma texto em vetor.
    - ChromaDB: Armazenamento local dos vetores.
"""

import os
import shutil
import time
from typing import List
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from app.core.config import settings

class RagService:
    def __init__(self):
        """
        Inicializa o serviço configurando o modelo de Embeddings e caminhos.
        Lê as configurações globais de `app.core.config`.
        """
        # Inicializa o modelo de Embeddings do Google (gratuito/rápido)
        self.embeddings = GoogleGenerativeAIEmbeddings(
            model=settings.EMBEDDING_MODEL,
            google_api_key=settings.GOOGLE_API_KEY
        )
        self.persist_directory = os.path.join(os.getcwd(), settings.CHROMA_DB_DIR)
        self.collection_name = settings.COLLECTION_NAME

    def get_vectorstore(self):
        """
        Retorna a conexão ativa com o banco vetorial (ChromaDB).
        
        Por que existe: Para permitir que instâncias do serviço ou callers
        possam realizar operações diretas no banco.
        
        Returns:
            Objeto Chroma configurado e pronto para busca.
        """
        return Chroma(
            persist_directory=self.persist_directory,
            embedding_function=self.embeddings,
            collection_name=self.collection_name
        )

    def ingest_data(self, data_path: str):
        """
        Executa o pipeline completo de ingestão de dados (Indexação).
        
        Fluxo:
        1. Carrega arquivos .md da pasta especificada.
        2. Divide (Split) em chunks menores para caber no contexto da LLM.
        3. Limpa o banco anterior (Full Refresh) para evitar duplicatas.
        4. Insere os novos dados com controle rígido de taxa (Rate Limit) para evitar erro 429 da API do Google.
        
        Args:
            data_path: Caminho absoluto para a pasta contendo os arquivos .md.
        """
        print(f"📂 Lendo arquivos de: {data_path}")
        
        if not os.path.exists(data_path):
            print(f"❌ Erro: A pasta {data_path} não existe!")
            return

        # --------------------------------------------------
        # 1. Carregamento de Documentos
        # --------------------------------------------------
        # Usa DirectoryLoader com TextLoader forçando UTF-8 para evitar erros no Windows.
        loader = DirectoryLoader(
            data_path, 
            glob="**/*.md", 
            loader_cls=TextLoader,
            loader_kwargs={"encoding": "utf-8"}
        )
        docs = loader.load()
        
        if not docs:
            print("⚠️ Nenhum arquivo encontrado.")
            return

        print(f"📄 Encontrados {len(docs)} documentos.")

        # --------------------------------------------------
        # 2. Split (Fragmentação)
        # --------------------------------------------------
        # É crucial dividir o texto para que a busca retorne apenas o trecho relevante,
        # e não o arquivo inteiro (o que estouraria o token limit).
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,  # Tamanho alvo de cada pedaço
            chunk_overlap=200, # Sobreposição para não perder contexto entre cortes
            separators=["\n# ", "\n## ", "\n### ", "\n", " ", ""] # Tenta cortar em cabeçalhos primeiro
        )
        chunks = text_splitter.split_documents(docs)
        print(f"🧩 Criados {len(chunks)} chunks de informação.")

        # --------------------------------------------------
        # 3. Limpeza (Full Refresh)
        # --------------------------------------------------
        # Apaga o diretório físico do banco para garantir que não haja "lixo" antigo.
        if os.path.exists(self.persist_directory):
            try:
                shutil.rmtree(self.persist_directory)
                print("🧹 Banco antigo limpo.")
            except Exception as e:
                print(f"⚠️ Aviso: Não foi possível apagar pasta antiga: {e}")

        # --------------------------------------------------
        # 4. Ingestão Controlada (Throttling)
        # --------------------------------------------------
        # A API do Google Embeddings tem limites estritos de requisições por minuto (RPM).
        # Implementamos um "Modo Tartaruga" que envia 1 chunk de cada vez com pausas.
        print("🚀 Iniciando ingestão em lotes (Modo Seguro)...")
        
        vectorstore = Chroma(
            embedding_function=self.embeddings,
            persist_directory=self.persist_directory,
            collection_name=self.collection_name
        )

        batch_size = 1   # Envia 1 chunk por request
        delay_seconds = 4 # Espera 4 segundos entre requests
        total_chunks = len(chunks)
        
        for i in range(0, total_chunks, batch_size):
            batch = chunks[i : i + batch_size]
            print(f"   - Processando chunk {i+1} de {total_chunks}...")
            
            try:
                # Tenta adicionar o chunk
                vectorstore.add_documents(documents=batch)
            except Exception as e:
                # Tratamento de erro 429 (Too Many Requests) ou outros erros de rede
                print(f"⚠️ Erro ao processar chunk {i}: {e}")
                print("⏳ Erro detectado. Esperando 30s para o Google esfriar a cabeça...")
                time.sleep(30) # Backoff exponencial (manual)
                
                # Tenta novamente (Retry único)
                try:
                    vectorstore.add_documents(documents=batch)
                    print("   ✅ Recuperado com sucesso.")
                except:
                    print("   ❌ Falha definitiva neste chunk. O dado será perdido.")
            
            # Pausa obrigatória entre iteracoes
            time.sleep(delay_seconds)

        print("✅ Ingestão concluída! Banco salvo.")

    def query(self, question: str, k: int = 4):
        """
        Realiza a busca semântica no banco.
        
        Args:
            question: A pergunta ou frase para buscar similaridade.
            k: Número de resultados para retornar (Top-K).
            
        Returns:
            Lista de Documentos (langchain_core.documents.Document) mais similares.
        """
        vectorstore = self.get_vectorstore() 
        return vectorstore.similarity_search(question, k=k)
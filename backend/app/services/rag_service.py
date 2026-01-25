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
        # Inicializa o modelo de Embeddings do Google
        self.embeddings = GoogleGenerativeAIEmbeddings(
            model=settings.EMBEDDING_MODEL,
            google_api_key=settings.GOOGLE_API_KEY
        )
        self.persist_directory = os.path.join(os.getcwd(), settings.CHROMA_DB_DIR)
        self.collection_name = settings.COLLECTION_NAME

    def get_vectorstore(self):
        """Retorna a conexão com o banco (para fazer buscas)"""
        return Chroma(
            persist_directory=self.persist_directory,
            embedding_function=self.embeddings,
            collection_name=self.collection_name
        )

    def ingest_data(self, data_path: str):
        """Processo completo de leitura e indexação com Rate Limiting Severo (Modo Tartaruga)"""
        print(f"📂 Lendo arquivos de: {data_path}")
        
        if not os.path.exists(data_path):
            print(f"❌ Erro: A pasta {data_path} não existe!")
            return

        # 1. Carregar Arquivos .md (Com correção UTF-8 para Windows)
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

        # 2. Dividir em Chunks
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            separators=["\n# ", "\n## ", "\n### ", "\n", " ", ""]
        )
        chunks = text_splitter.split_documents(docs)
        print(f"🧩 Criados {len(chunks)} chunks de informação.")

        # 3. Limpar Banco Antigo
        if os.path.exists(self.persist_directory):
            try:
                shutil.rmtree(self.persist_directory)
                print("🧹 Banco antigo limpo.")
            except Exception as e:
                print(f"⚠️ Aviso: Não foi possível apagar pasta antiga: {e}")

        # 4. Ingestão em Lotes (MODO TARTARUGA BLINDADA) 🐢
        # Envia 1 por 1 e espera 4 segundos. Lento, mas evita erro 429.
        print("🚀 Iniciando ingestão em lotes (Modo Seguro)...")
        
        # Inicializa o Chroma vazio apontando para a pasta
        vectorstore = Chroma(
            embedding_function=self.embeddings,
            persist_directory=self.persist_directory,
            collection_name=self.collection_name
        )

        batch_size = 1   # Um chunk por vez
        delay_seconds = 4 # 4 segundos de descanso entre cada envio

        total_chunks = len(chunks)
        
        for i in range(0, total_chunks, batch_size):
            batch = chunks[i : i + batch_size]
            print(f"   - Processando chunk {i+1} de {total_chunks}...")
            
            try:
                # Adiciona o chunk atual
                vectorstore.add_documents(documents=batch)
            except Exception as e:
                print(f"⚠️ Erro ao processar chunk {i}: {e}")
                print("⏳ Erro detectado. Esperando 30s para o Google esfriar a cabeça...")
                time.sleep(30) # Pausa longa de emergência
                # Tenta de novo após a pausa
                try:
                    vectorstore.add_documents(documents=batch)
                    print("   ✅ Recuperado com sucesso.")
                except:
                    print("   ❌ Falha definitiva neste chunk. Pulando...")
            
            # Pausa padrão entre lotes
            time.sleep(delay_seconds)

        print("✅ Ingestão concluída! Banco salvo.")

    def query(self, question: str, k: int =8):
        """Faz a busca por similaridade"""
        vectorstore = self.get_vectorstore() 
        return vectorstore.similarity_search(question, k=k)
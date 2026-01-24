import os
import shutil
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
        # Caminho absoluto para evitar erros de pasta
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
        """Processo completo de leitura e indexação"""
        print(f"📂 Lendo arquivos de: {data_path}")
        
        if not os.path.exists(data_path):
            print(f"❌ Erro: A pasta {data_path} não existe!")
            return

        # 1. Carregar Arquivos .md
        loader = DirectoryLoader(data_path, glob="**/*.md", loader_cls=TextLoader)
        docs = loader.load()
        
        if not docs:
            print("⚠️ Nenhum arquivo encontrado. Verifique se criou o profile.md!")
            return

        print(f"📄 Encontrados {len(docs)} documentos.")

        # 2. Dividir em Chunks (Pedaços inteligentes)
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            separators=["\n# ", "\n## ", "\n### ", "\n", " ", ""]
        )
        chunks = text_splitter.split_documents(docs)
        print(f"🧩 Criados {len(chunks)} chunks de informação.")

        # 3. Limpar Banco Antigo (Reset)
        if os.path.exists(self.persist_directory):
            try:
                shutil.rmtree(self.persist_directory)
                print("🧹 Banco antigo limpo.")
            except Exception as e:
                print(f"⚠️ Aviso: Não foi possível apagar pasta antiga: {e}")

        # 4. Salvar Novos Vetores
        print("🚀 Gerando embeddings (isso usa a API do Google)...")
        Chroma.from_documents(
            documents=chunks,
            embedding=self.embeddings,
            persist_directory=self.persist_directory,
            collection_name=self.collection_name
        )
        print("✅ Ingestão concluída! Banco salvo.")

    def query(self, question: str, k: int = 4):
        """Faz a busca por similaridade"""
        vectorstore = self.get_vectorstore()
        return vectorstore.similarity_search(question, k=k)
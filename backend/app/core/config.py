import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # As chaves virão automaticamente do seu arquivo .env
    GROQ_API_KEY: str
    GOOGLE_API_KEY: str

    # Configurações do Banco de Dados (RAG)
    CHROMA_DB_DIR: str = "chroma_db"  # Nome da pasta onde o banco será salvo
    COLLECTION_NAME: str = "marocos_portfolio"
    
    # Configurações dos Modelos
    MODEL_NAME: str = "llama-3.1-8b-instant"  # Modelo rápido da Groq
    EMBEDDING_MODEL: str = "models/embedding-001" # Modelo gratuito do Google

    class Config:
        env_file = ".env"
        extra = "ignore" # Ignora variáveis extras se houver

settings = Settings()
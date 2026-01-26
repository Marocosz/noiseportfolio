import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # As chaves virão automaticamente do seu arquivo .env
    # Configurações do Banco de Dados (RAG)
    CHROMA_DB_DIR: str = "chroma_db"
    COLLECTION_NAME: str = "marocos_portfolio"
    
    # Configurações de LLM
    # Opções: "groq", "openai", "gemini"
    LLM_PROVIDER: str = "openai" 
    
    # Configurações dos Modelos
    GROQ_MODEL_NAME: str = "llama-3.1-8b-instant"
    OPENAI_MODEL_NAME: str = "gpt-4.1-nano"
    GEMINI_MODEL_NAME: str = "gemini-1.5-flash"
    
    # Esse campo generico 'MODEL_NAME' pode ser deprecado ou usado como fallback
    MODEL_NAME: str = "llama-3.1-8b-instant"
    
    # Embeddings
    EMBEDDING_MODEL: str = "models/text-embedding-004"
    
    # Chaves de API (Opcionais se não for usar o provider específico)
    OPENAI_API_KEY: str | None = None
    GROQ_API_KEY: str | None = None
    GOOGLE_API_KEY: str | None = None

    class Config:
        env_file = ".env"
        extra = "ignore" # Ignora variáveis extras se houver

settings = Settings()
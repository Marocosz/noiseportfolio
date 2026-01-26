"""
SCRIPT DE INICIALIZAÇÃO "AUTO-SUFICIENTE"
--------------------------------------------------
Este script substitui o comando padrão do Docker.
Ele verifica se o banco de dados vetorial existe. 
Se não existir, ele roda a ingestão (ingest.py) automaticamente antes de subir o servidor.
Isso evita erros ao subir o container "frio" em ambientes novos.
"""
import os
import subprocess
import sys

# Garante que o diretório atual está no path para imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.config import settings

import shutil

def main():
    db_path = settings.CHROMA_DB_DIR
    
    # 1. Verifica se foi solicitado re-ingestão forçada via variável de ambiente
    force_reingest = os.getenv("FORCE_REINGEST", "false").lower() == "true"
    
    if force_reingest and os.path.exists(db_path):
        print(f"⚠️  FORCE_REINGEST=true detectado. Apagando banco antigo em '{db_path}'...")
        shutil.rmtree(db_path) # Remove o diretório inteiro
        print("🗑️  Banco antigo removido.")

    # 2. Lógica Padrão: Se a pasta não existe (ou foi apagada acima) OU está vazia, roda ingestão.
    if not os.path.exists(db_path) or not os.listdir(db_path):
        print(f"⚙️  Iniciando processo de ingestão (Criação de Memória)...")
        
        # Roda o script de ingestão como um subprocesso
        result = subprocess.run([sys.executable, "ingest.py"])
        
        if result.returncode == 0:
            print("✅  Ingestão concluída com sucesso!")
        else:
            print("❌  Falha na ingestão. O servidor iniciará com memória vazia.")
    else:
        print(f"✅  Banco vetorial já existe em '{db_path}'. Pulando ingestão.")

    print("🚀  Iniciando Servidor Uvicorn...")
    
    # Inicia o servidor Uvicorn
    # Usamos sys.executable para garantir que usamos o mesmo interpretador Python
    subprocess.run([
        sys.executable, "-m", "uvicorn", 
        "main:app", 
        "--host", "0.0.0.0", 
        "--port", "8000"
    ])

if __name__ == "__main__":
    main()

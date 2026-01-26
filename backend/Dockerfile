# Usar versão leve do Python 3.12 (Alinhado com Dev)
FROM python:3.12-slim

# Variáveis de ambiente para otimizar Python no Docker
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Definir diretório de trabalho
WORKDIR /app

# Instalar dependências do sistema necessárias para compilação e SQLite (usado pelo ChromaDB)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements.txt primeiro (para cache de camadas do Docker)
COPY requirements.txt .

# Instalar dependências Python
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copiar o restante do código da aplicação
COPY . .

# Criar diretório de logs para evitar erro de permissão
RUN mkdir -p logs

# Expor a porta 8000 (Padrão FastAPI/Uvicorn)
EXPOSE 8000

# Comando de inicialização
# Usa boot.py para garantir que o banco vetorial exista antes de subir o servidor
CMD ["python", "boot.py"]

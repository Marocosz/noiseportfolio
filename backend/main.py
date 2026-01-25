from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router
from app.core.config import settings
import uvicorn

app = FastAPI(
    title="Marcos Portfolio API",
    description="Backend com Agentes IA para o Portfólio do Marcos",
    version="1.0.0"
)

# Configuração de CORS
# Permite que o frontend (localhost:5173 ou produção) acesse a API
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://marocos.dev",
    "https://www.marocos.dev",
    "*" # Durante desenvolvimento pode deixar aberto, mas bom restringir em prod
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir Rotas
app.include_router(api_router, prefix="/api")

@app.get("/health")
def health_check():
    return {"status": "ok", "model": settings.MODEL_NAME}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

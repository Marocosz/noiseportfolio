from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from langchain_core.messages import HumanMessage, AIMessage

from app.graph.workflow import agent_app

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[dict]] = [] # Ex: [{"role": "user", "content": "..."}]

class ChatResponse(BaseModel):
    response: str

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        # 1. Converter histórico simples para objetos LangChain
        # Isso garante que o agente tenha contexto do que já foi falado
        langchain_messages = []
        for msg in request.history:
            if msg.get("role") == "user":
                langchain_messages.append(HumanMessage(content=msg.get("content", "")))
            elif msg.get("role") == "assistant":
                langchain_messages.append(AIMessage(content=msg.get("content", "")))
        
        # 2. Adicionar a mensagem atual
        langchain_messages.append(HumanMessage(content=request.message))
        
        # 3. Invocar o Agente
        # O estado inicial recebe a lista de mensagens montada
        initial_state = {"messages": langchain_messages}
        result = await agent_app.ainvoke(initial_state)
        
        # 4. Extrair a resposta final
        # O LangGraph retorna o estado final atualizado. Pegamos a última mensagem.
        last_message = result["messages"][-1]
        
        return ChatResponse(response=last_message.content)
    
    except Exception as e:
        print(f"Erro no processamento do chat: {e}")
        raise HTTPException(status_code=500, detail=str(e))

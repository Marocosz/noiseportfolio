# (Futuro) Estado do Graph
from typing import Annotated, List
from typing_extensions import TypedDict
from langchain_core.messages import BaseMessage
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    """
    Estado do grafo.
    - messages: Histórico da conversa (User + AI).
    - context: Trechos recuperados do ChromaDB (RAG).
    """
    messages: Annotated[List[BaseMessage], add_messages]
    context: List[str]
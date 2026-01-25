from typing import Literal
from langgraph.graph import StateGraph, END
from app.graph.state import AgentState  # <--- IMPORTANDO DO ARQUIVO CERTO
from app.graph.nodes import router_node, retrieve, generate_rag, generate_casual

# Função de Decisão (A ponte levadiça)
def decide_next_node(state: AgentState) -> Literal["retrieve", "generate_casual"]:
    """
    Lê a classificação feita pelo Router e aponta para onde o grafo deve ir.
    """
    user_intent = state["classification"]
    
    if user_intent == "casual":
        return "generate_casual"
    else:
        return "retrieve" # Se for technical (ou erro), vai buscar dados

# Montagem do Grafo
def create_graph():
    workflow = StateGraph(AgentState)

    # Adiciona os Nós
    workflow.add_node("router_node", router_node)
    workflow.add_node("retrieve", retrieve)
    workflow.add_node("generate_rag", generate_rag)
    workflow.add_node("generate_casual", generate_casual)

    # Define o Ponto de Partida
    workflow.set_entry_point("router_node")

    # Define as Arestas Condicionais (O "IF" do grafo)
    workflow.add_conditional_edges(
        "router_node",      # De onde sai
        decide_next_node,   # Função que decide
        {                   # Mapa de decisões
            "retrieve": "retrieve",
            "generate_casual": "generate_casual"
        }
    )

    # Caminho Técnico: Retrieve -> Generate RAG -> Fim
    workflow.add_edge("retrieve", "generate_rag")
    workflow.add_edge("generate_rag", END)

    # Caminho Casual: Generate Casual -> Fim
    workflow.add_edge("generate_casual", END)

    return workflow.compile()

agent_app = create_graph()
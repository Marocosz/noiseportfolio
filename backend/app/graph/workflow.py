# (Futuro) Workflow do Graph
from langgraph.graph import StateGraph, END
from app.graph.state import AgentState
from app.graph.nodes import retrieve, generate

def create_graph():
    # Inicializa o grafo
    workflow = StateGraph(AgentState)

    # Adiciona os nós (Nodes)
    workflow.add_node("retrieve", retrieve)
    workflow.add_node("generate", generate)

    # Define as arestas (Edges - o caminho)
    workflow.set_entry_point("retrieve")     # Começa buscando
    workflow.add_edge("retrieve", "generate") # Depois de buscar, gera
    workflow.add_edge("generate", END)        # Depois de gerar, acaba

    # Compila o grafo
    app = workflow.compile()
    return app

# Instância pronta para ser importada pela API
agent_app = create_graph()
"""
PACOTE DE NÓS (NODES PACKAGE)
--------------------------------------------------
Objetivo:
    Modularizar as funções lógicas do grafo, permitindo importação unificada.
    
Funcionamento:
    Centraliza a exportação dos nós definidos nas sub-rotinas (arquivos .py),
    permitindo que o `workflow.py` importe tudo de `app.graph.nodes`.
"""

from .language import detect_language_node, translator_node
from .memory import summarize_conversation
from .rag import retrieve, generate_rag
from .casual import generate_casual
from .guard import answerability_guard, fallback_responder
from .gateway import semantic_gateway_node

# Exibe para imports via 'from app.graph.nodes import *'
__all__ = [
    "detect_language_node",
    "translator_node",
    "summarize_conversation",
    "retrieve",
    "generate_rag",
    "generate_casual",
    "answerability_guard",
    "fallback_responder",
    "semantic_gateway_node",
]

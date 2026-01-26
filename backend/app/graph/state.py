"""
DEFINIÇÃO DE ESTADO DO AGENTE (AgentState)
--------------------------------------------------
Objetivo:
    Definir a estrutura de dados central que trafega entre os nós do grafo (LangGraph).
    Funciona como a "memória de curto prazo" da execução atual, armazenando mensagens,
    contexto recuperado e decisões de roteamento.

Atuação no Sistema:
    - Backend / Graph: É a tipagem oficial do objeto `state` recebido por todas as funções em `nodes.py`.

Responsabilidades:
    1. Manter o histórico de mensagens (com suporte a append via `add_messages`).
    2. Armazenar dados transitórios (classificação, contexto, idioma) para uso entre nós.

Comunicação:
    - Importado por `nodes.py` (para tipagem das funções).
    - Importado por `workflow.py` (para definição do grafo).
"""

from typing import Annotated, List
from typing_extensions import TypedDict
from langchain_core.messages import BaseMessage
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    """
    Estrutura Tipada do Estado do Agente.
    Utiliza `TypedDict` para garantir que apenas chaves válidas sejam acessadas.
    """
    
    # --------------------------------------------------
    # Histórico de Conversa
    # --------------------------------------------------
    # Annotated[List, add_messages]: 
    # Instrução especial do LangGraph. Quando um nó retorna {"messages": [msg]},
    # o grafo NÃO substitui a lista, mas sim N ADICIONA (append) a mensagem ao final.
    # Essencial para manter o fluxo do chat.
    messages: Annotated[List[BaseMessage], add_messages]
    
    # --------------------------------------------------
    # Dados de Contexto (RAG)
    # --------------------------------------------------
    # Lista de strings contendo os trechos de documentos recuperados do ChromaDB.
    # Preenchido pelo nó `retrieve` e consumido pelo nó `generate_rag`.
    context: List[str]
    
    # --------------------------------------------------
    # Metadados de Controle de Fluxo
    # --------------------------------------------------
    
    # Define o caminho a seguir no grafo: 'technical' (RAG) ou 'casual' (Papo furado).
    # Preenchido pelo nó `router_node`.
    classification: str
    
    # Versão contextualizada da pergunta do usuário (sem pronomes ambíguos).
    # Gerada pelo nó `contextualize_input` para melhorar a busca vetorial.
    rephrased_query: str
    
    # Código do idioma detectado (ex: 'pt-br', 'en', 'es').
    # Usado para decidir se é necessário traduzir a resposta final.
    language: str
    
    # Resumo compactado das mensagens muito antigas (para economia de tokens).
    # Preenchido pelo nó `summarize_conversation`.
    summary: str

    # --------------------------------------------------
    # Resultado da Análise de Respondibilidade
    # --------------------------------------------------
    # Armazena a decisão do nó `answerability_guard` (JSON parsing).
    # Contém chaves como: 'is_answerable' (bool), 'reason' (str), 'exhausted' (bool).
    answerability_result: dict
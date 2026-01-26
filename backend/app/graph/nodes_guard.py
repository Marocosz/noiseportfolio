"""
MÓDULO DE GUARDA E FALLBACK (IA / LangGraph)
--------------------------------------------------
Objetivo:
    Centralizar a lógica de decisão crítica sobre "Respondibilidade" (Answerability)
    e gerenciar a comunicação de negativas ao usuário (Fallback).
    
Atuação no Sistema:
    - Backend / Graph Nodes: Atua como middleware cognitivo entre o nó de Retrieve (RAG)
      e o nó de Geração Final.
      
Responsabilidades:
    1. AnswerabilityGuard: Julgar, via LLM estrito, se o contexto recuperado é SUFICIENTE
       e SEGURO para responder à pergunta, evitando alucinações e respostas vazias.
    2. FallbackResponder: Gerar a resposta explicativa para o usuário quando o Guard
       bloqueia a geração, mantendo a persona do sistema.

Integrações:
    - Recebe dados do nó 'retrieve' e 'contextualize_input'.
    - Comunica-se com o `workflow.py` através do estado `agent_app`.
    - Utiliza LLMs (Fast/Medium) para julgamento e geração de texto.
"""

from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from langchain_core.prompts import ChatPromptTemplate
from app.core.llm import llm_fast, llm_medium, llm_medium_no_temp
from app.graph.state import AgentState
from app.core.logger import logger
import json

# ============================================================================
# NÓ: ANSWERABILITY GUARD
# ============================================================================
def answerability_guard(state: AgentState):
    """
    Nó Decisório (Cognitivo Puro).
    
    Objetivo:
        Avaliar tecnicamente se é possível responder à pergunta do usuário usando APENAS
        os fatos recuperados (RAG) e o histórico recente, sem invenção.
        Ele atua como um 'Firewall Semântico'.

    Regras de Negócio (Hardening):
        - Fail Closed: Em caso de erro técnico, assume que NÃO é respondível.
        - Consolidação de Contexto: Analisa TODOS os chunks recuperados, não apenas o primeiro.
        - Detecção de Exaustão: Verifica se o tópico já foi esgotado em mensagens anteriores.

    Entrada (State):
        - rephrased_query: A pergunta contextualizada.
        - context: Lista de strings recuperadas do banco vetorial.
        - messages: Histórico para análise de repetição.

    Saída (State Update):
        - answerability_result: Dict contendo a decisão (is_answerable), motivo e confiança.
    """
    logger.info("--- 🛡️ ANSWERABILITY GUARD (Julgando viabilidade da resposta...) ---")
    
    messages = state["messages"]
    context = state.get("context", [])
    
    # --------------------------------------------------
    # Preparação de Contexto (Hardening)
    # --------------------------------------------------
    # Une múltiplos fragmentos de texto retornados pelo Vector DB em uma única
    # string. Isso garante que o LLM "enxergue" todas as evidências disponíveis
    # antes de tomar a decisão, evitando falsos negativos por fragmentação.
    if isinstance(context, list):
        context_text = "\n\n--- CHUNK SEPARATOR ---\n\n".join(context)
    else:
        context_text = str(context or "")
        
    # Se o RAG não retornou nada, não há como responder factualmente.
    # Retorna imediatamente com confiança máxima na negativa.
    if not context_text.strip():
        logger.warning("Guard recebeu contexto vazio.")
        return {
            "answerability_result": {
                "is_answerable": False, 
                "reason": "no_context_retrieved", 
                "exhausted": False, 
                "confidence": 1.0
            }
        }
    
    rephrased_query = state.get("rephrased_query") or messages[-1].content
    
    # Simula uma 'memória recente' extraindo apenas o que o BOT falou nas últimas interações.
    # Crucial para evitar que o bot conte a mesma história duas vezes seguida.
    assistant_msgs = [m.content for m in messages[-10:] if m.type == 'assistant']
    previous_answers_summary = "\n---\n".join(assistant_msgs)

    # --------------------------------------------------
    # Definição do Prompt de Julgamento
    # --------------------------------------------------
    # Este prompt força o LLM a atuar como um classificador lógico,
    # retornando estritamente JSON. Temperatura 0 é vitual aqui.
    system_prompt = """
    Você é o ANSWERABILITY GUARD. Um nó puramente lógico e decisório.
    Sua função é julgar se o contexto recuperado (RAG) é suficiente e inédito para responder à pergunta do usuário.

    NÃO responda à pergunta.
    NÃO seja educado.
    NÃO gere texto conversacional.
    APENAS gere um JSON estrito.

    ### INTENÇÃO DO USUÁRIO (Contextualizada):
    {query}

    ### CONTEXTO RECUPERADO (Fatos Disponíveis):
    {context}

    ### RESPOSTAS ANTERIORES (O que já foi dito):
    {previous_answers}

    ---
    
    ### CRITÉRIOS DE JULGAMENTO (AND Lógico):

    1. **FATO PRESENTE:** Os fatos específicos pedidos estão EXPLICITAMENTE no contexto?
       - Se pede "ano", tem ano?
       - Se pede "quem", tem nome?
       - Se o contexto é vago ou não menciona o assunto -> is_answerable = false.

    2. **SEM ALUCINAÇÃO:** Você precisaria inventar algo ou usar conhecimento externo (fora do contexto) para responder satisfatoriamente?
       - Se sim -> is_answerable = false.

    3. **EXAUSTÃO DE CONTEÚDO (CRÍTICO):**
       - O usuário pediu "mais um", "outro" ou "diferente"?
       - O tópico solicitado já foi coberto nas RESPOSTAS ANTERIORES e não há NOVOS chunks no contexto sobre isso?
       - Se (TopicRequested == TopicPrevious) AND (NewFacts == Empty/Null) -> is_answerable = false (exhausted = true).

    ### FORMATO DE SAÍDA (JSON OBRIGATÓRIO):
    {{
      "is_answerable": boolean,
      "confidence": float, // 0.0 a 1.0 (1.0 = Certeza absoluta, < 0.7 = Incerto)
      "reason": "string_curta_snake_case_descrevendo_o_motivo",
      "exhausted": boolean
    }}

    Exemplos de "reason": 
    - "sufficient_factual_coverage"
    - "missing_specific_fact"
    - "content_exhausted"
    - "ambiguous_intent"
    - "requires_external_knowledge"

    Responda APENAS o JSON.
    """
    
    prompt = ChatPromptTemplate.from_messages([("system", system_prompt)])
    
    # Utiliza modelo sem temperatura (determinístico) para garantir o formato JSON
    # e a estabilidade da decisão lógica.
    chain = prompt | llm_medium_no_temp
    
    try:
        response = chain.invoke({
            "query": rephrased_query,
            "context": context_text,
            "previous_answers": previous_answers_summary or "Nenhuma resposta anterior."
        })
        
        content = response.content.strip()
        
        # Higienização de Markdown: Remove blocos de código se o LLM os incluir
        if content.startswith("```"):
            content = content.replace("```json", "").replace("```", "")
        
        decision_json = json.loads(content)
        
        logger.info(f"Guard Decision: {decision_json}")
        return {"answerability_result": decision_json}
        
    except Exception as e:
        logger.error(f"CRITICAL GUARD FAILURE: {e}")
        
        # --------------------------------------------------
        # Fail Closed Mechanism
        # --------------------------------------------------
        # Se houve erro no processamento cognitivo (ex: JSON malformado, Timeout),
        # assumimos o pior cenário (não responder) para evitar riscos de segurança/imagem.
        return {
            "answerability_result": {
                "is_answerable": False, 
                "reason": "guard_processing_error", 
                "exhausted": False,
                "confidence": 0.0
            }
        }


# ============================================================================
# NÓ: FALLBACK RESPONDER
# ============================================================================
def fallback_responder(state: AgentState):
    """
    Nó de Comunicação (Persona).
    
    Objetivo:
        Traduzir a decisão técnica do Guard (motivo do bloqueio) em uma explicação
        humana, amigável e alinhada à persona "Marcos".
        
    Por que existe:
        Separação de Preocupações. O nó de geração principal (RAG) não precisa
        aprender a dar desculpas, focando apenas em conteúdo positivo. Este nó
        especializa-se na "arte de dizer não".

    Lógica de Resposta Diferenciada:
        Adapta a mensagem baseada no 'reason' recebido (falta de dados, ambiguidade, erro).

    Entrada (State):
        - answerability_result: O veredito do Guard.
    
    Saída (State Update):
        - messages: Adiciona a resposta final (AIMessage) ao histórico.
    """
    logger.info("--- 🛑 FALLBACK RESPONDER (Gerando negativa elegante...) ---")
    
    result = state.get("answerability_result", {})
    reason = result.get("reason", "unknown_reason")
    exhausted = result.get("exhausted", False)
    
    system_prompt = """
    Você é o Marcos Rodrigues (Assistant).
    Sua tarefa é explicar ao usuário que você NÃO consegue responder à pergunta dele agora.
    
    MOTIVO TÉCNICO: {reason}
    ESGOTAMENTO DE CONTEÚDO: {exhausted}
    
    ### SUAS DIRETRIZES:
    1. **Persona**: Mantenha o tom jovem, dev, direto e 'gente boa'.
       - Use gírias leves se couber ("Putz", "Cara", "Massa").
    
    2. **Se exhausted == true (O usuário pediu mais, mas acabou):**
       - Diga que suas memórias sobre esse assunto específico acabaram.
       - "Cara, sobre [assunto], o que eu tinha de memória gravada aqui era isso mesmo."
       - Não peça desculpas profusas. Seja prático.

    3. **Se missing_fact (Não tem a info):**
       - Diga que não tem essa informação no seu "banco de dados" (RAG).
       - Sugira olhar o LinkedIn ou GitHub se fizer sentido.
       - "Putz, essa informação específica eu não tenho aqui agora."
       
    4. **Se ambiguous_intent (Não entendeu):**
       - Diga que não entendeu se é sobre X ou Y. Peça para o usuário reformular.
       - "Não tenho certeza se entendi se você quer saber sobre X ou Y..."

    5. **Se guard_processing_error (Erro Interno):**
       - Diga que teve um soluço técnico rápido. Peça para tentar de novo.
       - "Opa, deu uma travada aqui no meu processamento. Tenta perguntar de novo?"
    
    6. **NÃO INVENTE NADA.** O objetivo é encerrar este tópico com elegância.
    7. **OFEREÇA ALTERNATIVA:** Sugira mudar de assunto ou perguntar sobre outra coisa (Stack, Projetos, Carreira).
    
    Responda diretamente ao usuário.
    """
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt), 
        ("placeholder", "{messages}")
    ])
    
    # Utiliza modelo 'medium' (com temperatura padrão) para permitir
    # fluidez e naturalidade na conversa, já que não precisamos de output estruturado aqui.
    chain = prompt | llm_medium
    
    response = chain.invoke({
        "messages": state["messages"],
        "reason": reason,
        "exhausted": str(exhausted)
    })
    
    return {"messages": [response]}

"""
MÓDULO DE GATEWAY SEMÂNTICO (SINGLE-PASS)
--------------------------------------------------
Objetivo:
    Otimizar a latência unificando Contextualização (Rewrite) e Roteamento (Classification)
    em uma única chamada de LLM, mantendo checagens determinísticas de baixo custo.

Atuação no Sistema:
    - Substitui a sequencia `contextualize_input` -> `router_node`.

Responsabilidades:
    1. Pré-Router Regex: Identificação instantânea de intenções "Casual" (Saudações, etc).
    2. Processamento Unificado:
       - Contextualização: Reescrever a query resolvendo pronomes usando o histórico.
       - Classificação: Definir se é Technical ou Casual.
    3. Retorno Unificado: JSON com query reescrita e classificação.
"""

import re
import json
from datetime import datetime
from langchain_core.prompts import ChatPromptTemplate
from app.core.llm import llm_fast
from app.graph.state import AgentState
from app.core.logger import logger
from app.core.observability import observer

def semantic_gateway_node(state: AgentState):
    """
    Nó Unificado (Gateway) que realiza Contextualização e Roteamento simultaneamente.
    
    Fluxo:
    1. Verifica REGEX simples para "Casual". Se bater, retorna imediatamente.
    2. Se não, monta um prompt combinado (Rewrite + Router) e chama a LLM.
    3. Retorna 'rephrased_query' e 'classification' para o estado.
    """
    logger.info("--- SEMANTIC GATEWAY (Context + Router) ---")
    
    messages = state["messages"]
    last_message = messages[-1].content
    input_text_clean = last_message.strip().lower()
    
    # ------------------------------------------------------------------
    # 1. PRÉ-PROCESSAMENTO (REGEX / Determinístico) - Cópia Fiel do Router
    # ------------------------------------------------------------------
    # Só aplica se a mensagem for curta (até 10 palavras, para pegar saudações mais longas)
    if len(input_text_clean.split()) <= 10:
        casual_patterns = [
            r"^(oi|ol[áa]|eai|opa|alo|hello|hi)\W*$",
            r"^(valeu|obrigad[oa]|thanks|thx)\W*$",
            r"^(ok|blz|beleza|show|top|massa|brabo|legal)\W*$",
            r"^(tchau|flw|fui|até mais)\W*$",
            r"^(k){3,}.*",
            r"^(haha|hehe).*"
        ]
        
        for pattern in casual_patterns:
            if re.match(pattern, input_text_clean):
                observer.log_section("GATEWAY", data={
                    "Method": "REGEX", 
                    "Class": "CASUAL",
                    "Query": last_message
                })
                return {
                    "classification": "casual",
                    "rephrased_query": last_message 
                }

    # ------------------------------------------------------------------
    # 2. PROCESSAMENTO LLM (Prompt Unificado)
    # ------------------------------------------------------------------
    current_date = datetime.now().strftime("%d/%m/%Y")
    
    # Preparando Histórico
    messages_content = "\n".join([f"{m.type}: {m.content}" for m in messages])
    
    # Dica de contexto para o Router
    last_msg_type = messages[-2].type if len(messages) > 1 else "inicio"
    context_hint = f"Mensagem anterior foi do tipo: {last_msg_type}"

    # PROMPT COMBINADO
    system_prompt = f"""
    Você é o Gateway Semântico do Portfolio do Marcos.
    DATA ATUAL: {{current_date}}
    
    Sua missão é executar DUAS tarefas em paralelo para a última mensagem do usuário:
    1. CLASSIFICAR a intenção (Technical vs Casual).
    2. CONTEXTUALIZAR a pergunta (Resolver ambiguidades com base no histórico).

    ---

    # PARTE 1: DIRETRISES DE INTENÇÃO (ROUTER)
    
    Identifique a intenção do usuário para roteamento.
    
    [TECHNICAL] -> Rota de Consulta (RAG/Memória - OBRIGATÓRIO PARA FATOS E GOSTOS)
    - Perguntas sobre o MARCOS (Quem é? O que ele faz? Habilidades?).
    - Perguntas sobre GOSTOS PESSOAIS (Filmes, Animes, Jogos, Músicas, Hobbies).
    - Perguntas Fatuais ou Técnicas (Stack, Arquitetura, Projetos).
    - Perguntas Híbridas ("Oi, você joga Valorant?").
    - Qualquer pergunta que exija consultar a "memória" do Marcos.

    [CASUAL] -> Rota Social (Chat Livre - SOMENTE PUREZA SOCIAL)
    - APENAS saudações vazias ("Oi", "Olá", "Bom dia", "Tudo bem?").
    - APENAS agradecimentos simples ("Valeu", "Obrigado").
    - APENAS reações curtas ("Kkkk", "Legal", "Entendi", "Show").
    - Perguntas sobre O CHATBOT em si ("Como você funciona?", "Você dorme?").

    REGRA DE OURO / ANTI-ERRO:
    - Se o usuário perguntar "Gosta de X?", "Joga Y?" ou "Assiste Z?" -> É TECHNICAL.
    - O conteúdo sobre gostos pessoais ESTÁ no banco de dados (RAG). Não classifique como Casual.
    - Se houver dúvida se é uma pergunta pessoal ou técnica -> TECHNICAL.
    
    ---

    # PARTE 2: DIRETRIZES DE REESCRITA (CONTEXTUALIZE)
    
    Sua missão é transformar a última mensagem do usuário em uma pergunta
    COMPLETA, INDEPENDENTE e INEQUÍVOCA para busca semântica, se necessário.

    0. CRITÉRIO DE EVIDÊNCIA CLARA (TRIGGER DE SEGURANÇA)
    Considere que há evidência clara para reescrever SOMENTE SE:
    - Houver exatamente UM sujeito possível no histórico recente (foco nas últimas 2 mensagens).
    - Esse sujeito foi mencionado explicitamente por nome ou substantivo (não apenas pronomes).
    - A pergunta atual se conecta a esse sujeito sem margem para outra interpretação.
    
    >>> Se houver mais de um sujeito possível, dúvida ou contexto distante: NÃO REESCREVA.

    1. PRESERVAÇÃO DE INTENÇÃO (CRÍTICO)
    - Se a pergunta já for clara, específica e independente,
    retorne a pergunta ORIGINAL sem qualquer modificação.
    - Nunca reescreva “só para melhorar o texto”.

    2. RESOLUÇÃO DE AMBIGUIDADE (PRONOMES E REFERÊNCIAS)
    - Resolva pronomes apenas se houver UMA referência clara no histórico.
    - Substitua pronomes por substantivos explícitos: (ele, ela, isso, esse projeto, lá, etc).
    - NÃO assuma identidades.
    - NÃO presuma pessoas, projetos ou tecnologias.
    - Se houver dúvida, NÃO reescreva.

    Exemplo válido:
    Contexto: "Estamos falando do projeto DataChat"
    User: "Ele usa IA?"
    Pergunta reescrita: "O projeto DataChat usa IA?"

    Exemplo inválido:
    User: "Ele fez isso?"
    (se não houver referência clara) -> MANTER ORIGINAL

    3. REFERÊNCIAS TEMPORAIS
    - Converta apenas quando o sujeito estiver explícito no histórico.
    
    4. CONTEXTUALIZAÇÃO FRAGMENTADA
    - Complete perguntas fragmentadas apenas quando o tópico atual for inequívoco.

    5. INDEPENDÊNCIA
    - A pergunta final deve fazer sentido sozinha SEM introduzir novas informações.

    # O QUE NÃO FAZER (CRÍTICO)
    - NÃO responda à pergunta.
    - NÃO invente sujeitos, projetos ou pessoas.
    - NÃO deduza intenções ocultas.
    - NÃO “melhore” perguntas vagas.
    - NÃO transforme perguntas ambíguas em específicas sem evidência.

    ---

    # FORMATO DE SAÍDA (TÚNEL ÚNICO JSON)
    Responda APENAS um JSON válido:
    {{{{
       "rephrased_query": "string (pergunta reescrita ou original)",
       "classification": "technical" | "casual",
       "confidence": float (0.0 a 1.0),
       "reason": "string (breve explicação das decisões)"
    }}}}
    """
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human", "Histórico:\n{messages_content}\n\nContexto Extra: {context_hint}")
    ])
    
    chain = prompt | llm_fast
    
    try:
        response = chain.invoke({
            "messages_content": messages_content,
            "context_hint": context_hint
        })
        
        content = response.content.strip()
        # Tenta extrair JSON com regex caso venha sujo (ex: ```json ... ``` ou texto antes)
        json_match = re.search(r"\{.*\}", content, re.DOTALL)
        if json_match:
            content = json_match.group(0)
            
        data = json.loads(content)
        
        # Parse e Validação
        rephrased = data.get("rephrased_query", last_message)
        classification = data.get("classification", "technical").lower()
        confidence = float(data.get("confidence", 0.0))
        reason = data.get("reason", "")
        
        # Enforce Enum
        if classification not in ["technical", "casual"]:
            classification = "technical"
            
        # Safety Fallbacks
        if confidence < 0.4:
            logger.warning(f"Gateway: Confiança baixa ({confidence}). Forçando Technical.")
            classification = "technical"
            
        # Logging
        observer.log_section("GATEWAY", data={
            "Method": "LLM",
            "Class": classification.upper(),
            "Confidence": confidence,
            "Original": last_message,
            "Rephrased": rephrased
        }, content=f"Reason: {reason}")
        
        return {
            "rephrased_query": rephrased,
            "classification": classification
        }

    except Exception as e:
        logger.error(f"Gateway Error: {e}. Executando Fallback Seguro.")
        # Fallback Seguro
        return {
            "rephrased_query": last_message,
            "classification": "technical"
        }

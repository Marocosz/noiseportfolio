# (Futuro) Nós do Graph
from langchain_groq import ChatGroq
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_core.prompts import ChatPromptTemplate
from app.services.rag_service import RagService
from app.core.config import settings
from app.graph.state import AgentState

# Inicializa o Modelo (Llama 3 via Groq)
llm = ChatGroq(
    model=settings.MODEL_NAME,
    temperature=0.3, # Baixa criatividade para ser fiel aos dados
    api_key=settings.GROQ_API_KEY
)

# Inicializa o Serviço de RAG
rag = RagService()

def retrieve(state: AgentState):
    """
    Passo 1: Busca informações relevantes no ChromaDB.
    """
    print("--- 🔍 RETRIEVE (Buscando dados...) ---")
    messages = state["messages"]
    last_message = messages[-1] # A última pergunta do usuário
    question = last_message.content

    # Busca os 4 chunks mais parecidos
    docs = rag.query(question, k=4)
    
    # Concatena o texto dos documentos encontrados
    context_text = "\n\n".join([doc.page_content for doc in docs])
    
    # Salva no estado para o próximo passo usar
    return {"context": [context_text]}

def generate(state: AgentState):
    """
    Passo 2: Gera a resposta usando o LLM + Contexto.
    """
    print("--- 🤖 GENERATE (Gerando resposta...) ---")
    messages = state["messages"]
    context = state["context"][0] # Pega o contexto que o retrieve achou
    
    # O System Prompt define a personalidade do Marcos Digital
    system_prompt = """
    Você é o Assistente Virtual e "Clone Digital" do portfólio de Marcos Rodrigues.
    Sua função é responder perguntas sobre a carreira, habilidades, gostos pessoais e projetos dele.

    ### REGRAS DE OURO:
    1. Use ESTRITAMENTE o contexto fornecido abaixo para responder. O contexto contém fatos reais sobre o Marcos.
    2. Se a resposta não estiver no contexto, diga: "Desculpe, ainda não aprendi essa informação específica sobre o Marcos." (Não invente nada).
    3. O contexto está em primeira pessoa ("Eu fiz...", "Meu nome..."). Você deve adaptar a resposta para falar DELE ("O Marcos fez...", "Ele gosta...").
    4. Seja profissional, mas com um tom leve e apaixonado por tecnologia, assim como o Marcos.
    5. Responda sempre em Português do Brasil.
    6. Seja conciso e direto.

    ### CONTEXTO RECUPERADO DO BANCO DE DADOS:
    {context}
    """
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("placeholder", "{messages}"), # Aqui entra o histórico da conversa
    ])
    
    # Cria a corrente (Chain) e executa
    chain = prompt | llm
    
    response = chain.invoke({
        "messages": messages, 
        "context": context
    })
    
    return {"messages": [response]}
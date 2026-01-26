import requests
import time
import json

BASE_URL = "http://localhost:8000/api/chat"

# Cenários de Teste Abrangentes (Baseado no profile.md)
scenarios = {
    "🔹 Introdução & Identidade": [
        "Quem é o Marcos Rodrigues?", 
        "De onde você é e qual sua idade?",
        "Qual sua história com tecnologia? Como começou?",
    ],
    "🔹 Experiência Profissional": [
        "Onde o Marcos trabalha atualmente?",
        "O que ele faz na Supporte Logística?",
        "Você tem experiência como freelancer?",
        "Como foi sua época no suporte técnico (primeiro emprego)?"
    ],
    "🔹 Stack & Habilidades": [
        "Quais as principais linguagens que o Marcos domina?",
        "Você conhece de DevOps e Infraestrutura?",
        "Qual sua opinião sobre IA Aplicada vs Pesquisa Pura?",
        "O que você usa no Frontend?",
        "Você prefere Backend ou Frontend?"
    ],
    "🔹 Projetos (Específicos)": [
        "Me fale sobre o projeto Bússola V2.",
        "O que é o DataChat BI?",
        "Como funciona o Marcos Bot 2.0?",
        "Para que serve o Contract Analyzer?",
        "Me explique o Code Doc Generator."
    ],
    "🔹 Cultura & Pessoal": [
        "Quais seus jogos favoritos? Joga Elden Ring?",
        "Qual seu anime preferido?",
        "Você gosta de desenhar?",
        "Quais filmes você recomenda?",
        "O que você ouve de música?"
    ],
    "🔹 Soft Skills & Comportamental": [
        "O Marcos prefere trabalhar sozinho ou em equipe?",
        "Como você lida com prazos curtos e pressão?",
        "Você se considera mais generalista ou especialista?",
        "O que você valoriza em um time?"
    ],
    "🔹 Contato & Outros": [
        "Como posso entrar em contato com você?",
        "Qual seu setup de desenvolvimento?",
        "Você toma café?",
        "O que é sucesso para você?"
    ],
    "🔸 Casual (Teste de Router)": [
        "Eai mano, suave?",
        "Tudo beleza por ai?"
    ],
    "🧠 TESTE DE CONTEXTO (Histórico)": [
        "Quem é o criador desse portfólio?", # Pergunta 1
        "Quantos anos ele tem?",           # Pergunta 2 (Depende da 1 -> 'ele' = 'criador')
        "E onde ele mora?",                # Pergunta 3 (Depende da 1/2 -> 'ele' = 'criador')
        "O que ele gosta de jogar?"        # Pergunta 4 (Depende da 1 -> 'ele' = 'criador')
    ],
    "❓ TENTATIVA DE ALUCINAÇÃO (Coisas que não existem)": [
        "O que é o Projeto 'Foguete Quantico' que você fez?", # Projeto inventado
        "Qual o nome do seu cachorro?",                       # Info pessoal não cadastrada
        "Você torce para qual time de futebol?",              # Info provavelmente não cadastrada
        "O Marcos já viajou para Marte?"                      # Fato absurdo
    ],
    "🇺🇸 English Mode (Force EN Response)": [
        "Quem é você?",            # Should answer in English
        "Quais filmes recomenda?", # Should translate movie titles if applicable
        "Do you like coffee?"      # English input, English output
    ]
}

def run_simulation():
    print("--- 🚀 Iniciando Bateria de Testes Completa ---")
    print(f"Alvo: {BASE_URL}\n")
    
    total_questions = sum(len(msgs) for msgs in scenarios.values())
    current_q = 0
    
    # Histórico compartilhado para simular "memória" curta do usuário, 
    # mas limpando entre categorias para não enviesar demais.
    
    for category, questions in scenarios.items():
        print(f"\n=============================================")
        print(f"📂 CATEGORIA: {category}")
        print(f"=============================================")
        
        history = [] # Limpa histórico por categoria para focar no tema
        
        for q in questions:
            current_q += 1
            print(f"[{current_q}/{total_questions}] 👤 Pergunta: {q}")
            
            payload = {
                "message": q,
                "history": history[-2:], # Leva contexto recente
                "language": "en" if "🇺🇸" in category else "pt-br"
            }

            try:
                start_time = time.time()
                response = requests.post(BASE_URL, json=payload)
                elapsed = time.time() - start_time
                
                if response.status_code == 200:
                    data = response.json()
                    answer = data["response"]
                    usage = data.get("usage", {})
                    
                    # Limita tamanho da resposta no log visual
                    display_answer = (answer[:200] + '...') if len(answer) > 200 else answer
                    print(f"🤖 Agent ({elapsed:.2f}s): {display_answer}")
                    print(f"📊 Uso: {usage.get('current')}/{usage.get('limit')}")
                    
                    history.append({"role": "user", "content": q})
                    history.append({"role": "assistant", "content": answer})
                    
                elif response.status_code == 429:
                    print("⛔ Rate Limit Atingido! Abortando testes.")
                    return
                else:
                    print(f"⚠️ Erro {response.status_code}: {response.text}")

            except Exception as e:
                print(f"❌ Erro na requisição: {e}")
            
            print("-" * 30)
            time.sleep(0.5) 

    print("\n✅ Bateria de Testes Concluída. Verifique 'backend/logs/app.log' para respostas completas.")

if __name__ == "__main__":
    run_simulation()

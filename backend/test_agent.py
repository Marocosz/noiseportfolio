import sys
import os

# Adiciona o diretório atual ao path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from langchain_core.messages import HumanMessage
from app.graph.workflow import agent_app

def main():
    print("🤖 Marcos AI - Teste de Terminal (Digite 'sair' para fechar)")
    print("----------------------------------------------------------")
    
    while True:
        pergunta = input("\nVocê: ")
        if pergunta.lower() in ["sair", "exit", "quit"]:
            break
            
        print("Processando...")
        
        # Invoca o agente
        inputs = {"messages": [HumanMessage(content=pergunta)]}
        result = agent_app.invoke(inputs)
        
        # Pega a última mensagem (resposta da IA)
        resposta = result["messages"][-1].content
        print(f"\nMarcos AI: {resposta}")

if __name__ == "__main__":
    main()
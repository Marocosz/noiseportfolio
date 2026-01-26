"""
SCRIPT DE INGESTÃO DE DADOS (ETL / Indexação)
--------------------------------------------------
Objetivo:
    Executar manualmente o processo de leitura e indexação dos arquivos Markdown 
    para dentro do banco de dados vetorial (ChromaDB).

Atuação no Sistema:
    - Scripts / Admin: Não faz parte do servidor online. Deve ser rodado localmente
      sempre que a documentação (pasta `data/`) for alterada.

Responsabilidades:
    1. Localizar a pasta de conhecimento (`data/knowledge_base`).
    2. Instanciar o `RagService` para processar os arquivos.
    3. Executar um teste de sanidade ("Smoke Test") ao final para garantir que 
       a busca está retornando resultados.

Como usar:
    Execute via terminal na raíz do backend:
    `python ingest.py`
"""

import os
import sys

# Hack de Path: Adiciona o diretório atual ao sys.path para conseguir importar 'app'
# Isso é necessário porque este script está na raiz, fora do pacote 'app'.
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.services.rag_service import RagService

def main():
    """
    Função principal que orquestra a atualização da memória da IA.
    """
    # Define o caminho absoluto para a pasta de dados
    # Garante que funcione independente de onde o terminal foi aberto
    base_dir = os.path.dirname(os.path.abspath(__file__))
    data_folder = os.path.join(base_dir, "data", "knowledge_base")
    
    print("--- INICIANDO PROCESSO DE INGESTÃO (RAG) ---")
    
    try:
        # Inicializa o serviço e dispara a indexação (que já tem rate limit embutido)
        rag = RagService()
        rag.ingest_data(data_folder)
        
        # --------------------------------------------------
        # Smoke Test (Verificação de Integridade)
        # --------------------------------------------------
        # Faz uma pergunta simples para ver se o banco não está vazio ou corrompido.
        print("\n🔎 Teste de Sanidade (Busca Rápida): 'Quais as skills do Marcos?'")
        results = rag.query("Quais as skills do Marcos?", k=2)
        
        if results:
            for i, doc in enumerate(results):
                # Exibe um snippet do conteúdo encontrado para confirmação visual
                print(f"\nResult {i+1}:")
                print(f"{doc.page_content[:150]}...")
        else:
            print("⚠️ O banco parece vazio após a ingestão. Verifique os arquivos na pasta data/.")
            
    except Exception as e:
        print(f"\n❌ Erro Fatal durante a ingestão: {e}")
        print("Dica: Verifique se suas chaves de API (GOOGLE_API_KEY) estão corretas no arquivo .env")

if __name__ == "__main__":
    main()

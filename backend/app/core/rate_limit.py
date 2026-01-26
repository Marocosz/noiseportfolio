"""
LIMITADOR DE TAXA GLOBAL (Rate Limiter)
--------------------------------------------------
Objetivo:
    Controlar o custo e o uso indevido da API, limitando o número total de requisições
    que o backend aceita processar por dia.
    
    Como estamos usando APIs gratuitas ou com budget limitado (OpenAI, Groq), 
    este limitador protege o bolso do desenvolvedor.

Atuação no Sistema:
    - Backend / Core Security: Intercepta requisições antes que cheguem à IA.

Responsabilidades:
    1. Manter um contador de requisições em memória (não persistente após restart).
    2. Reiniciar o contador automaticamente quando o dia muda.
    3. Garantir acesso Thread-Safe (concorrência) ao contador.

Comunicação:
    - Usado por `app.api.routes` para validar se o usuário pode enviar mensagem.
"""

from datetime import date
import threading

class GlobalRateLimiter:
    """
    Controlador de cota diária.
    Implementa thread-safety com RLock.
    """
    def __init__(self, daily_limit: int = 100):
        self.daily_limit = daily_limit
        # Lock para evitar race conditions em requisições paralelas
        self._lock = threading.Lock()
        self.count = 0
        self.current_date = date.today()

    def _reset_if_new_day(self):
        """
        Verifica se a data mudou. Se sim, zera o contador.
        Chamada internamente antes de qualquer leitura/escrita.
        """
        today = date.today()
        if self.current_date != today:
            self.current_date = today
            self.count = 0

    def get_status(self) -> dict:
        """
        Consulta o status atual sem consumir cota.
        Retorna informações para a UI exibir a barra de progresso.
        """
        with self._lock:  # Área crítica protegida
            self._reset_if_new_day()
            return {
                "current": self.count,
                "limit": self.daily_limit,
                "remaining": max(0, self.daily_limit - self.count)
            }

    def check_request(self) -> bool:
        """
        Tenta consumir 1 crédito da cota.
        
        Returns:
            True se autorizado (incrementa count).
            False se bloqueado (limite excedido).
        """
        with self._lock:
            self._reset_if_new_day()
            
            if self.count >= self.daily_limit:
                return False
            
            self.count += 1
            return True

# Singleton: instância global compartilhada por todo o app.
# Define o teto de gastos (ex: 100 chats por dia).
limiter = GlobalRateLimiter(daily_limit=100)

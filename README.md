<div align="center">

  <img src="banner.png" alt="Banner Marcos Dev" width="100%">
  
  <br>

  <img src="https://img.shields.io/github/repo-size/Marocosz/noiseportfolio?style=for-the-badge&color=818cf8" alt="Repo Size">
  <img src="https://img.shields.io/github/languages/count/Marocosz/noiseportfolio?style=for-the-badge&color=818cf8" alt="Language Count">
  <img src="https://img.shields.io/badge/LangGraph-Orchestration-orange?style=for-the-badge&logoColor=white" alt="LangGraph">
  <img src="https://img.shields.io/badge/RAG-Enabled-blueviolet?style=for-the-badge" alt="RAG">

  <br>
  <br>
</div>

---

O **Portfolio** não é apenas um site estático; é uma **experiência digital viva**. Projetado para quebrar a barreira entre o visitante e o desenvolvedor, ele utiliza **Inteligência Artificial Generativa (RAG)** para permitir que recrutadores e visitantes conversem diretamente com uma versão virtual do Marcos Rodrigues.

# Indice

- [Indice](#indice)
- [🧠 O Cérebro (Arquitetura de IA)](#-o-cérebro-arquitetura-de-ia)
  - [Fluxo de Pensamento (LangGraph)](#fluxo-de-pensamento-langgraph)
  - [RAG (Retrieval Augmented Generation)](#rag-retrieval-augmented-generation)
- [🎨 UX \& Design System](#-ux--design-system)
- [🛠️ Tecnologias Usadas](#️-tecnologias-usadas)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [🚀 Como Rodar Localmente](#-como-rodar-localmente)
  - [Pré-requisitos](#pré-requisitos)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [🐳 Deploy Profissional (Docker \& VPS)](#-deploy-profissional-docker--vps)
  - [Arquitetura de Microserviços](#arquitetura-de-microserviços)
  - [Deploy no Coolify (Recomendado)](#deploy-no-coolify-recomendado)
- [🤝 Contato](#-contato)

# 🧠 O Cérebro (Arquitetura de IA)

O diferencial deste projeto é o uso de **Agentes de IA Stateful** (com memória e estado) gerenciados pelo `LangGraph`. Não é apenas um wrapper de API da OpenAI; é um fluxo de decisão complexo.

## Fluxo de Pensamento (LangGraph)

Cada mensagem do usuário passa por uma "cadeia de pensamento" antes de ser respondida. O sistema decide dinamicamente se precisa consultar a memória (Currículo) ou se pode apenas socializar.

```mermaid
graph TD
    A[Start] --> B(Detect Language)
    B --> C{Router Node}

    C -->|Technical/Fatos| D[Contextualize Input]
    C -->|Casual/Oi| E[Generate Casual]

    D --> F["Retrieve Documents (RAG)"]
    F --> G["Generate RAG Response"]

    E --> H{Translator Node}
    G --> H

    H --> I[Stream Resposta]
```

1.  **Router Inteligente:** Classifica a intenção. Perguntas sobre "Banda favorita" ou "Stacks" vão para a rota técnica. Um simples "Oi" vai para a rota casual (economizando tokens e tempo).
2.  **Memória Contextual:** O sistema lembra do que foi dito anteriormente na conversa, permitindo diálogos fluidos ("E sobre o React?" -> entende que "E" se refere ao contexto anterior).
3.  **Tradução Automática:** Se o usuário falar Inglês, o bot processa em Português (para manter a persona) e um nó final traduz a resposta perfeitamente antes de entregar.

## RAG (Retrieval Augmented Generation)

O conhecimento do bot não é alucinado. Ele é fundamentado em dados reais ingeridos a partir de arquivos Markdown (`profile.md`).

- **Database:** ChromaDB (Vetorial).
- **Embeddings:** Google Gemini Embeddings (Alta performance semântica).
- **Ingestão Inteligente:** Script `boot.py` que verifica e atualiza a memória automaticamente no deploy.

---

# 🎨 UX & Interface Imersiva

A interface transcende o conceito tradicional de portfólio, entregando uma **Simulação de Sistema Operacional** no navegador. O objetivo é criar um ambiente digital tátil, familiar e altamente responsivo.

### 🖥️ Desktop Metaphor

- **OS-Like Navigation:** A navegação é ancorada em uma barra de tarefas (Dock) persistente, que centraliza o acesso às seções (Apps), configurações e o "Menu Iniciar".
- **Start Menu (AI Hub):** A interação com o Marcos Virtual não acontece em um chat flutuante genérico, mas sim em um "Live Start Menu". É o núcleo do sistema, onde o usuário busca informações via conversa natural.

### ⚙️ Controle Total do Usuário

O sistema respeita as preferências do visitante com controles acessíveis na barra principal:

- **🌗 Light & Dark Mode:** Temas meticulosamente calibrados. O modo escuro é profundo e elegante, enquanto o modo claro é vibrante e limpo.
- **⏯️ Motion Toggle:** Um controle dedicado para **Pausar Animações**. Ideal para acessibilidade (redução de movimento) ou economia de bateria em dispositivos móveis.
- **🌐 Internacionalização (i18n):** Alternância instantânea entre **Português (BR)** e **Inglês (EN)**, adaptando não apenas a UI, mas também o idioma das respostas da IA.

### 📱 Responsividade & Performance

- **Mobile First:** A metáfora de desktop se adapta fluidamente para mobile, transformando a barra de tarefas em um menu acessível e reorganizando janelas para toque.
- **Feedback Visual:** Respostas da IA via **Server-Sent Events (SSE)** com efeito de digitação ("Typewriter"), e indicadores de status ("Pensando...", "Traduzindo...") para total transparência do processo.

---

# 🛠️ Tecnologias Usadas

<div style="display: inline_block"><br>
  <img align="center" alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img align="center" alt="FastAPI" src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" />
  <img align="center" alt="LangChain" src="https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white" />
  <img align="center" alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img align="center" alt="ChromaDB" src="https://img.shields.io/badge/ChromaDB-FF6B6B?style=for-the-badge&logoColor=white" />
</div>

<br>

- **Frontend:** React, Vite, Framer Motion (Animações), Lucide Icons.
- **Backend:** Python 3.12, FastAPI, Uvicorn.
- **IA:** LangGraph, LangChain, Google Gemini Pro / Groq (Llama 3).
- **Infra:** Docker Compose, Nginx (Reverse Proxy).

---

# 📂 Estrutura do Projeto

```text
NoisePortfolio/
├── 📁 backend/                # O Cérebro (API & IA)
│   ├── 📂 app/
│   │   ├── 📂 api/            # Rotas (SSE, Chat)
│   │   ├── 📂 core/           # Configs, Logger, RateLimit
│   │   ├── 📂 graph/          # 🧠 Lógica do LangGraph (Nodes, State)
│   │   └── 📂 services/       # RAG Service (ChromaDB)
│   ├── 📂 data/               # Arquivos de conhecimento (.md)
│   ├── boot.py                # Script de Inicialização Inteligente
│   ├── ingest.py              # Script de Ingestão de Dados
│   └── docker-compose.yml     # Orquestração
│
├── 📁 frontend/               # A Face (React)
│   ├── 📂 src/
│   │   ├── 📂 components/     # UI (StartMenu, ChatBox)
│   │   ├── 📂 contexts/       # i18n, Theme
│   │   └── 📂 hooks/          # Logica customizada
│   └── index.html
```

---

# 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js 18+
- Python 3.11+
- Chave de API (`GOOGLE_API_KEY` ou `GROQ_API_KEY`).

### Backend

1.  Entre na pasta:
    ```bash
    cd backend
    ```
2.  Crie o ambiente virtual e instale dependências:
    ```bash
    python -m venv venv
    source venv/bin/activate  # Linux/Mac
    .\venv\Scripts\activate   # Windows
    pip install -r requirements.txt
    ```
3.  Configure as variáveis de ambiente:

    Crie um arquivo `.env` na raiz da pasta `backend` baseando-se no exemplo fornecido:

    ```bash
    cp .env.example .env  # Ou copie e renomeie manualmente
    ```

    **Explicação das Variáveis (`.env`):**

    | Variável         | Descrição                                                                                                        |
    | :--------------- | :--------------------------------------------------------------------------------------------------------------- |
    | `LLM_PROVIDER`   | Define quem gera as respostas (`groq`, `openai`, `gemini`). O padrão é `groq`(mais rápido e free).               |
    | `GOOGLE_API_KEY` | **Obrigatória.** Usada para gerar os _Embeddings_ (vetores de memória) do RAG, independente do provider de chat. |
    | `GROQ_API_KEY`   | Necessária se o provider for `groq`.                                                                             |
    | `OPENAI_API_KEY` | Necessária se o provider for `openai`.                                                                           |
    | `FORCE_REINGEST` | Se `true`, apaga e recria o banco de memória ao iniciar. Útil após editar arquivos em `backend/data/`.           |

4.  Rode a ingestão (cria a memória) e o servidor:
    ```bash
    python ingest.py  # Cria o banco ChromaDB local
    python main.py    # Roda a API na porta 8000
    ```

### Frontend

1.  Em outro terminal, entre na pasta:
    ```bash
    cd frontend
    ```
2.  Instale e rode:
    ```bash
    npm install
    npm run dev
    ```
3.  Acesse: `http://localhost:5173`

---

# 🐳 Deploy Profissional (Docker & VPS)

Este projeto foi otimizado para deploy em serviços como **Coolify**, Railway ou AWS, utilizando containers Docker auto-gerenciáveis.

## Arquitetura de Microserviços

O Backend roda isolado em um container Python. Ele possui um script inteligente (`boot.py`) que detecta se é a primeira execução:

- **Primeiro Deploy:** Detecta banco vazio -> Roda Ingestão -> Inicia API.
- **Reinícios:** Detecta banco existente -> Pula Ingestão (Economia de API) -> Inicia API.
- **Update de Conteúdo:** É gerenciado via **GitOps**. Commite as alterações em `data/profile.md` e o Coolify atualiza a imagem.

## Deploy no Coolify (Recomendado)

1.  **Crie um Serviço:** Selecione "Docker Compose" ou aponte seu repositório Git.
2.  **Variáveis de Ambiente:** No painel do Coolify, adicione:
    - `GOOGLE_API_KEY`
    - `GROQ_API_KEY`
    - `LLM_PROVIDER=groq`
    - `FORCE_REINGEST=false` (Mude para `true` **apenas** quando quiser forçar a recriação do banco de dados após editar o `profile.md`).
3.  **Deploy:** O `docker-compose.yml` já está configurado para usar **Volumes Nomeados** (`chroma_data`), garantindo que a memória da IA não seja perdida entre deploys.

```yaml
# Exemplo de persistência no docker-compose.yml
volumes:
  chroma_data: # O Docker gerencia isso no disco da VPS
```

---

# 🤝 Contato

Projeto desenvolvido com foco em **UX de Alta Fidelidade** e **Engenharia de Prompt**.

- 🐙 **GitHub:** [Marocosz](https://github.com/Marocosz)
- 💼 **LinkedIn:** [Marcos Rodrigues](https://linkedin.com/in/marcosrodriguesptc)

---

<div align="center">
  <sub>Built with 💜 and lots of ☕ by Marcos.</sub>
</div>

// src/data/projects.js

export const projectsData = [
{
    id: 1, // Pode ajustar o ID conforme necessário na sua lista
    title: "Bússola V2",
    category: "Fullstack & AI",
    description: "Aplicação Web Pessoal que unifica Finanças, Saúde e Produtividade. Utiliza Agentes de IA orquestrados (LangGraph) para gerar insights e otimizar rotinas em uma plataforma segura e reativa. O Bússola V2 é a resposta definitiva para a fragmentação da vida moderna.Ele elimina a necessidade de alternar entre múltiplos aplicativos desconexos (planilhas financeiras, apps de treino, notas soltas e agendas), unificando todos os aspectos vitais da sua rotina em uma única plataforma inteligente e segura.",
    techs: ["React 19", "FastAPI", "LangChain", "Docker", "Redis", "SQLAlchemy"],
    links: {
      github: "https://github.com/Marocosz/bussola-v2",
      live: "#" // Se tiver um link de deploy, coloque aqui, senão mantenha # ou remova
    }
  },
  {
    id: 2,
    title: "Agentes Menu IA",
    category: "AI Demo Platform",
    description: "Plataforma interativa para demonstração de agentes de IA: triagem de currículos, geração de conteúdo e atendimento via RAG.",
    techs: ["Python", "Streamlit", "LangChain", "FAISS", "Pandas"],
    links: {
      github: "https://github.com/Marocosz/AgentesIA_Menu",
      live: "#"
    }
  },
  {
    id: 3,
    title: "Marocos BOT",
    category: "Automation",
    description: "Bot multifuncional para Discord e League of Legends. Integração direta com Riot API e LCU para automação de partidas.",
    techs: ["Python", "Discord.py", "Riot API", "LCU API"],
    links: {
      github: "https://github.com/Marocosz/marocos_bot",
      live: "#"
    }
  },
  {
    id: 4,
    title: "eSports Team Connect",
    category: "Full-Stack Web",
    description: "Plataforma para conectar jogadores e equipes. Backend robusto e escalável com FastAPI e MongoDB para perfis e vagas.",
    techs: ["FastAPI", "MongoDB", "Beanie ODM", "Python"],
    links: {
      github: "https://github.com/Marocosz/eSports-Team-Connect",
      live: "#"
    }
  },
  {
    id: 5,
    title: "WebDashTV",
    category: "Data Analysis",
    description: "Gestão e análise de notícias televisivas. Dashboards em PDF, exportação Excel e API Flask com SQLAlchemy.",
    techs: ["Flask", "SQLAlchemy", "Pandas", "Matplotlib"],
    links: {
      github: "https://github.com/Marocosz/webdashtv",
      live: "#"
    }
  },
  {
    id: 6,
    title: "UFU Pizzaria OO",
    category: "Desktop App",
    description: "Sistema de gestão de pizzaria aplicando conceitos avançados de POO (Herança, Polimorfismo) e persistência em arquivos.",
    techs: ["Java", "POO", "CSV Persistence"],
    links: {
      github: "https://github.com/Marocosz/UFUPizzaria",
      live: "#"
    }
  },
  {
    id: 7,
    title: "Jogos Clássicos",
    category: "Game Dev",
    description: "Coleção de jogos clássicos (Snake, Dino) focados em lógica de algoritmos, game loops e manipulação de eventos.",
    techs: ["Python", "Pygame", "Game Logic"],
    links: {
      github: "https://github.com/Marocosz?tab=repositories",
      live: "#"
    }
  }
];
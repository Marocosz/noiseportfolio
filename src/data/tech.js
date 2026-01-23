// src/data/tech.js
import { Cpu, Globe, Server, Terminal, Database, Layout } from 'lucide-react';

export const techData = [
  {
    id: "ai",
    title: "AI & Data Science",
    icon: Cpu,
    description: "Stack principal. Foco em LLMs, RAG e análise de dados complexos.",
    items: [
      { name: "Python", level: "Expert", color: "#3776AB", tooltip: "Linguagem versátil para Backend e AI." },
      { name: "LangChain", level: "Advanced", color: "#F0C814", tooltip: "Orquestração de LLMs e Chains." },
      { name: "RAG", level: "Advanced", color: "#10A37F", tooltip: "Retrieval-Augmented Generation." },
      { name: "Pandas", level: "Advanced", color: "#150458", tooltip: "Análise e manipulação de dados." },
      { name: "Scipy", level: "Intermediate", color: "#8CAAE6", tooltip: "Computação científica e técnica." },
      { name: "OpenAI API", level: "Advanced", color: "#10A37F", tooltip: "Integração com modelos GPT." }
    ]
  },
  {
    id: "backend",
    title: "Backend Engineering",
    icon: Server,
    description: "APIs robustas e arquiteturas de dados eficientes.",
    items: [
      { name: "FastAPI", level: "Expert", color: "#009688", tooltip: "APIs assíncronas de alta performance." },
      { name: "Flask", level: "Advanced", color: "#000000", tooltip: "Micro-framework para aplicações ágeis." },
      { name: "SQLModel", level: "Advanced", color: "#E10098", tooltip: "ORM moderno para FastAPI." },
      { name: "Beanie ODM", level: "Intermediate", color: "#FFD700", tooltip: "ODM assíncrono para MongoDB." },
      { name: "PostgreSQL", level: "Advanced", color: "#336791", tooltip: "Banco Relacional sólido." },
      { name: "MongoDB", level: "Intermediate", color: "#47A248", tooltip: "Banco NoSQL (Documentos)." }
    ]
  },
  {
    id: "frontend",
    title: "Frontend & Interfaces",
    icon: Layout,
    description: "Criação de interfaces para demonstração e uso de ferramentas.",
    items: [
      { name: "Streamlit", level: "Advanced", color: "#FF4B4B", tooltip: "Data Apps rápidos em Python." },
      { name: "React", level: "Intermediate", color: "#61DAFB", tooltip: "Interfaces dinâmicas modernas." },
      { name: "Tailwind CSS", level: "Expert", color: "#06B6D4", tooltip: "Estilização eficiente." },
      { name: "HTML/CSS/JS", level: "Advanced", color: "#E34F26", tooltip: "Fundamentos da Web." },
      { name: "Framer Motion", level: "Intermediate", color: "#0055FF", tooltip: "Animações e interações." }
    ]
  },
  {
    id: "devops",
    title: "DevOps & Tools",
    icon: Terminal,
    description: "Infraestrutura e ambiente de desenvolvimento.",
    items: [
      { name: "Docker", level: "Advanced", color: "#2496ED", tooltip: "Containerização essencial." },
      { name: "Linux", level: "Expert", color: "#FCC624", tooltip: "Ambiente principal de dev." },
      { name: "Git", level: "Advanced", color: "#F05032", tooltip: "Controle de versão." },
      { name: "SQL", level: "Expert", color: "#003B57", tooltip: "Linguagem de consulta estruturada." }
    ]
  }
];
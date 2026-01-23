// src/data/tech.js
import { Cpu, Globe, Server, Terminal, Database, Layout } from 'lucide-react';

export const techData = [
  {
    id: "ai",
    title: "AI & Data Science",
    icon: Cpu,
    description: "Core da minha especialização acadêmica e profissional.",
    items: [
      { name: "Python", level: "Expert", color: "#3776AB", tooltip: "Linguagem versátil para Backend e AI." },
      { name: "OpenAI API", level: "Advanced", color: "#10A37F", tooltip: "Integração com LLMs avançados." },
      { name: "LangChain", level: "Advanced", color: "#F0C814", tooltip: "Framework para orquestração de LLMs." },
      { name: "Pandas", level: "Advanced", color: "#150458", tooltip: "Manipulação e análise de dados." },
      { name: "Scikit-learn", level: "Intermediate", color: "#F7931E", tooltip: "Machine Learning clássico e stats." },
      { name: "TensorFlow", level: "Basic", color: "#FF6F00", tooltip: "Deep Learning e Redes Neurais." }
    ]
  },
  {
    id: "backend",
    title: "Backend Engineering",
    icon: Server,
    description: "Arquiteturas escaláveis e APIs de alta performance.",
    items: [
      { name: "FastAPI", level: "Expert", color: "#009688", tooltip: "APIs Python assíncronas ultra-rápidas." },
      { name: "Node.js", level: "Advanced", color: "#339933", tooltip: "Runtime JS para servidores escaláveis." },
      { name: "PostgreSQL", level: "Advanced", color: "#336791", tooltip: "Banco Relacional robusto e confiável." },
      { name: "MongoDB", level: "Intermediate", color: "#47A248", tooltip: "Banco NoSQL flexível baseado em documentos." },
      { name: "Redis", level: "Intermediate", color: "#DC382D", tooltip: "Cache em memória de alta performance." },
      { name: "MQTT", level: "Advanced", color: "#660066", tooltip: "Protocolo leve para comunicação IoT." }
    ]
  },
  {
    id: "frontend",
    title: "Frontend & UI",
    icon: Layout,
    description: "Interfaces reativas e dashboards complexos.",
    items: [
      { name: "Vue.js", level: "Advanced", color: "#4FC08D", tooltip: "Framework JS progressivo e reativo." },
      { name: "Nuxt", level: "Advanced", color: "#00C58E", tooltip: "Framework Full-stack baseado em Vue." },
      { name: "React", level: "Intermediate", color: "#61DAFB", tooltip: "Biblioteca popular para interfaces UI." },
      { name: "Tailwind CSS", level: "Expert", color: "#06B6D4", tooltip: "Estilização utility-first moderna." },
      { name: "Framer Motion", level: "Intermediate", color: "#0055FF", tooltip: "Animações fluidas e gestos para React." }
    ]
  },
  {
    id: "devops",
    title: "DevOps & Tools",
    icon: Terminal,
    description: "Infraestrutura, automação e ambiente Linux.",
    items: [
      { name: "Docker", level: "Advanced", color: "#2496ED", tooltip: "Containerização de aplicações." },
      { name: "Linux (Zorin)", level: "Expert", color: "#FCC624", tooltip: "Ambiente de desenvolvimento principal." },
      { name: "Git", level: "Advanced", color: "#F05032", tooltip: "Controle de versão essencial." },
      { name: "Coolify", level: "Intermediate", color: "#6B21A8", tooltip: "PaaS self-hosted simplificado." },
      { name: "Nginx", level: "Intermediate", color: "#009639", tooltip: "Servidor web e proxy reverso." },
      { name: "Excel/VBA", level: "Expert", color: "#217346", tooltip: "Automação de planilhas complexas." }
    ]
  }
];
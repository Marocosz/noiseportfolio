// src/data/tech.js
import { Cpu, Globe, Server, Terminal, Database, Layout } from 'lucide-react';

export const techData = [
  {
    id: "ai",
    title: "AI & Data Science",
    icon: Cpu,
    description: "Core da minha especialização acadêmica e profissional.",
    items: [
      { name: "Python", level: "Expert", color: "#3776AB" },
      { name: "OpenAI API", level: "Advanced", color: "#10A37F" },
      { name: "LangChain", level: "Advanced", color: "#F0C814" },
      { name: "Pandas", level: "Advanced", color: "#150458" },
      { name: "Scikit-learn", level: "Intermediate", color: "#F7931E" },
      { name: "TensorFlow", level: "Basic", color: "#FF6F00" }
    ]
  },
  {
    id: "backend",
    title: "Backend Engineering",
    icon: Server,
    description: "Arquiteturas escaláveis e APIs de alta performance.",
    items: [
      { name: "FastAPI", level: "Expert", color: "#009688" },
      { name: "Node.js", level: "Advanced", color: "#339933" },
      { name: "PostgreSQL", level: "Advanced", color: "#336791" },
      { name: "MongoDB", level: "Intermediate", color: "#47A248" },
      { name: "Redis", level: "Intermediate", color: "#DC382D" },
      { name: "MQTT", level: "Advanced", color: "#660066" }
    ]
  },
  {
    id: "frontend",
    title: "Frontend & UI",
    icon: Layout,
    description: "Interfaces reativas e dashboards complexos.",
    items: [
      { name: "Vue.js", level: "Advanced", color: "#4FC08D" },
      { name: "Nuxt", level: "Advanced", color: "#00C58E" },
      { name: "React", level: "Intermediate", color: "#61DAFB" },
      { name: "Tailwind CSS", level: "Expert", color: "#06B6D4" },
      { name: "Framer Motion", level: "Intermediate", color: "#0055FF" }
    ]
  },
  {
    id: "devops",
    title: "DevOps & Tools",
    icon: Terminal,
    description: "Infraestrutura, automação e ambiente Linux.",
    items: [
      { name: "Docker", level: "Advanced", color: "#2496ED" },
      { name: "Linux (Zorin)", level: "Expert", color: "#FCC624" },
      { name: "Git", level: "Advanced", color: "#F05032" },
      { name: "Coolify", level: "Intermediate", color: "#6B21A8" },
      { name: "Nginx", level: "Intermediate", color: "#009639" },
      { name: "Excel/VBA", level: "Expert", color: "#217346" }
    ]
  }
];
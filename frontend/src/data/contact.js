// src/data/contact.js
import { Mail, Linkedin, Github, MessageSquare } from 'lucide-react';

export const contactData = [
  {
    id: "email",
    label: "EMAIL",
    value: "marcosrodriguesepro@gmail.com",
    link: "mailto:marcosrodriguesepro@gmail.com",
    icon: Mail,
    color: "#ea4335" // Cor do Gmail (referência sutil)
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    value: "/in/marcosrodriguesptc",
    link: "https://linkedin.com/in/marcosrodriguesptc", // Coloque seu link real aqui
    icon: Linkedin,
    color: "#0a66c2" // Azul LinkedIn
  },
  {
    id: "github",
    label: "GITHUB",
    value: "/marocosz",
    link: "https://github.com/marocosz",
    icon: Github,
    color: "#fff" // Branco GitHub
  },
  {
    id: "discord",
    label: "DISCORD",
    value: "@marocos", // Discord username atualizado
    link: "https://discord.com/users/marocos", // Link se tiver ID, senão apenas visual
    icon: MessageSquare,
    color: "#5865F2" // Roxo Discord
  }
];
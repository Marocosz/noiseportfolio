// src/components/ui/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Home, User, FolderGit2, Map, Cpu, MessageSquare, 
  Wifi, Volume2, BatteryMedium 
} from 'lucide-react';
import './Navbar.css';

const navItems = [
  { id: 'hero', icon: Home, label: 'Home' },
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'projects', icon: FolderGit2, label: 'Projects' },
  { id: 'journey', icon: Map, label: 'Journey' },
  { id: 'tech', icon: Cpu, label: 'Stack' },
  { id: 'contact', icon: MessageSquare, label: 'Contact' },
];

const Navbar = () => {
  const [activeId, setActiveId] = useState('hero');
  const [time, setTime] = useState(new Date());
  
  // Ref para guardar quais seções estão visíveis e quanto delas aparece
  const visibleSections = useRef({});

  // Atualiza relógio
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // Scroll manual ao clicar
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Ajuste o block: 'start' para garantir que o topo da seção vá para o topo da tela
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // --- NOVA LÓGICA DE DETECÇÃO (QUEM OCUPA MAIS TELA?) ---
  useEffect(() => {
    const observerOptions = {
      root: null,
      // Margem negativa ajuda a focar no centro-topo, ignorando rodapés e cabeçalhos distantes
      rootMargin: '-10% 0px -40% 0px', 
      threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] // Vários pontos de verificação
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        // Guarda o "IntersectionRatio" (quanto do elemento aparece: 0 a 1)
        visibleSections.current[entry.target.id] = entry.intersectionRatio;
      });

      // Descobre qual ID tem o maior ratio (está mais visível na tela)
      const visibleIds = Object.keys(visibleSections.current);
      let maxRatio = 0;
      let mostVisibleId = activeId;

      visibleIds.forEach((id) => {
        const ratio = visibleSections.current[id];
        if (ratio > maxRatio) {
          maxRatio = ratio;
          mostVisibleId = id;
        }
      });

      // Só atualiza se tivermos um vencedor claro ou se o atual sumiu
      if (maxRatio > 0) {
        setActiveId(mostVisibleId);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [activeId]); // Dependência ajuda a manter consistência

  return (
    <motion.div 
      className="taskbar-container"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      
      {/* 1. Centro: Ícones de Navegação */}
      <div className="taskbar-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;

          return (
            <div key={item.id} className="taskbar-icon-wrapper">
              <div className="taskbar-tooltip">{item.label}</div>

              <button
                onClick={() => scrollToSection(item.id)}
                className={`taskbar-btn ${isActive ? 'active' : ''}`}
                aria-label={item.label}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                
                {isActive && (
                  <motion.div 
                    layoutId="taskbar-indicator"
                    className="app-indicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* 2. Direita: System Tray */}
      <div className="taskbar-right">
        <div className="tray-icons">
          <div className="tray-icon-hover"><Wifi size={16} /></div>
          <div className="tray-icon-hover"><Volume2 size={16} /></div>
          <div className="tray-icon-hover"><BatteryMedium size={16} /></div>
        </div>

        <div className="tray-clock">
          <div className="time">{formatTime(time)}</div>
          <div className="date">{formatDate(time)}</div>
        </div>

        <div className="show-desktop-line"></div>
      </div>

    </motion.div>
  );
};

export default Navbar;
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Github } from 'lucide-react';
import { projectsData } from '../../data/projects';
import './Projects.css';

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  // Configurações de Dimensão
  const CARD_WIDTH = 800; 
  const CARD_GAP = 64; 

  // Função para navegar
  const handleNav = (direction) => {
    if (direction === 'prev') {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : projectsData.length - 1));
    } else {
      setActiveIndex((prev) => (prev < projectsData.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <section className="projects-section">
      
      <div className="projects-header">
        <span className="section-label">03. / PORTFOLIO</span>
        <h2 className="section-title-large">Selected Work</h2>
        <p className="section-subtitle">
            Uma seleção de projetos demonstrando minhas habilidades em Full-Stack e IA.
            Clique nos cards para ver detalhes.
        </p>
      </div>

      <div className="carousel-viewport">
        
        <button className="nav-btn-floating prev" onClick={() => handleNav('prev')}>
          <ChevronLeft size={28} />
        </button>

        <motion.div 
          className="carousel-track"
          animate={{ x: `calc(-${activeIndex * (CARD_WIDTH + CARD_GAP)}px - ${CARD_WIDTH / 2}px)` }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          {projectsData.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <div 
                key={project.id} 
                className={`project-card ${isActive ? 'active' : 'inactive'}`}
                onClick={() => setActiveIndex(index)} 
              >
                
                {/* 1. Header */}
                <div className="card-header-glass">
                    <div className="header-top-row">
                        <span className="project-category">{project.category}</span>
                        <span className="project-year">2025</span>
                    </div>
                    <h3 className="project-title">{project.title}</h3>
                </div>

                {/* 2. Corpo Dividido (70% | 30%) */}
                {/* 2. Corpo Sólido */}
                <div className="card-body-split">
                    
                    {/* Conteúdo Principal: Proposta + Botão */}
                    <div className="card-col single-col">
                        <span className="body-label">IDEA</span>
                        <p className="project-description">{project.description}</p>
                        
                        {isActive && (
                            <a href={project.links.github} className="github-btn" target="_blank" rel="noopener noreferrer">
                                <Github size={18} />
                                View on GitHub
                            </a>
                        )}
                    </div>

                </div>

              </div>
            );
          })}
        </motion.div>

        <button className="nav-btn-floating next" onClick={() => handleNav('next')}>
          <ChevronRight size={28} />
        </button>

      </div>

    </section>
  );
};

export default Projects;
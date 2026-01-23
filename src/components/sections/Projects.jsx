import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { projectsData } from '../../data/projects';
import './Projects.css';

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Começa no segundo card (índice 1) para ter anterior/próximo

  // Configurações de Dimensão (Devem bater com o CSS)
  const CARD_WIDTH = 320; 
  const CARD_GAP = 64; // 4rem = 64px

  // Função para navegar
  const handleNav = (direction) => {
    if (direction === 'prev') {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : projectsData.length - 1));
    } else {
      setActiveIndex((prev) => (prev < projectsData.length - 1 ? prev + 1 : 0));
    }
  };

  // Cálculo da posição do track para manter o activeIndex no CENTRO da tela
  // Fórmula: Desloca metade da tela para direita, depois volta a quantidade de cards ativos
  const xOffset = - (activeIndex * (CARD_WIDTH + CARD_GAP)) + (CARD_WIDTH / 2); // Ajuste fino pode ser necessário dependendo do CSS exacto

  return (
    <section className="projects-section">
      
      <div className="projects-header">
        <span className="section-label">03. / PORTFOLIO</span>
        <h2 className="section-title-large">Selected Work</h2>
      </div>

      <div className="carousel-viewport">
        
        {/* Botão Anterior */}
        <button className="nav-btn-floating prev" onClick={() => handleNav('prev')}>
          <ChevronLeft size={28} />
        </button>

        {/* TRILHA DO CARROSSEL */}
        <motion.div 
          className="carousel-track"
          // O transform aqui faz a mágica de mover a lista
          // 'translateX(-50%)' é base do CSS para centralizar o container pai
          // 'translateX(${...}px)' é o movimento dinâmico
          animate={{ x: `calc(-50% - ${activeIndex * (CARD_WIDTH + CARD_GAP)}px + ${CARD_WIDTH / 2}px)` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {projectsData.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <div 
                key={project.id} 
                className={`project-card ${isActive ? 'active' : 'inactive'}`}
                onClick={() => setActiveIndex(index)} // Clicar no card lateral foca ele
              >
                
                {/* Imagem */}
                <div className="card-image-wrapper">
                  <img src={project.image} alt={project.title} className="card-image" />
                  <div className="card-overlay"></div>
                </div>

                {/* Conteúdo */}
                <div className="card-content">
                  <div>
                    <span className="project-category">{project.category}</span>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                  </div>

                  {/* Botão sutil que só aparece se ativo */}
                  {isActive && (
                    <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', gap: '10px' }}>
                        <a href={project.links.live} className="tag" style={{ color: '#fff', borderColor: '#a855f7', background: 'rgba(168,85,247,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                            View Case <ArrowUpRight size={14} />
                        </a>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </motion.div>

        {/* Botão Próximo */}
        <button className="nav-btn-floating next" onClick={() => handleNav('next')}>
          <ChevronRight size={28} />
        </button>

      </div>

    </section>
  );
};

export default Projects;
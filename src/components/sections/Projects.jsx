import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { projectsData } from '../../data/projects';
import './Projects.css';

const Projects = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth * 0.6; // Scroll one card width approx
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="projects-section">
      
      {/* Cabeçalho da Seção com Controles */}
      <div className="projects-header">
        <div>
          <span className="section-label">03. / WORK</span>
          <h2 className="section-title-large">
            Projetos <br /> Selecionados
          </h2>
        </div>

        {/* Botões de Navegação */}
        <div className="carousel-nav">
          <button onClick={() => scroll('left')} className="nav-btn">
            <ChevronLeft size={24} />
          </button>
          <button onClick={() => scroll('right')} className="nav-btn">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Container do Carrossel (Scroll Nativo + Snap) */}
      <div 
        className="carousel-container" 
        ref={scrollRef}
      >
        <div className="carousel-track">
          {projectsData.map((project) => (
            <motion.div 
              key={project.id} 
              className="project-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              
              {/* Imagem (Esquerda) */}
              <div className="card-image-wrapper">
                <img src={project.image} alt={project.title} className="card-image" />
                <div className="card-overlay"></div>
              </div>

              {/* Texto (Direita) */}
              <div className="card-content">
                <div className="content-top">
                  <div className="project-meta">
                    <span className="project-type">{project.category}</span>
                    <span className="project-year">2024</span>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>

                <div className="content-bottom">
                  <div className="card-tags">
                    {project.techs.map((tech, i) => (
                      <span key={i} className="tag">{tech}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    <a href={project.links.github} className="link-btn outline">Code</a>
                    <a href={project.links.live} className="link-btn fill">
                      Live Project
                    </a>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
          {/* Espaçador final para garantir que o último card não cole na borda */}
          <div className="spacer" style={{ minWidth: '5vw' }}></div>
        </div>
      </div>

    </section>
  );
};

export default Projects;
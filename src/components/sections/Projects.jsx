import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { projectsData } from '../../data/projects';
import './Projects.css';

const Projects = () => {
  const carouselRef = useRef();
  const [width, setWidth] = useState(0);

  // Calcula o limite do drag para não arrastar para o infinito
  useEffect(() => {
    if (carouselRef.current) {
      // Largura total do conteúdo - Largura da tela visível
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <section className="projects-section">
      
      {/* Cabeçalho da Seção */}
      <div className="projects-header">
        <span className="section-label">03. / WORK</span>
        <h2 className="section-title-large">
          Projetos <br /> Selecionados
        </h2>
      </div>

      {/* Container do Carrossel */}
      <motion.div ref={carouselRef} className="carousel-container">
        <motion.div 
          className="carousel-track"
          drag="x" 
          dragConstraints={{ right: 0, left: -width }} // Limita o movimento
          whileTap={{ cursor: "grabbing" }}
        >
          
          {projectsData.map((project) => (
            <motion.div 
              key={project.id} 
              className="project-card"
              whileHover={{ y: -10 }} // Card sobe levemente no hover
              transition={{ duration: 0.3 }}
            >
              
              {/* Imagem + Overlay */}
              <div className="card-image-wrapper">
                <img src={project.image} alt={project.title} className="card-image" />
                
                {/* Botões que aparecem no Hover da imagem */}
                <div className="card-links-overlay">
                  <a href={project.links.github} className="project-btn outline">Code</a>
                  <a href={project.links.live} className="project-btn">Live Demo</a>
                </div>
              </div>

              {/* Texto */}
              <div className="card-content">
                <div>
                  <span className="project-category">{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>

                <div className="card-tags">
                  {project.techs.map((tech, index) => (
                    <span key={index} className="tag">{tech}</span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}

        </motion.div>
      </motion.div>

    </section>
  );
};

export default Projects;
import React, { useRef, useEffect, useState } from 'react';
import './GlitchImage.css';

// 1. Aceitar 'srcBw' e 'srcColor'
const GlitchImage = ({ srcBw, srcColor, alt, className = '', glitchChance = 0.8 }) => {
  const imgRef = useRef(null);
  const glitchContainerRef = useRef(null);
  const [isGlitching, setIsGlitching] = useState(false);
  const glitchTimeoutRef = useRef(null);

  useEffect(() => {
    if (glitchContainerRef.current) {
      // 2. Usar a IMAGEM COLORIDA para os artefatos (vermelho/azul)
      glitchContainerRef.current.style.setProperty('--glitch-image-src', `url(${srcColor})`);
    }
  }, [srcColor]); // Depender da imagem colorida

  useEffect(() => {
    const startGlitch = () => {
      setIsGlitching(true);
      glitchTimeoutRef.current = setTimeout(() => {
        setIsGlitching(false);
      }, 250); 
    };

    const checkGlitch = () => {
      if (Math.random() < glitchChance) {
        startGlitch();
      }
    };

    const glitchInterval = setInterval(checkGlitch, 500); 

    return () => {
      clearInterval(glitchInterval);
      if (glitchTimeoutRef.current) {
        clearTimeout(glitchTimeoutRef.current);
      }
    };
  }, [glitchChance]);

  return (
    <div ref={glitchContainerRef} className={`glitch-image-container ${className}`}>
      
      {/* 3. IMAGEM BASE (PRETA E BRANCA) */}
      <img
        ref={imgRef}
        src={srcBw}
        alt={alt}
      />
      
      {/* 4. QUANDO 'isGlitching' FOR TRUE, MOSTRAR TUDO ISSO: */}
      {isGlitching && (
        <>
          {/* A. A IMAGEM COLORIDA PISCANDO */}
          <img
            src={srcColor}
            alt=""
            className="glitch-color-flash"
            aria-hidden="true"
          />

          {/* B. OS ARTEFATOS (BASEADOS NA IMAGEM COLORIDA) */}
          <div className="glitch-effect glitch-red" aria-hidden="true"></div>
          <div className="glitch-effect glitch-blue" aria-hidden="true"></div>
        </>
      )}
    </div>
  );
};

export default GlitchImage;
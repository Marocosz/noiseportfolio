import React, { useRef, useEffect, useState } from 'react';
import './GlitchImage.css';

const GlitchImage = ({ src, alt, className = '', glitchChance = 0.8 }) => { // 1. Aumentar a chance padrão do glitch (80%)
  const imgRef = useRef(null);
  const glitchContainerRef = useRef(null);
  const [isGlitching, setIsGlitching] = useState(false);
  const glitchTimeoutRef = useRef(null);

  useEffect(() => {
    if (glitchContainerRef.current) {
      glitchContainerRef.current.style.setProperty('--glitch-image-src', `url(${src})`);
    }
  }, [src]);

  useEffect(() => {
    const startGlitch = () => {
      setIsGlitching(true);
      glitchTimeoutRef.current = setTimeout(() => {
        setIsGlitching(false);
      }, 250); // 2. Aumentar a duração do glitch para 250ms (mais perceptível)
    };

    const checkGlitch = () => {
      if (Math.random() < glitchChance) {
        startGlitch();
      }
    };

    // 3. Diminuir o intervalo para verificar glitches (a cada 500ms)
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
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={isGlitching ? 'glitch-active' : ''}
      />
      {isGlitching && (
        <>
          <div className="glitch-effect glitch-red" aria-hidden="true"></div>
          <div className="glitch-effect glitch-blue" aria-hidden="true"></div>
        </>
      )}
    </div>
  );
};

export default GlitchImage;
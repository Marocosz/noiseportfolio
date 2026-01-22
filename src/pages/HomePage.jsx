import React from 'react';
import Hero from '../components/sections/Hero'; // Confirme o caminho
import Profile from '../components/sections/Profile'; // Importe o NOVO Profile
import Silk from '../components/backgrounds/Silk';

const HomePage = () => {
  return (
    <main style={{ position: 'relative', width: '100%' }}>
      
      {/* 1. BACKGROUND FIXO (Silk)
          Fica preso no fundo (z-index: 0). */}
      <div style={{
        position: 'fixed',
        top: 0, 
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        <Silk 
          color="#661ea8" 
          speed={10} 
          scale={1}
          rotation={3}
          noiseIntensity={6.15} 
        />
      </div>

      {/* 2. HERO SECTION (Cobre o Silk)
          Fundo PRETO SÓLIDO e z-index alto. */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        backgroundColor: '#000000' // Importante ser sólido!
      }}>
        <Hero />
      </div>

      {/* 3. PERFIL & OUTRAS SEÇÕES (Mostram o Silk)
          Fundo TRANSPARENTE e rolam por cima do fundo fixo. */}
      <div style={{ 
        position: 'relative', 
        zIndex: 5,
        // Sem backgroundColor aqui, ou 'transparent'
      }}>
        <Profile />
        
        {/* Futuramente: <Projects /> */}
        {/* Futuramente: <Journey /> */}
      </div>

    </main>
  );
};

export default HomePage;
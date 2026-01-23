import React from 'react';
import Hero from '../components/sections/Hero'; 
import Profile from '../components/sections/Profile'; 
import Silk from '../components/backgrounds/Silk';
import Projects from '../components/sections/Projects';
import Journey from '../components/sections/Journey';
import TechStack from '../components/sections/TechStack';
import Contact from '../components/sections/Contact';
import Navbar from '../components/ui/Navbar';

const HomePage = () => {
  return (
    <main style={{ position: 'relative', width: '100%' }}>
      
      {/* 1. BACKGROUND FIXO BLINDADO */}
      <div style={{
        position: 'fixed',
        top: 0, 
        left: 0,
        width: '100dvw', 
        height: '100dvh', 
        zIndex: 0,
        pointerEvents: 'none',
        transform: 'translateZ(0)' 
      }}>
        <Silk 
          color="#661ea8" 
          speed={10} 
          scale={1} 
          rotation={3} 
          noiseIntensity={6.15} 
        />
      </div>

      {/* 2. HERO SECTION */}
      <div id="hero" style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
      </div>

      {/* 3. CONTEÚDO PRINCIPAL */}
      <div style={{ position: 'relative', zIndex: 5 }}>
        
        <div id="profile">
          <Profile />
        </div>
        
        <div id="projects">
          <Projects />
        </div>
        
        {/* --- SPACER DE SEGURANÇA --- 
            Evita que a Journey comece antes da hora por causa do sticky
        */}
        <div style={{ height: '150px', width: '100%' }}></div>

        <div id="journey">
          <Journey />
        </div>
        
        <div id="tech">
          <TechStack />
        </div>
        
        <div id="contact">
          <Contact />
        </div>
        
        {/* --- FOOTER --- */}
        <div style={{ 
          height: '150px', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#444',
          fontSize: '0.8rem',
          marginTop: '4rem',
          paddingBottom: '2rem'
        }}>
          <p>© 2026 Marcos Rodrigues. Built with React & Framer Motion.</p>
        </div>

      </div>
      
      {/* 4. BARRA DE NAVEGAÇÃO FLUTUANTE */}
      <Navbar />

    </main>
  );
};

export default HomePage;
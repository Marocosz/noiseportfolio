import React from 'react'; // 1. Removemos useRef e useEffect
import Squares from '../backgrounds/Squares';
import profileImage from '../../assets/profile.png'; 
import BlurText from '../effects/BlurText';
import DecryptedText from '../effects/DecryptedText';
import GlitchImage from '../effects/GlitchImage';

const AboutSection = () => {
  // 2. Removemos o 'imageContainerRef' e o 'useEffect' daqui

  return (
    <section className="about-section">
      
      {/* --- O BACKGROUND FICA AQUI --- */}
      <div className="about-background">
        <Squares
          direction='diagonal'
          speed={0.3}
          borderColor='#222'
          squareSize={40}
          hoverFillColor='#060630'
        />
      </div>
      
      {/* --- O CONTEÚDO (TEXTO) FICA AQUI --- */}
      <div className="about-content">
        
        <BlurText
          text="Sobre Mim"
          className="section-title"
          animateBy="words"
          delay={150}
        />
        
        <div className="about-main">
          
          {/* 3. Removemos a 'ref' deste div */}
          <div className="about-image">
            <GlitchImage
              src={profileImage}
              alt="Marcos Rodrigues - Desenvolvedor Full-Stack"
              glitchChance={0.5} // 4. Chance aumentada para 50%
            />
          </div>

          <div className="about-text">
            
            <p>
              <DecryptedText
                text="Sou um Desenvolvedor Full-Stack com foco em Inteligência Artificial e Automação. Como graduando em Gestão da Informação pela UFU, minha especialidade é transformar processos de negócio e dados brutos em soluções inteligentes. Tenho experiência profissional em desenvolvimento e inovação , construindo aplicações de ponta-a-ponta: desde APIs de alta performance em Python (usando FastAPI e Flask ) e orquestração de LLMs com LangChain , até o desenvolvimento de frontends em React e Nuxt. Minha proficiência inclui arquiteturas com Docker , implementação de pipelines RAG e bancos de dados SQL/NoSQL."
                animateOn="view"
                speed={50}
                maxIterations={20}
                sequential={false}
                revealDirection="start"
                useOriginalCharsOnly={true}
              />
            </p>
            
            <p>
              <DecryptedText
                text="Essa paixão por empoderar pessoas com tecnologia é o que me move profissionalmente. Em meus projetos, busco aplicar os mesmos princípios: seja desenvolvendo soluções de IA que traduzem dados complexos em respostas claras , ou criando aplicações full-stack que automatizam tarefas e otimizam a tomada de decisão. Minha formação e experiência em desenvolvimento de inovação se unem no objetivo de criar ferramentas que sejam não apenas inteligentes, mas genuinamente úteis."
                animateOn="view"
                speed={50}
                maxIterations={20}
                sequential={false}
                revealDirection="start"
                useOriginalCharsOnly={true}
              />
            </p>
          </div>
        </div>

      </div>

    </section>
  );
};

export default AboutSection;
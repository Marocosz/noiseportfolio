import React from 'react';
import DarkVeil from '../backgrounds/DarkVeil';
import DecryptedText from '../effects/DecryptedText'; // 1. IMPORTAR

const Hero = () => {
    return (
        // O container principal da Hero Section
        <section className="hero-section">

            {/* O background animado fica aqui */}
            <div className="hero-background">
                <DarkVeil
                    // --- Agora você pode alterar todas as props aqui ---

                    speed={3}             // Velocidade da animação
                    warpAmount={3.5}        // Nível de distorção (warp)
                    noiseIntensity={0}     // Intensidade do ruído (0.0 a 1.0)
                    scanlineIntensity={1}   // Intensidade das "scanlines" (0.0 a 1.0)
                    scanlineFrequency={5}   // Frequência (tamanho) das scanlines
                    hueShift={0}            // Mudança de cor (0.0 a 360.0)
                    resolutionScale={1}       // Escala da resolução (deixe 1 para performance)
                />
            </div>

            {/* O conteúdo (texto) fica aqui, por cima */}
            <div className="hero-content">
                <h1>
                    Marcos<br />Rodrigues
                </h1>

                {/* 2. SUBSTITUIR O <p> PELO DecryptedText */}
                <DecryptedText
                    // Usamos 'parentClassName' para aplicar o estilo do CSS
                    parentClassName="hero-subtitle"
                    text="Desenvolvedor - IA, Automação & FullStack"
                    animateOn="view" // Anima assim que a página carregar
                    sequential={true}  // Letra por letra
                    speed={40}         // Velocidade (pode ajustar)
                    useOriginalCharsOnly={true}
                />
            </div>

        </section>
    );
};

export default Hero;
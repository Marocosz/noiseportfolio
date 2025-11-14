import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';
// 1. IMPORT 'SQUARES' REMOVIDO

export default function JourneySection() {
    return (
        <section className="journey-section">

            {/* 2. O 'div.journey-background' FOI REMOVIDO DAQUI */}

            <div className="journey-container">
                {/* Lado Esquerdo (Texto) */}
                <div className="journey-content-left">
                    <h1 className="journey-title">
                        Minha Jornada
                    </h1>
                    <p className="journey-description">
                        Uma linha do tempo interativa da minha evolução como profissional,
                        desde a universidade até minhas especializações em IA e Automação.
                    </p>
                </div>

                {/* Lado Direito (Cena 3D) */}
                <div className="journey-content-right">
                    <Suspense fallback={<div className="spline-loading">Carregando 3D...</div>}>
                        <Spline
                            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                            className="spline-canvas"
                        />
                    </Suspense>
                </div>
            </div>
        </section>
    );
}
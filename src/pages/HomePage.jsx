import React from 'react';
import Hero from '../components/layout/Hero';
import AboutSection from '../components/layout/AboutSection';
import JourneySection from '../components/layout/JourneySection'; // 1. IMPORT RENOMEADO

const HomePage = () => {
  return (
    <main>
      <Hero />
      <AboutSection />
      <JourneySection /> {/* 2. TAG RENOMEADA */}
    </main>
  );
};

export default HomePage;
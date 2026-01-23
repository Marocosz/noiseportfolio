import React from "react";
import { motion } from "motion/react";
import DecryptedText from "../effects/DecryptedText";
import { profileData } from "../../data/content";
import "./Profile.css";
import CrystalScene from './CrystalScene';

const Profile = () => {
  // Duplicamos a lista de skills para garantir que o scroll infinito não tenha buracos
  const scrollingSkills = [
    ...profileData.skills_highlight,
    ...profileData.skills_highlight,
    ...profileData.skills_highlight,
  ];

  return (
    <section className="profile-section">
      {/* --- FAIXA DE VIDRO --- */}
      <div className="glass-strip">
        <div className="glass-content">
          {/* LADO ESQUERDO: TEXTO */}
          <motion.div
            className="profile-text-area"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="terminal-header">
              <span className="section-label">02. / WHOAMI</span>
            </div>

            <div className="bio-highlight">
              <DecryptedText
                text={profileData.bio_highlight}
                speed={40}
                animateOn="view"
                revealDirection="start"
                useOriginalCharsOnly={true}
              />
            </div>

            <p className="bio-body">{profileData.bio_full}</p>
          </motion.div>

          {/* LADO DIREITO: CRYSTAL SCENE */}
          <motion.div
            className="profile-img-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <CrystalScene />
          </motion.div>
        </div>
      </div>

      {/* --- FAIXA INFERIOR: INFINITE SCROLL --- */}
      <div className="infinite-scroll-wrapper">
        <div className="infinite-track">
          {scrollingSkills.map((skill, index) => (
            <span key={index} className="scroll-item">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Stats Section moved from Journey */}
      <div className="profile-stats-container">
          <StatsCard 
              number="8+" 
              label="Freelance Services" 
              sublabel="Delivered with Excellence"
          />
          <StatsCard 
              number="3+" 
              label="Years Experience" 
              sublabel="Continuous Learning"
          />
          <StatsCard 
              number="12+" 
              label="Total Projects" 
              sublabel="Innovative Solutions"
          />
      </div>

    </section>
  );
};

const StatsCard = ({ number, label, sublabel }) => (
  <motion.div 
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
  >
      <div className="stat-card-inner">
          <h3 className="stat-number">{number}</h3>
          <p className="stat-label">{label}</p>
          <span className="stat-sublabel">{sublabel}</span>
      </div>
  </motion.div>
);

export default Profile;

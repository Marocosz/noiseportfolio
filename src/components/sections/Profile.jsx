import React from 'react';
import { motion } from 'motion/react';
import DecryptedText from '../effects/DecryptedText';
import { profileData } from '../../data/content';
import './Profile.css'; // <--- IMPORTANTE: Importando o CSS aqui

// Importe sua foto
import profileImg from '../../assets/profile.png'; 

const Profile = () => {
  return (
    <section className="profile-section">
      <div className="profile-container">
        
        {/* --- COLUNA ESQUERDA: TEXTO --- */}
        <motion.div 
          className="profile-content"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="profile-title">
            <span className="terminal-prompt">$</span> {profileData.title}
          </h2>

          <h3 className="profile-role">{profileData.role}</h3>

          <div className="profile-bio">
            <p className="bio-highlight">
              <DecryptedText 
                text={profileData.bio_highlight}
                speed={40}
                animateOn="view"
                revealDirection="start"
                useOriginalCharsOnly={true}
              />
            </p>
            
            <p className="bio-body">
              {profileData.bio_full}
            </p>
          </div>

          <div className="profile-tags">
            {profileData.skills_highlight.map((skill, index) => (
              <span key={index} className="tech-tag">{skill}</span>
            ))}
          </div>
        </motion.div>

        {/* --- COLUNA DIREITA: FOTO ZEN --- */}
        <motion.div 
          className="profile-image-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <img 
            src={profileImg} 
            alt="Marcos Rodrigues Profile" 
            className="zen-profile-img"
          />
          <div className="profile-glow"></div>
        </motion.div>

      </div>
    </section>
  );
};

export default Profile;
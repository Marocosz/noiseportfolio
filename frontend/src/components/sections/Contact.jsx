import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Loader2, Server } from 'lucide-react';
import { contactData } from '../../data/contact';
import './Contact.css';

const Contact = () => {
  const [isTypingDone, setIsTypingDone] = useState(false);

  // Variantes para animação de digitação
  const typingContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Velocidade da digitação
        delayChildren: 0.5
      }
    }
  };

  const letterVar = {
    hidden: { opacity: 0, display: 'none' },
    visible: { opacity: 1, display: 'inline' }
  };

  const commandText = "./get-contacts --all";

  return (
    <section className="contact-section">
      
      {/* Header Visual */}
      <div className="contact-header-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">06. / CONNECT</span>
          <h2 className="section-title-large">Let's Talk</h2>
          <p className="contact-desc">
            Below are the best channels to find me. 
            Run the command or click the links.
          </p>
        </motion.div>
      </div>

      {/* HOSTING SERVICE CARD */}
      <motion.div 
        className="hosting-service-card"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="hosting-card-header">
          <Server size={20} className="hosting-icon" />
          <span className="hosting-badge">HOSTING SERVICE</span>
        </div>
        <h3 className="hosting-title">Professional VPS Hosting Available</h3>
        <p className="hosting-description">
          I offer complete end-to-end web hosting solutions through my own VPS infrastructure. 
          From deployment to monitoring, database management to SSL certificates, I handle everything. 
          Perfect for small to medium projects that need reliable, custom hosting with direct support from the developer.
        </p>
        <div className="hosting-features">
          <span className="feature-tag">✓ Custom Configuration</span>
          <span className="feature-tag">✓ 24/7 Monitoring</span>
          <span className="feature-tag">✓ Direct Support</span>
          <span className="feature-tag">✓ SSL & Security</span>
        </div>
      </motion.div>

      {/* TERMINAL WINDOW */}
      <motion.div 
        className="terminal-window"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        
        {/* Barra Superior */}
        <div className="terminal-header-bar">
          <div className="dot red" />
          <div className="dot yellow" />
          <div className="dot green" />
          <span className="terminal-title">visitante@portfolio: ~</span>
        </div>

        {/* Corpo do Terminal */}
        <div className="terminal-body">
          
          {/* 1. System Intro (Static) */}
          <div className="terminal-intro">
            <p>NoisePortfolio OS [Version 3.0.1]</p>
            <p>(c) 2026 Marcos Rodrigues. All rights reserved.</p>
            <p className="dim">System check: OK. Loading shell...</p>
            <br />
          </div>

          {/* 2. Prompt & Command (Typing Animation) */}
          <div className="cmd-line">
            <span className="prompt-user">visitor@portfolio:~$</span>
            
            <motion.span
              variants={typingContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="cmd-text"
              onAnimationComplete={() => setIsTypingDone(true)}
            >
              {commandText.split("").map((char, index) => (
                <motion.span key={index} variants={letterVar}>{char}</motion.span>
              ))}
            </motion.span>
          </div>

          {/* 3. Execution Logs & Result (Conditional) */}
          {isTypingDone && (
            <motion.div
              className="execution-flow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Fake System Logs */}
              <div className="system-logs">
                <LogLine text="Initializing handshake protocol..." status="OK" color="#27c93f" delay={0.2} />
                <LogLine text="Verifying ssl certificates..." status="VERIFIED" color="#ffbd2e" delay={0.4} />
                <LogLine text="Decrypting contact data..." status="DONE" color="#a855f7" delay={0.6} />
                <br />
              </div>

              {/* Result Table */}
              <div className="contact-list">
                <div className="table-header">
                  <span>TYPE</span>
                  <span>DESTINATION</span>
                  <span>STATUS</span>
                </div>
                
                {contactData.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div 
                      key={item.id}
                      className="terminal-row"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + (index * 0.1) }}
                    >
                      <span className="col-type">
                        <Icon size={14} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                        {item.label}
                      </span>
                      
                      <div className="col-dest">
                        <a 
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cli-link"
                        >
                          {item.value}
                        </a>
                      </div>

                      <span className="col-status">200 OK</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* 4. New Empty Prompt (Ready State) */}
              <div className="cmd-line new-prompt">
                <br />
                <span className="prompt-user">visitor@portfolio:~$</span>
                <span className="cursor" />
              </div>

            </motion.div>
          )}
        </div>
      </motion.div>

    </section>
  );
};

const LogLine = ({ text, status, color, delay }) => (
  <motion.div 
    className="log-line"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay }}
  >
    <span className="log-text">{text}</span>
    <span className="log-dots">................</span>
    <span className="log-status" style={{ color: color }}>[{status}]</span>
  </motion.div>
);

export default Contact;
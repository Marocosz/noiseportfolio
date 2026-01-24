import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Server } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getContactData } from '../../data/contact';
import './Contact.css';

const Contact = () => {
  const { language } = useLanguage();
  const content = getContactData(language);
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
          <span className="section-label">{content.sectionLabel}</span>
          <h2 className="section-title-large">{content.title}</h2>
          <p className="contact-desc">
            {content.description}
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
          <span className="hosting-badge">{content.hosting.badge}</span>
        </div>
        <h3 className="hosting-title">{content.hosting.title}</h3>
        <p className="hosting-description">
          {content.hosting.description}
        </p>
        <div className="hosting-features">
          {content.hosting.features.map((feature, idx) => (
             <span key={idx} className="feature-tag">{feature}</span>
          ))}
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
          <span className="terminal-title">{content.terminal.title}</span>
        </div>

        {/* Corpo do Terminal */}
        <div className="terminal-body">
          
          {/* 1. System Intro (Static) */}
          <div className="terminal-intro">
            <p>{content.terminal.version}</p>
            <p>{content.terminal.copyright}</p>
            <p className="dim">{content.terminal.systemCheck}</p>
            <br />
          </div>

          {/* 2. Prompt & Command (Typing Animation) */}
          <div className="cmd-line">
            <span className="prompt-user">{content.terminal.prompt}</span>
            
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
                {content.terminal.logs.map((log, i) => (
                  <LogLine 
                      key={i} 
                      text={log.text} 
                      status={log.status} 
                      color={log.color} 
                      delay={0.2 * (i + 1)} 
                  />
                ))}
                <br />
              </div>

              {/* Result Table */}
              <div className="contact-list">
                <div className="table-header">
                  {content.terminal.tableHeaders.map((h, i) => (
                    <span key={i}>{h}</span>
                  ))}
                </div>
                
                {content.items.map((item, index) => {
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
                <span className="prompt-user">{content.terminal.prompt}</span>
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
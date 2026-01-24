import React, { useRef, useEffect } from 'react';
import { Search, Power, Settings, Bot } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getStartMenuData } from '../../data/startMenu';
import './StartMenu.css';

const StartMenu = ({ isOpen, onClose, isDarkMode }) => {
  const { language } = useLanguage();
  const content = getStartMenuData(language);
  const menuRef = useRef(null);

  // Disable scroll when open (Robust Strategy: Fixed Body + Lenis Stop)
  useEffect(() => {
    if (isOpen) {
      // Capture current scroll position
      const scrollY = window.scrollY;

      // 1. Stop Lenis
      if (window.lenis && typeof window.lenis.stop === 'function') {
         window.lenis.stop();
      }

      // 2. Lock Body (Native)
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'hidden'; 

      // CLEANUP runs when isOpen changes (e.g. to false) is unmounted
      return () => {
        // 1. Unlock Body
        const scrollYStored = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflowY = '';

        // 2. Restore Scroll Position
        if (scrollYStored) {
            window.scrollTo(0, parseInt(scrollYStored || '0') * -1);
        }

        // 3. Start Lenis
        if (window.lenis && typeof window.lenis.start === 'function') {
           window.lenis.start();
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop global para desfocar o fundo */}
      <div 
        className="start-menu-backdrop" 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 999, /* Abaixo do Navbar (1000) e do Menu (1002) */
          background: 'transparent', /* O blur pode vir daqui ou só CSS class no body */
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
        onClick={onClose} // Clicar no fundo fecha o menu
      />

      <div className={`start-menu-container ${!isDarkMode ? 'theme-light' : ''}`} ref={menuRef}>
        
        {/* Topo: Barra de Pesquisa */}
        <div className="start-menu-header">
          <div className="start-search-bar">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder={content.searchCheck}
              className="search-input"
            />
          </div>
        </div>

        {/* Meio: Em construção */}
        <div className="start-menu-content">
          <Bot size={48} className="construct-icon" />
          <div className="construct-text">{content.title}</div>
          <div className="construct-subtext">
            {content.description}
          </div>
        </div>

        {/* Rodapé: Usuário e Power */}
        <div className="start-menu-footer">
          <div className="user-profile">
            <div className="user-avatar">V</div>
            <span className="user-name">{content.visitor}</span>
          </div>

          <div className="footer-actions">
            <div className="footer-icon-btn">
              <Settings size={18} />
            </div>
            <div className="footer-icon-btn">
              <Power size={18} />
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default StartMenu;

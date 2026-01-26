import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Initialize state from localStorage or default to 'en'
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'en';
  });

  const updateLanguage = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'pt' : 'en';
    updateLanguage(newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

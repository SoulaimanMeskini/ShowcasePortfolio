import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../text/text';

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: translations.en,
});

const STORAGE_KEY = 'portfolio-language';

const detectBrowserLanguage = () => {
  if (typeof navigator === 'undefined') return 'en';
  const lang = navigator.language?.toLowerCase() || navigator.languages?.[0]?.toLowerCase();
  if (lang?.startsWith('nl')) return 'nl';
  return 'en';
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (saved === 'en' || saved === 'nl') {
      setLanguage(saved);
    } else {
      setLanguage(detectBrowserLanguage());
    }
  }, []);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, language);
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language] || translations.en,
      toggleLanguage: () => setLanguage((prev) => (prev === 'en' ? 'nl' : 'en')),
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { AppLanguage } from '../types';
import { TRANSLATIONS, toBengaliNumerals, formatCurrency } from '../data/translations';

interface LanguageContextType {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  toggleLanguage: () => void;
  isBangla: boolean;
  t: (key: string, fallback?: string) => string;
  formatPrice: (amount: number, currencySymbol?: string) => string;
  toBnDigits: (num: number | string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default to 'bn' (Bangla) for Bangladeshi audience, stored in localStorage
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    try {
      const saved = localStorage.getItem('tkr_language') as AppLanguage;
      if (saved === 'bn' || saved === 'en') return saved;
      return 'bn'; // Default to Bangla since it's a Bangladeshi website!
    } catch {
      return 'bn';
    }
  });

  const setLanguage = useCallback((lang: AppLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('tkr_language', lang);
      document.documentElement.lang = lang;
    } catch {}
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'bn' ? 'en' : 'bn'));
  }, [setLanguage]);

  useEffect(() => {
    try {
      document.documentElement.lang = language;
    } catch {}
  }, [language]);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const langDict = TRANSLATIONS[language] as Record<string, string>;
      if (langDict && langDict[key]) {
        return langDict[key];
      }
      // Fallback to English dict or provided fallback
      const enDict = TRANSLATIONS.en as Record<string, string>;
      return enDict[key] || fallback || key;
    },
    [language]
  );

  const formatPrice = useCallback(
    (amount: number, currencySymbol = '৳'): string => {
      return formatCurrency(amount, language, currencySymbol);
    },
    [language]
  );

  const toBnDigits = useCallback(
    (num: number | string): string => {
      return language === 'bn' ? toBengaliNumerals(num) : String(num);
    },
    [language]
  );

  const isBangla = language === 'bn';

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isBangla,
        t,
        formatPrice,
        toBnDigits
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

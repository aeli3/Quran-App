import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

// In your LanguageContext file, add this custom hook:
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
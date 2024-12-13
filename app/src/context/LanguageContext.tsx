import React, { useState } from "react";

interface LanguageContextType {
    language: {
      value: string;
    }
    setLanguage: React.Dispatch<React.SetStateAction<{
      value: string;
    }>>
  }

export const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState({
    value: 'en'
  });

  return (
    <LanguageContext.Provider value={{  language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )

}

import React, { createContext, useContext, useState, useEffect } from 'react';

interface GothicModeContextType {
  isGothicMode: boolean;
  toggleGothicMode: () => void;
}

const GothicModeContext = createContext<GothicModeContextType | undefined>(undefined);

export const useGothicMode = () => {
  const context = useContext(GothicModeContext);
  if (context === undefined) {
    throw new Error('useGothicMode must be used within a GothicModeProvider');
  }
  return context;
};

export const GothicModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isGothicMode, setIsGothicMode] = useState(false);

  const toggleGothicMode = () => {
    setIsGothicMode(prev => !prev);
  };

  useEffect(() => {
    const body = document.body;
    if (isGothicMode) {
      body.classList.add('gothic');
    } else {
      body.classList.remove('gothic');
    }
  }, [isGothicMode]);

  return (
    <GothicModeContext.Provider value={{ isGothicMode, toggleGothicMode }}>
      {children}
    </GothicModeContext.Provider>
  );
};

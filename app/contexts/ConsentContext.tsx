'use client';
import { createContext, useContext, useState } from 'react';

type ConsentContextType = {
  consent: { [key: string]: boolean };
  setConsent: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
};

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export const ConsentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [consent, setConsent] = useState({});
  return (
    <ConsentContext.Provider value={{ consent, setConsent }}>
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsentContext = () => {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsentContext must be used within a ConsentProvider');
  }
  return context;
};

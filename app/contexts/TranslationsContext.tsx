'use client';

import { createContext, ReactNode, useContext } from 'react';

type RawTranslation = {
  id: number;
  original: string;
  et: string;
  ru: string;
};
type Translations = { [key: string]: { et: string; ru: string } };

const TranslationsContext = createContext<Translations | null>(null);

export const TranslationsProvider = ({
  rawTranslations,
  children,
}: {
  rawTranslations: RawTranslation[];
  children: ReactNode;
}) => {
  const translations = rawTranslations.reduce(
    (acc: Translations, item: RawTranslation) => {
      acc[item.original] = { et: item.et, ru: item.ru };
      return acc;
    },
    {},
  );

  return (
    <TranslationsContext.Provider value={translations}>
      {children}
    </TranslationsContext.Provider>
  );
};

export const useTranslationsContext = () => {
  const context = useContext(TranslationsContext);
  if (!context) {
    throw new Error(
      'useTranslationsContext must be used within a TranslationsProvider',
    );
  }
  return context;
};

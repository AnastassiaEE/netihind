'use client';

import { RawTranslation, Translations } from '@/types/translations.types';
import { createContext, ReactNode, useContext } from 'react';

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

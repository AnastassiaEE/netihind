import type { useTranslations } from 'next-intl';

export type RawTranslation = {
  id: number;
  original: string;
  et: string;
  ru: string;
};

export type Translations = { [key: string]: { et: string; ru: string } };

export type TranslationFn = ReturnType<typeof useTranslations>;

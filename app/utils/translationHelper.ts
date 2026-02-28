import { TranslationFn } from '@/types/translations.types';

/**
 * Translates a dynamic key safely using next-intl.
 *
 * @param t - Translation function
 * @param key - Translation key (optional).
 *
 * @returns Translated string or empty string if key is undefined
 */
export const translateKey = (t: TranslationFn, key?: string) => {
  return key ? t(key as Parameters<typeof t>[0]) : '';
};

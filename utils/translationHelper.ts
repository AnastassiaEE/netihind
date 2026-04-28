import { TranslationFn } from '@/types/translations.types';

/**
 * Translates a dynamic key safely using next-intl.
 *
 * @param t - Translation function
 * @param key - Translation key (optional)
 * @param variables - Variables for interpolation (optional)
 *
 * @returns Translated string or empty string if key is undefined
 */
export const translateKey = (
  t: TranslationFn,
  key?: string,
  variables?: Record<string, string | number>,
) => {
  return key ? t(key as Parameters<typeof t>[0], variables) : '';
};

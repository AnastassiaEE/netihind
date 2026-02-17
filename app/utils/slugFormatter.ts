import { routing } from '@/i18n/routing';

/**
 * Removes locale suffixes from a slug string.
 *
 * For example, if a slug is "example-et" and "et" is one of the locales,
 * it will return "example".
 *
 * @param slug - The slug string that may contain locale suffixes
 * @returns The slug without any locale suffixes
 */
const getFormattedSlug = (slug: string) => {
  let newSlug = slug;
  routing.locales.forEach((locale) => {
    newSlug = newSlug.replace(new RegExp(`-${locale}$`, 'g'), '');
  });
  return newSlug;
};

export default getFormattedSlug;

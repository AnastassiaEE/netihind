import { routing } from '@/i18n/routing';

/**
 * Removes locale suffixes from a slug string.
 *
 * @param slug - The slug string that may contain locale suffixes
 * 
 * @returns The slug without any locale suffixes
 * 
 * @example getFormattedSlug("example-et") // example
 */
const getFormattedSlug = (slug: string) => {
  let newSlug = slug;
  routing.locales.forEach((locale) => {
    newSlug = newSlug.replace(new RegExp(`-${locale}$`, 'g'), '');
  });
  return newSlug;
};

export default getFormattedSlug;

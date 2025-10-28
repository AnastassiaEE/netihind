import { routing } from '@/i18n/routing'

const getFormattedSlug = (slug: string) => {
  let newSlug = slug;
  routing.locales.forEach((locale) => {
    newSlug = newSlug.replace(new RegExp(`-${locale}$`, 'g'), '');
  });
  return newSlug;
};

export default getFormattedSlug;

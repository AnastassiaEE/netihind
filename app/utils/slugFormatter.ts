import i18nConfig from '@/i18nConfig';

const getFormattedSlug = (slug: string) => {
  let newSlug = slug;
  i18nConfig.locales.forEach((locale) => {
    newSlug = newSlug.replace(new RegExp(`-${locale}$`, 'g'), '');
  });
  return newSlug;
};

export default getFormattedSlug;

import gradientMainLogo from '@/public/images/gradientmainlogo.png';

export const openGraphLogo = {
  url: gradientMainLogo.src,
  width: 1200,
  height: 630,
  alt: 'Netihind logo',
};

export const website = (t: any, locale: string) => {
  return {
    '@type': 'WebSite',
    '@id': t('website.id'),
    name: t('website.name'),
    description: t('website.description'),
    url: t('website.url'),
    inLanguage: locale,
  };
};

export const readAction = (url: string) => {
  return {
    '@type': 'ReadAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: url,
    },
  };
};

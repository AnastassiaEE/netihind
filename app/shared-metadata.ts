import gradientMainLogo from '@/public/images/gradientmainlogo.png';
import { metadataBaseUrl } from '@/app/[locale]/layout';

export const openGraphLogo = {
  url: gradientMainLogo.src,
  width: 1200,
  height: 630,
  alt: 'Netihind logo',
};

export const website = (t: any, locale: string) => {
  const websiteUrl = new URL(t('website.url'), metadataBaseUrl).toString();
  return {
    '@type': 'WebSite',
    '@id': `${websiteUrl}/#website`,
    name: t('website.name'),
    description: t('website.description'),
    url: websiteUrl,
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

export const metadataBaseUrl = new URL('https://netihind.ee');
const logoUrl =
  'https://rxysmdetqttpdqfmrpym.supabase.co/storage/v1/object/public/website-logos//gradientmainlogo.png';

export const openGraphLogo = {
  url: logoUrl,
  width: 1200,
  height: 630,
  alt: 'Netihind logo',
};

export const website = (t: any, locale: string) => {
  const websiteUrl = new URL(t('website.url'), metadataBaseUrl).toString();
  return {
    '@type': 'WebSite',
    '@id': `${websiteUrl}#website`,
    name: t('website.name'),
    description: t('website.description'),
    url: websiteUrl,
    inLanguage: locale,
  };
};

export const organization = (t: any) => {
  const websiteUrl = new URL(t('website.url'), metadataBaseUrl).toString();
  return {
    '@type': 'Organization',
    '@id': `${websiteUrl}#organization`,
    name: t('website.name'),
    url: websiteUrl,
    logo: logoUrl,
    sameAs: ['https://www.facebook.com/people/Netihind/61564967082896/'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+37255543735',
        contactType: 'customer service',
        email: 'info@netihind.ee',
        availableLanguage: ['Estonian', 'Russian'],
      },
    ],
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

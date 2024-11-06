import QuestionsSection from '@/components/sections/home/QuestionsSection';
import ContactsSection from '@/components/sections/home/ContactsSection';
import StepsSection from '@/components/sections/home/StepsSection';
import SliderBlogSection from '@/components/sections/home/SliderBlogSection';
import InfoSection from '@/components/sections/home/InfoSection';
import TopSectionSecondary from '@/components/sections/home/TopSectionSecondary';
import ProvidersLogoSection from '@/components/sections/home/ProvidersLogoSection';
import TopSectionPrimary from '@/components/sections/home/TopSectionPrimary';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { formatISO } from 'date-fns';
import { openGraphLogo, website, readAction } from '@/app/shared-metadata';
import { metadataBaseUrl } from '@/app/[locale]/layout';

export const revalidate = 3600;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'SEO' });
  return {
    title: t('homePage.name'),
    description: t('homePage.description'),
    alternates: {
      canonical: t('homePage.url'),
    },
    openGraph: {
      title: t('homePage.name'),
      description: t('homePage.description'),
      type: 'website',
      url: t('homePage.url'),
      site_name: t('website.name'),
      locale: locale,
      images: [openGraphLogo],
    },
  };
}

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('SEO');

  const homePageUrl = new URL(t('homePage.url'), metadataBaseUrl).toString();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': homePageUrl,
        name: t('homePage.name'),
        description: t('homePage.description'),
        url: homePageUrl,
        inLanguage: locale,
        datePublished: formatISO(new Date('04-11-2024')),
        isPartOf: website(t, locale),
        potentialAction: [readAction(homePageUrl)],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${homePageUrl}#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: t('breadcrumbs.home.name'),
            item: homePageUrl,
          },
        ],
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TopSectionPrimary />
      {/* <TopSectionSecondary /> */}
      {/* <InfoSection i18n={t} /> */}
      {/* <ProvidersLogoSection /> */}
      <StepsSection />
      <QuestionsSection />
      <SliderBlogSection />
      <ContactsSection />
    </>
  );
}

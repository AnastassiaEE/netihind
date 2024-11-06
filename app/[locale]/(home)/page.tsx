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

export const revalidate = 3600;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'SEO' });
  return {
    title: t('homePage.name'),
    description: t('homePage.description'),
    canonical: t('homePage.url'),
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': t('homePage.url'),
        name: t('homePage.name'),
        description: t('homePage.description'),
        url: t('homePage.url'),
        inLanguage: locale,
        datePublished: formatISO(new Date('04-11-2024')),
        isPartOf: website(t, locale),
        potentialAction: [readAction(t('homePage.url'))],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': t('breadcrumbs.home.id'),
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: t('breadcrumbs.home.name'),
            item: t('breadcrumbs.home.item'),
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

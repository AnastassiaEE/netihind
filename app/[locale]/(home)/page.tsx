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
import gradientMainLogo from '@/public/images/gradientmainlogo.png';
import { formatISO } from 'date-fns';

export const revalidate = 3600;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'SEO' });
  return {
    title: t('homePage.name'),
    description: t('homePage.description'),
    openGraph: {
      title: t('homePage.name'),
      description: t('homePage.description'),
      type: 'website',
      url: t('homePage.url'),
      site_name: t('website.name'),
      locale: locale,
      images: [
        {
          url: gradientMainLogo.src,
          width: 1200,
          height: 630,
          alt: 'Netihind logo',
        },
      ],
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
        '@id': t('homePage.id'),
        name: t('homePage.name'),
        description: t('homePage.description'),
        url: t('homePage.url'),
        inLanguage: locale,
        datePublished: formatISO(new Date('04-11-2024')),
        isPartOf: {
          '@type': 'WebSite',
          '@id': t('website.id'),
          name: t('website.name'),
          description: t('website.description'),
          url: t('website.url'),
          inLanguage: locale,
        },
        potentialAction: {
          '@type': 'ReadAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: t('homePage.url'),
          },
        },
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

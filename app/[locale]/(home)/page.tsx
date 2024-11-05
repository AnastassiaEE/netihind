import QuestionsSection from '@/components/sections/home/QuestionsSection';
import ContactsSection from '@/components/sections/home/ContactsSection';
import StepsSection from '@/components/sections/home/StepsSection';
import SliderBlogSection from '@/components/sections/home/SliderBlogSection';
import InfoSection from '@/components/sections/home/InfoSection';
import TopSectionSecondary from '@/components/sections/home/TopSectionSecondary';
import ProvidersLogoSection from '@/components/sections/home/ProvidersLogoSection';
import TopSectionPrimary from '@/components/sections/home/TopSectionPrimary';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import gradientMainLogo from '@/public/images/gradientmainlogo.png';

export const revalidate = 3600;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  return {
    title: messages.SEO.homePage.name,
    description: messages.SEO.homePage.description,
    openGraph: {
      title: messages.SEO.homePage.name,
      description: messages.SEO.homePage.description,
      type: 'website',
      url: messages.SEO.homePage.url,
      site_name: messages.SEO.homePage.name,
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
        datePublished: '04-11-2024',
        dateModified: '04-11-2024',
        isPartOf: {
          '@type': 'WebSite',
          '@id': t('website.id'),
          name: t('website.name'),
          description: t('website.description'),
          url: t('website.url'),
          inLanguage: locale,
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

import { use } from 'react';
import QuestionsSection from '@/components/sections/home/QuestionsSection';
import ContactsSection from '@/components/sections/home/ContactsSection';
import StepsSection from '@/components/sections/home/StepsSection';
import SliderBlogSection from '@/components/sections/home/SliderBlogSection';
import TopSection from '@/components/sections/home/TopSection';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { openGraphLogo, website, metadataBaseUrl } from '@/app/shared-metadata';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const { locale } = params;

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

export default function Home(props: { params: Promise<{ locale: string }> }) {
  const params = use(props.params);
  const { locale } = params;

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
        isPartOf: website(t, locale),
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
      <TopSection />
      <StepsSection />
      <QuestionsSection />
      <SliderBlogSection />
      <ContactsSection />
    </>
  );
}

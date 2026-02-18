import { use } from 'react';
import QuestionsSection from '@/components/sections/home/QuestionsSection';
import ContactsSection from '@/components/sections/home/ContactsSection';
import StepsSection from '@/components/sections/home/StepsSection';
import BlogSection from '@/components/sections/home/BlogSection';
import TopSection from '@/components/sections/home/TopSection';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Locale, useTranslations } from 'next-intl';
import JsonLd from '@/components/seo/JsonLd';
import {
  getMetadata,
  getSchema,
  getWebsiteSchema,
  openGraphLogo,
} from '@/app/utils/seoHelper';

export async function generateMetadata(props: {
  params: Promise<{ locale: Locale }>;
}) {
  const params = await props.params;
  const { locale } = params;

  const t = await getTranslations({ locale, namespace: 'SEO' });

  return await getMetadata(
    t('homePage.title'),
    t('homePage.description'),
    'website',
    t('homePage.url'),
    t('website.title'),
    locale,
    [openGraphLogo],
  );
}

export default function Home(props: { params: Promise<{ locale: Locale }> }) {
  const params = use(props.params);
  const { locale } = params;

  setRequestLocale(locale);

  const t = useTranslations('SEO');

  const breadcrumbs = [
    { name: t('breadcrumbs.home.name'), url: t('homePage.url') },
  ];
  return (
    <>
      <JsonLd
        data={getSchema(
          t('homePage.title'),
          t('homePage.description'),
          t('homePage.url'),
          breadcrumbs,
          getWebsiteSchema(t, locale),
          locale,
        )}
      />
      <TopSection />
      <StepsSection />
      <QuestionsSection />
      <BlogSection />
      <ContactsSection />
    </>
  );
}

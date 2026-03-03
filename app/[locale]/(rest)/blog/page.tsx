import BlogSection from '@/components/sections/blog/BlogSection';
import JsonLd from '@/components/seo/JsonLd';
import PageLoader from '@/components/ui/loaders/PageLoader';
import {
  getMetadata,
  getSchema,
  getWebsiteSchema,
  openGraphLogo,
} from '@/utils/schemaHelper';
import { Locale, useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Suspense, use } from 'react';

export const dynamic = 'force-static';
export const revalidate = 300;

export async function generateMetadata(props: {
  params: Promise<{ locale: Locale }>;
}) {
  const params = await props.params;
  const { locale } = params;

  const t = await getTranslations({ locale, namespace: 'SEO' });

  return await getMetadata(
    t('blogPage.title'),
    t('blogPage.description'),
    'website',
    t('blogPage.url'),
    t('website.title'),
    locale,
    [openGraphLogo],
  );
}

export default function Blog(props: { params: Promise<{ locale: Locale }> }) {
  const params = use(props.params);
  const { locale } = params;

  setRequestLocale(locale);

  const t = useTranslations('SEO');

  const breadcrumbs = [
    { name: t('breadcrumbs.home.name'), url: t('homePage.url') },
    { name: t('breadcrumbs.blog.name'), url: t('blogPage.url') },
  ];

  return (
    <>
      <JsonLd
        data={getSchema(
          t('blogPage.title'),
          t('blogPage.description'),
          t('blogPage.url'),
          breadcrumbs,
          getWebsiteSchema(t, locale),
          locale,
        )}
      />
      <Suspense fallback={<PageLoader />}>
        <BlogSection />
      </Suspense>
    </>
  );
}

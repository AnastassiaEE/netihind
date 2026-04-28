import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getPage } from '@/lib/wordpress/pages';
import components from '@/mdx-components';
import SectionLayout from '@/layouts/SectionLayout';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import PageLoader from '@/components/ui/loaders/PageLoader';
import { Locale } from 'next-intl';
import JsonLd from '@/components/seo/JsonLd';
import {
  getMetadata,
  getSchema,
  getWebsiteSchema,
  openGraphLogo,
} from '@/utils/schemaHelper';

export const dynamic = 'force-static';
export const revalidate = 300;

export async function generateMetadata(props: {
  params: Promise<{ locale: Locale }>;
}) {
  const params = await props.params;
  const { locale } = params;

  const t = await getTranslations({ locale, namespace: 'SEO' });

  return await getMetadata(
    t('aboutPage.title'),
    t('aboutPage.description'),
    'website',
    t('aboutPage.url'),
    t('website.title'),
    locale,
    [openGraphLogo],
  );
}

export default async function About(props: {
  params: Promise<{ locale: Locale }>;
}) {
  const params = await props.params;
  const { locale } = params;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'SEO' });

  const page = await getPage(`about-${locale}`);
  if (!page) notFound();

  const breadcrumbs = [
    { name: t('breadcrumbs.home.name'), url: t('homePage.url') },
    { name: t('breadcrumbs.about.name'), url: t('aboutPage.url') },
  ];

  return (
    <>
      <JsonLd
        data={getSchema(
          t('aboutPage.title'),
          t('aboutPage.description'),
          t('aboutPage.url'),
          breadcrumbs,
          getWebsiteSchema(t, locale),
          locale,
        )}
      />
      <Suspense fallback={<PageLoader />}>
        <SectionLayout>
          <MDXRemote source={page.content} components={components} />
        </SectionLayout>
      </Suspense>
    </>
  );
}

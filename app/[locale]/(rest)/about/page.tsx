import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getPage } from '@/app/lib/wpPages';
import components from '@/mdx-components';
import SectionLayout from '@/layouts/SectionLayout';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { metadataBaseUrl, openGraphLogo, website } from '@/app/shared-metadata';
import PageLoader from '@/components/ui/loaders/PageLoader';

export const revalidate = 3600;

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const { locale } = params;

  const t = await getTranslations({ locale, namespace: 'SEO' });

  return {
    title: t('aboutPage.name'),
    description: t('aboutPage.description'),
    alternates: {
      canonical: t('aboutPage.url'),
    },
    openGraph: {
      title: t('aboutPage.name'),
      description: t('aboutPage.description'),
      type: 'website',
      url: t('aboutPage.url'),
      site_name: t('website.name'),
      locale: locale,
      images: [openGraphLogo],
    },
  };
}

export default async function About(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const { locale } = params;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'SEO' });

  const aboutPageUrl = new URL(t('aboutPage.url'), metadataBaseUrl).toString();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': aboutPageUrl,
        name: t('aboutPage.name'),
        description: t('aboutPage.description'),
        url: aboutPageUrl,
        inLanguage: locale,
        isPartOf: website(t, locale),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${aboutPageUrl}#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: t('breadcrumbs.home.name'),
            item: new URL(t('homePage.url'), metadataBaseUrl).toString(),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: t('breadcrumbs.about.name'),
            item: aboutPageUrl,
          },
        ],
      },
    ],
  };

  const page = await getPage(`about-${locale}`);
  if (!page) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<PageLoader />}>
        <SectionLayout>
          <MDXRemote source={page.content} components={components as {}} />
        </SectionLayout>
      </Suspense>
    </>
  );
}

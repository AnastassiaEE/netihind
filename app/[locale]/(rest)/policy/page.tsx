import { Suspense } from 'react';
import { getPage } from '@/app/lib/wpPages';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import SectionLayout from '@/layouts/SectionLayout';
import { MDXRemote } from 'next-mdx-remote/rsc';
import components from '@/mdx-components';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import PageLoader from '@/components/ui/loaders/PageLoader';
import { Locale } from 'next-intl';
import {
  getMetadata,
  getSchema,
  getWebsiteSchema,
  openGraphLogo,
} from '@/utils/schemaHelper';
import JsonLd from '@/components/seo/JsonLd';

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
};

export const dynamic = 'force-static';
export const revalidate = 300;

export async function generateMetadata(props: {
  params: Promise<{ locale: Locale }>;
}) {
  const params = await props.params;
  const { locale } = params;

  const t = await getTranslations({ locale, namespace: 'SEO' });

  return await getMetadata(
    t('policyPage.title'),
    t('policyPage.description'),
    'website',
    t('policyPage.url'),
    t('website.title'),
    locale,
    [openGraphLogo],
  );
}

export default async function Policy(props: {
  params: Promise<{ locale: Locale }>;
}) {
  const params = await props.params;

  const { locale } = params;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'SEO' });

  const page = await getPage(`policy-${locale}`);
  if (!page) notFound();

  const breadcrumbs = [
    { name: t('breadcrumbs.home.name'), url: t('homePage.url') },
    { name: t('breadcrumbs.policy.name'), url: t('policyPage.url') },
  ];

  return (
    <>
      <JsonLd
        data={getSchema(
          t('policyPage.title'),
          t('policyPage.description'),
          t('policyPage.url'),
          breadcrumbs,
          getWebsiteSchema(t, locale),
          locale,
        )}
      />
      <Suspense fallback={<PageLoader />}>
        <SectionLayout>
          <MDXRemote
            source={page.content}
            components={components}
            options={options}
          />
        </SectionLayout>
      </Suspense>
    </>
  );
}

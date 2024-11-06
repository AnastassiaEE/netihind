import PingLoader from '@/components/ui/loaders/PingLoader';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getPage } from '@/app/lib/wpPages';
import components from '@/mdx-components';
import SectionLayout from '@/layouts/SectionLayout';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { formatISO } from 'date-fns';
import { openGraphLogo, readAction, website } from '@/app/shared-metadata';
import { metadataBaseUrl } from '../../layout';

export const revalidate = 3600;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'SEO' });
    return {
        title: t('aboutPage.name'),
        canonical: t('aboutPage.url'),
        openGraph: {
            title: t('aboutPage.name'),
            type: 'website',
            url: t('aboutPage.url'),
            site_name: t('website.name'),
            locale: locale,
            images: [openGraphLogo],
        },
    };
}

export default async function About({ params: { locale } }: { params: { locale: string } }) {
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
                url: aboutPageUrl,
                inLanguage: locale,
                datePublished: formatISO(new Date('04-11-2024')),
                isPartOf: website(t, locale),
                potentialAction: [readAction(aboutPageUrl)],
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${aboutPageUrl}/#breadcrumbs`,
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: t('breadcrumbs.home.name'),
                        item: new URL(t('homePage.url'), metadataBaseUrl).toString()
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
    if (page === undefined || page === null) {
        notFound();
    }
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Suspense fallback={<PingLoader />}>
                <SectionLayout>
                    <MDXRemote source={page.content} components={components as {}} />
                </SectionLayout>
            </Suspense>
        </>
    );
}

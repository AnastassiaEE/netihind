import PingLoader from '@/components/ui/loaders/PingLoader';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getPage } from '@/app/lib/wpPages';
import components from '@/mdx-components';
import SectionLayout from '@/layouts/SectionLayout';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import gradientMainLogo from '@/public/images/gradientmainlogo.png';
import { formatISO } from 'date-fns';
import { openGraphLogo, readAction, website } from '@/app/shared-metadata';

export const revalidate = 3600;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'SEO' });
    return {
        title: t('aboutPage.name'),
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
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': t('aboutPage.id'),
                name: t('aboutPage.name'),
                url: t('aboutPage.url'),
                inLanguage: locale,
                datePublished: formatISO(new Date('04-11-2024')),
                isPartOf: website(t, locale),
                potentialAction: [readAction(t('aboutPage.url'))],
            },
            {
                '@type': 'BreadcrumbList',
                '@id': t('breadcrumbs.about.id'),
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: t('breadcrumbs.home.name'),
                        item: t('breadcrumbs.home.item'),
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: t('breadcrumbs.about.name'),
                        item: t('breadcrumbs.about.item'),
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

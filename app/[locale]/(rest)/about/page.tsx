import PingLoader from '@/components/ui/loaders/PingLoader';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getPage } from '@/app/lib/wpPages';
import components from '@/mdx-components';
import SectionLayout from '@/layouts/SectionLayout';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { setRequestLocale } from 'next-intl/server';

export const revalidate = 3600;

export default async function About({ params: { locale } }: { params: { locale: string } }) {
    setRequestLocale(locale);
    const page = await getPage(`about-${locale}`);
    if (page === undefined || page === null) {
        notFound();
    }
    return (
        <Suspense fallback={<PingLoader />}>
            <SectionLayout>
                <MDXRemote source={page.content} components={components as {}} />
            </SectionLayout>
        </Suspense>
    );
}

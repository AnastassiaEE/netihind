import PingLoader from '@/components/ui/loaders/PingLoader';
import { Suspense } from 'react';
import { getPage } from '@/app/lib/wpPages';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import SectionLayout from '@/layouts/SectionLayout';
import { MDXRemote } from 'next-mdx-remote/rsc';
import components from '@/mdx-components';
import { setRequestLocale } from 'next-intl/server';

export const revalidate = 3600;

const options = {
    mdxOptions: {
        remarkPlugins: [remarkGfm],
    },
};

export default async function Policy({ params: { locale } }: { params: { locale: string } }) {
    setRequestLocale(locale);
    const page = await getPage(`policy-${locale}`);
    if (page === undefined || page === null) {
        notFound();
    }
    return (
        <Suspense fallback={<PingLoader />}>
            <SectionLayout>
                <MDXRemote source={page.content} components={components as {}} options={options} />
            </SectionLayout>
        </Suspense>
    );
}

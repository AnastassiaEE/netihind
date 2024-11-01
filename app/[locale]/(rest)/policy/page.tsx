import PingLoader from '@/components/ui/loaders/PingLoader';
import { Suspense } from 'react';
import { getPages } from '@/app/lib/wpPages';
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
    const pages = await getPages(locale.toUpperCase(), 'policy');
    if (pages === undefined || pages?.length === 0) {
        notFound();
    }
    return (
        <Suspense fallback={<PingLoader />}>
            <SectionLayout>
                <MDXRemote source={pages[0].content} components={components as {}} options={options} />
            </SectionLayout>
        </Suspense>
    );
}

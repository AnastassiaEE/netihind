import PingLoader from '@/components/ui/loaders/PingLoader';
import AboutSection from '@/components/sections/about/AboutSection';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getPages } from '@/app/lib/wpPages';

export const revalidate = 3600

export default async function About({ params: { locale } }: { params: { locale: string } }) {
    const pages = await getPages(locale.toUpperCase(), "about")
    if (pages === undefined || pages?.length === 0) {
        notFound()
    }
    return (
        <Suspense fallback={<PingLoader />}>
            <AboutSection data={pages[0].content} />
        </Suspense>
    );
}

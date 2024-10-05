import PingLoader from '@/components/ui/loaders/PingLoader';
import PolicySection from '@/components/sections/policy/PolicySection';
import { Suspense } from 'react';
import { getPages } from '@/app/lib/wpPages';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export default async function Policy({ params: { locale } }: { params: { locale: string } }) {
    const pages = await getPages(locale.toUpperCase(), 'policy');
    if (pages === undefined || pages?.length === 0) {
        notFound();
    }
    return (
        <Suspense fallback={<PingLoader />}>
            <PolicySection data={pages[0].content} />
        </Suspense>
    );
}

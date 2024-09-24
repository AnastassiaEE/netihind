import PingLoader from '@/components/ui/loaders/PingLoader';
import PolicySection from '@/components/sections/policy/PolicySection';
import { Suspense } from 'react';

export default function Policy({ params: { locale } }: { params: { locale: string } }) {
    return (
        <Suspense fallback={<PingLoader />}>
            <PolicySection locale={locale} />
        </Suspense>
    );
}

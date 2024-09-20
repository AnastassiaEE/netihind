import PingLoader from '@/components/loaders/PingLoader';
import AboutSection from '@/components/sections/AboutSection';
import { Suspense } from 'react';

export default function About({ params: { locale } }: { params: { locale: string } }) {
    return (
        <Suspense fallback={<PingLoader />}>
            <AboutSection locale={locale} />
        </Suspense>
    );
}

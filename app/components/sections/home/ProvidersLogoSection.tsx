import PingLoader from '@/components/ui/loaders/PingLoader';
import providerLogos from '@/data/providerLogos';
import SectionLayout from '@/layouts/SectionLayout';
import dynamic from 'next/dynamic';

export default function ProvidersSection() {
    const LogoCards = dynamic(() => import('@/components/ui/logo/LogoCards'), {
        loading: () => <PingLoader />,
    });
    return (
        <SectionLayout className="pt-24">
            <LogoCards logos={providerLogos} />
        </SectionLayout>
    );
}

import LogoCards from '@/components/ui/logo/LogoCards';
import providerLogos from '@/data/providerLogos';
import SectionLayout from '@/layouts/SectionLayout';

export default function ProvidersSection() {
    return (
        <SectionLayout className="pt-24">
            <LogoCards logos={providerLogos} />
        </SectionLayout>
    );
}

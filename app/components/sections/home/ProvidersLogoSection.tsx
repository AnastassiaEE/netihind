import SliderLogoCards from '@/components/ui/logo/SliderLogoCards'
import providerLogos from '@/data/providerLogos';
import SectionLayout from '@/layouts/SectionLayout';

export default function ProvidersSection() {
    return (
        <SectionLayout className="pt-24">
            <SliderLogoCards logos={providerLogos}></SliderLogoCards>
        </SectionLayout>
    );
}

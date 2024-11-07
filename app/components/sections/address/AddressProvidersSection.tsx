import AddressProviderCards from '@/components/ui/providers/AddressProviderCards';
import SectionLayout from '@/layouts/SectionLayout';

export default function AddressProvidersSection({ providers }: { providers: { [key: string]: string }[] }) {
    return (
        <SectionLayout className="pt-24">
            <AddressProviderCards providers={providers} />
        </SectionLayout>
    );
}

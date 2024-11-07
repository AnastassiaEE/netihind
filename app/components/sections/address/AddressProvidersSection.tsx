import AddressProviderCards from '@/components/ui/providers/AddressProviderCards';
import SectionLayout from '@/layouts/SectionLayout';

export default function AddressProvidersSection({ providers }: { providers: { [key: string]: string }[] }) {
    return (
        <SectionLayout className="py-16" bg="bg-neutral-light">
            <AddressProviderCards providers={providers} />
        </SectionLayout>
    );
}

import AddressProviderCards from '@/components/ui/providers/AddressProviderCards';
import SectionLayout from '@/layouts/SectionLayout';
import providers from '@/data/providers';

export default async function AddressProvidersSection() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return (
        <SectionLayout className="pt-24">
            <AddressProviderCards items={providers} />
        </SectionLayout>
    );
}

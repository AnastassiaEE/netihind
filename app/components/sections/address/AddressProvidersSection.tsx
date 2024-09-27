import AddressProviderCards from '@/components/ui/providers/AddressProviderCards';
import SectionLayout from '@/layouts/SectionLayout';
import providers from '@/data/providers';

export default async function AddressProvidersSection({ address }: { address: string }) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return (
        <SectionLayout bg="bg-neutral" className="py-24">
            <h3 className="text-3xl font-extrabold mb-6">Провайдеры по адресу</h3>
            <p className="text-lg font-bold text-primary mb-6">{address}</p>
            <AddressProviderCards items={providers} />
        </SectionLayout>
    );
}

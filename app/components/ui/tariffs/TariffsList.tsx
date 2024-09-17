import TariffCard from './TariffCard';

export default function TariffsList({ items }: { items: { [key: string]: any }[] }) {
    return (
        <>
            {items.map((tariff) => (
                <div key={tariff.id} className="mb-6">
                    <TariffCard tariff={tariff} />
                </div>
            ))}
        </>
    );
}

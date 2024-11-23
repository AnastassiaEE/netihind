import PackageCard from '@/components/ui/address/packages/PackageCard';

export default function PackagesList({ packages }: { packages?: { [key: string]: any }[] }) {
    return (
        <div className="md:hidden">
            {packages?.map((pack) => (
                <PackageCard key={pack.package_id} pack={pack} className="[&:not(:last-child)]:mb-6" />
            ))}
        </div>
    );
}

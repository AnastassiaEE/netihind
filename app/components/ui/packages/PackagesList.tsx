import PackageCard from './PackageCard';

export default function PackagesList({
    packages,
    filter,
}: {
    packages: { [key: string]: any }[];
    filter: string;
}) {
    return (
        <div className="md:hidden">
            {packages.map((pack) => (
                <PackageCard key={pack['package_id']} pack={pack} className="[&:not(:last-child)]:mb-6" />
            ))}
        </div>
    );
}

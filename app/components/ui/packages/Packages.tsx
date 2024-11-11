import PackagesTable from '@/components/ui/packages/PackagesTable';
import PackagesList from '@/components/ui/packages/PackagesList';

export default function Packages({
    packages,
    filter,
}: {
    packages: { [key: string]: any }[];
    filter: string;
}) {
    return (
        <>
            <PackagesList packages={packages} filter={filter} />
            <PackagesTable packages={packages} filter={filter} />
        </>
    );
}

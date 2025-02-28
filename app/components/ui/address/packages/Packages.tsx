'use client';

import PackagesLoader from '@/components/ui/loaders/PackagesLoader';
import usePackages from '@/hooks/usePackages';
import { useTranslations } from 'next-intl';
import PackageCard from '@/components/ui/address/packages/PackageCard';

export default function Packages({
    oid,
    initialPackages,
    sortOption,
    providers
}: {
    oid: string;
    initialPackages: { [key: string]: any }[];
    sortOption: string;
    providers: string[]
}) {
    const t = useTranslations('Errors');

    const { packages, error, isLoading } = usePackages(oid, initialPackages, sortOption, providers);

    if (isLoading) return <PackagesLoader />;
    // if (error) return <div className="bg-red-600">error</div>

    return (
        <>
            {packages.map((data: { [key: string]: any }) => (
                <PackageCard key={data.internet_package_id} data={data} className="mb-5" />
            ))}
        </>
    );
}

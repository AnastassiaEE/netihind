'use client';

import PackagesLoader from '@/components/ui/loaders/PackagesLoader';
import usePackages from '@/hooks/usePackages';
import { useTranslations } from 'next-intl';
import PackageCard from '@/components/ui/address/packages/PackageCard';

export default function Packages({
    oid,
    initialPackages,
}: {
    oid: string,
    initialPackages: { [key: string]: any }[];
}) {
    const t = useTranslations('Errors');

    const { packages, error, isLoading } = usePackages(
        oid,
        initialPackages
    );

    if (isLoading) return <PackagesLoader />;
    console.log(packages)

    return (
        <>
            {packages.map((data: { [key: string]: any }) => (
                <PackageCard key={data.internet_package_id} data={data} className="mb-5" />
            ))}
        </>
    );
}

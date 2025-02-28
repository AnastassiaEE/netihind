'use client';

import PackagesLoader from '@/components/ui/loaders/PackagesLoader';
import usePackages from '@/hooks/usePackages';
import { useTranslations } from 'next-intl';
import PackageCard from '@/components/ui/address/packages/PackageCard';
import PackagesError from '@/components/ui/errors/PackagesError';

export default function Packages({
    oid,
    initialPackages,
    initialError,
    sortOption,
    providers,
    technologies,
}: {
    oid: string;
    initialPackages: { [key: string]: any }[];
    initialError: string | null;
    sortOption: string;
    providers: string[];
    technologies: string[];
}) {
    const t = useTranslations('Errors');

    const { packages, error, isLoading } = usePackages(
        oid,
        initialPackages,
        sortOption,
        providers,
        technologies,
    )
    if (isLoading) return <PackagesLoader />;
    if (initialError) return <PackagesError>{t(initialError)}</PackagesError>;
    if (error) return <PackagesError>{t(error)}</PackagesError>;

    return (
        <>
            {packages.map((data: { [key: string]: any }) => (
                <PackageCard key={data.internet_package_id} data={data} className="mb-5" />
            ))}
        </>
    );
}

'use client';

import PackagesTable from '@/components/ui/address/packages/PackagesTable';
import PackagesList from '@/components/ui/address/packages/PackagesList';
import PackagesLoader from '@/components/ui/loaders/PackagesLoader';
import { getCookie } from 'cookies-next';
import { getAddressCookieValues } from '@/utils/addressCookieHelper';
import PackagesError from '@/components/ui/errors/PackagesError';
import usePackages from '@/hooks/usePackages';
import { useTranslations } from 'next-intl';

export default function Packages({
    initialPackages,
    filter,
}: {
    initialPackages: { [key: string]: any }[];
    filter: string;
}) {
    const t = useTranslations('Errors');
    const cookieString = getCookie('ADDRESS') as string;
    const { city, county, street, streetNr } = getAddressCookieValues(cookieString);

    const { packages, error, isLoading } = usePackages(
        initialPackages,
        filter,
        city,
        county,
        street,
        streetNr,
    );
    if (isLoading) return <PackagesLoader />;
    if (error) return <PackagesError>{t(error.message)}</PackagesError>;
    if (packages.length === 0) return <PackagesError>{t('noPackages')}</PackagesError>;

    return (
        <>
            <PackagesList packages={packages} />
            <PackagesTable packages={packages} filter={filter} />
        </>
    );
}

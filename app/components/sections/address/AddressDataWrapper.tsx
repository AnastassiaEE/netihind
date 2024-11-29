import { getAddressCookieValues } from '@/utils/addressCookieHelper';
import { getActiveFilter, getSelectedSortOption } from '@/utils/packagesHelper';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import AddressPackagesSection from '@/components/sections/address/AddressPackagesSection';
import AddressProvidersSection from '@/components/sections/address/AddressProvidersSection';
import { getPackages, getProviders } from '@/lib/addressDataFetch';
import { getTranslations } from 'next-intl/server';
import PackagesError from '@/components/ui/errors/PackagesError';

export default async function AddressDataWrapper({
    searchParams,
}: {
    searchParams: { [key: string]: string };
}) {
    const t = await getTranslations('Errors');
    const cookieString = getCookie('ADDRESS', { cookies })!;
    const { city, county, street, streetNr } = getAddressCookieValues(cookieString);

    const activeFilter = getActiveFilter(searchParams.filter);
    const selectedSortOption = getSelectedSortOption(searchParams.sort);

    let providers = await getProviders(city, county, street, streetNr).catch((error) => {
        return [];
    });

    let err = 'noPackages';
    const packages = await getPackages(activeFilter, city, county, street, streetNr).catch(
        (error) => {
            err = error.message;
            return [];
        },
    );

    if (packages.length === 0)
        return (
            <div className="container">
                <PackagesError>{t(err)}</PackagesError>
            </div>
        );

    return (
        <>
            {providers.length > 0 && <AddressProvidersSection providers={providers} />}
            <AddressPackagesSection packages={packages} />
        </>
    );
}

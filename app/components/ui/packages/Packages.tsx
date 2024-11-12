import PackagesTable from '@/components/ui/packages/PackagesTable';
import PackagesList from '@/components/ui/packages/PackagesList';
import { supabase } from '@/app/lib/supabase';
import SomethingWentWrongError from '@/components/ui/errors/SomethingWentWrongError';
import NoPackagesError from '@/components/ui/errors/NoPackagesError';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { getAddressCookieValues } from '@/utils/addressCookieHelper';

export default async function Packages({
    filter,
}: {
    filter: string;
}) {
    const cookieString = getCookie('ADDRESS', { cookies }) as string;
    const { city, county, street, streetNr } = getAddressCookieValues(cookieString)

    let { data, error } = await supabase.rpc('get_internet_packages_by_address', {
        p_filter: filter,
        p_city: city,
        p_maakond: county,
        p_street: `${street} ${streetNr}`,
    });

    if (error) return <SomethingWentWrongError />
    if (data.length === 0) return <NoPackagesError />

    return (
        <>
            <PackagesList packages={data} />
            <PackagesTable packages={data} filter={filter} />
        </>
    );
}

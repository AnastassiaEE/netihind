import { supabase } from '@/app/lib/supabase';
import React from 'react';
import SomethingWentWrongError from '@/components/ui/errors/SomethingWentWrongError';
import NoPackagesError from '@/components/ui/errors/NoPackagesError';
import { getProviders } from '@/utils/packagesHelper';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { getAddressCookieValues } from '@/utils/addressCookieHelper';

export default async function AddressProviderCardsWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieString = getCookie('ADDRESS', { cookies }) as string;
    const { city, county, street, streetNr } = getAddressCookieValues(cookieString)
    let { data, error } = await supabase.rpc('get_internet_packages_by_address', {
        p_filter: 'all',
        p_city: city,
        p_maakond: county,
        p_street: `${street} ${streetNr}`,
    });

    if (error) return <SomethingWentWrongError />;
    if (data.length === 0) return <NoPackagesError />;

    const providers = getProviders(data);

    const childrenWithProviders = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement, { providers: providers });
        }
        return child;
    });
    return <>{childrenWithProviders}</>;
}

import { supabase } from '@/app/lib/supabase';
import React from 'react';
import SomethingWentWrongError from '@/components/ui/errors/SomethingWentWrongError';
import NoPackagesError from '@/components/ui/errors/NoPackagesError';
import { getProviders } from '@/utils/packagesHelper';

export default async function AddressProviderCardsWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    let { data, error } = await supabase.rpc('get_internet_packages_by_address', {
        p_filter: 'all',
        p_city: 'Maardu linn',
        p_maakond: 'Harju Maakond',
        p_street: 'Ringi tn 25',
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

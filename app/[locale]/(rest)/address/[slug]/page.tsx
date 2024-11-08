import AddressProvidersSection from '@/components/sections/address/AddressProvidersSection';
import AddressPackagesSection from '@/components/sections/address/AddressPackagesSection';
import PingLoader from '@/components/ui/loaders/PingLoader';
import { getCookie, hasCookie } from 'cookies-next';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import AddressTitleSection from '@/components/sections/address/AddressTitleSection';
import slugify from 'slugify';
import { supabase } from '@/app/lib/supabase';
import { getProviders } from '@/utils/packagesHelper';

export default async function PersonalAddress({
    params: { slug },
    searchParams,
}: {
    params: { slug: string };
    searchParams: { [key: string]: string };
}) {
    if (!hasCookie('ADDRESS', { cookies })) notFound();

    const cookie = getCookie('ADDRESS', { cookies }) as string;
    const cookieSlug = slugify(cookie, {
        lower: true,
        locale: 'et',
        remove: /[*+~.,()'"!:@]/g,
    });
    if (slug !== cookieSlug) notFound();

    const filters: { [key: string]: boolean } = { all: false, internet: false, 'internet-tv': false };
    const activeFilter = !Object.keys(filters).includes(searchParams.filter)
        ? 'all'
        : searchParams.filter;
    filters[activeFilter] = true;

    let { data, error } = await supabase.rpc('get_internet_packages_by_address', {
        p_filter: activeFilter,
        p_city: 'Maardu linn',
        p_maakond: 'Harju Maakond',
        p_street: 'Ringi tn 25',
    });

    if (error) console.error(error);
    console.log(data);

    return (
        <>
            <AddressTitleSection address={cookie as string} />
            <Suspense fallback={<PingLoader />}>
                <AddressProvidersSection providers={getProviders(data)} />
            </Suspense>
            <AddressPackagesSection packages={data} searchParams={{ filters: filters }} />
        </>
    );
}

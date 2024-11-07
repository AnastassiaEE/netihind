import AddressProvidersSection from '@/components/sections/address/AddressProvidersSection';
import AddressTariffsSection from '@/components/sections/address/AddressTariffsSection';
import PingLoader from '@/components/ui/loaders/PingLoader';
import { getCookie, hasCookie } from 'cookies-next';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import AddressTitleSection from '@/components/sections/address/AddressTitleSection';
import slugify from 'slugify';
import addressTariffs from '@/data/addressTariffs';
import { supabase } from '@/app/lib/supabase';
import { getProviders } from '@/utils/packagesHelper';

export default async function PersonalAddress({
    params: { slug },
}: {
    params: { slug: string };
}) {
    if (!hasCookie('ADDRESS', { cookies })) notFound();

    const cookie = getCookie('ADDRESS', { cookies }) as string;
    const cookieSlug = slugify(cookie, {
        lower: true,
        locale: 'et',
        remove: /[*+~.,()'"!:@]/g,
    });
    if (slug !== cookieSlug) notFound();

    const data1 = addressTariffs;

    let { data, error } = await supabase
        .rpc('get_internet_packages_by_address', {
            p_city: 'Maardu linn',
            p_maakond: 'Harju Maakond',
            p_street: 'Ringi tn 25'
        })

    if (error) console.error(error)
    else console.log(data)

    return (
        <Suspense fallback={<PingLoader />}>
            <AddressTitleSection address={cookie as string} />
            <AddressProvidersSection providers={getProviders(data)} />
            <AddressTariffsSection tariffs={data1} />
        </Suspense>
    );
}

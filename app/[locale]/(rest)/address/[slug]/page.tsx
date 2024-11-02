import AddressProvidersSection from '@/components/sections/address/AddressProvidersSection';
import AddressTariffsSection from '@/components/sections/address/AddressTariffsSection';
import PingLoader from '@/components/ui/loaders/PingLoader';
import { getCookie, hasCookie } from 'cookies-next';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import AddressTitleSection from '@/components/sections/address/AddressTitleSection';
import slugify from 'slugify';

export default function PersonalAddress({ params: { slug } }: { params: { slug: string } }) {
    if (!hasCookie('ADDRESS', { cookies })) notFound();


    const cookie = getCookie('ADDRESS', { cookies }) as string;
    const cookieSlug = slugify(cookie, {
        lower: true,
        locale: 'et',
        remove: /[*+~.,()'"!:@]/g
    })
    if (slug !== cookieSlug) notFound()

    return (
        <Suspense fallback={<PingLoader />}>
            <AddressTitleSection address={cookie as string} />
            <AddressProvidersSection />
            <AddressTariffsSection />
        </Suspense>
    );
}

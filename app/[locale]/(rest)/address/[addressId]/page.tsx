import AddressProvidersSection from '@/components/sections/address/AddressProvidersSection';
import AddressTariffsSection from '@/components/sections/address/AddressTariffsSection';
import PingLoader from '@/components/ui/loaders/PingLoader';
import { getCookie, hasCookie } from 'cookies-next';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export default function PersonalAddress({ params }: { params: { addressId: string } }) {
    if (!hasCookie('ADDRESS', { cookies })) notFound();

    const addressSlug = decodeURIComponent(params.addressId);
    const addressCookie = getCookie('ADDRESS', { cookies });

    if (addressSlug !== addressCookie?.replace(/\./g, '')) notFound();

    return (
        <Suspense fallback={<PingLoader />}>
            <AddressProvidersSection address={addressCookie as string} />
            <AddressTariffsSection />
        </Suspense>
    );
}

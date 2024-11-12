import AddressProvidersSection from '@/components/sections/address/AddressProvidersSection';
import AddressPackagesSection from '@/components/sections/address/AddressPackagesSection';
import { getCookie, hasCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import AddressTitleSection from '@/components/sections/address/AddressTitleSection';
import { getAddressCookieValues } from '@/utils/addressCookieHelper';
import { getAddressSlug } from '@/utils/addressSlugifier';

export default async function PersonalAddress({
    params: { slug },
    searchParams,
}: {
    params: { slug: string };
    searchParams: { [key: string]: string };
}) {
    if (!hasCookie('ADDRESS', { cookies })) notFound();
    const cookieString = getCookie('ADDRESS', { cookies }) as string;
    const { fullAddress } = getAddressCookieValues(cookieString)
    const addressSlug = getAddressSlug(fullAddress);
    if (slug !== addressSlug) notFound();

    const filters: { [key: string]: boolean } = { all: false, internet: false, 'internet-tv': false };
    const activeFilter = Object.keys(filters).includes(searchParams.filter)
        ? searchParams.filter
        : 'all';
    filters[activeFilter] = true;

    return (
        <>
            <AddressTitleSection address={fullAddress} />
            <AddressProvidersSection />
            <AddressPackagesSection searchParams={{ filters: filters }} />
        </>
    );
}

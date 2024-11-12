import AddressProvidersSection from '@/components/sections/address/AddressProvidersSection';
import AddressPackagesSection from '@/components/sections/address/AddressPackagesSection';
import { getCookie, hasCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import AddressTitleSection from '@/components/sections/address/AddressTitleSection';
import slugify from 'slugify';

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

    return (
        <>
            <AddressTitleSection address={cookie as string} />
            <AddressProvidersSection />
            <AddressPackagesSection searchParams={{ filters: filters }} />
        </>
    );
}

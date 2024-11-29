import { getCookie, hasCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getAddressCookieValues } from '@/utils/addressCookieHelper';
import { getAddressSlug } from '@/utils/addressSlugifier';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { H1 } from '@/components/ui/headings/RestPageHeadings';
import { Suspense } from 'react';
import PageLoader from '@/components/ui/loaders/PageLoader';
import AddressDataWrapper from '@/components/sections/address/AddressDataWrapper';

export default async function PersonalAddress({
    params: { slug, locale },
    searchParams,
}: {
    params: { slug: string; locale: string };
    searchParams: { [key: string]: string };
}) {
    setRequestLocale(locale);
    const t = await getTranslations('AddressPage');

    if (!hasCookie('ADDRESS', { cookies })) notFound();
    const cookieString = getCookie('ADDRESS', { cookies })!;
    const { fullAddress } = getAddressCookieValues(cookieString);
    const addressSlug = getAddressSlug(fullAddress);
    if (slug !== addressSlug) notFound();

    return (
        <Suspense fallback={<PageLoader />}>
            <div className="container">
                <H1> {t('title')} </H1>
            </div>
            <AddressDataWrapper searchParams={searchParams} />
        </Suspense>
    );
}

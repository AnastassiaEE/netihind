import { H2 } from '@/components/ui/headings/RestPageHeadings';
import AddressProviderCards from '@/components/ui/address/providers/AddressProviderCards';
import SectionLayout from '@/layouts/SectionLayout';
import { getProviders } from '@/lib/addressDataFetch';
import { getAddressCookieValues } from '@/utils/addressCookieHelper';
import { getCookie } from 'cookies-next';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
import React from 'react';

export default async function AddressProvidersSection() {
    const t = await getTranslations('AddressPage');
    const cookieString = getCookie('ADDRESS', { cookies }) as string;
    const { city, county, street, streetNr } = getAddressCookieValues(cookieString);
    let providers = await getProviders(city, county, street, streetNr).catch((error) => {
        return [];
    });
    if (providers.length === 0) return null;

    return (
        <SectionLayout className="py-8" bg="bg-neutral-light">
            <H2>{t('providersSection.title')}</H2>
            <AddressProviderCards providers={providers} />
        </SectionLayout>
    );
}

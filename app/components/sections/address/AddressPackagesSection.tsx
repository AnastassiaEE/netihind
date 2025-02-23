import SectionLayout from '@/layouts/SectionLayout';
import Packages from '@/components/ui/address/packages/Packages';
import { H1 } from '@/components/ui/headings/RestPageHeadings';
import {
    SORT_OPTIONS,
    getFilterSelectedOptions,
    getProviderOptions,
    getSortSelectedOption,
    getTechnologyOptions,
} from '@/utils/packagesHelper';
import React from 'react';
import PackageCard from '@/components/ui/address/packages/PackageCard';
import Button from '@/components/ui/form/buttons/Button';
// import Modal from '@/components/ui/modal/Modal';
import Sort from '@/components/ui/sorting/Sort';
import SortingToolbar from '@/components/ui/sorting/SortingToolbar';
import { getCookie } from 'cookies-next';
import { getAddressCookieValues } from '@/utils/addressCookieHelper';
import CheckboxFiltersGroup from '@/components/ui/sorting/CheckboxFiltersGroup';
import { cookies } from 'next/headers';
import { getProviders, getTechnologies } from '@/lib/packagesDataFetch';
import { getTranslations } from 'next-intl/server';

export default async function AddressPackagesSection({
    searchParams,
}: {
    searchParams: { [key: string]: string };
}) {
    const t = await getTranslations('AddressPage');
    const cookieString = getCookie('ADDRESS', { cookies });
    const { fullAddress, oid } = getAddressCookieValues(cookieString);
    const providers = await getProviders(oid);
    const technologies = await getTechnologies(oid);

    // Sort options
    const selectedSortOption = getSortSelectedOption(searchParams['sort'] || '');

    // Provider options
    const providerParams = searchParams['providers']?.split(',') || [];
    const providerOptions = getProviderOptions(providers);
    const providerSelectedOptions = getFilterSelectedOptions(providerOptions, providerParams);

    // Technology options
    const technologyParams = searchParams['technologies']?.split(',') || [];
    const tecnologyOptions = getTechnologyOptions(technologies);
    const tecnhologySelectedOptions = getFilterSelectedOptions(tecnologyOptions, technologyParams);

    const filters = {
        providers: { options: providerOptions, selected: providerSelectedOptions },
        technologies: { options: tecnologyOptions, selected: tecnhologySelectedOptions },
    };

    return (
        <SectionLayout>
            <h1 className="text-[calc(1.275rem+0.3vw)] md:text-2xl font-extrabold mb-6">
                {t('packagesSection.title')}
            </h1>
            <div className="md:flex gap-5">
                <div className="md:w-4/5">
                    <div className="max-md:hidden my-4 flex justify-end">
                        <Sort options={SORT_OPTIONS} selected={selectedSortOption} variant="flat" />
                    </div>
                    {/* <Packages filter={activeFilter} initialPackages={packages} /> */}

                    <PackageCard originalPrice={50.99} promoPrice={40.99} className="mb-4" />
                    <PackageCard originalPrice={25.99} promoPrice={null} className="mb-4" />
                    <PackageCard originalPrice={25.99} promoPrice={null} className="mb-4" />
                    <PackageCard originalPrice={25.99} promoPrice={null} className="mb-4" />
                </div>
                <div className="hidden md:block md:w-1/5">
                    <CheckboxFiltersGroup filters={filters} />
                </div>
            </div>
            <SortingToolbar
                className="md:hidden"
                sortOptions={{ options: SORT_OPTIONS, selected: selectedSortOption }}
                filters={filters}
            />
        </SectionLayout>
    );
}

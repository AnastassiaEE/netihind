import SectionLayout from '@/layouts/SectionLayout';
import Packages from '@/components/ui/address/packages/Packages';
import { SORT_OPTIONS, getFilterData, getSortSelectedOption } from '@/utils/packagesHelper';
import React from 'react';
// import Modal from '@/components/ui/modal/Modal';
import Sort from '@/components/ui/sorting/Sort';
import SortingToolbar from '@/components/ui/sorting/SortingToolbar';
import { getCookie } from 'cookies-next';
import { getAddressCookieValues } from '@/utils/addressCookieHelper';
import { cookies } from 'next/headers';
import { getPackages, getProviders, getTechnologies } from '@/lib/packagesDataFetch';
import { getTranslations } from 'next-intl/server';
import CheckboxFilters from '@/components/ui/sorting/CheckboxFilters';
import PackagesError from '@/components/ui/errors/PackagesError';

export default async function AddressPackagesSection({
    searchParams,
}: {
    searchParams: { [key: string]: string };
}) {
    const t = await getTranslations(['AddressPage', 'Errors']);
    const cookieString = getCookie('ADDRESS', { cookies });
    const { fullAddress, oid } = getAddressCookieValues(cookieString);
    const providers = await getProviders(oid);
    const technologies = await getTechnologies(oid);

    // Sort options
    const selectedSortOption = getSortSelectedOption(searchParams['sort'] || '');

    // Provider options
    const providerFilterData = getFilterData(searchParams, 'providers', 'id', 'name', providers);
    const providerSelectedIds = providerFilterData.selected.map((option) => option.value);

    // Technology options
    const technologyFilterData = getFilterData(
        searchParams,
        'technologies',
        'id',
        'abbr',
        technologies,
    );
    const technologySelectedIds = technologyFilterData.selected.map((option) => option.value);

    const filters = {
        providers: providerFilterData,
        technologies: technologyFilterData,
    };

    // Packages
    let error = null;
    const packages: { [key: string]: any }[] = await getPackages(
        oid,
        selectedSortOption,
        providerSelectedIds,
        technologySelectedIds,
    ).catch((e) => {
        error = (e as Error)?.message ?? String(e);
    });

    return (
        <SectionLayout>
            <h1 className="text-[calc(1.275rem+0.3vw)] md:text-2xl font-extrabold mb-6">
                {t('AddressPage.packagesSection.title')}
            </h1>
            <div className="md:flex md:justify-between">
                <div className="md:w-8/12">
                    <div className="max-md:hidden my-4 flex justify-end">
                        <Sort options={SORT_OPTIONS} selected={selectedSortOption} variant="flat" />
                    </div>
                    <Packages
                        oid={oid}
                        initialPackages={packages}
                        initialError={error}
                        sortOption={selectedSortOption}
                        providers={providerSelectedIds}
                        technologies={technologySelectedIds}
                    />
                </div>
                <div className="hidden md:block md:w-3/12">
                    <CheckboxFilters
                        filters={filters}
                        className="md:bg-primary-light/40 md:p-8 md:rounded-lg"
                    />
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

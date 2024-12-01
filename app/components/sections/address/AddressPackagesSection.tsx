'use client';

import SectionLayout from '@/layouts/SectionLayout';
import Packages from '@/components/ui/address/packages/Packages';
import ButtonsFilter from '@/components/ui/sorting/ButtonsFilter';
import { H1 } from '@/components/ui/headings/RestPageHeadings';
// import SelectSort from '@/components/ui/sorting/SelectSort';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
    FILTERS,
    SORT_OPTIONS,
    getActiveFilter,
    getSelectedSortOption,
} from '@/utils/packagesHelper';
import React from 'react';
import PackageCard from '@/components/ui/address/packages/PackageCard';

export default function AddressPackagesSection({
    packages,
}: {
    packages?: { [key: string]: string }[];
}) {
    const t = useTranslations('AddressPage');
    const searchParams = useSearchParams();

    const activeFilter = getActiveFilter(searchParams.get('filter'));
    const selectedSortOption = getSelectedSortOption(searchParams.get('sort'));

    const filtersWithState = FILTERS.reduce(
        (acc, filter) => ({
            ...acc,
            [filter]: filter === activeFilter,
        }),
        {},
    );

    return (
        <SectionLayout>
            <h1 className="text-[calc(1.275rem+0.3vw)] md:text-2xl font-extrabold mb-6">{t('packagesSection.title')}</h1>
            <div className="flex gap-5">
                <div className="grow">
                    <div className="mb-6">
                        <ButtonsFilter filters={filtersWithState} />
                    </div>
                    <div>
                        {/* <SelectSort options={SORT_OPTIONS} selectedOption={selectedSortOption} /> */}
                    </div>
                    {/* <Packages filter={activeFilter} initialPackages={packages} /> */}
                    <PackageCard />
                </div>
                <div className="w-1/5">
                    filters
                </div>
            </div>
        </SectionLayout>
    );
}

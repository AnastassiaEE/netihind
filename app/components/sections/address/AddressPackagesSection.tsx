'use client';

import SectionLayout from '@/layouts/SectionLayout';
import Packages from '@/components/ui/address/packages/Packages';
import ButtonsFilter from '@/components/ui/sorting/ButtonsFilter';
import { H2 } from '@/components/ui/headings/RestPageHeadings';
// import SelectSort from '@/components/ui/sorting/SelectSort';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
    FILTERS,
    SORT_OPTIONS,
    getActiveFilter,
    getSelectedSortOption,
} from '@/utils/packagesHelper';
import { useMemo } from 'react';
import React from 'react';

export default function AddressPackagesSection({
    packages,
}: {
    packages: { [key: string]: string }[];
}) {
    const t = useTranslations('AddressPage');
    const searchParams = useSearchParams();

    const activeFilter = getActiveFilter(searchParams.get('filter'));
    const selectedSortOption = getSelectedSortOption(searchParams.get('sort'));
    const filtersWithState = useMemo(
        () =>
            FILTERS.reduce(
                (acc, filter) => ({
                    ...acc,
                    [filter]: filter === activeFilter,
                }),
                {},
            ),
        [activeFilter],
    );

    return (
        <SectionLayout className="pt-24">
            <H2>{t('packagesSection.title')}</H2>
            <div className="mb-12">
                <ButtonsFilter filters={filtersWithState} />
                {/* <SelectSort options={SORT_OPTIONS} selectedOption={selectedSortOption} /> */}
            </div>
            <Packages filter={activeFilter} initialPackages={packages} />
        </SectionLayout>
    );
}

'use client';

import SectionLayout from '@/layouts/SectionLayout';
import Packages from '@/components/ui/packages/Packages';
import { SORT_OPTIONS, getSortSelectedOption } from '@/utils/packagesHelper';
import React from 'react';
import Sort from '@/components/ui/sorting/Sort';
import SortingToolbar from '@/components/ui/sorting/SortingToolbar';
import { getProviders, getTechnologies } from '@/lib/packagesDataFetch';
import CheckboxFilters from '@/components/ui/sorting/CheckboxFilters';
import HomeIcon from '@mui/icons-material/Home';
import { useTranslations } from 'next-intl';
import PingLoader from '@/components/ui/loaders/PingLoader';
import usePackagesCheckboxFilter from '@/hooks/usePackagesCheckboxFilter';

export default function AddressPackagesSection({
  searchParams,
  address,
  oid,
}: {
  searchParams: { [key: string]: string };
  address: string;
  oid: string;
}) {
  const t = useTranslations('AddressPage');

  const {
    filterData: providerFilterData,
    selectedIds: providerSelectedIds,
    isLoading: isProviderFiltersLoading,
  } = usePackagesCheckboxFilter(
    oid,
    searchParams,
    'providers',
    getProviders,
    'providers',
    'name',
  );
  const {
    filterData: technologyFilterData,
    selectedIds: technologySelectedIds,
    isLoading: isTechnologyFiltersLoading,
  } = usePackagesCheckboxFilter(
    oid,
    searchParams,
    'technologies',
    getTechnologies,
    'technologies',
    'abbr',
  );

  const filters = {
    providers: providerFilterData,
    technologies: technologyFilterData,
  };

  const isFiltersLoading =
    isProviderFiltersLoading && isTechnologyFiltersLoading;

  // Sort options
  const selectedSortOption = getSortSelectedOption(searchParams['sort'] || '');

  return (
    <SectionLayout>
      <h1 className="mb-6 text-[calc(1.275rem+0.3vw)] font-extrabold md:text-2xl">
        {t('packagesSection.title')}
      </h1>
      <p className="mb-6 font-medium">
        <HomeIcon className="mr-1 inline align-sub text-primary" />
        {address}
      </p>
      <>
        <div className="md:flex">
          <div className="md:w-8/12">
            <div className="sticky top-0 z-10 flex justify-end rounded-l-md bg-primary-light/80 p-5 backdrop-blur-md max-md:hidden">
              <Sort
                name="packages"
                variant="desktop"
                options={SORT_OPTIONS}
                selected={selectedSortOption}
                className="rounded-md border border-muted-light bg-white"
              />
            </div>
            <div className="px-5 pt-5">
              <Packages
                oid={oid}
                address={address}
                sortOption={selectedSortOption}
                providers={providerSelectedIds}
                technologies={technologySelectedIds}
              />
            </div>
          </div>
          <div className="hidden rounded-r-md rounded-bl-md bg-primary-light/80 md:block md:w-4/12">
            <div className="sticky top-0 h-screen overflow-y-auto p-8">
              {isFiltersLoading ? (
                <PingLoader />
              ) : (
                <CheckboxFilters filters={filters} />
              )}
            </div>
          </div>
        </div>
        <SortingToolbar
          className="md:hidden"
          sortOptions={{
            options: SORT_OPTIONS,
            selected: selectedSortOption,
          }}
          filters={filters}
        />
      </>
    </SectionLayout>
  );
}

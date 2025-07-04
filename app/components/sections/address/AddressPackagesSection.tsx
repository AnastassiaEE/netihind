'use client';

import SectionLayout from '@/layouts/SectionLayout';
import Packages from '@/components/ui/packages/Packages';
import { SORT_OPTIONS, getSortSelectedOption } from '@/utils/packagesHelper';
import React from 'react';
import Sort from '@/components/ui/sorting/Sort';
import SortingToolbar from '@/components/ui/sorting/SortingToolbar';
import { getCookie } from 'cookies-next';
import { getAddressCookieValues } from '@/utils/addressCookieHelper';
import { getProviders, getTechnologies } from '@/lib/packagesDataFetch';
import CheckboxFilters from '@/components/ui/sorting/CheckboxFilters';
import HomeIcon from '@mui/icons-material/Home';
import { useTranslations } from 'next-intl';
import PingLoader from '@/components/ui/loaders/PingLoader';
import usePackagesCheckboxFilter from '@/hooks/usePackagesCheckboxFilter';

export default function AddressPackagesSection({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const t = useTranslations('AddressPage');

  const cookieString = getCookie('ADDRESS');
  const { fullAddress: address, oid } = getAddressCookieValues(cookieString);
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

  const isFiltersLoading =
    isProviderFiltersLoading && isTechnologyFiltersLoading;

  // Sort options
  const selectedSortOption = getSortSelectedOption(searchParams['sort'] || '');

  const filters = {
    providers: providerFilterData,
    technologies: technologyFilterData,
  };

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
          <div className="md:w-8/12 md:pr-8">
            <div className="sticky top-0 mb-4 flex justify-end bg-white max-md:hidden">
              <Sort
                name="packages"
                variant="desktop"
                options={SORT_OPTIONS}
                selected={selectedSortOption}
                className="rounded-md border border-muted-light"
              />
            </div>
            <Packages
              oid={oid}
              address={address}
              sortOption={selectedSortOption}
              providers={providerSelectedIds}
              technologies={technologySelectedIds}
            />
          </div>
          <div className="hidden rounded-lg bg-primary-light md:block md:w-4/12">
            <div className="sticky top-0 p-8">
              {isFiltersLoading ? (
                <PingLoader />
              ) : (
                <CheckboxFilters filters={filters} />
              )}
            </div>
          </div>
        </div>
        {/* <SortingToolbar
          className="md:hidden"
          sortOptions={{
            options: SORT_OPTIONS,
            selected: selectedSortOption,
          }}
          filters={filters}
        /> */}
      </>
    </SectionLayout>
  );
}

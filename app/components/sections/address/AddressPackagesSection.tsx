'use client';

import SectionLayout from '@/layouts/SectionLayout';
import Packages from '@/components/ui/packages/Packages';
import { SORT_OPTIONS, getSortSelectedOption } from '@/utils/packagesHelper';
import React, { useEffect, useRef, useState } from 'react';
import Sort from '@/components/ui/sorting/Sort';
import SortingToolbar from '@/components/ui/sorting/SortingToolbar';
import { getProviders, getTechnologies } from '@/lib/packagesDataFetch';
import HomeIcon from '@mui/icons-material/Home';
import { useTranslations } from 'next-intl';
import PingLoader from '@/components/ui/loaders/PingLoader';
import usePackagesFilter from '@/hooks/usePackagesFilter';
import PackagesFilters from '@/components/ui/sorting/PackagesFilters';
import { Filters } from '@/types/filters';

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
  const scrollToRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<Filters>({
    providers: { type: 'checkbox', options: [], selected: [] },
    technologies: { type: 'checkbox', options: [], selected: [] },
  });

  const {
    filterData: providerFilterData,
    filterSelectedValues: providerFilterSelectedValues,
    isLoading: isProviderFiltersLoading,
  } = usePackagesFilter(
    oid,
    searchParams,
    'providers',
    getProviders,
    'providers',
    'name',
    'checkbox',
  );
  const {
    filterData: technologyFilterData,
    filterSelectedValues: technologyFilterSelectedValues,
    isLoading: isTechnologyFiltersLoading,
  } = usePackagesFilter(
    oid,
    searchParams,
    'technologies',
    getTechnologies,
    'technologies',
    'abbr',
    'checkbox',
  );

  useEffect(() => {
    setFilters({
      providers: providerFilterData,
      technologies: technologyFilterData,
    });
  }, [providerFilterData, technologyFilterData]);

  const isFiltersLoading =
    isProviderFiltersLoading && isTechnologyFiltersLoading;

  const selectedSortOption = getSortSelectedOption(searchParams['sort'] || '');

  const clearFilters = () => {
    const cleared = (Object.keys(filters) as (keyof Filters)[]).reduce(
      (acc, key) => {
        const filter = filters[key];
        if (filter.type === 'checkbox') {
          acc[key] = {
            ...filter,
            selected: [],
          };
        } else {
          acc[key] = filter; // оставить как есть
        }
        return acc;
      },
      {} as Filters,
    );

    setFilters(cleared);
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
        <div className="md:flex" ref={scrollToRef}>
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
                providers={providerFilterSelectedValues}
                technologies={technologyFilterSelectedValues}
              />
            </div>
          </div>
          <div className="hidden rounded-r-md rounded-bl-md bg-primary-light/80 md:block md:w-4/12">
            <div className="sticky top-0 h-screen overflow-y-auto p-8">
              {isFiltersLoading ? (
                <PingLoader sizeClass="h-10 w-10" />
              ) : (
                <PackagesFilters
                  filters={filters}
                  setFilters={setFilters}
                  clearFilters={clearFilters}
                />
              )}
            </div>
          </div>
        </div>
        <SortingToolbar
          sortOptions={{
            options: SORT_OPTIONS,
            selected: selectedSortOption,
          }}
          filters={filters}
          setFilters={setFilters}
          clearFilters={clearFilters}
          className="md:hidden"
        />
      </>
    </SectionLayout>
  );
}

'use client';

import SectionLayout from '@/layouts/SectionLayout';
import Packages from '@/components/ui/packages/Packages';
import { SORT_OPTIONS } from '@/utils/packagesHelper';
import React, { useRef } from 'react';
import Sort from '@/components/ui/sorting/Sort';
import HomeIcon from '@mui/icons-material/Home';
import { useTranslations } from 'next-intl';
import PingLoader from '@/components/ui/loaders/PingLoader';
import PackagesFilters from '@/components/ui/packages/filters/PackagesFilters';
import PackagesSortingToolbar from '@/components/ui/packages/sorting/PackagesSortingToolbar';
import usePackagesFilters from '@/hooks/packages/usePackagesFilters';

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
  const shouldScrollRef = useRef(false);
  const isPackagesLoadedRef = useRef(false);

  const handleUserInteraction = () => {
    shouldScrollRef.current = true;
  };

  const handlePackagesLoaded = () => {
    isPackagesLoadedRef.current = true;

    if (shouldScrollRef.current) {
      scrollToRef.current?.scrollIntoView({ behavior: 'smooth' });
      shouldScrollRef.current = false;
      isPackagesLoadedRef.current = false;
    }
  };

  const {
    filters,
    setFilters,
    isFiltersInitialized,
    clearFilters,
    providerFilterSelectedValues,
    technologyFilterSelectedValues,
    selectedSortOption,
    setSelectedSortOption,
  } = usePackagesFilters(oid, searchParams, handleUserInteraction);

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
          <div className="md:w-9/12">
            <div className="sticky top-0 z-10 flex justify-end rounded-l-lg bg-primary-light/80 p-5 backdrop-blur-md max-md:hidden">
              <Sort
                name="packages"
                variant="labeled"
                options={SORT_OPTIONS}
                selectedOption={selectedSortOption}
                setSelectedOption={setSelectedSortOption}
                onUserChange={handleUserInteraction}
                className="rounded-md border border-muted-light bg-white"
              />
            </div>
            <div className="md:px-5 md:pt-5">
              <Packages
                oid={oid}
                address={address}
                sortOption={selectedSortOption}
                providers={providerFilterSelectedValues}
                technologies={technologyFilterSelectedValues}
                onLoaded={handlePackagesLoaded}
              />
            </div>
          </div>
          <div className="hidden rounded-r-lg rounded-bl-lg bg-primary-light/80 md:block md:w-3/12">
            <div className="sticky top-0 h-screen overflow-y-auto p-8">
              {!isFiltersInitialized ? (
                <PingLoader sizeClass="h-10 w-10" />
              ) : (
                <PackagesFilters
                  filters={filters}
                  setFilters={setFilters}
                  clearFilters={clearFilters}
                  onUserChange={handleUserInteraction}
                  isFiltersInitialized={isFiltersInitialized}
                />
              )}
            </div>
          </div>
        </div>
        <PackagesSortingToolbar
          sortOptions={{
            options: SORT_OPTIONS,
            selected: selectedSortOption,
          }}
          setSelectedSortOption={setSelectedSortOption}
          filters={filters}
          setFilters={setFilters}
          clearFilters={clearFilters}
          onUserChange={handleUserInteraction}
          isFiltersInitialized={isFiltersInitialized}
          className="md:hidden"
        />
      </>
    </SectionLayout>
  );
}

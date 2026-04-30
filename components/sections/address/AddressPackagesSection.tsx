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
import { Button } from '@/components/ui/buttons/Button';

export default function AddressPackagesSection({
  searchParams,
  address,
  oid,
}: {
  searchParams: Record<string, string>;
  address: string;
  oid: string;
}) {
  const tPage = useTranslations('AddressPage');
  const tFilters = useTranslations('Filters');

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
    handleFilterChange,
    isFiltersLoaded,
    clearFilters,
    selectedByFilter,
    selectedIdsByFilter,
    selectedBySort,
    handleSortChange,
  } = usePackagesFilters(oid, searchParams, handleUserInteraction);

  return (
    <SectionLayout>
      <h1 className="mb-6 text-[calc(1.275rem+0.3vw)] font-extrabold md:text-2xl">
        {tPage('packagesSection.title')}
      </h1>
      <p className="mb-6 font-medium">
        <HomeIcon className="text-primary mr-1 inline align-sub" />
        {address}
      </p>
      <>
        <div className="md:flex" ref={scrollToRef}>
          <div className="md:w-9/12">
            <div className="bg-primary-light/80 sticky top-0 z-10 flex justify-end rounded-l-lg p-5 backdrop-blur-md max-md:hidden">
              <Sort
                name="packages"
                variant="labeled"
                options={SORT_OPTIONS}
                selectedBySort={selectedBySort}
                onSortChange={handleSortChange}
                className="border-muted-light rounded-md border bg-white"
              />
            </div>
            <div className="md:pt-5 md:pr-5">
              <Packages
                oid={oid}
                address={address}
                sortOption={selectedBySort}
                providers={selectedIdsByFilter.providers}
                technologies={selectedIdsByFilter.technologies}
                onLoaded={handlePackagesLoaded}
              />
            </div>
          </div>
          <aside className="bg-primary-light/80 hidden rounded-r-lg rounded-bl-lg md:block md:w-3/12">
            <div className="sticky top-0 h-screen overflow-y-auto p-8">
              {!isFiltersLoaded ? (
                <PingLoader sizeClass="h-10 w-10" />
              ) : (
                <>
                  <div className="mb-4 flex flex-wrap justify-between">
                    <p className="text-xl font-extrabold text-black">
                      {tFilters('labels.filters')}
                    </p>
                    <Button
                      variant="link"
                      className="p-0!"
                      onClick={clearFilters}
                    >
                      {tFilters('buttons.clear')}
                    </Button>
                  </div>
                  <PackagesFilters
                    filters={filters}
                    selectedByFilter={selectedByFilter}
                    onFilterChange={handleFilterChange}
                  />
                </>
              )}
            </div>
          </aside>
        </div>
        <PackagesSortingToolbar
          sortOptions={{
            options: SORT_OPTIONS,
            selected: selectedBySort,
          }}
          onSortChange={handleSortChange}
          filters={filters}
          selectedByFilter={selectedByFilter}
          onFilterChange={handleFilterChange}
          clearFilters={clearFilters}
          className="md:hidden"
        />
      </>
    </SectionLayout>
  );
}

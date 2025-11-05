'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { Filters } from '@/types/filters.types';
import PackagesFilterAccordion from '@/components/ui/packages/filters/PackagesFilterAccordion';
import CheckboxFilter from '@/components/ui/filters/CheckboxFilter';
import useFiltersUrlSync from '@/hooks/useFiltersUrlSync';

export default function PackagesFilters({
  filters,
  setFilters,
  onUserChange,
  isFiltersLoaded,
}: {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onUserChange?: () => void;
  isFiltersLoaded: boolean;
}) {
  const t = useTranslations('Filters');
  useFiltersUrlSync(filters, isFiltersLoaded);

  return (
    <>
      {Object.entries(filters)
        .filter(
          ([_, filterData]) =>
            filterData.options && filterData.options.length > 0,
        )
        .map(([filterName, filterData]) => (
          <PackagesFilterAccordion
            key={filterName}
            filterName={t(`categories.${filterName}` as any)}
            className="mb-4"
          >
            {filterData.type === 'checkbox' && (
              <CheckboxFilter
                name={filterName}
                filter={filterData}
                setFilters={setFilters}
                onUserChange={onUserChange}
                size="lg"
              />
            )}
          </PackagesFilterAccordion>
        ))}
    </>
  );
}

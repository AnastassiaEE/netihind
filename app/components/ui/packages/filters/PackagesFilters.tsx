'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import {
  Filters,
  SelectedByFilter,
  OnFilterChange,
} from '@/types/filters.types';
import PackagesFilterAccordion from '@/components/ui/packages/filters/PackagesFilterAccordion';
import CheckboxFilter from '@/components/ui/filters/CheckboxFilter';
import { translateKey } from '@/utils/translationHelper';

export default function PackagesFilters({
  filters,
  selectedByFilter,
  onFilterChange,
}: {
  filters: Filters;
  selectedByFilter: SelectedByFilter;
  onFilterChange: OnFilterChange;
}) {
  const t = useTranslations('Filters.categories');

  return (
    <>
      {Object.entries(filters)
        .filter(
          ([, filterData]) =>
            filterData.options && filterData.options.length > 0,
        )
        .map(([filterName, filterData]) => (
          <PackagesFilterAccordion
            key={filterName}
            filterName={translateKey(t, filterName)}
            className="mb-4"
          >
            {filterData.type === 'checkbox' && (
              <CheckboxFilter
                name={filterName}
                filter={filterData}
                selectedValues={selectedByFilter[filterName] || []}
                onFilterChange={onFilterChange}
                size="lg"
              />
            )}
          </PackagesFilterAccordion>
        ))}
    </>
  );
}

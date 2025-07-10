'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import Button from '@/components/ui/form/buttons/Button';
import { Filters } from '@/types/filters';
import PackagesFilterAccordion from '@/components/ui/packages/filters/PackagesFilterAccordion';
import CheckboxFilter from '@/components/ui/filters/CheckboxFilter';
import useFiltersUrlSync from '@/hooks/useFiltersUrlSync';

export default function PackagesFilters({
  type = 'desktop',
  filters,
  setFilters,
  clearFilters,
  onUserChange,
  className,
}: {
  type?: 'desktop' | 'mobile';
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  clearFilters: () => void;
  onUserChange?: () => void;
  className?: string;
}) {
  const t = useTranslations('Filters');
  useFiltersUrlSync(filters);

  return (
    <aside className={className}>
      {type === 'desktop' && (
        <div className="mb-4 flex flex-wrap justify-between">
          <p className="text-xl font-extrabold text-black">{t('filters')}</p>
          <Button variant="text" className="!p-0" handleClick={clearFilters}>
            {t('clear')}
          </Button>
        </div>
      )}

      {Object.entries(filters)
        .filter(
          ([_, filterData]) =>
            filterData.options && filterData.options.length > 0,
        )
        .map(([filterName, filterData]) => (
          <PackagesFilterAccordion
            key={filterName}
            filterName={t(filterName)}
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
    </aside>
  );
}

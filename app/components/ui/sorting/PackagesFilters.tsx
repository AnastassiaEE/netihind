'use client';

import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';
import Button from '@/components/ui/form/buttons/Button';
import CheckboxGroup from '@/components/ui/form/fields/checkbox/CheckboxGroup';
import useCheckboxFilters from '@/hooks/useCheckboxFilters';
import { CheckboxFilters, Filters } from '@/types/filters';

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

  const checkboxFilters = useMemo(() => {
    return Object.fromEntries(
      Object.entries(filters).filter(
        ([_, filter]) => filter.type === 'checkbox',
      ),
    ) as CheckboxFilters;
  }, [filters]);

  const { handleChange } = useCheckboxFilters(
    checkboxFilters,
    setFilters,
    onUserChange,
  );

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
      {/* <Accordion arrowPosition="right" collapsed={false}>
        {Object.entries(filters)
          .filter(
            ([_, filterData]) =>
              filterData.options && filterData.options.length > 0,
          )
          .map(([filterName, filterData]) => (
            <AccordionItem key={filterName}>
              <AccordionItemHeader>
                <span className="text-sm font-semibold text-muted-dark">
                  {t(filterName)}
                </span>
              </AccordionItemHeader>
              <AccordionItemBody>
                {filterData.type === 'checkbox' && (
                  <CheckboxGroup
                    name={filterName}
                    options={filterData.options}
                    selected={filterData.selected}
                    checkboxSize="lg"
                    handleChange={handleChange}
                  />
                )}
              </AccordionItemBody>
            </AccordionItem>
          ))}
      </Accordion> */}
    </aside>
  );
}

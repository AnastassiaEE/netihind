'use client';

import Accordion from '@/components/ui/accordion/Accordion';
import { useTranslations } from 'next-intl';
import React, { forwardRef, useImperativeHandle } from 'react';
import Button from '@/components/ui/form/buttons/Button';
import CheckboxGroup from '@/components/ui/form/fields/checkbox/CheckboxGroup';
import useCheckboxFilters from '@/hooks/useCheckboxFilters';
import AccordionItem from '@/components/ui/accordion/AccordionItem';
import AccordionItemHeader from '@/components/ui/accordion/AccordionItemHeader';
import AccordionItemBody from '@/components/ui/accordion/AccordionItemBody';

type FilterOption = {
  value: string;
  label: string;
};

export type Filters = {
  [key: string]: {
    options: FilterOption[];
    selected: FilterOption[];
  };
};

type CheckboxFiltersProps = {
  filters: Filters;
  type?: 'desktop' | 'mobile';
  className?: string;
};

const CheckboxFilters = forwardRef(
  ({ filters, type = 'desktop', className }: CheckboxFiltersProps, ref) => {
    const t = useTranslations('Filters');
    const { selectedFilters, handleChange, clearFilters } =
      useCheckboxFilters(filters);

    useImperativeHandle(ref, () => ({ clearFilters }));

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
        <Accordion arrowPosition="right" collapsed={false}>
          {Object.entries(selectedFilters)
            .filter(
              ([filterKey, filterValue]) =>
                filterValue.options && filterValue.options.length > 0,
            )
            .map(([filterKey, filterValue]) => (
              <AccordionItem key={filterKey}>
                <AccordionItemHeader>
                  <span className="text-sm font-semibold text-muted-dark">
                    {t(filterKey)}
                  </span>
                </AccordionItemHeader>
                <AccordionItemBody>
                  <CheckboxGroup
                    name={filterKey}
                    options={filterValue.options}
                    selected={filterValue.selected}
                    checkboxSize="lg"
                    handleChange={handleChange}
                  />
                </AccordionItemBody>
              </AccordionItem>
            ))}
        </Accordion>
      </aside>
    );
  },
);

CheckboxFilters.displayName = 'CheckboxFiltersGroup';
export default CheckboxFilters;

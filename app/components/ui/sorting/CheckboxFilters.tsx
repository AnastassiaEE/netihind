'use client';

import Accordion from '@/components/ui/accordion/Accordion';
import { useTranslations } from 'next-intl';
import React, { forwardRef, useImperativeHandle } from 'react';
import Button from '@/components/ui/form/buttons/Button';
import CheckboxGroup from '@/components/ui/form/fields/checkbox/CheckboxGroup';
import useCheckboxFilters from '@/hooks/useCheckboxFilters';

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
};

const CheckboxFilters = forwardRef(({ filters, type = 'desktop' }: CheckboxFiltersProps, ref) => {
    const t = useTranslations('Filters');
    const { selectedFilters, handleChange, handleClear } = useCheckboxFilters(filters);

    useImperativeHandle(ref, () => ({ handleClear }));

    return (
        <>
            {type === 'desktop' && (
                <div className="flex justify-between mb-2">
                    <p className="text-xl font-extrabold text-black">{t('filters')}</p>
                    <Button variant="flat" className="!p-0" handleClick={handleClear}>
                        {t('clear')}
                    </Button>
                </div>
            )}
            <Accordion
                data={Object.entries(selectedFilters)
                    .filter(
                        ([filterKey, filterValue]) => filterValue.options && filterValue.options.length > 0,
                    )
                    .map(([filterKey, filterValue]) => ({
                        header: t(filterKey),
                        body: (
                            <CheckboxGroup
                                name={filterKey}
                                options={filterValue.options}
                                selected={filterValue.selected}
                                handleChange={handleChange}
                            />
                        ),
                    }))}
                variant="solid"
                isCollapsed={false}
                fontStyles={{ header: 'text-md text-muted-dark' }}
            />
        </>
    );
});

CheckboxFilters.displayName = 'CheckboxFiltersGroup';
export default CheckboxFilters;

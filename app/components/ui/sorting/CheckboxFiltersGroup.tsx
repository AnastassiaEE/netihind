'use client';

import Accordion from '@/components/ui/accordion/Accordion';
import CheckboxFilter from '@/components/ui/sorting/CheckboxFilter';
import { useTranslations } from 'next-intl';
import React, { forwardRef, useImperativeHandle } from 'react';
import Button from '@/components/ui/form/buttons/Button';
import useCheckboxFilterGroup from '@/hooks/useCheckboxFiltersGroup';

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

type CheckboxFiltersGroupProps = {
    filters: Filters;
    type?: 'desktop' | 'mobile';
};

const CheckboxFiltersGroup = forwardRef(
    ({ filters, type = 'desktop' }: CheckboxFiltersGroupProps, ref) => {
        const t = useTranslations('Filters');
        const { selectedFilters, handleChange, handleClear } = useCheckboxFilterGroup(filters);

        useImperativeHandle(ref, () => ({ handleClear }));

        return (
            <>
                {type === 'desktop' && (
                    <div className="flex justify-between mb-2">
                        <p className="text-lg font-extrabold text-black">{t('filters')}</p>
                        <Button variant="flat" className="!p-0" handleClick={handleClear}>
                            {t('clear')}
                        </Button>
                    </div>
                )}
                <Accordion
                    data={Object.entries(selectedFilters).map(([filterKey, filterValue]) => ({
                        header: t(filterKey),
                        body: (
                            <CheckboxFilter
                                name={filterKey}
                                options={filterValue.options}
                                selected={filterValue.selected}
                                handleChange={handleChange}
                            />
                        ),
                    }))}
                    variant="solid"
                    isCollapsed={false}
                    fontStyles={{ header: 'text-sm text-muted-dark' }}
                />
            </>
        );
    },
);

CheckboxFiltersGroup.displayName = 'CheckboxFiltersGroup';
export default CheckboxFiltersGroup;

'use client';

import Accordion from '@/components/ui/accordion/Accordion';
import CheckboxFilter from '@/components/ui/sorting/CheckboxFilter';
import { useTranslations } from 'next-intl';
import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import Button from '@/components/ui/form/buttons/Button';
import useCheckboxFilterGroup from '@/hooks/useCheckboxFiltersGroup';

type FilterOption = {
    value: string;
    label: string;
};

type Filters = {
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
        const { handleClear } = useCheckboxFilterGroup(filters);

        useImperativeHandle(ref, () => ({ handleClear }));

        const AccordionComponent = useMemo(
            () => (
                <Accordion
                    data={Object.entries(filters).map(([filterKey, filterValue]) => ({
                        header: t(filterKey),
                        body: (
                            <CheckboxFilter
                                name={filterKey}
                                options={filterValue.options}
                                selected={filterValue.selected}
                            />
                        ),
                    }))}
                    variant="solid"
                    isCollapsed={false}
                    fontStyles={{ header: 'text-sm text-muted-dark' }}
                />
            ),
            [filters, t],
        );

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
                {AccordionComponent}
            </>
        );
    },
);

CheckboxFiltersGroup.displayName = 'CheckboxFiltersGroup';
export default CheckboxFiltersGroup;

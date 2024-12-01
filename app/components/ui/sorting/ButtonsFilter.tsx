'use client';

import useButtonsFilter from '@/hooks/useButtonsFilter';
import Button from '@/components/ui/form/buttons/Button';
import { useTranslations } from 'next-intl';
import React from 'react';

export default React.memo(function ButtonsFilter({ filters }: { filters: { [key: string]: boolean } }) {
    const { usedFilters, handleFilterClick } = useButtonsFilter(filters);
    const t = useTranslations('Filters');
    return (
        <div className="flex flex-wrap gap-2">
            {Object.entries(usedFilters).map(([filter, isActive]) => (
                <Button
                    key={filter}
                    handleClick={() => handleFilterClick(filter)}
                    variant={isActive ? 'primary' : 'neutral'}
                    className="rounded-md uppercase"
                    name={filter}
                >
                    {t(filter)}
                </Button>
            ))}
        </div>
    );
})

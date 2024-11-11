'use client';

import useButtonsFilter from '@/hooks/useButtonsFilter';
import Button from '@/components/ui/form/buttons/Button';
import { useMediaQuery } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function ButtonsFilter({ filters }: { filters: { [key: string]: boolean } }) {
    const { usedFilters, handleFilterClick } = useButtonsFilter(filters);
    const isSmallScreen = useMediaQuery('(max-width:540px)');
    const t = useTranslations('AddressPage');
    return (
        <div className="flex flex-wrap gap-2">
            {Object.keys(usedFilters).map((filter) => (
                <Button
                    key={filter}
                    handleClick={handleFilterClick}
                    variant={usedFilters[filter] ? 'primary' : 'secondary'}
                    size={isSmallScreen ? 'sm' : 'lg'}
                    className="rounded-md uppercase"
                    name={filter}
                >
                    {t(`filters.${filter}`)}
                </Button>
            ))}
        </div>
    );
}

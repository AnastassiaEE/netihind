'use client';

import useButtonsFilter from '@/hooks/useButtonsFilter';
import Button from '@/components/ui/form/buttons/Button';

export default function ButtonsFilter({ filters }: { filters: { [key: string]: boolean } }) {
    const { usedFilters, handleFilterClick } = useButtonsFilter(filters);
    return (
        <div className="flex flex-wrap gap-2">
            {Object.keys(usedFilters).map((filter) => (
                <Button
                    key={filter}
                    handleClick={handleFilterClick}
                    variant={usedFilters[filter] ? 'primary' : 'secondary'}
                    size="sm"
                    className="!w-max rounded-md uppercase"
                    name={filter}
                >
                    {filter}
                </Button>
            ))}
        </div>
    );
}

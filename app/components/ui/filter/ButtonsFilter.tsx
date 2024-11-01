'use client';

import useButtonsFilter from '@/hooks/useButtonsFilter';
import Button from '@/components/ui/form/buttons/Button';

export default function ButtonsFilter({ buttons }: { buttons: { [key: string]: boolean } }) {
    const { usedFilters, handleFilterClick } = useButtonsFilter(buttons);
    return (
        <div className="flex flex-wrap gap-2">
            {Object.keys(buttons).map((button) => (
                <Button
                    key={button}
                    handleClick={handleFilterClick}
                    variant={usedFilters[button] ? 'primary' : 'secondary'}
                    size="lg"
                    className="!w-max rounded-md uppercase"
                    name={button}
                >
                    {button}
                </Button>
            ))}
        </div>
    );
}

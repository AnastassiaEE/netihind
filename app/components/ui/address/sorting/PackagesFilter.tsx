import CheckboxFilter from '@/components/ui/sorting/CheckboxFilter';
import React from 'react';

export default function PackagesFilter({
    filters,
}: {
    filters: {
        [key: string]: {
            options: {
                value: string;
                label: string;
            }[];
            selectedOptions: {
                value: string;
                label: string;
            }[];
        };
    };
}) {
    return (
        <>
            <p>Фильтры</p>
            {Object.entries(filters).map(([filterKey, filterValue]) => (
                <React.Fragment key={filterKey}>
                    <p>{filterKey}</p>
                    <CheckboxFilter
                        name={filterKey}
                        options={filterValue.options}
                        selected={filterValue.selectedOptions}
                    />
                </React.Fragment>
            ))}
        </>
    );
}

import Accordion from '@/components/ui/accordion/Accordion';
import CheckboxFilter from '@/components/ui/sorting/CheckboxFilter';
import { useTranslations } from 'next-intl';
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
    const t = useTranslations('Filters');
    return (
        <aside>
            <p className="text-lg font-extrabold mb-2 text-black">{t('filters')}</p>
            <Accordion
                data={Object.entries(filters).map(([filterKey, filterValue]) => ({
                    header: t(filterKey),
                    body: (
                        <CheckboxFilter
                            name={filterKey}
                            options={filterValue.options}
                            selected={filterValue.selectedOptions}
                        />
                    ),
                }))}
                variant="solid"
                isCollapsed={false}
                fontStyles={{ header: 'text-sm text-muted-dark' }}
            />
        </aside>
    );
}

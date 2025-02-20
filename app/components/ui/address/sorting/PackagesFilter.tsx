'use client'

import Accordion from '@/components/ui/accordion/Accordion';
import CheckboxFilter from '@/components/ui/sorting/CheckboxFilter';
import { useTranslations } from 'next-intl';
import React from 'react';
import Button from '@/components/ui/form/buttons/Button';
import { useParams, useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';

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
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const searchParams = useSearchParams();

    const handleClear = () => {
        const newSearchParams = new URLSearchParams(searchParams);
        Object.keys(filters).forEach((filterKey) => {
            newSearchParams.delete(filterKey);
        });
        const searchParamsObject = Object.fromEntries(newSearchParams.entries());
        router.replace(
            // @ts-expect-error
            { pathname, params, query: searchParamsObject },
            { scroll: false },
        );
    }

    return (
        <aside>
            <div className="flex justify-between mb-2">
                <p className="text-lg font-extrabold text-black">{t('filters')}</p>
                <Button variant="flat" className="!p-0" handleClick={handleClear}>{t('clear')}</Button>
            </div>
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

'use client';

import classNames from 'classnames';
import CheckboxFilters from '@/components/ui/sorting/CheckboxFilters';
import Button from '@/components/ui/form/buttons/Button';
import Sort from '@/components/ui/sorting/Sort';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import SlideUpPanel from '@/components/ui/modal/SlideUpPanel';
import useOverlay from '@/hooks/useOverlay';

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

type SortOptions = {
    options: string[];
    selected: string;
};

interface SortingToolbarProps {
    className?: string;
    sortOptions?: SortOptions;
    filters?: Filters;
}

export default function SortingToolbar({ className, sortOptions, filters }: SortingToolbarProps) {
    const toolbarClasses = classNames(
        'sticky bottom-0 flex justify-around bg-white shadow-top px-2 py-4 w-[105%] -mx-[2.5%] mt-7',
        className,
    );
    const t = useTranslations('Filters');

    const {
        isOverlayVisible: isPanelOpened,
        openOverlay: openPanel,
        closeOverlay: closePanel,
    } = useOverlay();

    const checkboxFiltersGroupRef = useRef<{ handleClear: () => void } | null>(null);

    const handleFiltersClear = () => {
        if (checkboxFiltersGroupRef.current) {
            checkboxFiltersGroupRef.current.handleClear();
        }
    };

    const panelActions = (
        <Button variant="secondary" handleClick={handleFiltersClear} className="w-full">
            {t('clear').toUpperCase()}
        </Button>
    );

    return (
        <>
            <div className={toolbarClasses}>
                {filters && <Button handleClick={openPanel}>{t('filter').toUpperCase()}</Button>}
                {sortOptions && (
                    <Sort
                        options={sortOptions.options}
                        selected={sortOptions.selected}
                        variant="secondary"
                        openDirection="top"
                    />
                )}
            </div>
            {filters && (
                <SlideUpPanel
                    title={t('filters')}
                    isOpened={isPanelOpened}
                    handleClose={closePanel}
                    actions={panelActions}
                >
                    <CheckboxFilters ref={checkboxFiltersGroupRef} filters={filters} type="mobile" />
                </SlideUpPanel>
            )}
        </>
    );
}

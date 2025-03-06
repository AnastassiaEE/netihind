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
    const t = useTranslations('Filters');

    const {
        isOverlayVisible: isPanelOpened,
        openOverlay: openPanel,
        closeOverlay: closePanel,
        overlayRef: panelRef,
    } = useOverlay();

    const checkboxFiltersGroupRef = useRef<{ handleClear: () => void } | null>(null);

    const handleFiltersClear = () => {
        if (checkboxFiltersGroupRef.current) {
            checkboxFiltersGroupRef.current.handleClear();
        }
    };

    const panelActions = (
        <Button handleClick={handleFiltersClear} className="w-full">
            {t('clear').toUpperCase()}
        </Button>
    );

    return (
        <>
            <div
                className={classNames(
                    'sticky bottom-0 flex flex-wrap justify-around bg-white shadow-top px-2 py-4 w-[105%] -mx-[2.5%] mt-7',
                    className,
                )}
            >
                {filters && (
                    <Button handleClick={openPanel} variant="secondary" className="min-w-[150px]">
                        {t('filter').toUpperCase()}
                    </Button>
                )}
                {sortOptions && (
                    <Sort
                        options={sortOptions.options}
                        selected={sortOptions.selected}
                        name='sort-packages'
                        variant="secondary"
                        openDirection="top"
                        className="min-w-[150px]"
                    />
                )}
            </div>
            {filters && (
                <SlideUpPanel
                    title={t('filters')}
                    isOpened={isPanelOpened}
                    handleClose={closePanel}
                    actions={panelActions}
                    panelRef={panelRef}
                    purpose="filters"
                >
                    <CheckboxFilters ref={checkboxFiltersGroupRef} filters={filters} type="mobile" />
                </SlideUpPanel>
            )}
        </>
    );
}

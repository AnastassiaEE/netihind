'use client';

import classNames from 'classnames';
import CheckboxFilters from '@/components/ui/sorting/CheckboxFilters';
import Button from '@/components/ui/form/buttons/Button';
import Sort from '@/components/ui/sorting/Sort';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import SlideUpPanel from '@/components/ui/overlay/SlideUpPanel';
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

export default function SortingToolbar({
  className,
  sortOptions,
  filters,
}: {
  className?: string;
  sortOptions?: SortOptions;
  filters?: Filters;
}) {
  const t = useTranslations('Filters');

  const {
    isOpened: isPanelOpened,
    open: openPanel,
    close: closePanel,
    overlayRef: panelRef,
  } = useOverlay();

  const checkboxFiltersGroupRef = useRef<{ clearFilters: () => void } | null>(
    null,
  );

  const clearFilters = () => {
    checkboxFiltersGroupRef.current?.clearFilters();
  };

  const panelActions = (
    <Button handleClick={clearFilters} className="w-full">
      {t('clear').toUpperCase()}
    </Button>
  );

  return (
    <>
      <div
        className={classNames(
          'sticky bottom-0 mx-[-2.5%] mt-7 flex w-[105%] flex-wrap justify-around bg-white px-2 py-4 shadow-top',
          className,
        )}
      >
        {filters && (
          <Button
            handleClick={openPanel}
            variant="outlined"
            className="min-w-[150px]"
          >
            {t('filter').toUpperCase()}
          </Button>
        )}
        {sortOptions && (
          <Sort
            name="packages"
            variant="mobile"
            openDirection="top"
            options={sortOptions.options}
            selected={sortOptions.selected}
            className="min-w-[150px]"
          />
        )}
      </div>
      {filters && (
        <SlideUpPanel
          name="filters"
          title={t('filters')}
          actions={panelActions}
          isOpened={isPanelOpened}
          handleClose={closePanel}
          panelRef={panelRef}
        >
          <CheckboxFilters
            ref={checkboxFiltersGroupRef}
            filters={filters}
            type="mobile"
          />
        </SlideUpPanel>
      )}
    </>
  );
}

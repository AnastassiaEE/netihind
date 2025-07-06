'use client';

import classNames from 'classnames';
import Button from '@/components/ui/form/buttons/Button';
import Sort from '@/components/ui/sorting/Sort';
import { useTranslations } from 'next-intl';
import SlideUpPanel from '@/components/ui/overlay/SlideUpPanel';
import useOverlay from '@/hooks/useOverlay';
import { Filters, SortOptions } from '@/types/filters';
import PackagesFilters from '@/components/ui/sorting/PackagesFilters';

export default function SortingToolbar({
  sortOptions,
  filters,
  setFilters,
  clearFilters,
  className,
}: {
  sortOptions: SortOptions;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  clearFilters: () => void;
  className?: string;
}) {
  const t = useTranslations('Filters');

  const {
    isOpened: isPanelOpened,
    open: openPanel,
    close: closePanel,
    overlayRef: panelRef,
  } = useOverlay();

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
          <PackagesFilters
            type="mobile"
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearFilters}
          />
        </SlideUpPanel>
      )}
    </>
  );
}

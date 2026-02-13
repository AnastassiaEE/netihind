'use client';

import classNames from 'classnames';
import Button from '@/components/ui/form/buttons/Button';
import Sort from '@/components/ui/sorting/Sort';
import { useTranslations } from 'next-intl';
import SlideUpPanel from '@/components/ui/overlay/SlideUpPanel';
import useOverlay from '@/hooks/useOverlay';
import { Filters, SortOptions } from '@/types/filters.types';
import PackagesFilters from '@/components/ui/packages/filters/PackagesFilters';

export default function PackagesSortingToolbar({
  sortOptions,
  setSelectedSortOption,
  filters,
  setFilters,
  clearFilters,
  onUserChange,
  isFiltersLoaded,
  className,
}: {
  sortOptions: SortOptions;
  setSelectedSortOption: React.Dispatch<React.SetStateAction<string>>;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  clearFilters: () => void;
  onUserChange?: () => void;
  isFiltersLoaded: boolean;
  className?: string;
}) {
  const t = useTranslations('Filters');

  const {
    isMounted: isPanelMounted,
    isVisible: isPanelVisible,
    open: openPanel,
    close: closePanel,
    overlayRef: panelRef,
  } = useOverlay();

  const panelActions = (
    <Button onClick={clearFilters} className="w-full">
      {t('buttons.clear').toUpperCase()}
    </Button>
  );

  return (
    <>
      <div
        className={classNames(
          'shadow-top sticky bottom-0 mx-[-2.5%] mt-7 flex w-[105%] flex-wrap justify-around bg-white px-2 py-4',
          className,
        )}
      >
        {filters && (
          <Button onClick={openPanel} variant="outlined" className="min-w-37.5">
            {t('buttons.filter').toUpperCase()}
          </Button>
        )}
        {sortOptions && (
          <Sort
            name="packages"
            variant="plain"
            openDirection="top"
            options={sortOptions.options}
            selectedOption={sortOptions.selected}
            setSelectedOption={setSelectedSortOption}
            onUserChange={onUserChange}
            className="min-w-37.5 uppercase"
          />
        )}
      </div>
      {filters && (
        <SlideUpPanel
          name="filters"
          title={t('labels.filters')}
          actions={panelActions}
          isMounted={isPanelMounted}
          isVisible={isPanelVisible}
          onClose={closePanel}
          panelRef={panelRef}
        >
          <PackagesFilters
            filters={filters}
            setFilters={setFilters}
            onUserChange={onUserChange}
            isFiltersLoaded={isFiltersLoaded}
          />
        </SlideUpPanel>
      )}
    </>
  );
}

import { Filters } from '@/types/filters.types';
import { useEffect, useState } from 'react';
import usePackagesFilter from '@/hooks/packages/usePackagesFilter';
import { getProviders, getTechnologies } from '@/lib/packagesDataFetch';
import { getSelectedSortOption } from '@/utils/packagesHelper';

/**
 * Manages the filters and sorting options for internet packages.
 *
 * This hook initializes provider and technology filters using `usePackagesFilter`,
 * manages filter state, selected values, and the currently selected sorting option.
 * It also provides a function to clear filters and notifies an optional callback
 * when the user changes filter selections.
 *
 * @param oid - Address identifier used to fetch available filters
 * @param searchParams - Current URL search parameters
 * @param onUserChange - Optional callback triggered when the user modifies filters
 *
 * @returns An object containing:
 *  - filters: current filter data for providers and technologies
 *  - setFilters: function to update filter data
 *  - isFiltersLoaded: boolean indicating whether all filter options are loaded
 *  - clearFilters: function to reset all selected filters
 *  - providerFilterSelectedValues: currently selected provider values
 *  - technologyFilterSelectedValues: currently selected technology values
 *  - selectedSortOption: currently selected sort option
 *  - setSelectedSortOption: function to update the sort option
 */
export default function usePackagesFilters(
  oid: string,
  searchParams: Record<string, string>,
  onUserChange?: () => void,
) {
  const {
    filterData: providerFilterData,
    filterSelectedValues: providerFilterSelectedValues,
    isLoading: isProviderFiltersLoading,
  } = usePackagesFilter(
    oid,
    searchParams,
    'providers',
    getProviders,
    'providers',
    'name',
    'checkbox',
  );

  const {
    filterData: technologyFilterData,
    filterSelectedValues: technologyFilterSelectedValues,
    isLoading: isTechnologyFiltersLoading,
  } = usePackagesFilter(
    oid,
    searchParams,
    'technologies',
    getTechnologies,
    'technologies',
    'name',
    'checkbox',
  );

  const [filters, setFilters] = useState<Filters>({
    providers: { type: 'checkbox', options: [], selected: [] },
    technologies: { type: 'checkbox', options: [], selected: [] },
  });

  const [selectedSortOption, setSelectedSortOption] = useState(
    getSelectedSortOption(searchParams['sort'] || ''),
  );

  const [isFiltersInitialized, setIsFiltersInitialized] = useState(false);

  /**
   * Initialize filters once provider and technology options are loaded.
   */
  useEffect(() => {
    if (
      !isFiltersInitialized &&
      providerFilterData.options.length > 0 &&
      technologyFilterData.options.length > 0
    ) {
      setFilters({
        providers: providerFilterData,
        technologies: technologyFilterData,
      });
      setIsFiltersInitialized(true);
    }
  }, [providerFilterData, technologyFilterData]);

  /**
   * Reset all checkbox filters and trigger user change callback if any selection was cleared.
   */
  const clearFilters = () => {
    let hasChanges = false;
    const cleared = (Object.keys(filters) as (keyof Filters)[]).reduce(
      (acc, key) => {
        const filter = filters[key];
        if (filter.type === 'checkbox') {
          if (filter.selected.length > 0) hasChanges = true;
          acc[key] = { ...filter, selected: [] };
        } else {
          acc[key] = filter;
        }
        return acc;
      },
      {} as Filters,
    );
    if (hasChanges) onUserChange?.();
    setFilters(cleared);
  };

  return {
    filters,
    setFilters,
    isFiltersLoaded: !isProviderFiltersLoading && !isTechnologyFiltersLoading,
    clearFilters,
    providerFilterSelectedValues,
    technologyFilterSelectedValues,
    selectedSortOption,
    setSelectedSortOption,
  };
}

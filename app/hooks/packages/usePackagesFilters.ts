import { Filters } from '@/types/filters.types';
import { useMemo, useCallback } from 'react';
import usePackagesFilter from '@/hooks/packages/usePackagesFilter';
import { getProviders, getTechnologies } from '@/lib/packagesDataFetch';
import { getSelectedSortOption } from '@/utils/packagesHelper';
import { useParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import { splitString } from '@/utils/textFormatter';
import { mapNamesOrIdsToIds } from '@/utils/filtersHelper';

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
 *  - `filters`: normalized filter configuration for providers and technologies
 *  - `handleFilterChange`: function to update a checkbox filter value
 *  - `isFiltersLoaded`: boolean indicating whether all filter options are loaded
 *  - `clearFilters`: function to reset all checkbox filters
 *  - `selectedByFilter`: raw selected values (from URL) grouped by filter
 *  - `selectedIdsByFilter`: selected values mapped strictly to valid option IDs
 *  - `selectedBySort`: currently selected sort option
 *  - `handleSortChange`: function to update sorting option
 */
export default function usePackagesFilters(
  oid: string,
  searchParams: Record<string, string>,
  onUserChange?: () => void,
) {
  const {
    filterData: providerFilterData,
    isLoading: isProviderFiltersLoading,
  } = usePackagesFilter(oid, 'providers', getProviders, 'name', 'checkbox');

  const {
    filterData: technologyFilterData,
    isLoading: isTechnologyFiltersLoading,
  } = usePackagesFilter(
    oid,
    'technologies',
    getTechnologies,
    'name',
    'checkbox',
  );

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const filters: Filters = useMemo(
    () => ({
      providers:
        providerFilterData.options.length > 0
          ? providerFilterData
          : { type: 'checkbox', options: [] },
      technologies:
        technologyFilterData.options.length > 0
          ? technologyFilterData
          : { type: 'checkbox', options: [] },
    }),
    [providerFilterData, technologyFilterData],
  );

  /**
   * Updates the current route with new query params (without scrolling).
   *
   * @param nextParams - URLSearchParams to apply
   */
  const replaceQuery = useCallback(
    (nextParams: URLSearchParams) => {
      const query = Object.fromEntries(nextParams.entries());
      router.replace(
        // @ts-expect-error - next-intl routing requires params + query object
        { pathname, params, query },
        { scroll: false },
      );
    },
    [router, pathname, params],
  );

  /**
   * Handles checkbox filter changes by updating the corresponding
   * query parameter in the URL and triggering optional user callback.
   *
   * @param filterName - Query key of the filter (e.g. "providers")
   * @param optionValue - Selected option value
   * @param isChecked - Whether the option is checked or unchecked
   */
  const handleFilterChange = useCallback(
    (filterName: string, optionValue: string, isChecked: boolean) => {
      const newSearchParams = new URLSearchParams(Object.entries(searchParams));
      const selectedValues = splitString(newSearchParams.get(filterName) || '');

      const newValues = isChecked
        ? Array.from(new Set([...selectedValues, optionValue]))
        : selectedValues.filter((v) => v !== optionValue);

      const currentSerialized = selectedValues.join(',');
      const newSerialized = newValues.join(',');
      if (currentSerialized === newSerialized) return;

      if (newValues.length > 0) {
        newSearchParams.set(filterName, newSerialized);
      } else {
        newSearchParams.delete(filterName);
      }

      replaceQuery(newSearchParams);
      onUserChange?.();
    },
    [searchParams, replaceQuery, onUserChange],
  );

  /**
   * Reset all checkbox filters and trigger user change callback if any selection was cleared.
   */
  const clearFilters = useCallback(() => {
    const newSearchParams = new URLSearchParams(Object.entries(searchParams));
    let hasChanges = false;

    (Object.keys(filters) as (keyof Filters)[]).forEach((key) => {
      const filter = filters[key];
      if (filter.type === 'checkbox') {
        const filterKey = String(key);
        if (newSearchParams.has(filterKey)) {
          newSearchParams.delete(filterKey);
          hasChanges = true;
        }
      }
    });

    if (!hasChanges) return;

    replaceQuery(newSearchParams);
    onUserChange?.();
  }, [searchParams, filters, replaceQuery, onUserChange]);

  const selectedByFilter = {
    providers: splitString(searchParams.providers),
    technologies: splitString(searchParams.technologies),
  };

  const selectedIdsByFilter = useMemo(
    () => ({
      providers: mapNamesOrIdsToIds(
        selectedByFilter.providers,
        providerFilterData.options,
      ),
      technologies: mapNamesOrIdsToIds(
        selectedByFilter.technologies,
        technologyFilterData.options,
      ),
    }),
    [
      selectedByFilter.providers,
      selectedByFilter.technologies,
      providerFilterData.options,
      technologyFilterData.options,
    ],
  );

  const selectedBySort = getSelectedSortOption(searchParams.sort || '');

  /**
   * Updates the `sort` query parameter in the URL.
   * Removes it if the default option is selected.
   *
   * @param option - Selected sort value
   */
  const handleSortChange = useCallback(
    (option: string) => {
      const newSearchParams = new URLSearchParams(Object.entries(searchParams));

      if (!option || option === 'default') {
        newSearchParams.delete('sort');
      } else {
        newSearchParams.set('sort', option);
      }
      replaceQuery(newSearchParams);
      onUserChange?.();
    },
    [searchParams, replaceQuery, onUserChange],
  );

  return {
    filters,
    handleFilterChange,
    isFiltersLoaded: !isProviderFiltersLoading && !isTechnologyFiltersLoading,
    clearFilters,
    selectedByFilter,
    selectedIdsByFilter,
    selectedBySort,
    handleSortChange,
  };
}

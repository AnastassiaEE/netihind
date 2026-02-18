import { getFilterData } from '@/utils/packagesHelper';
import { useMemo } from 'react';
import useSWR from 'swr';
import { FilterType } from '@/types/filters.types';

/**
 * Fetches and prepares filter data for internet packages,
 * synchronizing selected values with URL search parameters.
 *
 * This hook retrieves raw filter options via SWR, transforms them into
 * UI-ready filter data, and determines which values are currently selected
 * based on query parameters.
 *
 * @param oid - Address identifier used to fetch available filter options
 * @param searchParams - Current URL search parameters
 * @param fetchKey - Unique SWR key for caching and revalidation
 * @param fetcher - Function used to fetch raw filter data
 * @param queryParamKey - URL query parameter key used for this filter
 * @param labelKey - Object key used to display filter labels
 * @param filterType - Type of filter (e.g. checkbox or range)
 *
 * @returns An object containing:
 *  - `filterData`: prepared filter data ready for UI consumption, including:
 *  - `filterSelectedValues`: array of currently selected values extracted from `filterData`
 *  - `isLoading`: boolean indicating whether the filter data is currently being loaded
 */
export default function usePackagesFilter(
  oid: string,
  searchParams: Record<string, string>,
  fetchKey: string,
  fetcher: (oid: string) => Promise<any[]>,
  queryParamKey: string,
  labelKey: string,
  filterType: FilterType,
) {
  const { data, isLoading } = useSWR([fetchKey, oid], () => fetcher(oid), {
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    errorRetryCount: 0,
  });

  /**
   * Prepare UI-ready filter data and synchronize with URL query parameters.
   */
  const filterData = useMemo(() => {
    return getFilterData(
      searchParams,
      queryParamKey,
      'id',
      labelKey,
      data ?? [],
      filterType,
    );
  }, [searchParams, data, queryParamKey, labelKey, filterType]);

  /**
   * Extract selected values from prepared filter data.
   */
  const filterSelectedValues = useMemo(() => {
    return filterData.selected.map((s) => s.value);
  }, [filterData]);

  return {
    filterData,
    filterSelectedValues,
    isLoading,
  };
}

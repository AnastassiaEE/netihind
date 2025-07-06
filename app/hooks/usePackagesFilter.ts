import { getFilterData } from '@/utils/packagesHelper';
import { useMemo } from 'react';
import useSWR from 'swr';
import { FilterType } from '@/types/filters';

export default function usePackagesFilter(
  oid: string,
  searchParams: { [key: string]: string },
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

  const filterData = useMemo(() => {
    return getFilterData(
      searchParams,
      queryParamKey,
      'id',
      labelKey,
      data ?? [],
      filterType,
    );
  }, [searchParams, data]);

  const filterSelectedValues = useMemo(
    () => filterData.selected.map((s) => s.value),
    [filterData.selected],
  );

  return {
    filterData,
    filterSelectedValues,
    isLoading,
  };
}

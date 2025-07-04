import { getFilterData } from '@/utils/packagesHelper';
import useSWR from 'swr';

export default function usePackagesCheckboxFilter(
  oid: string,
  searchParams: { [key: string]: string },
  fetchKey: string,
  fetcher: (oid: string) => Promise<any[]>,
  queryParamKey: string,
  labelKey: string,
) {
  const { data, isLoading } = useSWR([fetchKey, oid], () => fetcher(oid), {
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateIfStale: true,
    errorRetryCount: 0,
  });

  const filterData = getFilterData(
    searchParams,
    queryParamKey,
    'id',
    labelKey as string,
    data ?? [],
  );

  const selectedIds = filterData.selected.map((option) => option.value);

  return {
    filterData,
    selectedIds,
    isLoading,
  };
}

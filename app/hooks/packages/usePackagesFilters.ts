import { Filters } from '@/types/filters.types';
import { useEffect, useState } from 'react';
import usePackagesFilter from '@/hooks/packages/usePackagesFilter';
import { getProviders, getTechnologies } from '@/lib/packagesDataFetch';
import { getSelectedSortOption } from '@/utils/packagesHelper';

export default function usePackagesFilters(
  oid: string,
  searchParams: { [key: string]: string },
  onUserChange?: () => void,
) {
  const [filtersInitialized, setFiltersInitialized] = useState(false);

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
    'abbr',
    'checkbox',
  );

  const [filters, setFilters] = useState<Filters>({
    providers: { type: 'checkbox', options: [], selected: [] },
    technologies: { type: 'checkbox', options: [], selected: [] },
  });

  const [selectedSortOption, setSelectedSortOption] = useState(
    getSelectedSortOption(searchParams['sort'] || ''),
  );


  useEffect(() => {
    if (!filtersInitialized &&
        providerFilterData.options.length > 0 &&
        technologyFilterData.options.length > 0) {
      setFilters({
        providers: providerFilterData,
        technologies: technologyFilterData,
      });
      setFiltersInitialized(true);
    }
  }, [providerFilterData, technologyFilterData, filtersInitialized]);

  const isFiltersInitialized =
    filtersInitialized &&
    !isProviderFiltersLoading &&
    !isTechnologyFiltersLoading;

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
    isFiltersInitialized,
    clearFilters,
    providerFilterSelectedValues,
    technologyFilterSelectedValues,
    selectedSortOption,
    setSelectedSortOption,
  };
}

import { Filters } from '@/types/filters';
import { useEffect, useState } from 'react';
import usePackagesFilter from '@/hooks/packages/usePackagesFilter';
import { getProviders, getTechnologies } from '@/lib/packagesDataFetch';

export default function usePackagesFilters(
  oid: string,
  searchParams: { [key: string]: string },
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
    'abbr',
    'checkbox',
  );

  const [filters, setFilters] = useState<Filters>({
    providers: { type: 'checkbox', options: [], selected: [] },
    technologies: { type: 'checkbox', options: [], selected: [] },
  });

  useEffect(() => {
    if (providerFilterData.options.length > 0) {
      setFilters((prev) => ({
        ...prev,
        providers: providerFilterData,
      }));
    }
  }, [providerFilterData]);

  useEffect(() => {
    if (technologyFilterData.options.length > 0) {
      setFilters((prev) => ({
        ...prev,
        technologies: technologyFilterData,
      }));
    }
  }, [technologyFilterData]);

  const isFiltersInitialized =
    !isProviderFiltersLoading && !isTechnologyFiltersLoading;

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
  };
}

import { useParams, useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import { useEffect, useState } from 'react';
import { Filters } from '@/components/ui/sorting/CheckboxFiltersGroup';

export default function useCheckboxFilterGroup(filters: Filters) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  const [selectedFilters, setSelectedFilters] = useState(filters);

  useEffect(() => {
    setSelectedFilters(filters);
  }, [filters]);

  useEffect(() => {
    const updateUrlParams = (selectedFilters: Filters) => {
      const newSearchParams = new URLSearchParams(searchParams);
      Object.entries(selectedFilters).forEach(([name, filter]) => {
        filter.selected.length > 0
          ? newSearchParams.set(name, filter.selected.map((opt) => opt.label).join(','))
          : newSearchParams.delete(name);
      });
      const searchParamsObject = Object.fromEntries(newSearchParams.entries());
      router.replace(
        // @ts-expect-error
        { pathname, params, query: searchParamsObject },
        { scroll: false },
      );
    };

    updateUrlParams(selectedFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters]);

  const handleChange = (name: string, value: string, checked: boolean) => {
    setSelectedFilters((prevFilters) => {
      const filter = prevFilters[name];
      if (!filter) return prevFilters;

      const selectedOptions = filter.options.find((opt) => opt.value === value);
      if (!selectedOptions) return prevFilters;

      const newSelectedOptions = checked
        ? [...filter.selected, selectedOptions]
        : filter.selected.filter((option) => option.value !== value);

      return {
        ...prevFilters,
        [name]: { ...filter, selected: newSelectedOptions },
      };
    });
  };

  const handleClear = () => {
    const clearedFilters = Object.keys(selectedFilters).reduce(
      (acc: typeof selectedFilters, filterKey) => {
        acc[filterKey] = { ...selectedFilters[filterKey], selected: [] };
        return acc;
      },
      {},
    );
    setSelectedFilters(clearedFilters);
  };

  return {
    selectedFilters,
    handleChange,
    handleClear,
  };
}

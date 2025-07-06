import { useParams, useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import { useEffect } from 'react';
import { CheckboxFilters, Filters } from '@/types/filters';

export default function useCheckboxFilters(
  filters: CheckboxFilters,
  setFilters: React.Dispatch<React.SetStateAction<Filters>>,
) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    const updateUrlParams = (filters: CheckboxFilters) => {
      const newSearchParams = new URLSearchParams(searchParams);
      Object.entries(filters).forEach(([name, filter]) => {
        filter.selected.length > 0
          ? newSearchParams.set(
              name,
              filter.selected.map((opt) => opt.label).join(','),
            )
          : newSearchParams.delete(name);
      });
      const searchParamsObject = Object.fromEntries(newSearchParams.entries());
      router.replace(
        // @ts-expect-error
        { pathname, params, query: searchParamsObject },
        { scroll: false },
      );
    };

    updateUrlParams(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleChange = (name: string, value: string, checked: boolean) => {
    setFilters((prevFilters) => {
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

  return {
    handleChange,
  };
}

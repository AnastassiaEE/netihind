import { Filters } from '@/types/filters';
import { useCallback } from 'react';

export default function useCheckboxFilter(
  name: string,
  setFilters: React.Dispatch<React.SetStateAction<Filters>>,
  onUserChange?: () => void,
) {
  const handleChange = useCallback(
    (value: string, checked: boolean) => {
      onUserChange?.();
      setFilters((prevFilters) => {
        const filter = prevFilters[name];
        if (!filter) return prevFilters;

        const selectedOptions = filter.options.find(
          (opt) => opt.value === value,
        );
        if (!selectedOptions) return prevFilters;

        const newSelectedOptions = checked
          ? [...filter.selected, selectedOptions]
          : filter.selected.filter((option) => option.value !== value);

        return {
          ...prevFilters,
          [name]: { ...filter, selected: newSelectedOptions },
        };
      });
    },
    [name, setFilters, onUserChange],
  );

  return { handleChange };
}

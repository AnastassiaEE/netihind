import { Filters } from '@/types/filters.types';
import { useCallback } from 'react';

/**
 * Handles checkbox filter changes and updates filter state accordingly.
 *
 * This hook provides a memoized change handler that adds or removes
 * selected options from a checkbox-based filter and optionally notifies
 * about user-initiated changes.
 *
 * @param name - Filter key (e.g. "providers" or "technologies")
 * @param setFilters - State setter for updating filters
 * @param onUserChange - Optional callback triggered when user changes a filter
 *
 * @returns An object containing:
 *  - handleChange: checkbox change handler
 */
export default function useCheckboxFilter(
  name: string,
  setFilters: React.Dispatch<React.SetStateAction<Filters>>,
  onUserChange?: () => void,
) {

  /**
   * Updates selected options for the given checkbox filter.
   */
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

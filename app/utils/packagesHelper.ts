import { FilterType } from '@/types/filters.types';
import { EquipmentItem, Package } from '@/types/packages.types';

/** Predefined sorting options for listings */
export const SORT_OPTIONS = [
  'default',
  'price_asc',
  'price_desc',
  'speed_desc',
];

/**
 * Returns the selected sort option if valid, otherwise returns 'default'.
 *
 * @param sortParam - The sort parameter from URL or state
 */
export const getSelectedSortOption = (sortParam: string) => {
  return SORT_OPTIONS.includes(sortParam) ? sortParam : 'default';
};

/**
 * Converts a list of items into filter options with `value` and `label` keys.
 *
 * @param items - Array of objects to convert
 * @param labelKey - Key to use for the label
 * @param valueKey - Key to use for the value
 */
const getFilterOptions = (
  items: Record<string, string>[],
  labelKey: string,
  valueKey: string,
) =>
  items.map((item) => ({
    value: item[valueKey],
    label: item[labelKey],
  }));

/**
 * Maps URL/search params to selected filter options.
 *
 * @param options - Available filter options
 * @param params - Array of strings from URL/search params
 */
export const getFilterSelectedOptions = (
  options: {
    value: string;
    label: string;
  }[],
  params: string[],
) =>
  params
    .map((param) =>
      options.find((opt) => opt.label.toLowerCase() === param.toLowerCase()),
    )
    .filter((opt) => !!opt);

/**
 * Prepares filter data for a UI component from search params and items.
 *
 * @param searchParams - URL or state search parameters
 * @param paramKey - Key in the search params corresponding to this filter
 * @param valueKey - Key in items to use as value
 * @param labelKey - Key in items to use as label
 * @param items - List of raw items for the filter
 * @param filterType - Type of the filter (checkbox, radio, etc.)
 *
 *  @returns An object containing:
 *  - `type`: the type of the filter (e.g., 'checkbox', 'radio', etc.)
 *  - `options`: array of all available filter options in the form `{ label: string, value: string }`
 *  - `selected`: array of currently selected options, filtered from `options` based on search parameters
 */
export const getFilterData = (
  searchParams: Record<string, string>,
  paramKey: string,
  valueKey: string,
  labelKey: string,
  items: Record<string, string>[],
  filterType: FilterType,
) => {
  const params = searchParams[paramKey]?.split(',') || [];
  const options = getFilterOptions(items, labelKey, valueKey);
  const selectedOptions = getFilterSelectedOptions(options, params);
  return { type: filterType, options, selected: selectedOptions };
};

/**
 * Groups equipment items by their combination ID.
 *
 * @param equipment - List of equipment items from a package
 * @returns Array of groups of equipment items sharing the same `combination_id`
 */
export const groupEquipmentByCombination = (
  equipment: Package['equipment'],
) => {
  if (!equipment) return [];

  const groups = equipment.reduce(
    (acc, item) => {
      (acc[item.combination_id] ||= []).push(item);
      return acc;
    },
    {} as Record<number, EquipmentItem[]>,
  );

  return Object.values(groups);
};

/**
 * Calculates the minimum prices for each payment type across a set of equipment items.
 *
 * @param equipment - List of equipment items
 * @returns Object mapping each payment type to the minimum price found
 */
export const getEquipmentMinPricesByPayment = (equipment: EquipmentItem[]) => {
  const result: Record<string, number> = {};

  for (const item of equipment) {
    for (const [paymentType, payment] of Object.entries(item.payment)) {
      const currentMin = result[paymentType];
      if (currentMin === undefined || payment.price < currentMin) {
        result[paymentType] = payment.price;
      }
    }
  }

  return result;
};

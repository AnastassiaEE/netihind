import { FilterType } from '@/types/filters.types';
import { EquipmentItem, Package } from '@/types/packages.types';

export const SORT_OPTIONS = [
  'default',
  'price_asc',
  'price_desc',
  'speed_desc',
];

export const getSelectedSortOption = (sortParam: string) => {
  return SORT_OPTIONS.includes(sortParam) ? sortParam : 'default';
};

const getFilterOptions = (
  items: { [key: string]: string }[],
  labelKey: string,
  valueKey: string,
) =>
  items.map((item) => ({
    value: item[valueKey],
    label: item[labelKey],
  }));

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

export const getFilterData = (
  searchParams: { [key: string]: string },
  paramKey: string,
  valueKey: string,
  labelKey: string,
  items: { [key: string]: string }[],
  filterType: FilterType,
) => {
  const params = searchParams[paramKey]?.split(',') || [];
  const options = getFilterOptions(items, labelKey, valueKey);
  const selectedOptions = getFilterSelectedOptions(options, params);
  return { type: filterType, options, selected: selectedOptions };
};


export function groupEquipmentByCombination(equipment: Package['equipment']) {
  if (!equipment) return [];

  const groups = equipment.reduce((acc, item) => {
    (acc[item.combination_id] ||= []).push(item);
    return acc;
  }, {} as Record<number, EquipmentItem[]>);

  return Object.values(groups);
}
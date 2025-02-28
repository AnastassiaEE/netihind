const DEFAULT_SERVICE = 'all';

export const SERVICES = ['all', 'internet', 'internet-tv'];
export const SORT_OPTIONS = ['default', 'price_asc', 'price_desc', 'speed_desc'];

export const getSortSelectedOption = (sortParam: string) => {
  return SORT_OPTIONS.includes(sortParam) ? sortParam : 'default';
};

const getFilterOptions = (items: { [key: string]: string }[], labelKey: string, valueKey: string) =>
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
  options.filter(({ label }) =>
    params.some((param) => param.toLowerCase() === label.toLowerCase()),
  );

export const getFilterData = (
  searchParams: { [key: string]: string },
  paramKey: string,
  valueKey: string,
  labelKey: string,
  items: { [key: string]: string }[],
) => {
  const params = searchParams[paramKey]?.split(',') || [];
  const options = getFilterOptions(items, labelKey, valueKey);
  const selectedOptions = getFilterSelectedOptions(options, params);
  return { options, selected: selectedOptions };
};

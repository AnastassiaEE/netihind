const DEFAULT_SERVICE = 'all';

export const SERVICES = ['all', 'internet', 'internet-tv'];
export const SORT_OPTIONS = ['default', 'price_asc', 'price_desc', 'speed_desc'];

export const getSortSelectedOption = (sortParam: string) => {
  return SORT_OPTIONS.includes(sortParam) ? sortParam : 'default';
};

const mapOptions = <T, K extends keyof T, V extends keyof T>(
  items: T[],
  labelKey: K,
  valueKey: V,
) =>
  items.map((item) => ({
    value: item[valueKey],
    label: item[labelKey],
  }));

export const getProviderOptions = (providers: { id: string; name: string }[]) =>
  mapOptions(providers, 'name', 'id');

export const getTechnologyOptions = (technologies: { id: string; abbr: string }[]) =>
  mapOptions(technologies, 'abbr', 'id');

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

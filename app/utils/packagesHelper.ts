const DEFAULT_SERVICE = 'all';

export const SERVICES = ['all', 'internet', 'internet-tv'];
export const SORT_OPTIONS = ['default', 'price_asc', 'price_desc', 'speed_desc'];

export const getSortParams = (selectedOption: string | null) => {
  const validOption = selectedOption ?? '';
  return SORT_OPTIONS.includes(validOption) ? validOption : 'default';
};

export const getProviderOptions = (providers: { [key: string]: string }[]) =>
  providers.map(({ name: label, id: value }) => ({ value, label }));

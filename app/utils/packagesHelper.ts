const DEFAULT_SERVICE = 'all';

export const SERVICES = ['all', 'internet', 'internet-tv'];
export const SORT_OPTIONS = ['default', 'price_asc', 'price_desc', 'speed_desc'];

export const getSelectedSortOption = (sortParam: string | null) => {
  const validOption = sortParam || '';
  return SORT_OPTIONS.includes(validOption) ? validOption : 'default';
};

export const getProviderOptions = (providers: { [key: string]: string }[]) =>
  providers.map(({ name: label, id: value }) => ({ value, label }));

export const getSelectedProviderOptions = (
  providerOptions: {
    value: string;
    label: string;
  }[],
  providerParams: string[],
) =>
  providerOptions.filter(({ label }) =>
    providerParams.some((param) => param.toLowerCase() === label.toLowerCase()),
  );

const DEFAULT_SERVICE = 'all';
const DEFAULT_SORT_OPTION = 'default';

export const SERVICES = ['all', 'internet', 'internet-tv'];
export const SORT_OPTIONS = ['default', 'price_asc', 'price_desc', 'speed_desc'];

const getValidOption = (value: string | null, validOptions: string[], defaultValue: string) =>
  validOptions.includes(value ?? '') ? value! : defaultValue;

export const getActiveService = (activeService: string | null) =>
  getValidOption(activeService, SERVICES, DEFAULT_SERVICE);

export const getSelectedSortOption = (option: string | null) =>
  getValidOption(option, SORT_OPTIONS, DEFAULT_SORT_OPTION);

export const getProviderOptions = (providers: string | null) => {
  if (!providers) return [];
  return providers.split(',');
};

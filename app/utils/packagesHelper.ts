const DEFAULT_FILTER = 'all';
const DEFAULT_SORT_OPTION = 'default';
export const FILTERS = ['all', 'internet', 'internet-tv'];
export const SORT_OPTIONS = ['default', 'price_asc', 'price_desc', 'speed_desc'];

const getValidOption = (value: string | null, validOptions: string[], defaultValue: string) =>
  validOptions.includes(value ?? '') ? value! : defaultValue;

export const getActiveFilter = (filter: string | null) =>
  getValidOption(filter, FILTERS, DEFAULT_FILTER);

export const getSelectedSortOption = (option: string | null) =>
  getValidOption(option, SORT_OPTIONS, DEFAULT_SORT_OPTION);

export type FilterOption = {
  id: string;
  name: string;
};

export type SortOptions = {
  options: string[];
  selected: string;
};

export type FilterType = 'checkbox' | 'range';

export type Filters = {
  [filterName: string]: {
    type: FilterType;
    options: FilterOption[];
  };
};

export type Filter = {
  type: string;
  options: FilterOption[];
};

export type SelectedByFilter = {
  [filterName: string]: string[];
};

export type OnFilterChange = (
  filterName: string,
  optionValue: string,
  isChecked: boolean,
) => void;

export type FilterOption = {
  value: string;
  label: string;
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
    selected: FilterOption[];
  };
};

export type Filter = {
  type: string;
  options: FilterOption[];
  selected: FilterOption[];
};

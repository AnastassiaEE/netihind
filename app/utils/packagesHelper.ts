const DEFAULT_SERVICE = 'all';

export const SERVICES = ['all', 'internet', 'internet-tv'];
export const SORT_OPTIONS: { [key: string]: boolean } = {
  default: true,
  price_asc: false,
  price_desc: false,
  speed_desc: false,
};

export const getSortOptions = (selectedOption: string | null) => {
  const isValidOption = selectedOption && selectedOption in SORT_OPTIONS;
  return {
    ...Object.fromEntries(Object.keys(SORT_OPTIONS).map((key) => [key, key === selectedOption])),
    default: !isValidOption,
  };
};

export const getProviderOptions = (providers: { [key: string]: any }[]) => {
  return providers.map((provider) => {
    return {
      label: provider.name,
      value: provider.id,
    };
  });
};

// export const getSelectedProviderOptions = ((providers: { [key: string]: any }[]))

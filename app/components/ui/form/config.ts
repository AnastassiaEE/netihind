export const FormElementSizes: { sm: string; lg: string } = {
  sm: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3',
};

export const checkboxSizes: { sm: string; lg: string } = {
  sm: 'size-4',
  lg: 'size-5',
};
export const fieldLabelSizes: { sm: string; lg: string } = {
  sm: 'mb-1.5 text-sm',
  lg: 'mb-2.5',
};

export const toggleSwitchSizes: {
  sm: { switch: string; label: string };
  md: { switch: string; label: string };
  lg: { switch: string; label: string };
} = {
  sm: {
    switch: 'h-5.5 w-10.75 after:size-3.5 peer-checked:after:translate-x-5.25',
    label: 'text-sm',
  },
  md: {
    switch: 'h-6.75 w-13.25 after:size-4.75 peer-checked:after:translate-x-6.5',
    label: 'text-base',
  },
  lg: {
    switch: 'h-8.25 w-16.25 after:size-6.25 peer-checked:after:translate-x-8',
    label: 'text-lg',
  },
};

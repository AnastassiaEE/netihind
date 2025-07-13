import { RefObject } from 'react';

export type SelectVariant = 'plain' | 'labeled';
export type ButtonVariant = 'contained' | 'outlined' | 'neutral' | 'text';

export type ComboBoxProps = {
  handleClick: () => void;
  ref: RefObject<HTMLButtonElement>;
  role: 'combobox';
  'aria-label': string;
  'aria-expanded': boolean;
  'aria-haspopup': 'listbox';
  'aria-controls': string;
};

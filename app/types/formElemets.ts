import { RefObject } from 'react';

// type
export type ButtonType = 'button' | 'submit' | 'reset';

// variant
export type ButtonVariant = 'contained' | 'outlined' | 'neutral' | 'text';
export type SelectVariant = 'plain' | 'labeled';

// size
export type ButtonSize = 'sm' | 'lg';
export type SelectSize = 'sm' | 'lg';
export type CheckboxSize = 'sm' | 'lg';
export type InputSize = 'sm' | 'lg';
export type TextareaSize = 'sm' | 'lg';

// props type
export type ComboBoxProps = {
  onClick: () => void;
  ref: RefObject<HTMLButtonElement>;
  role: 'combobox';
  'aria-label': string;
  'aria-expanded': boolean;
  'aria-haspopup': 'listbox';
  'aria-controls': string;
};

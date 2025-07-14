import { RefObject } from 'react';
import { PackageActionType } from '@/types/elements.types';

// type
export type FormType = 'contact' | PackageActionType;
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
export type SelectOptionSize = 'sm' | 'lg';
export type ToggleSwitchSize = 'sm' | 'md' | 'lg';
export type FieldErrorSize = 'sm' | 'lg';
export type FieldLabelSize = 'sm' | 'lg';

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

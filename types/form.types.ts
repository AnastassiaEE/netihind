import { RefObject } from 'react';
import { PackageAction } from '@/types/packages.types';

// type
export type FormType = 'contact' | PackageAction;
export type FormFields = {
  [key: string]: { initialValue: string | boolean; isRequired: boolean };
};

// variant
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
  ref: RefObject<HTMLButtonElement | null>;
  role: 'combobox';
  'aria-label': string;
  'aria-expanded': boolean;
  'aria-haspopup': 'listbox';
  'aria-controls': string;
};

export type Label = { value: string; className?: string };

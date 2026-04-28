import { CheckboxSize } from '@/types/form.types';
import { tv } from 'tailwind-variants';
import { checkboxSizes as sizes } from '@/components/ui/form/config';
import FieldLabel from '@/components/ui/form/fields/FieldLabel';
import React from 'react';

const checkboxClasses = tv({
  base: 'checkbox checked:border-primary checked:bg-primary mr-2 shrink-0 cursor-pointer appearance-none rounded-[.185em] border align-sub checked:bg-contain',
  variants: {
    size: sizes,
    isValid: {
      true: 'border-valid',
      false: 'border-invalid',
    },
  },
  defaultVariants: {
    size: 'sm',
    isValid: true,
  },
});

type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> & {
  size?: CheckboxSize;
  isValid?: boolean;
};

export default function Checkbox({
  size,
  isValid = true,
  required = false,
  className,
  children,
  ...props
}: CheckboxProps) {
  const name = props.name ?? '';
  const generatedId = React.useId();
  const id = `${name}-${props.value ?? generatedId}`;
  return (
    <FieldLabel htmlFor={id} size={size} className="cursor-pointer">
      <input
        id={id}
        name={name}
        type="checkbox"
        aria-invalid={!isValid}
        aria-required={required}
        className={checkboxClasses({
          size,
          isValid,
          className,
        })}
        {...props}
      />
      {children}
    </FieldLabel>
  );
}

import React from 'react';
import { tv } from 'tailwind-variants';
import { FormElementSizes as sizes } from '@/components/ui/form/config';
import { ButtonSize, ButtonVariant } from '@/types/form.types';

const buttonClasses = tv({
  base: 'rounded-md font-semibold transition-all',
  variants: {
    variant: {
      contained:
        'border-primary bg-primary hover:bg-primary-dark shadow-primary/30 border text-white shadow-md hover:shadow-none',
      outlined:
        'border-primary text-primary hover:bg-primary border bg-white hover:text-white',
      neutral:
        'border-primary-light bg-primary-light text-muted-dark hover:bg-primary border hover:text-white',
      text: 'text-primary hover:text-primary-dark',
    },
    size: sizes,
    disabled: {
      true: 'cursor-not-allowed opacity-50',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'contained',
    size: 'sm',
    disabled: false,
  },
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      variant,
      size,
      disabled = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        {...props}
        className={buttonClasses({ variant, size, disabled, className })}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;

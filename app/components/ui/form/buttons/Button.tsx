import React from 'react';
import { tv } from 'tailwind-variants';
import { FormElementSizes as sizes } from '@/components/ui/form/config';
import { ButtonSize, ButtonVariant } from '@/types/form.types';
import classNames from 'classnames';

const buttonClasses = tv({
  base: 'rounded-md font-semibold transition-all',
  variants: {
    variant: {
      contained:
        'border border-primary bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/30 hover:shadow-none',
      outlined:
        'border border-primary bg-white text-primary hover:bg-primary hover:text-white',
      neutral:
        'border border-primary-light bg-primary-light text-muted-dark hover:bg-primary hover:text-white',
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
    { type = 'button', variant, size, disabled = false, children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        {...props}
        className={classNames(
          buttonClasses({ variant, size, disabled }),
          props.className,
        )}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;

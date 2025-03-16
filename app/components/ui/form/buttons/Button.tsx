import React from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const buttonClasses = tv({
  base: 'font-semibold transition-all rounded-md border shadow-md',
  variants: {
    variant: {
      contained: 'border-primary bg-primary text-white hover:bg-primary-dark',
      outlined:
        'border-primary bg-white text-primary hover:bg-primary hover:text-white',
      neutral:
        'border-primary-light bg-primary-light text-muted-dark hover:bg-primary hover:text-white',
      text: 'text-primary hover:text-primary-dark border-transparent shadow-none',
    },
    size: {
      sm: 'px-4 py-2.5 text-sm',
      lg: 'px-5 py-3',
    },
    disabled: {
      true: 'hover:cursor-not-allowed opacity-50',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'contained',
    size: 'sm',
    disabled: false,
  },
});

export type ButtonVariant = VariantProps<typeof buttonClasses>['variant'];
export type ButtonSize = VariantProps<typeof buttonClasses>['size'];

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  name?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      variant = 'contained',
      size = 'sm',
      disabled = false,
      name,
      handleClick,
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
        name={name}
        onClick={handleClick}
        className={buttonClasses({ variant, size, disabled, className })}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;

import React from 'react';
import classNames from 'classnames';
import { FormElementSizes as sizes } from '@/styles/styles';

const variants = {
  contained: 'rounded-md border border-primary bg-primary text-white shadow-md hover:bg-primary-dark',
  outlined:
    'rounded-md border border-primary bg-white text-primary hover:bg-primary hover:text-white',
  neutral:
    'rounded-md border border-primary-light bg-primary-light text-muted-dark hover:bg-primary hover:text-white',
  text: 'text-primary hover:text-primary-dark',
};

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

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
    const buttonClasses = classNames(
      'font-semibold transition-all',
      variants[variant],
      sizes[size],
      disabled && 'hover:cursor-not-allowed',
      className,
    );

    return (
      <button
        ref={ref}
        type={type}
        name={name}
        onClick={handleClick}
        className={buttonClasses}
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

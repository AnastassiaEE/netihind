import classNames from 'classnames';
import { FormElementSizes as sizes } from '@/styles/styles';

const baseClasses = 'font-semibold transition-all';
const variants: { primary: string; secondary: string; neutral: string; flat: string } = {
  primary:
    'rounded-md border border-primary bg-primary text-white shadow-md shadow-primary/50 hover:bg-primary-dark hover:shadow-none',
  secondary:
    'rounded-md border border-primary bg-white text-primary hover:bg-primary hover:text-white',
  neutral:
    'rounded-md border border-primary-light bg-primary-light text-muted-dark hover:bg-primary hover:text-white',
  flat: 'text-primary hover:text-primary-dark',
};

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export default function Button({
  type = 'button',
  variant = 'primary',
  size = 'sm',
  disabled = false,
  name,
  className,
  handleClick,
  buttonRef,
  children,
}: {
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  name?: string;
  className?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  children: React.ReactNode;
}) {
  const buttonClasses = classNames(baseClasses, variants[variant], sizes[size], className, {
    'hover:cursor-not-allowed': disabled,
  });
  return (
    <button
      type={type}
      name={name}
      onClick={handleClick}
      className={buttonClasses}
      disabled={disabled}
      ref={buttonRef}
    >
      {children}
    </button>
  );
}

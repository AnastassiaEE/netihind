import classNames from 'classnames';

const baseClasses = 'font-semibold transition-all';
const variants: { primary: string; secondary: string; neutral: string; flat: string } = {
  primary:
    'bg-primary text-white border border-primary rounded-md shadow-lg shadow-primary/50 hover:bg-primary-dark hover:shadow-none',
  secondary:
    'bg-white text-primary border border-primary rounded-md hover:bg-primary hover:text-white',
  neutral:
    'bg-primary-light border border-primary-light rounded-md text-muted-dark hover:bg-primary hover:text-white',
  flat: 'text-primary hover:text-primary-dark',
};
const sizes: { sm: string; lg: string } = {
  sm: 'text-sm px-4 py-2.5',
  lg: 'px-5 py-3',
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
  children,
}: {
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  name?: string;
  className?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
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
    >
      {children}
    </button>
  );
}

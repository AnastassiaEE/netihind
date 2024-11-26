import classNames from 'classnames';

const baseClasses = 'font-semibold border rounded-md transition-all';
const variants: { primary: string; secondary: string } = {
  primary:
    'bg-primary text-white border-primary shadow-lg shadow-primary/50 hover:bg-primary-dark hover:shadow-none',
  secondary: 'bg-white text-primary border-primary hover:bg-primary hover:text-white',
};
const sizes: { sm: string; lg: string } = {
  sm: 'text-sm px-3 py-2',
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

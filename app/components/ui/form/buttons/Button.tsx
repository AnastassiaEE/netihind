import classNames from 'classnames';

const baseClasses = classNames(
  'font-semibold',
  'text-center',
  'border',
  'rounded-md',
  'transition all',
  'flex',
  'items-center',
  'justify-center',
);

const variants: { [key: string]: string } = {
  primary: classNames(
    'bg-primary',
    'text-white',
    'border-primary',
    'shadow-lg',
    'shadow-primary/50',
    'hover:bg-primary-dark',
    'hover:shadow-none',
  ),
  secondary: classNames(
    'bg-white',
    'text-primary',
    'border-primary',
    'hover:bg-primary',
    'hover:text-white',
  ),
  success: classNames(
    'bg-success',
    'text-white',
    'border-success',
    'hover:bg-success-dark',
    'hover:border-success-dark',
    'hover:text-white',
  ),
};

const sizes: { [key: string]: string } = {
  sm: 'text-sm px-3 py-2',
  lg: 'px-5 py-3',
};

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
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'sm' | 'lg';
  disabled?: boolean;
  name?: string;
  className?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}) {
  const buttonClasses = classNames(baseClasses, variants[variant], sizes[size], {
    'hover:cursor-not-allowed': disabled,
    [className as string]: className !== undefined,
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

import { tv } from 'tailwind-variants';

export default function Checkbox({
  name,
  value,
  size = 'sm',
  isChecked = false,
  isValid = true,
  required = false,
  handleChange,
  children,
}: {
  name: string;
  value?: string;
  size?: 'sm' | 'lg';
  isChecked: boolean;
  isValid?: boolean;
  required?: boolean;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  children: React.ReactNode;
}) {
  const checkboxClasses = tv({
    base: 'checkbox mr-2 shrink-0 cursor-pointer appearance-none rounded-[.185em] border checked:border-primary checked:bg-primary checked:bg-contain',
    variants: {
      size: {
        sm: 'w-4 h-4',
        lg: 'w-5 h-5',
      },
      validity: {
        valid: 'border-valid',
        invalid: 'border-invalid',
      },
    },
    defaultVariants: {
      size: 'sm',
      validity: isValid ? 'valid' : 'invalid',
    },
  });

  const labelClasses = tv({
    variants: {
      size: {
        sm: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  });

  return (
    <label className="flex cursor-pointer items-center">
      <input
        name={name}
        value={value}
        type="checkbox"
        aria-invalid={!isValid}
        aria-required={required}
        checked={isChecked}
        onChange={handleChange}
        className={checkboxClasses({
          size,
          validity: isValid ? 'valid' : 'invalid',
        })}
      />
      <span className={labelClasses({ size })}>{children}</span>
    </label>
  );
}

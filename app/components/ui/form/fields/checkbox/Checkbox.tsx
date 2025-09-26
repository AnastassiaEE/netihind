import { CheckboxSize } from '@/types/form.types';
import classNames from 'classnames';
import { tv } from 'tailwind-variants';

export default function Checkbox({
  name,
  value,
  size = 'sm',
  isChecked = false,
  isValid = true,
  required = false,
  onChange,
  className,
  children,
}: {
  name: string;
  value?: string;
  size?: CheckboxSize;
  isChecked: boolean;
  isValid?: boolean;
  required?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  children: React.ReactNode;
}) {
  const checkboxClasses = tv({
    base: 'checkbox align-sub mr-2 shrink-0 cursor-pointer appearance-none rounded-[.185em] border checked:border-primary checked:bg-primary checked:bg-contain',
    variants: {
      size: {
        sm: 'size-4',
        lg: 'size-5',
      },
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
    <label
      className={classNames(
        'block cursor-pointer',
        labelClasses({ size }),
        className,
      )}
    >
      <input
        name={name}
        value={value}
        type="checkbox"
        aria-invalid={!isValid}
        aria-required={required}
        checked={isChecked}
        onChange={onChange}
        className={checkboxClasses({
          size,
          isValid,
        })}
      />
      {children}
    </label>
  );
}

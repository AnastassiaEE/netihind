import FieldError from '@/components/ui/form/fields/FieldError';
import FieldLabel from '@/components/ui/form/fields/FieldLabel';
import { tv } from 'tailwind-variants';
import { FormElementSizes as sizes } from '@/components/ui/form/config';
import { InputSize } from '@/types/formElemets';

const inputClasses = tv({
  base: 'w-full rounded-md border bg-white text-muted-dark transition-[padding] placeholder:text-muted focus:outline-none',
  variants: {
    size: sizes,
    isValid: {
      true: 'border-valid focus:border-primary/30 focus:shadow-primary/10',
      false: 'border-invalid focus:shadow-invalid/10',
    },
  },
  defaultVariants: {
    size: 'sm',
    isValid: true,
  },
});

export default function Input({
  size = 'sm',
  name,
  type = 'text',
  inputmode = 'text',
  label,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  value,
  isValid = true,
  error,
  required,
  className,
  children,
}: {
  size?: InputSize;
  name: string;
  type?:
    | 'text'
    | 'password'
    | 'email'
    | 'tel'
    | 'url'
    | 'search'
    | 'number'
    | 'range'
    | 'hidden';
  inputmode?:
    | 'text'
    | 'tel'
    | 'email'
    | 'url'
    | 'numeric'
    | 'decimal'
    | 'search'
    | 'none';
  label?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  value?: string;
  isValid?: boolean;
  error?: string;
  required: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      {label && (
        <FieldLabel htmlFor={name} size={size}>
          {label}
        </FieldLabel>
      )}
      <div className="relative">
        {children}
        <input
          id={name}
          name={name}
          type={type}
          inputMode={inputmode}
          className={inputClasses({ size, isValid, className })}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          autoComplete={name}
          aria-invalid={!isValid}
          aria-required={required}
        />
      </div>
      {!isValid && <FieldError size={size}>{error}</FieldError>}
    </>
  );
}

import FieldError from '@/components/ui/form/fields/FieldError';
import FieldLabel from '@/components/ui/form/fields/FieldLabel';
import { tv, VariantProps } from 'tailwind-variants';
import { FormElementSizes as sizes } from '@/styles/styles';

const inputClasses = tv({
  base: 'w-full rounded-md border bg-white text-muted-dark transition-[padding] placeholder:text-muted focus:shadow-md focus:shadow-primary/10 focus:outline-none',
  variants: {
    size: sizes,
    isValid: {
      true: 'border-valid focus:border-primary/30',
      false: 'border-invalid',
    },
  },
  defaultVariants: {
    size: 'sm',
    isValid: true,
  },
});

type InputSize = VariantProps<typeof inputClasses>['size'];

export default function Input({
  size = 'sm',
  name,
  type = 'text',
  inputmode = 'text',
  label,
  placeholder,
  handleChange,
  handleFocus,
  handleBlur,
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
  handleChange?: React.ChangeEventHandler<HTMLInputElement>;
  handleFocus?: React.FocusEventHandler<HTMLInputElement>;
  handleBlur?: React.FocusEventHandler<HTMLInputElement>;
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
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
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

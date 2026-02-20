import FieldError from '@/components/ui/form/fields/FieldError';
import FieldLabel from '@/components/ui/form/fields/FieldLabel';
import { tv } from 'tailwind-variants';
import { FormElementSizes as sizes } from '@/components/ui/form/config';
import { InputSize, Label } from '@/types/form.types';

const inputClasses = tv({
  base: 'w-full rounded-md border bg-white text-muted-dark transition-[padding] placeholder:text-muted focus:shadow-md focus:outline-hidden',
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

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  isValid?: boolean;
  label?: Label;
  error?: string;
}

export default function Input({
  size,
  isValid = true,
  label,
  error,
  required = false,
  className,
  children,
  ...props
}: InputProps) {
  const name = props.name ?? '';
  return (
    <>
      {label && (
        <FieldLabel htmlFor={name} size={size} className={label.className}>
          {label.value}
        </FieldLabel>
      )}
      <div className="relative">
        {children}
        <input
          id={name}
          name={name}
          className={inputClasses({ size, isValid, className })}
          autoComplete={name}
          aria-invalid={!isValid}
          aria-required={required}
          {...props}
        />
      </div>
      {!isValid && <FieldError size={size}>{error}</FieldError>}
    </>
  );
}

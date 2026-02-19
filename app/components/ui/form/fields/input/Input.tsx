import FieldError from '@/components/ui/form/fields/FieldError';
import FieldLabel from '@/components/ui/form/fields/FieldLabel';
import { tv } from 'tailwind-variants';
import { FormElementSizes as sizes } from '@/components/ui/form/config';
import { InputSize } from '@/types/form.types';
import classNames from 'classnames';

const inputClasses = tv({
  base: 'w-full rounded-md border bg-white text-muted-dark transition-[padding] placeholder:text-muted focus:shadow-md focus:outline-hidden',
  variants: {
    inputSize: sizes,
    isValid: {
      true: 'border-valid focus:border-primary/30 focus:shadow-primary/10',
      false: 'border-invalid focus:shadow-invalid/10',
    },
  },
  defaultVariants: {
    inputSize: 'sm',
    isValid: true,
  },
});

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: InputSize;
  isValid?: boolean;
  label?: string;
  error?: string;
}

export default function Input({
  inputSize,
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
        <FieldLabel htmlFor={name} size={inputSize}>
          {label}
        </FieldLabel>
      )}
      <div className="relative">
        {children}
        <input
          id={name}
          name={name}
          className={classNames(
            inputClasses({ inputSize, isValid }),
            className,
          )}
          autoComplete={name}
          aria-invalid={!isValid}
          aria-required={required}
          {...props}
        />
      </div>
      {!isValid && <FieldError size={inputSize}>{error}</FieldError>}
    </>
  );
}

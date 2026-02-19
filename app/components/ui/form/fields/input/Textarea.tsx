import FieldError from '@/components/ui/form/fields/FieldError';
import FieldLabel from '@/components/ui/form/fields/FieldLabel';
import { FormElementSizes as sizes } from '@/components/ui/form/config';
import { tv } from 'tailwind-variants';
import { TextareaSize } from '@/types/form.types';

const textAreaClasses = tv({
  base: 'w-full rounded-md border bg-white text-muted-dark placeholder:text-muted focus:shadow-md focus:outline-hidden',
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

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: TextareaSize;
  label?: string;
  isValid?: boolean;
  error?: string;
}

export default function Textarea({
  size,
  label,
  isValid = true,
  error,
  required = false,
  className,
  ...props
}: TextareaProps) {
  const name = props.name ?? '';
  return (
    <>
      {label && (
        <FieldLabel htmlFor={name} size={size}>
          {label}
        </FieldLabel>
      )}
      <textarea
        id={name}
        className={textAreaClasses({ size, isValid, className })}
        aria-invalid={!isValid}
        aria-required={required}
        {...props}
      ></textarea>
      {!isValid && <FieldError size={size}>{error}</FieldError>}
    </>
  );
}

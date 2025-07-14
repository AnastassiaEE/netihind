import FieldError from '@/components/ui/form/fields/FieldError';
import FieldLabel from '@/components/ui/form/fields/FieldLabel';
import { FormElementSizes as sizes } from '@/components/ui/form/config';
import { tv, VariantProps } from 'tailwind-variants';

const textAreaClasses = tv({
  base: 'w-full rounded-md border bg-white text-muted-dark placeholder:text-muted focus:shadow-lg focus:shadow-indigo-500/10 focus:outline-none',
  variants: {
    size: sizes,
    isValid: {
      true: 'border-valid focus:border-primary/30',
      false: 'border-invalid focus:shadow-invalid/10',
    },
  },
  defaultVariants: {
    size: 'sm',
    isValid: true,
  },
});

type TextareaSize = VariantProps<typeof textAreaClasses>['size'];

export default function Textarea({
  size = 'sm',
  name,
  label,
  placeholder,
  handleChange,
  handleBlur,
  value,
  isValid = true,
  error,
  required,
  className,
}: {
  size?: TextareaSize;
  name: string;
  label?: string;
  placeholder?: string;
  handleChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  handleBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  value?: string;
  isValid?: boolean;
  error?: string;
  required: boolean;
  className?: string;
}) {
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
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        aria-invalid={!isValid}
        aria-required={required}
      ></textarea>
      {!isValid && <FieldError size={size}>{error}</FieldError>}
    </>
  );
}

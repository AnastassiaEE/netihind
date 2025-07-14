import { FieldErrorSize } from '@/types/formElemets';
import { tv } from 'tailwind-variants';

const errorClasses = tv({
  base: 'absolute font-medium text-error',
  variants: {
    size: {
      sm: 'text-xs',
      lg: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

export default function FieldError({
  size = 'sm',
  children,
}: {
  size?: FieldErrorSize;
  children: React.ReactNode;
}) {
  return <div className={errorClasses({ size })}>{children}</div>;
}

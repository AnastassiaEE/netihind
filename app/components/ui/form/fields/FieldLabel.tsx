import { FieldLabelSize } from '@/types/form.types';
import { tv } from 'tailwind-variants';

const labelClasses = tv({
  base: 'block font-semibold',
  variants: {
    size: {
      sm: 'mb-1.5 text-sm',
      lg: 'mb-2.5',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

export default function FieldLabel({
  htmlFor,
  size = 'sm',
  children,
}: {
  htmlFor: string;
  size?: FieldLabelSize;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className={labelClasses({ size })}>
      {children}
    </label>
  );
}

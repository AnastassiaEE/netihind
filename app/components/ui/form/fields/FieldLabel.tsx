import { tv, VariantProps } from 'tailwind-variants';

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

type FieldLableSize = VariantProps<typeof labelClasses>['size'];

export default function FieldLabel({
  htmlFor,
  size = 'sm',
  children,
}: {
  htmlFor: string;
  size?: FieldLableSize;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className={labelClasses({ size })}>
      {children}
    </label>
  );
}

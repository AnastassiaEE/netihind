import { tv, VariantProps } from 'tailwind-variants';

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

type FieldErrorSize = VariantProps<typeof errorClasses>['size'];

export default function FieldError({
  size = 'sm',
  children,
}: {
  size?: FieldErrorSize;
  children: React.ReactNode;
}) {
  return <div className={errorClasses({ size })}>{children}</div>;
}

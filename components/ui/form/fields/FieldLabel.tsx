import { FieldLabelSize } from '@/types/form.types';
import { tv } from 'tailwind-variants';
import { fieldLabelSizes } from '@/components/ui/form/config';

const labelClasses = tv({
  base: 'block',
  variants: {
    size: fieldLabelSizes,
  },
  defaultVariants: {
    size: 'sm',
  },
});

interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: FieldLabelSize;
}

export default function FieldLabel({
  size = 'sm',
  className,
  children,
  ...props
}: FieldLabelProps) {
  return (
    <label className={labelClasses({ size, className })} {...props}>
      {children}
    </label>
  );
}

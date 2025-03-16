import { ChevronLeft } from '@mui/icons-material';
import { tv, VariantProps } from 'tailwind-variants';

const arrowClasses = tv({
  base: 'transition-transform duration-300',
  variants: {
    direction: {
      left: '',
      right: 'rotate-180',
      up: 'rotate-90',
      down: '-rotate-90',
    },
  },
  defaultVariants: {
    direction: 'left',
  },
});

export type ArrowDirection = VariantProps<typeof arrowClasses>['direction'];

export default function Arrow({
  direction = 'left',
  className,
}: {
  direction?: ArrowDirection;
  className?: string;
}) {
  return (
    <ChevronLeft
      fontSize="small"
      className={arrowClasses({ direction, className })}
    />
  );
}

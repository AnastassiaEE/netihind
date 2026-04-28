import { ArrowIconDirection } from '@/types/ui.types';
import { ChevronLeft } from '@mui/icons-material';
import { tv } from 'tailwind-variants';

const arrowClasses = tv({
  base: 'inline transition-transform duration-300',
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

export default function Arrow({
  direction = 'left',
  className,
}: {
  direction?: ArrowIconDirection;
  className?: string;
}) {
  return (
    <ChevronLeft
      fontSize="small"
      className={arrowClasses({ direction, className })}
    />
  );
}

import { ArrowIconDirection } from '@/types/ui.types';
import { ChevronLeft } from 'lucide-react';
import { cva } from 'class-variance-authority';
import classNames from 'classnames';

const arrowVariants = cva('inline transition-transform duration-300', {
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
      size={20}
      className={classNames(arrowVariants({ direction }), className)}
    />
  );
}

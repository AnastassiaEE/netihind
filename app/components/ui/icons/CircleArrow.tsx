import Arrow from '@/components/ui/icons/Arrow';
import { ArrowIconDirection } from '@/types/elements.types';
import classNames from 'classnames';

export default function CircleArrow({
  direction = 'left',
  className,
}: {
  direction?: ArrowIconDirection;
  className?: string;
}) {
  return (
    <span
      className={classNames(
        'flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full font-semibold',
        className,
      )}
    >
      <Arrow direction={direction} />
    </span>
  );
}

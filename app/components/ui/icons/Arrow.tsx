import { ChevronLeft } from '@mui/icons-material';
import classNames from 'classnames';

export type ArrowDirection = 'left' | 'right' | 'up' | 'down';

export default function Arrow({
    direction = 'left',
    className,
}: {
    direction?: ArrowDirection;
    className?: string;
}) {
    const arrowClasses = classNames('transition-transform duration-300 will-change-transform', className, {
        'rotate-180': direction === 'right',
        'rotate-90': direction === 'up',
        '-rotate-90': direction === 'down',
    });
    return <ChevronLeft fontSize="small" className={arrowClasses} />;
}

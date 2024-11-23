import Arrow from '@/components/ui/icons/Arrow';
import classNames from 'classnames';

export default function CircleArrow({ direction, className }: { direction: string; className?: string }) {
    const arrowWrapperClasses = classNames(
        'font-semibold',
        'rounded-full',
        'flex',
        'justify-center',
        'shrink-0',
        'items-center',
        'w-9',
        'h-9',
        'transition-colors',
        'cursor-pointer',
        className,
    );

    return (
        <span className={arrowWrapperClasses}>
            <Arrow direction={direction} />
        </span>
    );
}

import Arrow from './Arrow';
import classNames from 'classnames';

export default function CircleArrow({ direction, style }: { direction: string; style?: string }) {
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
        { [style as string]: style !== undefined },
    );

    return (
        <span className={arrowWrapperClasses}>
            <Arrow direction={direction} />
        </span>
    );
}

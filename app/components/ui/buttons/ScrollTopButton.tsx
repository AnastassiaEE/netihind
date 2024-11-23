'use client';

import classNames from 'classnames';
import CircleArrow from '@/components/ui/icons/CircleArrow';
import useScrollTopButton from '@/hooks/useScrollTopButton';

const arrowClasses = classNames('bg-gray-900/25', 'text-white', '!w-11', '!h-11');

export default function ScrollTopButton() {
    const { y, handleClick } = useScrollTopButton();

    const buttonClasses = classNames(
        'fixed',
        'inline-block',
        'z-50',
        'right-5',
        'transition-all',
        'duration-500',
        {
            'bottom-5': y >= 600,
            '-bottom-16': y < 600,
        },
    );

    return (
        <button name="scroll-top" className={buttonClasses} onClick={handleClick}>
            <CircleArrow className={arrowClasses} direction="up" />
        </button>
    );
}

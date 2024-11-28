'use client';

import classNames from 'classnames';
import CircleArrow from '@/components/ui/icons/CircleArrow';
import useScrollTopButton from '@/hooks/useScrollTopButton';

export default function ScrollTopButton() {
    const { y, handleClick } = useScrollTopButton();
    return (
        <button
            name="scroll-top"
            className={classNames(
                'fixed inline-block z-20 right-5 transition-all duration-500',
                y >= 600 ? 'bottom-5' : '-bottom-16',
            )}
            onClick={handleClick}
        >
            <CircleArrow className={'bg-gray-900/25 text-white !w-11 !h-11'} direction="up" />
        </button>
    );
}

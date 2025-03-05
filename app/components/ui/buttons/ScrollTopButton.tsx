'use client';

import classNames from 'classnames';
import CircleArrow from '@/components/ui/icons/CircleArrow';
import useScrollTopButton from '@/hooks/useScrollTopButton';

export default function ScrollTopButton() {
    const { y, handleClick } = useScrollTopButton();
    return (
        <button
            name="scroll-top"
            aria-label="Scroll to top"
            className={classNames(
                'fixed right-5 z-10 inline-block transition-all duration-500',
                y >= 600 ? 'bottom-5' : '-bottom-16',
            )}
            onClick={handleClick}
        >
            <CircleArrow className="!h-11 !w-11 bg-gray-900/25 text-white" direction="up" />
        </button>
    );
}

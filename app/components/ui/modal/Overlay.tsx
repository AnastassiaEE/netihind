import classNames from 'classnames';
import { useEffect } from 'react';

export default function Overlay({ isVisible = false }: { isVisible?: boolean }) {
    const overlayClasses = classNames(
        'fixed',
        'inset-0',
        'w-screen',
        'h-screen',
        'bg-black/70',
        'z-20',
        'cursor-pointer',
        {
            hidden: !isVisible,
        },
    );

    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', isVisible);
        return () => document.body.classList.remove('overflow-hidden');
    }, [isVisible]);

    return <div className={overlayClasses}></div>;
}

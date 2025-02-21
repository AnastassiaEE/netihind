import classNames from 'classnames';
import React from 'react';
import Overlay from '@/components/ui/modal/Overlay';

export default function Sidebar({
    isOpened,
    sidebarRef,
    children,
}: {
    isOpened: boolean;
    sidebarRef: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
}) {
    const sidebarWrapperClasses = classNames(
        'fixed',
        'top-0',
        'right-0',
        'w-80',
        'max-w-full',
        'h-full',
        'z-50',
        'bg-white',
        'shadow-md',
        'transition-transform duration-300',
        isOpened ? 'translate-x-0' : 'translate-x-full',
    );
    return (
        <>
            <div className={sidebarWrapperClasses} ref={sidebarRef}>
                {children}
            </div>
            <Overlay isVisible={isOpened} />
        </>
    );
}

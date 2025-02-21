import classNames from 'classnames';
import React, { forwardRef } from 'react';
import Overlay from '@/components/ui/modal/Overlay';

const Sidebar = forwardRef<HTMLDivElement, { isOpened: boolean; children: React.ReactNode }>(
    ({ isOpened, children }, ref) => {
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
                <div className={sidebarWrapperClasses} ref={ref}>
                    {children}
                </div>
                <Overlay isVisible={isOpened} />
            </>
        );
    },
);

Sidebar.displayName = 'Sidebar';

export default Sidebar;

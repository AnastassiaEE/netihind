import classNames from 'classnames';
import React, { forwardRef } from 'react';
import Backdrop from '@/components/ui/modal/Backdrop';
import CloseButton from '@/components/ui/buttons/CloseButton';

const Sidebar = forwardRef<
    HTMLDivElement,
    { title: string; isOpened: boolean; handleClose: () => void; children: React.ReactNode }
>(({ title, isOpened, handleClose, children }, ref) => {
    const sidebarWrapperClasses = classNames(
        'fixed inset-y-0 right-0 z-50 w-80 max-w-full bg-white shadow-md transition-transform duration-300',
        isOpened ? 'translate-x-0' : 'translate-x-full pointer-events-none',
    );

    return (
        <Backdrop isVisible={isOpened}>
            <div className={sidebarWrapperClasses} ref={ref}>
                <div className="flex justify-between border-b border-muted-light px-6 py-5">
                    <p className="text-xl font-extrabold text-black">{title}</p>
                    <CloseButton handleClick={handleClose} />
                </div>
                {children}
            </div>
        </Backdrop>
    );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;

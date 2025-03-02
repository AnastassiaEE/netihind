import classNames from 'classnames';
import React, { forwardRef } from 'react';
import Backdrop from '@/components/ui/modal/Backdrop';
import CloseIcon from '@mui/icons-material/Close';

const Sidebar = forwardRef<
    HTMLDivElement,
    { title: string; isOpened: boolean; handleClose: () => void; children: React.ReactNode }
>(({ title, isOpened, handleClose, children }, ref) => {
    const sidebarWrapperClasses = classNames(
        'fixed inset-y-0 right-0 z-50 w-80 max-w-full bg-white shadow-md transition-transform duration-300',
        isOpened ? 'translate-x-0' : 'translate-x-full',
    );

    return (
        <Backdrop isVisible={isOpened}>
            <div className={sidebarWrapperClasses} ref={ref}>
                <div className="flex justify-between border-b border-muted-light px-6 py-5">
                    <p className="text-xl font-extrabold text-black">{title}</p>
                    <button type="button" className="h-max" onClick={handleClose}>
                        <CloseIcon className="text-muted transition-colors hover:text-black" />
                    </button>
                </div>
                {children}
            </div>
        </Backdrop>
    );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;

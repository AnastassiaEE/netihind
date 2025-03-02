import React, { forwardRef } from 'react';
import Backdrop from '@/components/ui/modal/Backdrop';
import classNames from 'classnames';

const Modal = forwardRef<
    HTMLDivElement,
    { isOpened: boolean; handleClose: () => void; children: React.ReactNode }
>(({ isOpened, handleClose, children }, ref) => {
    const modalClasses = classNames(
        'fixed left-1/2 top-1/2 z-50 h-screen w-screen max-w-[100vw] overflow-auto rounded-lg bg-white p-10 shadow-lg lg:h-[700px] lg:max-h-[calc(100vh-30px)] lg:w-[950px]',
        isOpened ? 'opacity-100' : 'opacity-0 pointer-events-none',
    );
    return (
        <Backdrop isVisible={isOpened}>
            <div
                ref={ref}
                className={modalClasses}
                style={{
                    transform: isOpened
                        ? 'translate(-50%, -50%) scale(1)'
                        : 'translate(-50%, -50%) scale(0.7)',
                    transition: 'transform 0.2s ease-out, opacity 0.3s ease-out',
                }}
            >
                {children}
            </div>
        </Backdrop>
    );
});

Modal.displayName = 'Modal';

export default Modal;

import React from 'react';
import Backdrop from '@/components/ui/modal/Backdrop';
import classNames from 'classnames';
import CloseButton from '@/components/ui/buttons/CloseButton';

export default function Modal({
    title,
    isOpened,
    handleClose,
    className,
    children,
}: {
    title: string;
    isOpened: boolean;
    handleClose: () => void;
    className?: string;
    children: React.ReactNode;
}) {
    const modalClasses = classNames(
        'fixed left-1/2 top-1/2 z-50 h-dvh w-max max-w-[100vw] overflow-auto rounded-lg bg-primary-light p-6 shadow-lg md:p-14 lg:max-w-[calc(100vw-50px)] lg:h-[calc(100vh-50px)]',
        isOpened ? 'opacity-100' : 'opacity-0 pointer-events-none',
        className,
    );
    return (
        <Backdrop isVisible={isOpened} handleClose={handleClose}>
            <div
                className={modalClasses}
                style={{
                    transform: isOpened
                        ? 'translate(-50%, -50%) scale(1)'
                        : 'translate(-50%, -50%) scale(0.7)',
                    transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
                }}
            >
                <CloseButton handleClick={handleClose} className="bg-white absolute top-4 right-4" />
                <p className="mb-6 text-[calc(1.275rem+0.3vw)] font-extrabold md:text-2xl text-black">
                    {title}
                </p>

                {children}
            </div>
        </Backdrop>
    );
}

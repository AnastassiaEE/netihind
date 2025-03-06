import classNames from 'classnames';
import React from 'react';
import Backdrop from '@/components/ui/modal/Backdrop';
import CloseButton from '@/components/ui/buttons/CloseButton';
import { useTranslations } from 'next-intl';

export default function Sidebar({
    name,
    title,
    isOpened,
    handleClose,
    sidebarRef,
    children,
}: {
    name: string,
    title: string;
    isOpened: boolean;
    handleClose: () => void;
    sidebarRef?: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
}) {
    const t = useTranslations('Overlay')

    const sidebarWrapperClasses = classNames(
        'fixed inset-y-0 right-0 z-50 w-80 max-w-full bg-white shadow-md transition-transform duration-300',
        isOpened ? 'translate-x-0' : 'translate-x-full pointer-events-none',
    );

    return (
        <Backdrop isVisible={isOpened} handleClose={handleClose}>
            <div
                role="dialog"
                aria-modal={isOpened}
                aria-hidden={!isOpened}
                aria-labelledby={`sidebar-${name}-title`}
                ref={sidebarRef}
                className={sidebarWrapperClasses}
            >
                <div className="flex justify-between border-b border-muted-light px-6 py-5">
                    <p id={`sidebar-${name}-title`} className="text-xl font-extrabold text-black">
                        {title}
                    </p>
                    <CloseButton label={t(`${name}.close`)} handleClick={handleClose} />
                </div>
                {children}
            </div>
        </Backdrop>
    );
}

import classNames from 'classnames';
import React from 'react';
import Backdrop from '@/components/ui/overlay/Backdrop';
import CloseButton from '@/components/ui/buttons/CloseButton';
import { useTranslations } from 'next-intl';

export default function Sidebar({
    name,
    title,
    isTransitioning,
    handleClose,
    handleTransitionEnd,
    sidebarRef,
    children,
}: {
    name: string;
    title: string;
    isTransitioning: boolean;
    handleClose: () => void;
    handleTransitionEnd: () => void;
    sidebarRef?: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
}) {
    const t = useTranslations('Buttons');

    const sidebarWrapperClasses = classNames(
        'fixed inset-y-0 right-0 z-50 w-80 max-w-full bg-white shadow-md transition-transform duration-200',
        isTransitioning ? 'translate-x-0' : 'translate-x-full',
    );

    return (
        <Backdrop isVisible={isTransitioning} handleClose={handleClose}>
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={`sidebar-${name}-title`}
                ref={sidebarRef}
                onTransitionEnd={handleTransitionEnd}
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

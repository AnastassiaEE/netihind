import React from 'react';
import Backdrop from '@/components/ui/overlay/Backdrop';
import classNames from 'classnames';
import CloseButton from '@/components/ui/buttons/CloseButton';
import { useTranslations } from 'next-intl';

export default function Dialog({
    type = 'modal',
    name,
    title,
    description,
    isOpened,
    handleClose,
    modalRef,
    className,
    children,
}: {
    type?: 'modal' | 'non-modal';
    name: string;
    title: string;
    description?: string;
    isOpened: boolean;
    handleClose: () => void;
    modalRef?: React.RefObject<HTMLDivElement>;
    className?: string;
    children: React.ReactNode;
}) {
    const t = useTranslations('Buttons');

    const dialogClasses = classNames(
        'fixed left-1/2 top-1/2 z-50 h-dvh w-max max-w-[100vw] overflow-auto rounded-lg bg-primary-light p-6 shadow-lg md:p-14 lg:max-w-[calc(100vw-50px)] lg:h-max lg:max-h-[calc(100vh-50px)]',
        isOpened ? 'modal-open' : 'modal-close',
        className,
    );
    const titleClasses = classNames(
        'text-[calc(1.275rem+0.3vw)] font-extrabold md:text-2xl text-black',
        description ? 'mb-3' : 'mb-6',
    );

    return (
        <>
            <Backdrop isVisible={isOpened} handleClose={handleClose} />
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={`${name}-dialog-title`}
                aria-describedby={description ? `${name}-dialog-description` : undefined}
                ref={modalRef}
                tabIndex={isOpened ? 0 : undefined}
                className={dialogClasses}
            >
                <CloseButton
                    label={t(`${name}.close`)}
                    handleClick={handleClose}
                    className="absolute right-4 top-4 bg-white"
                />
                <p id={`${name}-dialog-title`} className={titleClasses}>
                    {title}
                </p>
                {description && (
                    <p id={`${name}-dialog-description`} className="mb-6 text-lg font-medium">
                        {description}
                    </p>
                )}
                {children}
            </div>
        </>
    );
}

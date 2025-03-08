import React from 'react';
import Backdrop from '@/components/ui/modal/Backdrop';
import classNames from 'classnames';
import CloseButton from '@/components/ui/buttons/CloseButton';
import { useTranslations } from 'next-intl';

export default function Modal({
    name,
    title,
    description,
    isTransitioning,
    handleClose,
    modalRef,
    handleTransitionEnd,
    className,
    children,
}: {
    name: string;
    title: string;
    description?: string;
    isTransitioning: boolean;
    handleClose: () => void;
    modalRef?: React.RefObject<HTMLDivElement>;
    handleTransitionEnd: () => void;
    className?: string;
    children: React.ReactNode;
}) {
    const t = useTranslations('Overlay');

    const modalClasses = classNames(
        'fixed left-1/2 top-1/2 z-50 h-dvh w-max max-w-[100vw] overflow-auto rounded-lg bg-primary-light p-6 shadow-lg md:p-14 lg:max-w-[calc(100vw-50px)] lg:h-[calc(100vh-50px)]',
        isTransitioning ? 'opacity-100' : 'opacity-0',
        className,
    );
    const titleClasses = classNames(
        'text-[calc(1.275rem+0.3vw)] font-extrabold md:text-2xl text-black',
        description ? 'mb-3' : 'mb-6',
    );

    return (
        <Backdrop isVisible={isTransitioning} handleClose={handleClose}>
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={`${name}-modal-title`}
                aria-describedby={description ? `${name}-modal-description` : undefined}
                ref={modalRef}
                onTransitionEnd={handleTransitionEnd}
                className={modalClasses}
                style={{
                    transform: isTransitioning
                        ? 'translate(-50%, -50%) scale(1)'
                        : 'translate(-50%, -50%) scale(0.7)',
                    transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
                }}
            >
                <CloseButton
                    label={t(`${name}.close`)}
                    handleClick={handleClose}
                    className="bg-white absolute top-4 right-4"
                />
                <p id={`${name}-modal-title`} className={titleClasses}>
                    {title}
                </p>
                {description && (
                    <p id={`${name}-modal-description`} className="mb-6 font-medium text-lg">
                        {description}
                    </p>
                )}
                {children}
            </div>
        </Backdrop>
    );
}

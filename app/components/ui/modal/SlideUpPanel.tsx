'use client';

import classNames from 'classnames';
import useSlideUpPanel from '@/hooks/useSlideUpPanel';
import Backdrop from '@/components/ui/modal/Backdrop';
import PanelActions from '@/components/ui/modal/PanelActions';
import CloseButton from '@/components/ui/buttons/CloseButton';
import { useTranslations } from 'next-intl';

export default function SlideUpPanel({
    name,
    title,
    actions,
    isTransitioning,
    handleClose,
    handleTransitionEnd,
    panelRef,
    children,
}: {
    name: string;
    title: string;
    actions?: React.ReactNode;
    isTransitioning: boolean;
    handleClose: () => void;
    handleTransitionEnd: () => void;
    panelRef?: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
}) {
    const { handleTouchStart, handleTouchEnd } = useSlideUpPanel(handleClose);
    const t = useTranslations('Buttons');

    const panelClasses = classNames(
        'fixed inset-x-0 bottom-0 z-50 h-dvh rounded-t-2xl bg-white transition-transform duration-200',
        isTransitioning ? 'translate-y-0' : 'translate-y-full',
    );

    return (
        <Backdrop isVisible={isTransitioning} handleClose={handleClose}>
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={`${name}-panel-title`}
                ref={panelRef}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTransitionEnd={handleTransitionEnd}
                className={panelClasses}
            >
                <div className="relative border-b border-muted-light px-6 pb-5 pt-7">
                    <p id={`${name}-panel-title`} className="text-center text-xl font-extrabold text-black">
                        {title}
                    </p>
                    <CloseButton
                        label={t(`${name}.close`)}
                        handleClick={handleClose}
                        className="absolute right-6 top-1/2 -translate-y-1/2"
                    />
                </div>
                <div
                    className="overflow-y-auto p-6"
                    style={{ maxHeight: actions ? 'calc(100vh - 160px)' : 'auto' }}
                >
                    {children}
                </div>
                {actions && <PanelActions>{actions}</PanelActions>}
            </div>
        </Backdrop>
    );
}

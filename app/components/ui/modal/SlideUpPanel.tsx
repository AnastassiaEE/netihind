'use client';

import classNames from 'classnames';
import CloseIcon from '@mui/icons-material/Close';
import useSlideUpPanel from '@/hooks/useSlideUpPanel';
import Backdrop from '@/components/ui/modal/Backdrop';
import PanelActions from '@/components/ui/modal/PanelActions';

export default function SlideUpPanel({
    title,
    actions,
    isOpened,
    handleClose,
    children,
}: {
    title: string;
    actions?: React.ReactNode;
    isOpened: boolean;
    handleClose: () => void;
    children: React.ReactNode;
}) {
    const { handleTouchStart, handleTouchEnd } = useSlideUpPanel(handleClose);

    const panelClasses = classNames(
        'fixed inset-x-0 bottom-0 z-50 h-dvh rounded-t-2xl bg-white transition-transform',
        isOpened ? 'translate-y-0' : 'translate-y-full pointer-events-none'
    );

    return (
        <Backdrop isVisible={isOpened}>
            <div>
                <div className={panelClasses} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                    <div className="relative border-b border-muted-light px-6 pb-5 pt-7">
                        <p className="text-center text-xl font-extrabold text-black">{title}</p>
                        <button
                            type="button"
                            className="absolute right-6 top-1/2 -translate-y-1/2"
                            onClick={handleClose}
                        >
                            <CloseIcon className="text-muted transition-colors hover:text-black" />
                        </button>
                    </div>
                    <div
                        className="overflow-y-auto p-6"
                        style={{ maxHeight: actions ? 'calc(100vh - 160px)' : 'auto' }}
                    >
                        {children}
                    </div>
                    {actions && <PanelActions>{actions}</PanelActions>}
                </div>
            </div>
        </Backdrop>
    );
}

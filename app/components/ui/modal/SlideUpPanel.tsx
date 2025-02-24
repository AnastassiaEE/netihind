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
        'fixed z-50 inset-0 bg-white rounded-t-2xl transition-transform overflow-hidden',
        isOpened ? 'translate-y-0' : 'translate-y-full',
    );

    return (
        <Backdrop isVisible={isOpened}>
            <div className={isOpened ? 'overflow-visible' : 'overflow-hidden'}>
                <div className={panelClasses} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                    <div className="px-6 pt-7 pb-5 border-b border-muted-light relative">
                        <p className="text-xl text-center font-extrabold text-black">{title}</p>
                        <button
                            type="button"
                            className="absolute top-1/2 right-6 -translate-y-1/2"
                            onClick={handleClose}
                        >
                            <CloseIcon className="text-muted hover:text-black transition-colors" />
                        </button>
                    </div>
                    <div
                        className="p-6 overflow-y-auto"
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

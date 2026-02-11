'use client';

import classNames from 'classnames';
import useSlideUpPanel from '@/hooks/useSlideUpPanel';
import Backdrop from '@/components/ui/overlay/Backdrop';
import PanelActions from '@/components/ui/overlay/PanelActions';
import CloseButton from '@/components/ui/buttons/CloseButton';
import { useTranslations } from 'next-intl';
import { usePortal } from '@/hooks/usePortal';

export default function SlideUpPanel({
  name,
  title,
  actions,
  isMounted,
  isVisible,
  onClose,
  panelRef,
  children,
}: {
  name: string;
  title: string;
  actions?: React.ReactNode;
  isMounted: boolean;
  isVisible: boolean;
  onClose: () => void;
  panelRef?: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}) {
  const { handleTouchStart, handleTouchEnd } = useSlideUpPanel(onClose);
  const t = useTranslations('Buttons');

  const panelClasses = classNames(
    'fixed inset-x-0 bottom-0 z-50 h-dvh rounded-t-2xl bg-white',
    isVisible ? 'slideUpPanel-visible' : 'slideUpPanel-hidden',
  );

  const portalContent = (
    <>
      <Backdrop isVisible={isVisible} onClose={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${name}-panel-title`}
        ref={panelRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={panelClasses}
      >
        <div className="relative border-b border-muted-light px-6 pb-5 pt-7">
          <p
            id={`${name}-panel-title`}
            className="text-center text-xl font-extrabold text-black"
          >
            {title}
          </p>
          <CloseButton
            label={t(`${name}.close` as any)}
            onClick={onClose}
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
    </>
  );

  return usePortal(portalContent, isMounted);
}

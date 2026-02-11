import classNames from 'classnames';
import React from 'react';
import Backdrop from '@/components/ui/overlay/Backdrop';
import CloseButton from '@/components/ui/buttons/CloseButton';
import { useTranslations } from 'next-intl';
import { usePortal } from '@/hooks/usePortal';

export default function Sidebar({
  name,
  title,
  isMounted,
  isVisible,
  onClose,
  sidebarRef,
  children,
}: {
  name: string;
  title: string;
  isMounted: boolean;
  isVisible: boolean;
  onClose: () => void;
  sidebarRef?: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}) {
  const t = useTranslations('Buttons');

  const sidebarClasses = classNames(
    'fixed inset-y-0 right-0 z-50 w-80 max-w-full bg-white shadow-md',
    isVisible ? 'sidebar-visible' : 'sidebar-hidden',
  );
  const PortalContent = (
    <>
      <Backdrop isVisible={isVisible} onClose={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`sidebar-${name}-title`}
        ref={sidebarRef}
        className={sidebarClasses}
      >
        <div className="flex justify-between border-b border-muted-light px-6 py-5">
          <p
            id={`sidebar-${name}-title`}
            className="text-xl font-extrabold text-black"
          >
            {title}
          </p>
          <CloseButton label={t(`${name}.close` as any)} onClick={onClose} />
        </div>
        {children}
      </div>
    </>
  );

  return usePortal(PortalContent, isMounted);
}

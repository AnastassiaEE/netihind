import React from 'react';
import Backdrop from '@/components/ui/overlay/Backdrop';
import classNames from 'classnames';
import CloseButton from '@/components/ui/buttons/CloseButton';
import { useTranslations } from 'next-intl';
import { DialogType } from '@/types/ui.types';
import { usePortal } from '@/hooks/usePortal';
import { translateKey } from '@/utils/translationHelper';

export default function Dialog({
  type = 'modal',
  name,
  title,
  description,
  isMounted,
  isVisible,
  onClose,
  dialogRef,
  className,
  children,
}: {
  type?: DialogType;
  name: string;
  title?: string;
  description?: string;
  isMounted: boolean;
  isVisible: boolean;
  onClose?: () => void;
  dialogRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  children: React.ReactNode;
}) {
  const t = useTranslations('Buttons');

  const dialogClasses = classNames(
    'fixed top-1/2 left-1/2 z-50 size-max max-h-dvh max-w-screen overflow-auto rounded-md p-6 shadow-lg focus:outline-hidden md:p-11 lg:h-max lg:max-h-[90vh] lg:max-w-[90vw]',
    isVisible ? 'modal-visible' : 'modal-hidden',
    className,
  );
  const titleClasses = classNames(
    'text-[calc(1.275rem+0.3vw)] font-extrabold text-black md:text-2xl',
    description ? 'mb-3' : 'mb-6',
  );

  const portalContent = (
    <>
      {type === 'modal' && <Backdrop isVisible={isVisible} onClose={onClose} />}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${name}-dialog-title`}
        aria-describedby={
          description ? `${name}-dialog-description` : undefined
        }
        ref={dialogRef}
        className={dialogClasses}
      >
        {onClose && (
          <CloseButton
            label={translateKey(t, `${name}.close`)}
            onClick={onClose}
            className="absolute top-4 right-4 bg-white"
          />
        )}
        {title && (
          <p id={`${name}-dialog-title`} className={titleClasses}>
            {title}
          </p>
        )}
        {description && (
          <p
            id={`${name}-dialog-description`}
            className="mb-6 text-lg font-medium"
          >
            {description}
          </p>
        )}
        {children}
      </div>
    </>
  );

  return usePortal(portalContent, isMounted);
}

'use client';

import classNames from 'classnames';
import { useEffect } from 'react';

export default function Backdrop({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose?: () => void;
}) {
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isVisible);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <div
          onClick={onClose}
          className={classNames(
            'fixed inset-0 z-20 bg-black/50',
            onClose && 'cursor-pointer',
          )}
        ></div>
      )}
    </>
  );
}

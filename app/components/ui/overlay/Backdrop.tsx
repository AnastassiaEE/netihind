'use client';
import classNames from 'classnames';
import { useEffect } from 'react';

export default function Backdrop({
  isVisible,
  handleClose,
}: {
  isVisible: boolean;
  handleClose?: () => void;
}) {
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isVisible);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isVisible]);

  const backdropClasses = classNames(
    'fixed inset-0 z-20 bg-black/50',
    handleClose && 'cursor-pointer',
  );

  return (
    <>
      {isVisible && (
        <div onClick={handleClose} className={backdropClasses}></div>
      )}
    </>
  );
}

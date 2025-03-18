'use client';
import { useEffect } from 'react';

export default function Backdrop({
  isVisible,
  handleClose,
}: {
  isVisible: boolean;
  handleClose: () => void;
}) {
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isVisible);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isVisible]);
  return (
    <>
      {isVisible && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-20 cursor-pointer bg-black/50"
        ></div>
      )}
    </>
  );
}

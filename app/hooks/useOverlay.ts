import useBoolean from '@/hooks/useBoolean';
import { useEffect, useRef } from 'react';

export default function useOverlay() {
  const {
    value: isOverlayVisible,
    setTrue: openOverlay,
    setFalse: closeOverlay,
  } = useBoolean(false);

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        closeOverlay();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [closeOverlay]);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOverlayVisible);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOverlayVisible]);

  return {
    overlayRef,
    isOverlayVisible,
    openOverlay,
    closeOverlay,
  };
}

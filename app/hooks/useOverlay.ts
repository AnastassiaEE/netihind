import useBoolean from '@/hooks/useBoolean';
import { useEffect } from 'react';

export default function useOverlay() {
  const {
    value: isOverlayVisible,
    setTrue: openOverlay,
    setFalse: closeOverlay,
  } = useBoolean(false);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOverlayVisible);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOverlayVisible]);

  return {
    isOverlayVisible,
    openOverlay,
    closeOverlay,
  };
}

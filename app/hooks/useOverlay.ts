import useBoolean from '@/hooks/useBoolean';
import { useEffect } from 'react';

export default function useOverlay() {
  const {
    value: isOverlayVisible,
    setTrue: openOverlay,
    setFalse: closeOverlay,
  } = useBoolean(false);

  return {
    isOverlayVisible,
    openOverlay,
    closeOverlay,
  };
}

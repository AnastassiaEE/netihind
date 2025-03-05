import useBoolean from '@/hooks/useBoolean';
import { useEffect, useRef } from 'react';

export default function useOverlay() {
  const {
    value: isOverlayVisible,
    setTrue: openOverlay,
    setFalse: closeOverlay,
  } = useBoolean(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOverlayVisible && overlayRef.current) {
      const focusableElements = overlayRef.current.querySelectorAll(
        'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])',
      ) as NodeListOf<HTMLElement>;

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];

      firstFocusableElement?.focus();

      const trapFocus = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement?.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusableElement) {
              firstFocusableElement?.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', trapFocus);

      return () => {
        document.removeEventListener('keydown', trapFocus);
      };
    }
  }, [isOverlayVisible]);

  return {
    isOverlayVisible,
    openOverlay,
    closeOverlay,
    overlayRef,
  };
}

import useBoolean from '@/hooks/useBoolean';
import { useCallback, useEffect, useRef } from 'react';

export default function useOverlay() {
  const { value: isOpened, setTrue: open, setFalse: close } = useBoolean(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const openElementRef = useRef<HTMLElement | null>(null);

  const handleOpen = () => {
    open();
    openElementRef.current = document.activeElement as HTMLElement;
  };

  const handleClose = useCallback(() => {
    close();
    openElementRef.current?.focus();
  }, [close]);

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const target = e.target as HTMLElement;
        if (target?.getAttribute('role') === 'option') return;
        handleClose();
      }
    };
    const overlayElement = overlayRef.current;
    overlayElement?.addEventListener('keydown', handleEscKey);
    return () => overlayElement?.removeEventListener('keydown', handleEscKey);
  }, [handleClose]);

  useEffect(() => {
    if (!overlayRef.current || !isOpened) return;

    const overlayElement = overlayRef.current;

    const focusableElements = overlayElement.querySelectorAll(
      'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])',
    ) as NodeListOf<HTMLElement>;

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }

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

    overlayElement.addEventListener('keydown', trapFocus);
    return () => overlayElement.removeEventListener('keydown', trapFocus);
  }, [isOpened]);

  return {
    isOpened,
    open: handleOpen,
    close: handleClose,
    overlayRef,
  };
}

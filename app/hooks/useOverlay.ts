import useBoolean from '@/hooks/useBoolean';
import { useEffect, useRef, useState } from 'react';

export default function useOverlay() {
  const { value: isOpened, setTrue: open, setFalse: close } = useBoolean(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpened) {
      setIsMounted(true);
      setTimeout(() => setIsTransitioning(true), 10);
    } else {
      setIsTransitioning(false);
    }
  }, [isOpened]);

  const handleTransitionEnd = () => {
    if (!isTransitioning) setIsMounted(false);
  };

  useEffect(() => {
    if (isMounted && overlayRef.current) {
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
  }, [isMounted]);

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMounted) {
        close();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isMounted, close]);

  return {
    isOpened,
    isMounted,
    isTransitioning,
    open,
    close,
    overlayRef,
    handleTransitionEnd,
  };
}

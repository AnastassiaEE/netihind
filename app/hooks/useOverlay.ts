import useBoolean from '@/hooks/useBoolean';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function useOverlay() {
  const { value: isOpened, setTrue: open, setFalse: close } = useBoolean(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const openElementRef = useRef<HTMLElement | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpened) {
      openElementRef.current = document.activeElement as HTMLElement;
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
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const target = e.target as HTMLElement;
        if (target?.getAttribute('role') === 'option') return;
        openElementRef.current?.focus();
        close();
      }
    };
    const overlayElement = overlayRef.current;
    overlayElement?.addEventListener('keydown', handleEscKey);
    return () => overlayElement?.removeEventListener('keydown', handleEscKey);
  }, [close]);

  useEffect(() => {
    if (!overlayRef.current || !isMounted) return;

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
  }, [isMounted]);

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

import { useCallback, useEffect, useRef, useState } from 'react';
import useBoolean from '@/hooks/useBoolean';

export default function useOverlay(initialIsOpened: boolean = false) {
  const { value: isOpened, setTrue: open, setFalse: close } = useBoolean(initialIsOpened);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const openElementRef = useRef<HTMLElement | null>(null);
  const focusableElementsRef = useRef<HTMLElement[]>([]);
  const firstFocusableElementRef = useRef<HTMLElement | null>(null);
  const lastFocusableElementRef = useRef<HTMLElement | null>(null);

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
    if (overlayElement) {
      overlayElement.addEventListener('keydown', handleEscKey);
      return () => overlayElement.removeEventListener('keydown', handleEscKey);
    }
  }, [handleClose]);

  const updateFocusableElements = () => {
    const overlayElement = overlayRef.current;
    if (!overlayElement) return;

    const elements = Array.from(
      overlayElement.querySelectorAll(
        'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])',
      ),
    ) as HTMLElement[];

    focusableElementsRef.current = elements;
    firstFocusableElementRef.current = elements[0] || null;
    lastFocusableElementRef.current = elements[elements.length - 1] || null;
  };

  useEffect(() => {
    if (!overlayRef.current || !isOpened) return;

    overlayRef.current.focus();
    updateFocusableElements();

    const observer = new MutationObserver(() => {
      updateFocusableElements();
    });
    const config = {
      childList: false,
      subtree: true,
      attributes: true,
      attributeFilter: ['tabindex'],
    };
    observer.observe(overlayRef.current, config);

    return () => {
      observer.disconnect();
    };
  }, [isOpened]);

  const trapFocus = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElementRef.current) {
          lastFocusableElementRef.current?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElementRef.current) {
          firstFocusableElementRef.current?.focus();
          e.preventDefault();
        }
      }
    }
  }, []);

  useEffect(() => {
    const overlayElement = overlayRef.current;
    if (overlayElement) {
      overlayElement.addEventListener('keydown', trapFocus);
      return () => {
        overlayElement.removeEventListener('keydown', trapFocus);
      };
    }
  }, [trapFocus]);

  return {
    isOpened,
    open: handleOpen,
    close: handleClose,
    overlayRef,
  };
}

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Manages overlay/modal visibility, mounting, focus trapping, and ESC handling.
 *
 * This hook provides state and handlers for overlays or modals, including:
 * - Mounting/unmounting for animations
 * - Visibility toggle for CSS transitions
 * - Focus management inside the overlay (initial focus + tab trap)
 * - Closing via ESC key if allowed
 *
 * @param initialIsOpened - Determines if the overlay is initially opened
 * @param isClosable - Whether the overlay can be closed via ESC key
 *
 * @returns An object containing:
 *  - `isMounted`: boolean indicating if the overlay is mounted in the DOM
 *  - `isVisible`: boolean indicating if the overlay is visible (used for CSS transitions)
 *  - `open`: function to open the overlay and set focus
 *  - `close`: function to close the overlay and return focus to the previously active element
 *  - `overlayRef`: React ref attached to the overlay container element
 */
export default function useOverlay(
  initialIsOpened: boolean = false,
  isClosable: boolean = true,
) {
  const [isMounted, setIsMounted] = useState(initialIsOpened);
  const [isVisible, setIsVisible] = useState(initialIsOpened);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const openOverlayElementRef = useRef<HTMLElement | null>(null);
  const firstFocusableElementRef = useRef<HTMLElement | null>(null);
  const lastFocusableElementRef = useRef<HTMLElement | null>(null);

  const isReady = isMounted && isVisible;

  /* -------------------- OPEN / CLOSE -------------------- */

  /**
   * Opens the overlay:
   * - Sets mounted state to true
   * - Stores the previously focused element
   * - Sets visible state on next animation frame for transitions
   */
  const open = () => {
    setIsMounted(true);
    openOverlayElementRef.current = document.activeElement as HTMLElement;
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  };

  /**
   * Closes the overlay:
   * - Sets visible state to false (triggers CSS transition)
   * - Returns focus to the element that opened the overlay
   */
  const close = useCallback(() => {
    setIsVisible(false);
    openOverlayElementRef.current?.focus();
  }, []);

  /* -------------------- PRESENCE -------------------- */

  /**
   * Unmounts the overlay after transition ends (300ms).
   */
  useEffect(() => {
    if (!isVisible && isMounted) {
      const timeout = setTimeout(() => {
        setIsMounted(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, isMounted]);

  /* -------------------- FOCUSABLE ELEMENTS -------------------- */

  /**
   * Updates references to the first and last focusable elements inside the overlay
   * and sets initial focus on the first element.
   */
  const updateFocusableElements = useCallback(() => {
    const overlayElement = overlayRef.current;
    if (!overlayElement) return;

    const elements = Array.from(
      overlayElement.querySelectorAll(
        'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])',
      ),
    ) as HTMLElement[];

    firstFocusableElementRef.current = elements[0] || null;
    lastFocusableElementRef.current = elements[elements.length - 1] || null;
    firstFocusableElementRef.current.focus();
  }, []);

  /* -------------------- INITIAL FOCUS + OBSERVER -------------------- */

  /**
   * Sets initial focus and observes overlay DOM changes to update focusable elements.
   */
  useEffect(() => {
    if (!overlayRef.current || !isReady) return;

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
  }, [isReady, updateFocusableElements]);

  /* -------------------- TAB TRAP -------------------- */

  /**
   * Traps focus inside the overlay when pressing Tab or Shift+Tab.
   */
  useEffect(() => {
    const trapFocus = (e: KeyboardEvent) => {
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
    };

    const overlayElement = overlayRef.current;

    if (!overlayElement) return;

    overlayElement.addEventListener('keydown', trapFocus);
    return () => {
      overlayElement.removeEventListener('keydown', trapFocus);
    };
  }, [isReady]);

  /* -------------------- ESC -------------------- */

  /**
   * Closes the overlay when pressing the Escape key, if allowed.
   * Ignores ESC presses on elements with role="option".
   */
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isClosable) {
        const target = e.target as HTMLElement;
        if (target?.getAttribute('role') === 'option') return;
        close();
      }
    };

    const overlayElement = overlayRef.current;

    if (!overlayElement) return;

    overlayElement.addEventListener('keydown', handleEscKey);
    return () => overlayElement.removeEventListener('keydown', handleEscKey);
  }, [isReady, close]);

  return {
    isMounted,
    isVisible,
    open,
    close,
    overlayRef,
  };
}

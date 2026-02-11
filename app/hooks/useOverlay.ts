import { useCallback, useEffect, useRef, useState } from 'react';

export default function useOverlay(
  initialIsOpened: boolean = false,
  isClosable: boolean = true,
) {
  /** presence states */
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
   * 1. Sets `isMounted` to true so the overlay is added to the DOM.
   * 2. Stores the currently focused element to restore focus when closed.
   * 3. Uses `requestAnimationFrame` to set `isVisible` on the next frame,
   *    triggering the opening animation.
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
   * 1. Sets `isVisible` to false to trigger the closing animation.
   * 2. Restores focus to the element that was active before the overlay opened.
   */
  const close = useCallback(() => {
    setIsVisible(false);
    openOverlayElementRef.current?.focus();
  }, []);

  /* -------------------- PRESENCE -------------------- */

  /**
   * Handles the presence of the overlay in the DOM:
   * 1. When `isVisible` becomes false, waits for the closing animation to finish (200ms).
   * 2. After the animation, sets `isMounted` to false to remove the overlay from the DOM.
   * 3. Cleans up the timeout if the effect is re-run or the component unmounts.
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
   * Updates the first and last focusable elements within the overlay:
   * 1. Queries the overlay for all focusable elements (buttons, links, inputs, textareas, selects, and elements with a valid tabindex).
   * 2. Stores the first element in `firstFocusableElementRef` and the last element in `lastFocusableElementRef`.
   * 3. Automatically focuses the first focusable element to ensure proper initial focus when the overlay opens.
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
   * Sets up a MutationObserver to keep track of focusable elements inside the overlay:
   * 1. Runs only when the overlay is fully ready (`isReady`) and the `overlayRef` exists.
   * 2. Calls `updateFocusableElements` immediately to ensure the first and last focusable elements are correct.
   * 3. Observes changes to `tabindex` attributes inside the overlay to update the focusable elements dynamically.
   * 4. Disconnects the observer on cleanup to prevent memory leaks.
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
   * Traps keyboard focus within the overlay when the "Tab" key is pressed:
   * 1. If Shift+Tab is pressed on the first focusable element, moves focus to the last element.
   * 2. If Tab is pressed on the last focusable element, moves focus to the first element.
   * 3. Prevents the default browser tab behavior to keep focus inside the overlay.
   * 4. Attaches the listener to the overlay element only when the overlay is ready (`isReady`).
   * 5. Cleans up the event listener on unmount or when `isReady` changes.
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
   * Listens for the "Escape" key to close the overlay:
   * 1. Only closes the overlay if it is closable (`isClosable`).
   * 2. Ignores the event if the currently focused element has `role="option"`.
   * 3. Calls the `close` function to hide the overlay and restore focus.
   * 4. Attaches the listener to the overlay element only when it is ready (`isReady`).
   * 5. Cleans up the event listener when the overlay unmounts or `isReady` changes.
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

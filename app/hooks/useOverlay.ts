import { useCallback, useEffect, useRef, useState } from 'react';

export default function useOverlay(
  initialIsOpened: boolean = false,
  isClosable: boolean = true,
) {
  const [isOpened, setIsOpened] = useState(initialIsOpened);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const openOverlayElementRef = useRef<HTMLElement | null>(null);
  const firstFocusableElementRef = useRef<HTMLElement | null>(null);
  const lastFocusableElementRef = useRef<HTMLElement | null>(null);

  /**
   * Opens the overlay by setting its state to opened and captures the
   * currently focused element in the `openOverlayElementRef` to allow restoring focus
   * when the overlay is closed.
   */
  const open = () => {
    setIsOpened(true);
    openOverlayElementRef.current = document.activeElement as HTMLElement;
  };

  /**
   * Closes the overlay by setting its state to closed and returning focus
   * to the previously focused element.
   */
  const close = useCallback(() => {
    setIsOpened(false);
    openOverlayElementRef.current?.focus();
  }, []);

  /**
   * Updates the references to the first and last focusable elements within the overlay element.
   *
   * This function queries the overlay element for focusable elements such as buttons, links, inputs,
   * textareas, selects, and elements with a valid `tabindex`. It then sets the `firstFocusableElementRef`
   * and `lastFocusableElementRef` to the first and last focusable elements found, respectively.
   * If no focusable elements are found, the references are set to `null`.
   *
   * Additionally, it attempts to focus on the first focusable element.
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

  /**
   * Manages focus and updates focusable elements when the overlay is opened.
   *
   * This effect:
   * 1. Checks if the overlay is open (`isOpened`) and if `overlayRef.current` is valid. If not, it exits early.
   * 2. When the overlay is opened, it:
   *    - Sets focus on the overlay element (`overlayRef.current.focus()`).
   *    - Calls the `updateFocusableElements` function to identify and update the first and last focusable elements within the overlay.
   * 3. It sets up a `MutationObserver` to watch for changes to the `tabindex` attribute on the overlay element.
   *    - This is useful if the focusable elements inside the overlay may change dynamically.
   * 4. The observer configuration ensures that it only reacts to changes in attributes (specifically `tabindex`).
   * 5. When a change is detected, it calls `updateFocusableElements` again to keep the list of focusable elements up to date.
   * 6. The observer is disconnected when the component is unmounted or `isOpened` changes, to avoid memory leaks.
   *
   * This ensures that the overlay element is properly focused, and the list of focusable elements is updated dynamically when changes occur.
   */
  useEffect(() => {
    if (!overlayRef.current || !isOpened) return;

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
  }, [isOpened, updateFocusableElements]);

  /**
   * Traps focus within the overlay element when the "Tab" key is pressed.
   *
   * 1. The effect creates a `trapFocus` function that listens for the "Tab" key event.
   * 2. If the "Tab" key is pressed with `shiftKey` (Shift+Tab), it checks if the currently focused element is the first focusable element. If so, it moves focus to the last focusable element.
   * 3. If the "Tab" key is pressed normally, it checks if the currently focused element is the last focusable element. If so, it moves focus to the first focusable element.
   * 4. The event listener is added to the overlay element when it is available, ensuring the focus trapping works when the overlay is displayed.
   * 5. The event listener is cleaned up when the component unmounts, or when the dependencies change, to avoid memory leaks.
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
    if (overlayElement) {
      overlayElement.addEventListener('keydown', trapFocus);
      return () => {
        overlayElement.removeEventListener('keydown', trapFocus);
      };
    }
  }, []);

  /**
   * Listens for the "Escape" key press to close the overlay.
   *
   * This effect:
   * 1. Sets up an event listener on the `overlayElement` for `keydown` events.
   * 2. When the "Escape" key is pressed and the overlay is closable, it checks if the target element has the `role="option"`.
   *    If the target has this role, the function returns early, preventing the close action.
   * 3. If the target doesn't have the `role="option"`, it calls the `handleClose` function to close the overlay or modal.
   * 4. The event listener is cleaned up when the component is unmounted or when the `overlayElement` reference changes.
   *
   * This ensures that pressing the "Escape" key will close the overlay, except when the focus is on an element with `role="option"`.
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
    if (overlayElement) {
      overlayElement.addEventListener('keydown', handleEscKey);
      return () => overlayElement.removeEventListener('keydown', handleEscKey);
    }
  }, [close]);

  return {
    isOpened,
    open,
    close,
    overlayRef,
  };
}

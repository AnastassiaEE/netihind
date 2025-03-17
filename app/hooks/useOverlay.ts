import { useCallback, useEffect, useRef } from 'react';
import useBoolean from '@/hooks/useBoolean';

export default function useOverlay(initialIsOpened: boolean = false) {
  const {
    value: isOpened,
    setTrue: open,
    setFalse: close,
  } = useBoolean(initialIsOpened);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const openElementRef = useRef<HTMLElement | null>(null);
  const firstFocusableElementRef = useRef<HTMLElement | null>(null);
  const lastFocusableElementRef = useRef<HTMLElement | null>(null);

  /**
   * Function to handle the opening of an overlay window.
   *
   * 1. First, it calls the `open` function, which is responsible for opening the element.
   * 2. Then, it saves the currently focused element (before opening the element)
   *    in `openElementRef.current`. This is necessary so that when the element is
   *    closed, the focus can be returned to the element that was focused before opening.
   *
   * @returns {void}
   */
  const handleOpen = () => {
    open();
    openElementRef.current = document.activeElement as HTMLElement;
  };

  /**
   * Function to handle the closing of an overlay window.
   *
   * 1. First, it calls the `close` function, which is responsible for closing the element.
   * 2. After the element is closed, it checks if `openElementRef.current` is defined (i.e., it has a valid reference).
   *    If it does, the function sets focus back to the element that was focused before opening the element.
   *
   * This ensures that the focus is returned to the element that triggered the opening,
   * providing a better user experience and maintaining accessibility.
   *
   * @returns {void}
   */
  const handleClose = useCallback(() => {
    close();
    openElementRef.current?.focus();
  }, [close]);

  /**
   * Function to check if an element is focusable by verifying its visibility
   * and that all of its parent elements are not hidden.
   *
   * The function traverses the DOM tree from the element to its ancestors (parent elements).
   * It checks if any of the parent elements have the CSS `display: none` or `visibility: hidden` styles.
   * If any parent element is hidden, the function returns `false`, indicating that the element is not focusable.
   * Otherwise, it returns `true`, meaning the element is potentially focusable.
   *
   * @param {HTMLElement} element - The element to check for focusability.
   * @returns {boolean} - Returns `true` if the element and all of its parent elements are visible, `false` otherwise.
   */
  const isElementFocusable = (element: HTMLElement) => {
    let parent = element.parentElement;
    while (parent) {
      const parentStyle = window.getComputedStyle(parent);
      if (parentStyle.display === 'none' || parentStyle.visibility === 'hidden')
        return false;
      parent = parent.parentElement;
    }
    return true;
  };

  /**
   * Function to update the list of focusable elements within a overlay container.
   *
   * This function:
   * 1. Retrieves all elements within the container (`overlayElement`) that are focusable, based on a query selector
   *    that targets common interactive elements (`button`, `a`, `input`, `textarea`, `select`, and elements with a valid `tabindex`).
   * 2. Filters out elements that are not visible or cannot be focused, using the `isElementFocusable` function.
   * 3. Updates the references to the first and last focusable elements:
   *    - `firstFocusableElementRef.current` is set to the first visible focusable element.
   *    - `lastFocusableElementRef.current` is set to the last visible focusable element.
   *
   * This ensures that the focus trap functionality can correctly identify the range of focusable elements within the container.
   *
   * @returns {void}
   */
  const updateFocusableElements = useCallback(() => {
    const overlayElement = overlayRef.current;
    if (!overlayElement) return;

    const elements = Array.from(
      overlayElement.querySelectorAll(
        'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])',
      ),
    ) as HTMLElement[];

    const visibleElements = elements.filter((element) =>
      isElementFocusable(element),
    );
    firstFocusableElementRef.current = visibleElements[0] || null;
    lastFocusableElementRef.current =
      visibleElements[visibleElements.length - 1] || null;
  }, []);

  /**
   * Effect hook that manages focus and updates focusable elements when the overlay is opened.
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
   *
   * @returns {void}
   */
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
  }, [isOpened, updateFocusableElements]);

  /**
   * Effect hook that traps focus within the overlay element when the "Tab" key is pressed.
   *
   * 1. The effect creates a `trapFocus` function that listens for the "Tab" key event.
   * 2. If the "Tab" key is pressed with `shiftKey` (Shift+Tab), it checks if the currently focused element is the first focusable element. If so, it moves focus to the last focusable element.
   * 3. If the "Tab" key is pressed normally, it checks if the currently focused element is the last focusable element. If so, it moves focus to the first focusable element.
   * 4. The event listener is added to the overlay element when it is available, ensuring the focus trapping works when the overlay is displayed.
   * 5. The event listener is cleaned up when the component unmounts, or when the dependencies change, to avoid memory leaks.
   *
   * @returns {void}
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
   * Effect hook that listens for the "Escape" key press to close the overlay or modal.
   *
   * This effect:
   * 1. Sets up an event listener on the `overlayElement` for `keydown` events.
   * 2. When the "Escape" key is pressed, it checks if the target element has the `role="option"`.
   *    If the target has this role, the function returns early, preventing the close action.
   * 3. If the target doesn't have the `role="option"`, it calls the `handleClose` function to close the overlay or modal.
   * 4. The event listener is cleaned up when the component is unmounted or when the `overlayElement` reference changes.
   *
   * This ensures that pressing the "Escape" key will close the overlay, except when the focus is on an element with `role="option"`.
   *
   * @returns {void}
   */
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

  return {
    isOpened,
    open: handleOpen,
    close: handleClose,
    overlayRef,
  };
}

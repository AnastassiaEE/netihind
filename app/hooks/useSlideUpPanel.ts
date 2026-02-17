import { useState } from 'react';

/**
 * Handles swipe-down gesture to close a slide-up panel.
 *
 * This hook tracks touch start and end positions to detect a downward swipe.
 * If the user swipes down more than 100 pixels, the provided `handleClose`
 * callback is invoked to close the panel.
 *
 * @param handleClose - Callback function to close the slide-up panel
 *
 * @returns An object containing touch event handlers:
 *  - handleTouchStart: attach to the panel's `onTouchStart` event
 *  - handleTouchEnd: attach to the panel's `onTouchEnd` event
 */
export default function useSlideUpPanel(handleClose: () => void) {
  const [startY, setStartY] = useState(0); // Track the vertical position where the touch started

  /**
   * Records the initial Y-coordinate when the user starts touching the panel.
   *
   * @param e - React touch event from `onTouchStart`
   */
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) =>
    setStartY(e.touches[0].clientY);

  /**
   * Determines swipe distance when the user releases the touch.
   * If the swipe down exceeds 100 pixels, triggers the `handleClose` callback.
   *
   * @param e - React touch event from `onTouchEnd`
   */
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const endY = e.changedTouches[0].clientY;
    if (endY - startY > 100) {
      handleClose();
    }
  };

  return {
    handleTouchStart,
    handleTouchEnd,
  };
}

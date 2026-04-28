import { useEffect, useState } from 'react';

/**
 * Tracks the current vertical scroll position of the window.
 *
 * This hook returns the `window.scrollY` value and updates it
 * whenever the user scrolls. Useful for sticky headers, scroll
 * animations, or conditional rendering based on scroll position.
 *
 * @returns The current vertical scroll position in pixels.
 */
export default function useScrollPosition() {
  const [y, setY] = useState(0);

  /**
   * Updates the scroll position state whenever the user scrolls.
   */
  useEffect(() => {
    const handleYPosition = () => setY(window.scrollY);
    window.addEventListener('scroll', handleYPosition);
    return () => window.removeEventListener('scroll', handleYPosition);
  }, []);

  return y;
}

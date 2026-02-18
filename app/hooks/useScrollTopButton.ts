import useScrollPosition from '@/hooks/useScrollPosition';

/**
 * Provides logic for a "scroll to top" button.
 *
 * This hook tracks the current vertical scroll position using `useScrollPosition`
 * and exposes a handler to smoothly scroll the window back to the top.
 *
 * Can be used to conditionally render a scroll-to-top button when the user
 * scrolls past a certain point.
 *
 * @returns An object containing:
 *  - `y`: the current vertical scroll position in pixels
 *  - `handleClick`: function to smoothly scroll to the top of the page
 */
export default function useScrollTopButton() {
  const y = useScrollPosition();

  /**
   * Checks if the code is running in a browser environment.
   */
  const isBrowser = () => typeof window !== 'undefined';

  /**
   * Smoothly scrolls the window to the top.
   */
  const handleClick = () => {
    if (isBrowser()) window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return {
    y,
    handleClick,
  };
}

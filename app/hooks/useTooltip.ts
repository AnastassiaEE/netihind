import { useRef, useState, useLayoutEffect } from 'react';

/**
 * Provides tooltip visibility, positioning, and refs for a wrapper and tooltip element.
 *
 * This hook calculates the tooltip position relative to its wrapper,
 * ensures it stays within the viewport, and exposes show/hide functions.
 *
 * @returns An object containing:
 *  - `isVisible`: boolean indicating whether the tooltip is currently shown
 *  - `wrapperRef`: React ref to attach to the element that triggers the tooltip
 *  - `tooltipRef`: React ref to attach to the tooltip element itself
 *  - `show`: function to show the tooltip
 *  - `hide`: function to hide the tooltip
 */
export default function useTooltip() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  /** Show the tooltip */
  const show = () => setIsVisible(true);
  /** Hide the tooltip */
  const hide = () => setIsVisible(false);

  /**
   * Calculates the tooltip position when visible.
   * - Positions tooltip below the wrapper by default.
   * - Moves it above if it would overflow the bottom of the viewport.
   * - Adjusts horizontal position to stay within window padding.
   */
  useLayoutEffect(() => {
    if (!isVisible || !wrapperRef.current || !tooltipRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const padding = 8;
    let top = rect.bottom + 6;
    let left = rect.left + rect.width / 2;

    // Move tooltip above wrapper if it would overflow bottom
    if (rect.bottom + tooltipRect.height + 10 > window.innerHeight) {
      top = rect.top - tooltipRect.height - 6;
    }

    // Adjust horizontal position to stay inside viewport
    if (left - tooltipRect.width / 2 < padding) {
      left = tooltipRect.width / 2 + padding;
    }
    if (left + tooltipRect.width / 2 > window.innerWidth - padding) {
      left = window.innerWidth - tooltipRect.width / 2 - padding;
    }

    tooltipRef.current.style.top = `${top}px`;
    tooltipRef.current.style.left = `${left}px`;
  }, [isVisible]);

  return {
    isVisible,
    wrapperRef,
    tooltipRef,
    show,
    hide,
  };
}

import { useRef, useState, useLayoutEffect, useEffect } from 'react';

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
    const offset = 8;
    let top = rect.bottom + offset;
    let left = rect.left + rect.width / 2;

    // Move tooltip above wrapper if it would overflow bottom
    if (rect.bottom + tooltipRect.height + offset > window.innerHeight) {
      top = rect.top - tooltipRect.height - offset;
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

  useEffect(() => {
    if (!isVisible) return;

    const hideOnScroll = () => setIsVisible(false);

    window.addEventListener('scroll', hideOnScroll, true);
    window.addEventListener('wheel', hideOnScroll, { passive: true });
    window.addEventListener('touchmove', hideOnScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', hideOnScroll, true);
      window.removeEventListener('wheel', hideOnScroll);
      window.removeEventListener('touchmove', hideOnScroll);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const hideOnOutsideInteraction = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target || wrapperRef.current?.contains(target)) return;
      setIsVisible(false);
    };

    document.addEventListener('mousedown', hideOnOutsideInteraction);
    document.addEventListener('touchstart', hideOnOutsideInteraction, {
      passive: true,
    });

    return () => {
      document.removeEventListener('mousedown', hideOnOutsideInteraction);
      document.removeEventListener('touchstart', hideOnOutsideInteraction);
    };
  }, [isVisible]);

  return {
    isVisible,
    wrapperRef,
    tooltipRef,
    show,
    hide,
  };
}

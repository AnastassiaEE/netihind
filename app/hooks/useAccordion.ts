import { useEffect, useId, useRef, useState } from 'react';
import useBoolean from '@/hooks/useBoolean';

/**
 * Custom hook for managing an accessible accordion component.
 *
 * Handles open/close state, collapsible panel height, visibility, and
 * provides prop getters for button, panel, and arrow elements.
 *
 * @param defaultClosed - Whether the accordion is initially closed (default: true)
 *
 * @returns An object containing:
 *  - `isClosed`: boolean indicating if the accordion is closed
 *  - `isVisible`: boolean controlling whether the panel is rendered
 *  - `collapsibleRef`: ref to attach to the collapsible panel
 *  - `getButtonProps`: returns props to spread on the toggle button
 *  - `getPanelProps`: returns props to spread on the panel element
 *  - `getArrowProps`: returns the arrow direction for UI
 */
export default function useAccordion(defaultClosed: boolean = true) {
  const {
    value: isClosed,
    setTrue: close,
    setFalse: open,
  } = useBoolean(defaultClosed);
  const collapsibleRef = useRef<HTMLDivElement>(null);
  const [collapsibleHeight, setCollapsibleHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(!defaultClosed); // Controls whether the panel is mounted in the DOM
  const panelId = useRef(useId());                            // Unique ID for aria-controls / accessibility

  /**
   * Toggle accordion open/closed state and manage visibility.
   */
  const toggle = () => {
    if (isClosed) {
      setIsVisible(true);
      open();
    } else {
      close();
    }
  };

  /**
   * Hide panel after collapse transition ends.
   */
  const handleTransitionEnd = () => {
    if (isClosed) setIsVisible(false);
  };

  /**
   * Update panel height on open and on window resize for smooth transitions.
   */
  useEffect(() => {
    const updateHeight = () => {
      if (collapsibleRef.current && !isClosed) {
        setCollapsibleHeight(collapsibleRef.current.scrollHeight);
      } else {
        setCollapsibleHeight(0);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [isClosed]);

  return {
    isClosed,
    isVisible,
    collapsibleRef,
    getButtonProps: () => ({
      onClick: toggle,
      'aria-expanded': !isClosed,
      'aria-controls': panelId.current,
    }),
    getPanelProps: () => ({
      id: panelId.current,
      onTransitionEnd: handleTransitionEnd,
      style: { height: `${collapsibleHeight}px` },
      className: 'overflow-hidden transition-all duration-500',
    }),
    getArrowProps: (): { direction: 'up' | 'down' } => ({
      direction: isClosed ? 'down' : 'up',
    }),
  };
}

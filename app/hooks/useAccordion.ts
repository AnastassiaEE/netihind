import { useEffect, useId, useRef, useState } from 'react';
import useBoolean from '@/hooks/useBoolean';

export default function useAccordion(defaultClosed: boolean = true) {
  const {
    value: isClosed,
    setTrue: close,
    setFalse: open,
  } = useBoolean(defaultClosed);
  const collapsibleRef = useRef<HTMLDivElement>(null);
  const [collapsibleHeight, setCollapsibleHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(!defaultClosed);
  const panelId = useRef(useId());

  /**
   * Toggles the state of an accordion item between closed and opened.
   *
   * - If the item is currently closed, it sets the item to visible and triggers the `open` function.
   * - If the item is opened, it triggers the `close` function.
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
   * Handles the transition end event for an accordion.
   *
   * If the accordion is closed, it sets the visibility state to false.
   */
  const handleTransitionEnd = () => {
    if (isClosed) setIsVisible(false);
  };

  /**
   * Updates the height of the collapsible element based on its scrollHeight.
   *
   * When the 'isClosed' state changes, it sets the height to the element's scrollHeight if not closed,
   * or 0 if closed. It also updates the height on window resize.
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
    toggle,
    collapsibleRef,
    collapsibleHeight,
    panelId,
    handleTransitionEnd,
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
      direction: isClosed ? 'up' : 'down',
    }),
  };
}

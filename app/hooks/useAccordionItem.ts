import { useEffect, useId, useRef, useState } from 'react';
import useBoolean from '@/hooks/useBoolean';

export default function useAccordionItem(initialIsCollapsed: boolean) {
  const {
    value: isCollapsed,
    setTrue: close,
    setFalse: open,
  } = useBoolean(initialIsCollapsed);
  const collapsibleRef = useRef<HTMLDivElement>(null);
  const [collapsibleHeight, setCollapsibleHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(!initialIsCollapsed);
  const id = useRef(useId());

  /**
   * Toggles the state of an accordion item between collapsed and expanded.
   *
   * - If the item is currently collapsed, it sets the item to visible and triggers the `open` function.
   * - If the item is not collapsed, it triggers the `close` function.
   */
  const toggle = () => {
    if (isCollapsed) {
      setIsVisible(true);
      open();
    } else {
      close();
    }
  };

  /**
   * Handles the transition end event for an accordion item.
   *
   * If the item is collapsed, it sets the visibility state to false.
   */
  const handleTransitionEnd = () => {
    if (isCollapsed) setIsVisible(false);
  };

  /**
   * Updates the height of the collapsible element based on its scrollHeight.
   *
   * When the 'isCollapsed' state changes, it sets the height to the element's scrollHeight if not collapsed,
   * or 0 if collapsed. It also updates the height on window resize.
   */
  useEffect(() => {
    const updateHeight = () => {
      if (collapsibleRef.current && !isCollapsed) {
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
  }, [isCollapsed]);

  return {
    isCollapsed,
    isVisible,
    toggle,
    collapsibleRef,
    collapsibleHeight,
    id,
    handleTransitionEnd,
  };
}

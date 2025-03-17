import { useEffect, useId, useRef, useState } from 'react';
import useBoolean from '@/hooks/useBoolean';

export default function useAccordionItem(isCollapsed: boolean) {
  const { value: isExpanded, toggle } = useBoolean(!isCollapsed);
  const collapsible = useRef<HTMLDivElement>(null);
  const [collapsibleHeight, setCollapsibleHeight] = useState(0);
  const id = useRef(useId());

  /**
   * Effect hook that calculates and updates the height of the collapsible content
   * when the accordion is expanded. It also listens for window resize events
   * to adjust the height accordingly.
   *
   * The height is set to the scrollHeight of the collapsible element when expanded,
   * and set to 0 when collapsed. The event listener is added on mount and removed
   * on cleanup.
   *
   * @returns {void}
   */
  useEffect(() => {
    const updateHeight = () => {
      if (collapsible.current && isExpanded) {
        setCollapsibleHeight(collapsible.current.scrollHeight);
      } else {
        setCollapsibleHeight(0);
      }
    };

    updateHeight();

    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [isExpanded]);

  return {
    isExpanded,
    toggle,
    collapsible,
    collapsibleHeight,
    id,
  };
}

import { useEffect, useId, useRef, useState } from 'react';
import useBoolean from '@/hooks/useBoolean';

export default function useAccordionItem(isCollapsed: boolean) {
  const { value: isExpanded, toggle } = useBoolean(!isCollapsed);
  const collapsible = useRef<HTMLDivElement>(null);
  const [collapsibleHeight, setCollapsibleHeight] = useState(0);
  const id = useRef(useId());

  useEffect(() => {
    if (collapsible.current && isExpanded) {
      setCollapsibleHeight(collapsible.current.scrollHeight);
    }
  }, [isExpanded]);

  return {
    isExpanded,
    toggle,
    collapsible,
    collapsibleHeight: isExpanded ? collapsibleHeight : 0,
    id,
  };
}

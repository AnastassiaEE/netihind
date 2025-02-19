import { useEffect, useId, useRef, useState } from 'react';
import useBoolean from '@/hooks/useBoolean';

export default function useAccordionItem(isCollapsed: boolean) {
  const { value: isOpened, toggle } = useBoolean(!isCollapsed);
  const collapsible = useRef<HTMLDivElement>(null);
  const [collapsibleHeight, setCollapsibleHeight] = useState(0);
  const id = useRef(useId());

  useEffect(() => {
    if (collapsible.current) {
      setCollapsibleHeight(collapsible.current.scrollHeight);
    }
  }, []);

  return {
    isOpened,
    toggle,
    collapsible,
    collapsibleHeight: isOpened ? collapsibleHeight : 0,
    id,
  };
}

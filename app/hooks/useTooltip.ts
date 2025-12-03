import { useRef, useState, useLayoutEffect } from 'react';

export default function useTooltip() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  useLayoutEffect(() => {
    if (!isVisible || !wrapperRef.current || !tooltipRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const padding = 8;
    let top = rect.bottom + 6; 
    let left = rect.left + rect.width / 2;

    if (rect.bottom + tooltipRect.height + 10 > window.innerHeight) {
      top = rect.top - tooltipRect.height - 6;
    }

    if (left - tooltipRect.width / 2 < padding) {
      left = tooltipRect.width / 2 + padding;
    }
    if (left + tooltipRect.width / 2 > window.innerWidth - padding) {
      left = window.innerWidth - tooltipRect.width / 2 - padding;
    }

    setPos({ top, left });
  }, [isVisible]);

  return {
    isVisible,
    pos,
    wrapperRef,
    tooltipRef,
    show,
    hide,
  };
}

import { useRef, useState } from 'react';

export default function useTooltip() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  const show = () => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();

    setPos({
      top: rect.bottom + 6, 
      left: rect.left + rect.width / 2,
      width: rect.width,
    });

    setIsVisible(true);
  };

  const hide = () => setIsVisible(false);

  return {
    isVisible,
    pos,
    wrapperRef,
    show,
    hide,
  };
}

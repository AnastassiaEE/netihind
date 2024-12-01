import { useState } from 'react';

export default function usePopover(initialVisible = false) {
  const [isVisible, setIsVisible] = useState(initialVisible);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);
  const toggle = () => setIsVisible((prev) => !prev);

  return {
    isVisible,
    show,
    hide,
    toggle,
  };
}

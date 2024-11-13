import { useState } from 'react';

export default function usePopover() {
  const [isVisible, setIsVisible] = useState(false);
  const handleMouseEnter = () => {
    setIsVisible(true);
  };
  const handleMouseLeave = () => {
    setIsVisible(false);
  };
  return {
    isVisible,
    handleMouseEnter,
    handleMouseLeave,
  };
}

import { useState } from 'react';

export default function useSlideUpPanel(handleClose: () => void) {
  const [startY, setStartY] = useState(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => setStartY(e.touches[0].clientY);
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const endY = e.changedTouches[0].clientY;
    if (endY - startY > 100) {
      handleClose();
    }
  };

  return {
    handleTouchStart,
    handleTouchEnd,
  };
}

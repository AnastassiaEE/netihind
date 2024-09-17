import { useEffect, useState } from 'react';

export default function useScrollPosition() {
  const [y, setY] = useState(0);

  useEffect(() => {
    const handleYPosition = () => {
      setY(window.scrollY);
    };
    window.addEventListener('scroll', handleYPosition);
    return () => window.removeEventListener('scroll', handleYPosition);
  }, []);

  return y;
}

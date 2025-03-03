import { useEffect, useRef, useState } from 'react';

export default function useSelect() {
  const [isBoxOpened, setIsBoxOpened] = useState(false);
  const selectRef = useRef<HTMLButtonElement>(null);

  const handleSelectClick = () => {
    setIsBoxOpened((prev) => !prev);
  };

  const handleClickOutsideSelect = (e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      setIsBoxOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideSelect);
    return () => {
      document.removeEventListener('click', handleClickOutsideSelect);
    };
  }, []);

  return {
    isBoxOpened,
    selectRef,
    handleSelectClick,
  };
}

import { useEffect, useRef, useState } from 'react';

export default function useSelect() {
  const [isBoxOpened, setIsBoxOpened] = useState(false);
  const selectButtonRef = useRef<HTMLButtonElement>(null);
  const selectBoxRef = useRef<HTMLDivElement>(null);

  const toggleSelect = () => {
    setIsBoxOpened((prev) => !prev);
  };

  const closeSelect = () => {
    setIsBoxOpened(false);
  };

  const handleOptionSelect = (
    name: string,
    value: string,
    handleChange: (name: string, value: string) => void,
  ) => {
    handleChange(name, value);
    closeSelect();
  };

  // Обработчик клавиши Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSelect(); // Закрытие при Escape
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      selectButtonRef.current &&
      !selectButtonRef.current.contains(e.target as Node) &&
      selectBoxRef.current &&
      !selectBoxRef.current.contains(e.target as Node)
    ) {
      closeSelect();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return {
    isBoxOpened,
    selectButtonRef,
    selectBoxRef,
    toggleSelect,
    handleOptionSelect,
  };
}

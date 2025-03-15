import { useCallback, useEffect, useRef, useState } from 'react';

const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' ', 'Home', 'End'];

export default function useSelect() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const comboBoxRef = useRef<HTMLButtonElement>(null);
  const listBoxRef = useRef<HTMLDivElement>(null);

  const toggleSelect = () => setIsExpanded((prev) => !prev);
  const closeSelect = () => setIsExpanded(false);
  const openSelect = () => setIsExpanded(true);

  const handleOptionSelect = (
    name: string,
    value: string,
    handleChange: (name: string, value: string) => void,
  ) => {
    handleChange(name, value);
    closeSelect();
  };

  const updateFocusedIndex = useCallback((newIndex: number) => {
    const options = listBoxRef.current?.querySelectorAll('li');
    if (options && options.length > 0) {
      const validIndex = Math.max(0, Math.min(newIndex, options.length - 1));
      setFocusedIndex(validIndex);
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const { key } = e;
      const options = listBoxRef.current?.querySelectorAll('li');

      if (!isExpanded && openKeys.includes(key)) {
        e.preventDefault();
        if (key === 'Home') updateFocusedIndex(0);
        if (key === 'End') updateFocusedIndex(options ? options.length - 1 : 0);
        openSelect();
        return;
      }

      if (isExpanded) {
        switch (key) {
          case 'Home':
          case 'PageUp':
            e.preventDefault();
            updateFocusedIndex(0);
            break;
          case 'End':
          case 'PageDown':
            e.preventDefault();
            updateFocusedIndex(options ? options.length - 1 : 0);
            break;
          case 'ArrowUp':
            e.preventDefault();
            updateFocusedIndex(focusedIndex - 1);
            break;
          case 'ArrowDown':
            e.preventDefault();
            updateFocusedIndex(focusedIndex + 1);
            break;
          case 'Tab':
            e.preventDefault();
            const totalOptions = options?.length || 0;
            const newIndex = e.shiftKey
              ? (focusedIndex - 1 + totalOptions) % totalOptions
              : (focusedIndex + 1) % totalOptions;
            updateFocusedIndex(newIndex);
            break;
          case 'Escape':
            e.preventDefault();
            closeSelect();
            comboBoxRef.current?.focus();
            break;
          case 'Enter':
          case ' ':
            e.preventDefault();
            comboBoxRef.current?.focus();
            break;
          default:
            break;
        }
      }
    },
    [focusedIndex, isExpanded, updateFocusedIndex],
  );

  useEffect(() => {
    const focusOption = () => {
      const options = listBoxRef.current?.querySelectorAll('li');
      const focusedOption = options ? options[focusedIndex] : null;
      if (focusedOption) focusedOption.focus();
    };
    if (isExpanded) focusOption();
  }, [focusedIndex, isExpanded]);

  useEffect(() => {
    const comboBox = comboBoxRef.current;
    const listBox = listBoxRef.current;
    comboBox?.addEventListener('keydown', handleKeyDown);
    listBox?.addEventListener('keydown', handleKeyDown);
    return () => {
      comboBox?.removeEventListener('keydown', handleKeyDown);
      listBox?.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const handleClickOutsideSelect = (e: MouseEvent) => {
      if (
        comboBoxRef.current &&
        !comboBoxRef.current.contains(e.target as Node) &&
        listBoxRef.current &&
        !listBoxRef.current.contains(e.target as Node)
      ) {
        closeSelect();
      }
    };
    document.addEventListener('click', handleClickOutsideSelect);
    return () => document.removeEventListener('click', handleClickOutsideSelect);
  }, []);

  return {
    isExpanded,
    comboBoxRef,
    listBoxRef,
    toggleSelect,
    handleOptionSelect,
    focusedIndex,
  };
}

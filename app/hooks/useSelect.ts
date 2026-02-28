import { ComboBoxProps } from '@/types/form.types';
import { useCallback, useEffect, useRef, useState } from 'react';

const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' ', 'Home', 'End'];

/**
 * Provides accessible keyboard and click interactions for a custom select (combobox) component.
 *
 * This hook manages open/close state, keyboard navigation (Arrow keys, Home/End, Tab, Enter, Space),
 * focus management, and outside click handling. It returns props and helpers to wire up
 * a button acting as the combobox and a listbox with selectable options.
 *
 * @param name - Unique name for the select field
 * @param label - Accessible label for the combobox
 *
 * @returns An object containing:
 *  - `isExpanded`: whether the combobox is open
 *  - `listBoxId`: the ID for the listbox element
 *  - `listBoxRef`: ref to the listbox DOM element
 *  - `handleOptionSelect`: function to select an option and close the combobox
 *  - `getComboBoxProps`: props to spread onto the combobox button for accessibility
 */
export default function useSelect(name: string, label: string) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const comboBoxRef = useRef<HTMLButtonElement>(null);
  const listBoxId = `${name}-select-box`;
  const listBoxRef = useRef<HTMLDivElement>(null);

  /* -------------------- OPEN / CLOSE HANDLERS -------------------- */

  const toggleSelect = () => setIsExpanded((prev) => !prev);
  const closeSelect = () => setIsExpanded(false);
  const openSelect = () => setIsExpanded(true);

  /**
   * Selects an option in a combobox and closes the dropdown.
   *
   * @param name - The name of the field associated with the combobox
   * @param value - The value of the selected option
   * @param handleChange - Callback function to update the selected value in state
   */
  const handleOptionSelect = (
    name: string,
    value: string,
    handleChange: (name: string, value: string) => void,
  ) => {
    handleChange(name, value);
    closeSelect();
  };

  /* -------------------- FOCUS MANAGEMENT -------------------- */

  /**
   * Updates the currently focused index in a listbox, ensuring it stays within the valid range.
   *
   * @param newIndex - The new index to focus. Will be clamped between 0 and (number of options - 1)
   */
  const updateFocusedIndex = useCallback((newIndex: number) => {
    const options = listBoxRef.current?.querySelectorAll('li');
    if (options && options.length > 0) {
      const validIndex = Math.max(0, Math.min(newIndex, options.length - 1));
      setFocusedIndex(validIndex);
    }
  }, []);

  /* -------------------- KEYBOARD NAVIGATION -------------------- */

  /**
   * Handles keyboard interactions for the custom select/combobox component.
   *
   * @param e - The keyboard event triggered on the combobox or input element
   *
   * Key behavior:
   * - `Home` / `End` / `PageUp` / `PageDown`: moves focus to first/last option
   * - `ArrowUp` / `ArrowDown`: moves focus up or down by one
   * - `Tab`: cycles focus through options
   * - `Escape`: closes the dropdown and focuses the combobox
   * - `Enter` / `Space`: focuses the combobox (used for selection in combination with mouse or click handlers)
   * - When closed, pressing keys in `openKeys` array opens the select dropdown
   */
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
          case 'Tab': {
            e.preventDefault();
            const totalOptions = options?.length || 0;
            const newIndex = e.shiftKey
              ? (focusedIndex - 1 + totalOptions) % totalOptions
              : (focusedIndex + 1) % totalOptions;
            updateFocusedIndex(newIndex);
            break;
          }
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

  /* -------------------- FOCUS HIGHLIGHT -------------------- */

  useEffect(() => {
    const focusOption = () => {
      const options = listBoxRef.current?.querySelectorAll('li');
      const focusedOption = options ? options[focusedIndex] : null;
      if (focusedOption) focusedOption.focus();
    };
    if (isExpanded) focusOption();
  }, [focusedIndex, isExpanded]);

  /* -------------------- ATTACH KEYDOWN LISTENERS -------------------- */

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

  /* -------------------- CLICK OUTSIDE -------------------- */

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
    return () =>
      document.removeEventListener('click', handleClickOutsideSelect);
  }, []);

  return {
    isExpanded,
    listBoxId,
    listBoxRef,
    handleOptionSelect,
    getComboBoxProps: (): ComboBoxProps => ({
      onClick: toggleSelect,
      ref: comboBoxRef,
      role: 'combobox',
      'aria-label': label,
      'aria-expanded': isExpanded,
      'aria-haspopup': 'listbox',
      'aria-controls': listBoxId,
    }),
  };
}

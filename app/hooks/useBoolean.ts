import { useState } from 'react';

/**
 * Utility hook for managing boolean state.
 *
 * Provides convenient helpers to toggle the value
 * or explicitly set it to true or false.
 *
 * Useful for UI state such as modals, dropdowns, accordions, etc.
 *
 * @param initialValue - Initial boolean value
 *
 * @returns An object containing:
 *  - value: current boolean state
 *  - toggle: toggles the value
 *  - setTrue: sets the value to true
 *  - setFalse: sets the value to false
 */
export default function useBoolean(initialValue: boolean) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((value) => !value);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return { value, toggle, setTrue, setFalse };
}

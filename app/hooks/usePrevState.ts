import { useEffect, useRef } from 'react';

/**
 * Tracks the previous value of a state or prop across renders.
 *
 * This hook returns the value from the previous render cycle,
 * which is useful for comparing past and current state or props
 * without triggering additional renders.
 *
 * @param state - The current state or prop value to track
 * @returns The value from the previous render.
 */
const usePrevState = <T>(state: T, initialValue?: T) => {
  const prevState = useRef<T | undefined>(initialValue);

  /**
   * Update the ref with the current state after each render
   */
  useEffect(() => {
    prevState.current = state;
  }, [state]);

  return prevState.current;
};

export default usePrevState;

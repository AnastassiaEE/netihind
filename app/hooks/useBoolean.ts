import { useState } from 'react';

export default function useBoolean(initialValue: boolean) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((value) => !value);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return { value, toggle, setTrue, setFalse };
}

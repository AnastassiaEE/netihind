import { useEffect, useRef } from "react";

const usePrevState = (state: any) => {
  const prevState = useRef(0);
  useEffect(() => {
      prevState.current = state;
  }, [state]);
  return prevState.current;
}

export default usePrevState;
import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay = 600): T => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);
  return debounceValue;
};

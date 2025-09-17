"use client";

import { useEffect, useState, useRef } from "react";

type UseDebounceOptions = {
  leading?: boolean;   // gọi ngay lần đầu
  trailing?: boolean;  // gọi sau delay (mặc định true)
};

export const useDebounce = <T>(
  value: T,
  delay: number,
  options: UseDebounceOptions = { trailing: true }
): T => {
  const { leading = false, trailing = true } = options;
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLeadingCalled = useRef(false);

  useEffect(() => {
    // clear timer cũ
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (leading && !isLeadingCalled.current) {
      setDebouncedValue(value);
      isLeadingCalled.current = true;
    }

    if (trailing) {
      timeoutRef.current = setTimeout(() => {
        setDebouncedValue(value);
        isLeadingCalled.current = false; // reset để lần sau leading lại chạy
      }, delay);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, delay, leading, trailing]);

  return debouncedValue;
};

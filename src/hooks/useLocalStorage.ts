import { useState, useCallback, useMemo } from 'react';

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  storage = localStorage
): [T, (value: T) => void] {
  const [value, setValue] = useState(get<T>(key, defaultValue, storage));

  const handleChange = useCallback(
    (value) => {
      setValue(value);
      set<T>(key, value, storage);
    },
    [key, storage]
  );

  return useMemo(() => [value, handleChange], [value, handleChange]);
}

export function get<T>(
  key: string,
  defaultValue: T,
  storage = localStorage
): T {
  const value = storage.getItem(key);
  if (!value) {
    return defaultValue;
  }

  try {
    return JSON.parse(value);
  } catch (e) {
    return defaultValue;
  }
}

export function set<T>(key: string, value: T, storage = localStorage) {
  storage.setItem(key, JSON.stringify(value));
}

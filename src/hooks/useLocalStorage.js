import { useEffect, useState } from 'react';

// Read once, lazily, so we never pay for a parse we don't need.
// Writes go through an effect so state stays the single source of truth
// and storage is just a side effect of it. localStorage can throw
// (private mode, quota) — the app should keep working either way.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? initialValue : JSON.parse(raw);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage unavailable — state still works for this session
    }
  }, [key, value]);

  return [value, setValue];
}

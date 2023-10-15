import { useEffect, useRef } from 'react';

/**
 * A debounce hook that delays the execution of a callback function.
 *
 * @param {function} callback - The function to be executed.
 * @param {number} delay - The delay in milliseconds.
 * @param {boolean} immediate - Determines whether the callback is executed immediately on initial render.
 */
const useDebounce = (callback, delay = 300, immediate = false) => {
  const timerRef = useRef(null);

  useEffect(() => {
    if (immediate) {
      callback();
    }
  }, []);

  const debouncedCallback = (...args) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      callback.apply(null, args);
    }, delay);
  };

  return debouncedCallback;
};

export default useDebounce;

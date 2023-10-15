import { useState } from 'react';

import useTransliteration from './useTransliteration';
import useDebounce from './useDebounce';

/**
 * A custom React hook that debounces the transliteration of text.
 *
 * This hook takes a single argument, which is the text to be transliterated. It returns
 * two values:
 *
 * * `translated`: The transliterated text.
 * * `loading`: A boolean value indicating whether the transliteration is in progress.
 *
 * The hook works by using the `useTransliteration` hook to transliterate the text. The
 * `useTransliteration` hook is a separate hook that provides a way to transliterate text in
 * React.
 *
 * The `useDebouncedTransliteration` hook also uses the `useDebounce` hook to debounce the
 * transliteration. The `useDebounce` hook is a separate hook that provides a way to debounce
 * functions in React.
 *
 * @param text The text to be transliterated.
 * @returns {object} An object containing the transliterated text and a boolean value indicating whether
 * the transliteration is in progress.
 */
const useDebouncedTransliteration = (text) => {
  const [translated, setTranslated] = useState('');
  const [loading, setLoading] = useState(false);
  const transliterate = useTransliteration();

  const debounceCallBack = (content) => {
    setLoading(true);
    // translating the text and updating translated value
    transliterate(content).then((transliteration) => {
      setLoading(false);
      setTranslated(transliteration);
    });
  };

  // calling the debounced function
  useDebounce(debounceCallBack)(text);

  return { translated, loading };
};

export default useDebouncedTransliteration;

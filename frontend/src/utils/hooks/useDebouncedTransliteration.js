import { useState } from 'react';

import useTransliteration from './useTransliteration';
import useDebounce from './useDebounce';

/**
 * A Custom React Hook that performs transliteration process in debounce mechanism.
 * @returns {TransliterationStates}
 */
/**
 * @typedef TransliterationStates
 * @property {Array} transliteratedValues - transliterated values
 * @property {Boolean} isLoading - loading state
 * @property {Function} transliterate - callback function to transliterate with debounce. Accepts a string parameter
 */

const useDebouncedTransliteration = () => {
  const [transliterated, setTransliterated] = useState([]);
  const [loading, setLoading] = useState(false);
  const transliterateText = useTransliteration();

  /**@param {String} content - text to be transliterated */
  const debounceCb = (content) => {
    setLoading(true);
    // translating the text and updating transliterated value
    transliterateText(content).then((transliteration) => {
      setLoading(false);
      setTransliterated(transliteration);
    });
  };

  // calling the debounce hook and returns the debouncedCallback
  const debouncedCallback = useDebounce(debounceCb);

  return {
    transliteratedValues: transliterated,
    isLoading: loading,
    transliterate: debouncedCallback,
  };
};

export default useDebouncedTransliteration;

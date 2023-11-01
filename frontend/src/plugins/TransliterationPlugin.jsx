/* eslint-disable react/prop-types */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalTypeaheadMenuPlugin, MenuOption } from '@lexical/react/LexicalTypeaheadMenuPlugin';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { $createTextNode, $getSelection } from 'lexical';
import { useDebounce, useTransliteration } from '@hooks';

// regex to check if the user is typing only letters
const lettersTriggerRegex = /^[a-zA-Z]+$/;

// At most, 5 suggestions are shown in the popup.
const SUGGESTION_LIST_LENGTH_LIMIT = 5;
// Length of the input string sent to transliterate.
const INPUT_LENGTH = 20;

function useCachedTransliterationService(inputString) {
  const [results, setResults] = useState([]);
  const transliterate = useTransliteration();

  // debounce callback
  const debounceCb = (string) => {
    transliterate(string).then((result) => {
      setResults(result ?? []);
    });
  };

  const transliterateDebounced = useDebounce(debounceCb, 50);

  useLayoutEffect(() => {
    if (inputString == null || inputString.length > INPUT_LENGTH) {
      setResults([]);
      return;
    }
    transliterateDebounced(inputString, SUGGESTION_LIST_LENGTH_LIMIT);
  }, [inputString]);

  return results;
}

class WordSuggestionAhead extends MenuOption {
  word;

  constructor(word) {
    super(word);
    this.word = word;
  }
}

function WordSuggestionAheadMenuItem({ index, isSelected, onClick, onMouseEnter, option }) {
  let className = 'item';
  if (isSelected) {
    className += ' selected';
  }
  return (
    <li
      key={option.key}
      tabIndex={-1}
      className={className}
      ref={option.setRefElement}
      role="option"
      aria-selected={isSelected}
      id={'typeahead-item-' + index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      <span className="text">{option.word}</span>
    </li>
  );
}

export default function TransliterationPlugin() {
  const [editor] = useLexicalComposerContext();

  const [queryString, setQueryString] = useState(null);
  const [results, setResults] = useState([]);
  const transliterated = useCachedTransliterationService(queryString);

  useLayoutEffect(() => {
    setResults(transliterated);
  }, [transliterated]);

  const options = useMemo(
    () => results.map((result) => new WordSuggestionAhead(result)),
    [results],
  );

  const onSelectOption = useCallback(
    (selectedOption, nodeToReplace, closeMenu) => {
      editor.update(() => {
        const textNode = $createTextNode(selectedOption.word);
        textNode.setFormat($getSelection().format);
        if (nodeToReplace) {
          nodeToReplace.replace(textNode);
        }
        textNode.select();
        closeMenu();
        setResults([]);
      });
    },
    [editor],
  );

  const matchLetters = useCallback(
    (text) => {
      function getLastWordWithOnlyLetters(input) {
        // Use a regular expression to find the last word with only letters
        const matches = input.match(/[a-zA-Z]+(?=\s|$)/g);
        // Check if there are any matches
        if (matches && matches.length > 0) {
          // Return the last match
          if (/[^a-zA-Z]$/.test(input)) return null;
          return matches[matches.length - 1];
        } else {
          // No match found, return null
          return null;
        }
      }
      const word = getLastWordWithOnlyLetters(text);
      let match = null;
      if (word) match = lettersTriggerRegex.exec(word);
      if (match !== null) {
        return {
          leadOffset: match.index,
          matchingString: match[0],
          replaceableString: match[0],
        };
      }
      return null;
    },
    [editor],
  );
  return (
    <LexicalTypeaheadMenuPlugin
      onQueryChange={setQueryString}
      onSelectOption={onSelectOption}
      triggerFn={matchLetters}
      options={options}
      anchorClassName="typeahead-anchor"
      menuRenderFn={(
        anchorElementRef,
        { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex },
      ) => {
        return anchorElementRef.current && results.length
          ? ReactDOM.createPortal(
              <div className="typeahead-popover mentions-menu">
                <ul>
                  {options.map((option, i) => (
                    <WordSuggestionAheadMenuItem
                      index={i}
                      isSelected={selectedIndex === i}
                      onClick={() => {
                        setHighlightedIndex(i);
                        selectOptionAndCleanUp(option);
                      }}
                      onMouseEnter={() => {
                        setHighlightedIndex(i);
                      }}
                      key={option.key}
                      option={option}
                    />
                  ))}
                </ul>
              </div>,
              anchorElementRef.current,
            )
          : null;
      }}
    />
  );
}

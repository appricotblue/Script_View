import React, { useEffect, useRef, useState } from 'react';
import './autocomplete.css';

const AutocompleteField = ({
  index,
  suggestions,
  field,
  setSuggestions,
  handleAutocompleteChange,
  tableData,
  setTableData,
}) => {
  const modalRef = useRef(null);
  const inpRef = useRef(null);
  const [isModalOpen, setIsModalopen] = useState(false);
  const [FieldName, setFieldName] = useState('');
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

  const handleItemAdd = (item, index, field) => {
    const values = [...tableData];
    const currentFieldValue = values[index][field];
    const words = currentFieldValue.split(' ');

    if (words.length > 0) {
      words[words.length - 1] = item;
      values[index][field] = words.join(' ') + ' ';
    }
    setTableData(values);
    setSuggestions([]);
    inpRef.current.focus();
  };

  const handleInput = (index, value, field) => {
    handleAutocompleteChange(index, value, field);
  };

  const handleSpaceKey = (e) => {
    const inputValue = e.target.value;
    if (e.key === ' ' && inputValue.trim() !== '') {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedItemIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1),
      );
      // console.log('down');
      // console.log(selectedItemIndex);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedItemIndex((prevIndex) => Math.max(prevIndex - 1, -1));
      // console.log('up');
    } else if (e.key === 'Enter' && selectedItemIndex !== -1) {
      handleItemAdd(suggestions[selectedItemIndex]);
      // console.log('enter');
    }
  };

  // useEffect(() => {
  //   document.addEventListener('keydown', handleKeyDown);
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [selectedItemIndex]);

  const renderSuggestions = () => {
    if (suggestions && field === FieldName && suggestions.length > 0) {
      return (
        <div className="modal">
          {suggestions.map((item, ind) => (
            <div
              className="model-item"
              onClick={() => handleItemAdd(item)}
              key={ind}
            >
              {item}
            </div>
          ))}
        </div>
      );
    }
    console.log('none');
    return null;
  };
  return (
    <div className="container">
      <textarea
        type="text"
        name={field}
        ref={inpRef}
        value={tableData[index][field]}
        className="inp"
        onChange={(e) => {
          handleInput(index, e.target.value, field);
        }}
        onFocus={() => {
          setFieldName(field);
        }}
        onBlur={() => {
          setTimeout(() => {
            setFieldName('');
            setSuggestions([]);
          }, 200);
        }}
        onKeyUp={(e) => handleSpaceKey(e)}
      />
      {suggestions && field === FieldName && suggestions.length > 1 && (
        <div ref={modalRef} className="modal">
          {suggestions.map((item, ind) => {
            return (
              <div
                className={`model-item ${
                  selectedItemIndex === ind ? 'selected' : ''
                }`}
                onClick={() => handleItemAdd(item, index, field)}
                key={ind}
              >
                {item}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AutocompleteField;

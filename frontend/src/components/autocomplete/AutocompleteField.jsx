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
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [tableOpen, setTableOpen] = useState({
    scene: false,
    location: false,
    time: false,
    intOrExt: false,
    action: false,
    character: false,
  });

  const handleItemAdd = (item, index, field) => {
    if (item && suggestions) {
      const values = [...tableData];
      const currentFieldValue = values[index][field];
      const delimiterRegex = /[,.?\[\](_)+\s]+/;
      const words = currentFieldValue.split(delimiterRegex);

      if (words.length > 0) {
        words[words.length - 1] = item;
        values[index][field] = words.join(' ') + ' ';
      }
      setTableData(values);
      setSuggestions([]);
      inpRef.current.focus();
      setSelectedItemIndex(-1);
    } else {
      console.log('err');
    }
  };

  const handleItemAddWhithEnter = (item, index) => {
    setTableData((prev) => {
      const prevdata = [...prev];
      prevdata[index][field] = item;
      return prevdata;
    });
  };

  const handleInput = (index, value, field) => {
    setIsModalopen(true);
    setTableOpen((prev) => ({ ...prev, [field]: true }));
    handleAutocompleteChange(index, value, field);
  };

  const handleModalClose = () => {
    setTimeout(() => {
      setTableOpen((prev) => ({ ...prev, [field]: false }));
      setSelectedItemIndex(-1);
    }, 300);
  };

  const handleSpaceKey = (e) => {
    const inputValue = e.target.value;
    if (e.key === ' ' && inputValue.trim() !== '') {
      setSuggestions([]);
      setSelectedItemIndex(-1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedItemIndex((prevIndex) =>
        prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1,
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedItemIndex((prevIndex) =>
        prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1,
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedItemIndex !== -1) {
        handleItemAddWhithEnter(suggestions[selectedItemIndex], index);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItemIndex]);
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
          setTableOpen((prev) => ({ ...prev, [field]: true }));
        }}
        onBlur={handleModalClose}
        onKeyUp={(e) => handleSpaceKey(e)}
      />
      {isModalOpen && tableOpen[field] && suggestions.length > 1 && (
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

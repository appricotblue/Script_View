import React, { useRef, useState } from 'react';
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
  const inpRef = useRef();
  const [FieldName, setFieldName] = useState('');

  const handleItemAdd = (item) => {
    console.log(item);
    const values = [...tableData];
    const currentFieldValue = values[index][field];
    const words = currentFieldValue.split(' ');

    if (words.length > 0) {
      words[words.length - 1] = item;
      values[index][field] = words.join(' ');
    }

    setTableData(values);
    console.log(tableData);
    setSuggestions([]);
    inpRef.current.focus();
  };

  console.log('field', field);
  console.log('fieldName', FieldName);
  const handleSpaceKey = (e) => {
    const inputValue = e.target.value;
    if (e.key === ' ' && inputValue.trim() !== '') {
      setSuggestions([]);
    }
  };

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
          handleAutocompleteChange(index, e.value, field, e);
        }}
        onFocus={() => setFieldName(field)}
        onBlur={() => {
          setTimeout(() => {
            setFieldName('');
            setSuggestions([]);
          }, 200);
        }}
        // setFieldName('');
        // setSuggestions([]);
        // }}
        onKeyUp={(e) => handleSpaceKey(e)}
      />
      {/* {renderSuggestions()} */}
      {suggestions && FieldName === field && suggestions.length > 1 && (
        <div className="modal">
          {suggestions.map((item, ind) => {
            return (
              <div
                className="model-item"
                onClick={() => handleItemAdd(item)}
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

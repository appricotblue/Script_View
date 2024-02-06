import React, { memo, useEffect, useState } from 'react';
import IndexHeader from './IndexHeader';
import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Style from './TextArea.module.css';
// import { AutoComplete } from 'primereact/autocomplete';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useTransliteration } from '@hooks';
import { VITE_BASE_URL } from '@/constants';
import { PlusCircle } from '@phosphor-icons/react';
import { useTitle } from '@/context/OnelineTitleContext';
import AutocompleteField from '@/components/autocomplete/AutocompleteField';
import axios from 'axios';

const IndexTable = () => {
  const [tableData, setTableData] = useState([
    {
      scene: '',
      location: '',
      time: '',
      IntOrExt: '',
      Action: '',
      Character: '',
    },
  ]);

  useEffect(() => {}, []);

  const [suggestions, setSuggestions] = useState([]);

  const { oneLineTitle } = useTitle();

  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

  const handleInsertRowAbove = (index) => {
    const newTableRow = {
      location: '',
      scene: '',
      time: '',
      IntOrExt: '',
      Action: '',
      Character: '',
    };
    const updatedTableData = [
      ...tableData.slice(0, index),
      newTableRow,
      ...tableData.slice(index),
    ];
    setTableData(updatedTableData);
  };

  const handleInsertRowBelow = (index) => {
    const newTableRow = {
      location: '',
      scene: '',
      time: '',
      IntOrExt: '',
      Action: '',
      Character: '',
    };
    const updatedTableData = [
      ...tableData.slice(0, index + 1),
      newTableRow,
      ...tableData.slice(index + 1),
    ];
    setTableData(updatedTableData);
  };

  const handleRemoveRow = (index) => {
    const updatedTableData = tableData.filter((_, i) => i !== index);
    setTableData(updatedTableData);
  };

  const handleKeyPress = (event, index) => {
    if (event.key === 'Enter') {
      if (index === tableData.length - 1) {
        const newTableRow = {
          location: '',
          scene: '',
          time: '',
          IntOrExt: '',
          Action: '',
          Character: '',
        };
        setTableData([...tableData, newTableRow]);
      }
      handleSubmit();
    } else if (event.key === 'Backspace') {
      const currentCharacter = event.target.textContent;
      if (currentCharacter.length < 1) {
        if (index === tableData.length - 1 && index !== 0) {
          setTableData(tableData.slice(0, -1));
        }
      }
    }
  };

  const handleRowClear = (event, index) => {
    const currentCharacter = event.target.textContent;
    if (currentCharacter.length < 1) {
      if (event.key === 'Backspace') {
        const currentRow = tableData[index];
        const isRowEmpty = Object.values(currentRow).every(
          (value) => value === '',
        );
        if (isRowEmpty && index !== 0) {
          const updatedTableData = tableData.filter((_, i) => i !== index);
          setTableData(updatedTableData);
        }
      }
    }
  };

  const handleSubmit = async () => {
    if (oneLineTitle.trim() !== '') {
      try {
        const response = await fetch(
          `${VITE_BASE_URL}/api/scripts/storeOneLineData`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ oneLiners: tableData, title: oneLineTitle }),
          },
        );

        console.log(tableData);

        if (response.ok) {
          console.log('Data stored successfully');
        } else {
          console.error('Failed to store data');
        }
      } catch (error) {
        console.error('Error while making API call:', error);
      }
    } else {
      alert('Enter a title');
    }
  };

  const handleAutocompleteChange = (index, value, field) => {
    fetchSearchOptions(value);
    const updatedTableData = [...tableData];
    updatedTableData[index][field] = value;
    setTableData(updatedTableData);
  };

  const fetchSearchOptions = async (value) => {
    const inputText = value;
    const delimiterRegex = /[,.?\[\](_)+\s]+/;
    const words = inputText.split(delimiterRegex);
    const lastWord = words.pop();
    const response = await transliterate(lastWord);
    setSuggestions(response);
  };

  const search = (event, index, field) => {
    // e.preventDefault()
    fetchSearchOptions(event, index, field);
  };

  const transliterate = useTransliteration();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${VITE_BASE_URL}/api/scripts/getOnelines/${id}`,
      );
      const { data } = response;
      console.log('responce', response.data.oneLiners[0].oneLiners);
      setTableData(response.data.oneLiners[0].oneLiners);
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const handleBeforeUnload = (event) => {
      const message = 'Are you sure you want to leave?';
      event.returnValue = message; // Standard for most browsers
      return message; // For some older browsers
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <IndexHeader />

      <Paper
        sx={{
          width: '1200px',
          minHeight: '1000px',
          boxShadow: '2.99253px 2.99253px 13.46637px 0px rgba(0, 0, 0, 0.10)',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '7rem',
        }}
        className={Style['container']}
      >
        <TableContainer
          component={Paper}
          sx={{ padding: '40px', minHeight: '1000px' }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: '#cfcfcf 1px solid' }} align="center">
                  Scene
                </TableCell>
                <TableCell sx={{ border: '#cfcfcf 1px solid' }} align="center">
                  Location
                </TableCell>
                <TableCell sx={{ border: '#cfcfcf 1px solid' }} align="center">
                  Time
                </TableCell>
                <TableCell sx={{ border: '#cfcfcf 1px solid' }} align="center">
                  IntOrExt
                </TableCell>
                <TableCell sx={{ border: '#cfcfcf 1px solid' }} align="center">
                  Action
                </TableCell>
                <TableCell sx={{ border: '#cfcfcf 1px solid' }} align="center">
                  Character
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <>
                  <Box
                    sx={{
                      position: 'absolute',
                      zIndex: '1',
                      marginLeft: '-32px',
                      marginTop: '14px',
                    }}
                    onMouseEnter={() => setHoveredRowIndex(index)}
                    onMouseLeave={() => setHoveredRowIndex(null)}
                  >
                    <PlusCircle size={23} />
                    {hoveredRowIndex === index && (
                      <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical contained button group"
                        variant="contained"
                        sx={{
                          position: 'absolute',
                          zIndex: 1,
                          right: 15,
                          top: 10,
                        }}
                      >
                        <Button
                          onClick={() => handleRemoveRow(index)}
                          color="primary"
                        >
                          Remove
                        </Button>
                        <Button
                          onClick={() => handleInsertRowAbove(index)}
                          color="primary"
                        >
                          Insert Above
                        </Button>
                        <Button
                          onClick={() => handleInsertRowBelow(index)}
                          color="primary"
                        >
                          Insert Below
                        </Button>
                      </ButtonGroup>
                    )}
                  </Box>
                  <TableRow key={index}>
                    {Object.keys(row).map((field) => (
                      <TableCell
                        key={field}
                        align="right"
                        sx={{
                          padding: '0',
                          margin: '0',
                          borderColor: 'rgb(207, 207, 207) ',
                          borderWidth: '1px',
                          borderStyle: 'solid',
                        }}
                      >
                        {/* <Autocomplete
                          value={row[field]}
                          suggestions={suggestions ? suggestions : ['']}
                          completeMethod={(e) => search(e, index, field)}
                          // onKeyUp={fetchSearchOptions}
                          onChange={(e) => handleAutocompleteChange(index, e.value, field, e)}
                        /> */}
                        <AutocompleteField
                          suggestions={suggestions}
                          index={index}
                          setSuggestions={setSuggestions}
                          field={field}
                          handleAutocompleteChange={handleAutocompleteChange}
                          tableData={tableData}
                          setTableData={setTableData}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ display: 'flex', margin: '20px' }}
          >
            Submit
          </Button>
        </TableContainer>
      </Paper>
    </>
  );
};

const MemoizedIndexTable = memo(IndexTable);
export default MemoizedIndexTable;

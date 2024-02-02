import React, { memo, useEffect, useRef, useState } from 'react';
import { Autocomplete, Box, Button, ButtonGroup, Paper, TableContainer, TextField } from '@mui/material';
import { PlusCircle } from '@phosphor-icons/react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import IndexHeader from './IndexHeader';
import { useTransliteration } from '@hooks';

import Style from './TextArea.module.css';
import { useTitle } from '@/context/OnelineTitleContext';

const IndexTable = () => {
  const [margin] = useState(3);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [tableData, setTableData] = useState([
    {
      location: '',
      scene: '',
      time: '',
      IntOrExt: '',
      Action: '',
      Character: '',
    },
  ]);

  const { oneLineTitle } = useTitle();

  const handleCellChange = (event, index, key) => {
    const updatedTableData = tableData.map((row, i) => {
      if (i === index) {
        return {
          ...row,
          [key]: event.target.value,
        };
      }
      return row;
    });
    setTableData(updatedTableData);
  };

  const handleSubmit = async () => {
    if (oneLineTitle.trim() !== '') {
      try {
        const response = await fetch('http://localhost:8080/api/scripts/storeOneLineData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ oneLiners: tableData, title: oneLineTitle }),
        });

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
        const isRowEmpty = Object.values(currentRow).every((value) => value === '');
        if (isRowEmpty && index !== 0) {
          const updatedTableData = tableData.filter((_, i) => i !== index);
          setTableData(updatedTableData);
        }
      }
    }
  };

  const handleInsertRowAbove = (index) => {
    const newTableRow = {
      location: '',
      scene: '',
      time: '',
      IntOrExt: '',
      Action: '',
      Character: '',
    };
    const updatedTableData = [...tableData.slice(0, index), newTableRow, ...tableData.slice(index)];
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
    const updatedTableData = [...tableData.slice(0, index + 1), newTableRow, ...tableData.slice(index + 1)];
    setTableData(updatedTableData);
  };

  const handleRemoveRow = (index) => {
    const updatedTableData = tableData.filter((_, i) => i !== index);
    setTableData(updatedTableData);
  };

  const tableRef = useRef(null);

  const downloadPDF = () => {
    if (tableRef.current) {
      const element = tableRef.current;
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10);
        pdf.save('table.pdf');
      });
    }
  };

  const [searchOptions, setSearchOptions] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const transliterate = useTransliteration();

  const fetchSearchOptions = async (inputValue, index, key) => {
    setSearchLoading(true);

    const response = await transliterate(inputValue);
    setSearchOptions(response);
    const updatedTableData = [...tableData];
    updatedTableData[index][key] = inputValue;
    setTableData(updatedTableData);
    setSearchLoading(false);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = "Are you sure you want to leave?";
      event.returnValue = message; // Standard for most browsers
      return message; // For some older browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <IndexHeader onDownload={downloadPDF} />
      <Paper
        sx={{
          width: '1100px',
          minHeight: '1000px',
          boxShadow: '2.99253px 2.99253px 13.46637px 0px rgba(0, 0, 0, 0.10)',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '7rem',
        }}
        className={Style['container']}
      >
        <Box
          height="100%"
          flexGrow={1}
          margin={`${margin}rem`}
          position="relative"
          className={Style['editor-inner']}
        >
          <TableContainer ref={tableRef} sx={{ border: '1px solid #DDDDDD', width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', paddingBlock: '10px', backgroundColor: '#DDDDDD' }}>
              <Box>Scene</Box>
              <Box>Location</Box>
              <Box>Time</Box>
              <Box>Int/Ext</Box>
              <Box>Action</Box>
              <Box>Character</Box>
            </Box>
            <Box>
              {tableData.map((row, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-evenly', flexGrow: '1' }}>
                  <div
                    onMouseEnter={() => setHoveredRowIndex(index)}
                    onMouseLeave={() => setHoveredRowIndex(null)}
                    style={{ border: '#DDDDDD 1px solid', alignItems: 'center', display: 'flex', paddingInline: '5px' }}
                  >
                    <PlusCircle size={23} />
                    {hoveredRowIndex === index && (
                      <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical contained button group"
                        variant="contained"
                        sx={{ position: 'absolute', zIndex: 1 }}
                      >
                        <Button onClick={() => handleRemoveRow(index)} color="primary">
                          Remove
                        </Button>
                        <Button onClick={() => handleInsertRowAbove(index)} color="primary">
                          Insert Above
                        </Button>
                        <Button onClick={() => handleInsertRowBelow(index)} color="primary">
                          Insert Below
                        </Button>
                      </ButtonGroup>
                    )}
                  </div>
                  <Autocomplete
                    options={searchOptions}
                    loading={searchLoading}
                    inputValue={row.scene}
                    onInputChange={(event, newInputValue) => fetchSearchOptions(newInputValue, index, 'scene')}
                    filterOptions={(option) => option}
                    onKeyDown={(event) => handleRowClear(event, index)}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        value={row.scene}
                        onChange={(event) => handleCellChange(event, index, 'scene')}
                        InputProps={{
                          ...params.InputProps,
                        }}
                      />
                    )}
                  />
                  <Autocomplete
                    options={searchOptions}
                    loading={searchLoading}
                    inputValue={row.location}
                    onInputChange={(event, newInputValue) => fetchSearchOptions(newInputValue, index, 'location')}
                    filterOptions={(option) => option}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        onChange={(event) => handleCellChange(event, index, 'location')}
                        value={row.location}
                        InputProps={{
                          ...params.InputProps,
                        }}
                      />
                    )}
                  />
                  <Autocomplete
                    options={searchOptions}
                    loading={searchLoading}
                    inputValue={row.time}
                    onInputChange={(event, newInputValue) => fetchSearchOptions(newInputValue, index, 'time')}
                    filterOptions={(option) => option}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        onChange={(event) => handleCellChange(event, index, 'time')}
                        value={row.time}
                        InputProps={{
                          ...params.InputProps,
                        }}
                      />
                    )}
                  />
                  <Autocomplete
                    options={searchOptions}
                    loading={searchLoading}
                    inputValue={row.IntOrExt}
                    onInputChange={(event, newInputValue) => fetchSearchOptions(newInputValue, index, 'IntOrExt')}
                    filterOptions={(option) => option}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        onChange={(event) => handleCellChange(event, index, 'IntOrExt')}
                        value={row.IntOrExt}
                        InputProps={{
                          ...params.InputProps,
                        }}
                      />
                    )}
                  />
                  <Autocomplete
                    options={searchOptions}
                    loading={searchLoading}
                    inputValue={row.Action}
                    onInputChange={(event, newInputValue) => fetchSearchOptions(newInputValue, index, 'Action')}
                    filterOptions={(option) => option}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        onChange={(event) => handleCellChange(event, index, 'Action')}
                        value={row.Action}
                        InputProps={{
                          ...params.InputProps,
                        }}
                      />
                    )}
                  />
                  <Autocomplete
                    options={searchOptions}
                    loading={searchLoading}
                    inputValue={row.Character}
                    onInputChange={(event, newInputValue) => fetchSearchOptions(newInputValue, index, 'Character')}
                    filterOptions={(option) => option}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        onChange={(event) => handleCellChange(event, index, 'Character')}
                        onKeyDown={(event) => handleKeyPress(event, index)}
                        value={row.Character}
                        InputProps={{
                          ...params.InputProps,
                        }}
                      />
                    )}
                  />
                </Box>
              ))}
            </Box>
          </TableContainer>
          <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginTop: '1rem' }}>
            Submit
          </Button>
        </Box>
      </Paper>
    </>
  );
};

// export default IndexTable;

const MemoizedIndexTable = memo(IndexTable);
export default MemoizedIndexTable;
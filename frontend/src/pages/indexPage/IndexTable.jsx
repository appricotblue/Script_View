import React, { useEffect, useRef, useState } from 'react';
import IndexHeader from './IndexHeader';
import './indexTableDesign.css';
import { PlusCircle } from '@phosphor-icons/react';
import { Autocomplete, Box, Modal, TextField } from '@mui/material';
import AutoCompleteTextArea from './components/AutoCompleteTextArea';
import axios from 'axios';
import { VITE_BASE_URL } from '@/constants';
import { useParams } from 'react-router-dom';
import { useTitle } from '@/context/OnelineTitleContext';
import OneLinePrintTable from './OneLinePrintTable';
import { GradientBtn } from '@common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useTransliteration } from '@hooks';
import autoTable from 'jspdf-autotable';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  minHeight: '70vh',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 2,
  overflowY: 'scroll',
};

const IndexTable = ({
  titleValue,
  onTitleChange,
  tableModalOpen,
  setTableModalOpen,
}) => {
  const [tableData, setTableData] = useState([
    {
      scene: '',
      location: '',
      IntOrExt: '',
      Action: '',
      Character: '',
    },
  ]);

  const columnGroup = {
    col1: '5%',
    col2: '20%',
    col3: '10%',
    col4: '45%',
    col5: '20%',
  };

  const intorextValues = [
    'Day/Int',
    'Day/Ext',
    'Day/Int/Ext',
    'Night/Int',
    'Night/Ext',
    'Night/Int/Ext',
    'Day/Night/Int/Ext',
  ];

  // const locationList = ['location 1', 'location 2', 'location 3', 'location 4'];
  const locationList = [];

  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const pageComponentRef = useRef();
  const transliterate = useTransliteration();
  const [freeSoloSugg, setfreeSoloSugg] = useState([]);

  const handleRemoveRow = (index) => {
    const updatedTableData = tableData.filter((_, i) => i !== index);
    setTableData(updatedTableData);
  };

  const handleInsertRowAbove = (index) => {
    const newTableRow = {
      scene: '',
      location: '',
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
    handleSubmit();
  };

  const handleInsertRowBelow = (index) => {
    const newTableRow = {
      scene: '',
      location: '',
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

  const handleResetRow = (index) => {
    const updatedTableData = [...tableData];
    updatedTableData[index] = {
      scene: '',
      location: '',
      IntOrExt: '',
      Action: '',
      Character: '',
    };
    setTableData(updatedTableData);
  };

  const generatePDF = () => {
    const input = pageComponentRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = canvas.width;
      const imageHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight);
      const imgX = (pdfWidth - imageWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        'PNG',
        imgX,
        imgY,
        imageWidth * ratio,
        imageHeight * ratio,
      );
      pdf.save(`${titleValue}`);
    });
  };

  const { id } = useParams();

  const [characters, setCharacters] = useState([]);
  const fetchCharacters = async () => {
    try {
      const response = await axios.get(
        `${VITE_BASE_URL}/api/scripts/getCharacters/${id}`,
      );
      const { data } = response;
      setCharacters(data.characters);
    } catch (error) {
      console.error('runtime error while fetching characters', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${VITE_BASE_URL}/api/scripts/getOnelines/${id}`,
      );
      const { data } = response;
      // console.log("response", response.data.oneLiners[0].title);
      onTitleChange(response.data.oneLiners[0].title);
      setTableData(response.data.oneLiners[0].oneLiners);
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };

  const handleSubmit = async () => {
    // console.log("abc");
    if (titleValue.trim() !== '') {
      try {
        const response = await axios.post(
          `${VITE_BASE_URL}/api/scripts/storeOneLineData`,
          {
            title: titleValue,
            scriptId: id,
            oneLiners: tableData,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (response.status === 200) {
          console.log('Data stored successfully');
          console.log('Post responce', response.data.oneLiners.oneLiners);
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

  useEffect(() => {
    fetchCharacters();
    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      handleSubmit();
    }, 500);
  }, [titleValue]);

  const intExtSave = (value, index) => {
    const tableCurrentValue = [...tableData];
    tableCurrentValue[index]['IntOrExt'] = value.toString();
    setTableData(tableCurrentValue);
  };

  const characterSave = (value, index, nm) => {
    if (nm === 'Character') {
      const characterValues = value.join(',');
      const tableCurrentValue = [...tableData];
      tableCurrentValue[index][nm] = characterValues;
      setTableData(tableCurrentValue);
    } else {
      const locationValues = value;
      const tableCurrentValue = [...tableData];
      tableCurrentValue[index][nm] = locationValues;
      setTableData(tableCurrentValue);
    }

    handleSubmit();
  };

  const handlefreeSoloSugg = async (e, newValue) => {
    if (!characters?.includes(newValue) && newValue.trim() !== '') {
      // console.log("abc");
      // Call your translation function here and update options
      const translatedValue = await transliterate(newValue); // Call your translation function here
      setfreeSoloSugg(translatedValue);

      // Update the options
      // setfreeSoloSugg((prevOptions) => [...prevOptions, translatedValue]);
    } else if (newValue.trim() === '') {
      setfreeSoloSugg([]);
    }
  };

  console.log('freeSoloSugg', freeSoloSugg);

  return (
    <>
      <Modal
        open={tableModalOpen}
        onClose={() => setTableModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div ref={pageComponentRef}>
            <OneLinePrintTable tableData={tableData} titleValue={titleValue} />
          </div>

          <div className="download-btn">
            {titleValue.trim() !== '' ? (
              <GradientBtn
                size="large"
                sx={{
                  fontWeight: '600',
                  background: '#000',
                  color: '#fff',
                  ':hover': { background: '#000' },
                }}
                onClick={() => generatePDF()}
              >
                Download
              </GradientBtn>
            ) : (
              <div style={{ color: 'red' }}>No title Available </div>
            )}
          </div>
        </Box>
      </Modal>
      <div className="index-container">
        <div className="table-container">
          <table>
            <colgroup>
              <col style={{ width: columnGroup.col1 }} />
              <col style={{ width: columnGroup.col2 }} />
              <col style={{ width: columnGroup.col3 }} />
              <col style={{ width: columnGroup.col4 }} />
              <col style={{ width: columnGroup.col5 }} />
            </colgroup>
            <thead>
              <tr className="table-head-row">
                <th className="table-head">Scene</th>
                <th className="table-head">Location</th>
                <th className="table-head">Int/Ext</th>
                <th className="table-head">Action</th>
                <th className="table-head">Characters</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {tableData.map((item, ind) => (
                <tr key={ind} className="table-body-row">
                  <td>
                    <AutoCompleteTextArea
                      handleSubmit={handleSubmit}
                      name="scene"
                      index={ind}
                      tableData={tableData}
                      setTableData={setTableData}
                      selectedItemIndex={selectedItemIndex}
                      setSelectedItemIndex={setSelectedItemIndex}
                    />
                  </td>
                  <td>
                    {/* <AutoCompleteTextArea
                      handleSubmit={handleSubmit}
                      name="location"
                      specifiedFieldName="location"
                      index={ind}
                      tableData={tableData}
                      setTableData={setTableData}
                      selectedItemIndex={selectedItemIndex}
                      setSelectedItemIndex={setSelectedItemIndex}
                      location
                    /> */}
                    <Autocomplete
                      freeSolo
                      // onFocus={fetchCharacters}
                      // multiple
                      id="tags-outlined"
                      options={freeSoloSugg.length > 0 ? freeSoloSugg : []}
                      onBlur={handleSubmit}
                      filterSelectedOptions
                      value={
                        item.location || ''
                        // ? item.location.split(',').map((word) => word.trim())
                        // : []
                      }
                      onChange={(e, newValue) =>
                        characterSave(newValue, ind, 'location')
                      }
                      onInputChange={handlefreeSoloSugg}
                      filterOptions={(x) => x}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="filled"
                          onClick={handleSubmit}
                          InputProps={{
                            ...params.InputProps,
                            disableUnderline: true,
                            style: {
                              border: 'none',
                              backgroundColor: '#fff',
                              padding: '0',
                            },
                          }}
                        />
                      )}
                    />
                  </td>
                  <td>
                    <Autocomplete
                      disablePortal
                      id="int-or-ext"
                      onBlur={handleSubmit}
                      options={intorextValues}
                      value={item.IntOrExt}
                      onChange={(e, newValue) => intExtSave(newValue, ind)}
                      sx={{ width: '130px' }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          InputLabelProps={{ shrink: false }}
                          InputProps={{
                            ...params.InputProps,
                            style: { border: 'none', padding: 0 },
                          }}
                          sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                              border: 'none',
                            },
                            '& .MuiOutlinedInput-root': {
                              padding: 0,
                            },
                            '& .MuiAutocomplete-inputRoot': {
                              padding: '0 !important',
                            },
                          }}
                        />
                      )}
                    />
                  </td>
                  <td>
                    <AutoCompleteTextArea
                      handleSubmit={handleSubmit}
                      name="Action"
                      index={ind}
                      tableData={tableData}
                      setTableData={setTableData}
                      selectedItemIndex={selectedItemIndex}
                      setSelectedItemIndex={setSelectedItemIndex}
                    />
                  </td>
                  <td>
                    <Autocomplete
                      freeSolo
                      onFocus={fetchCharacters}
                      multiple
                      id="tags-outlined"
                      options={
                        freeSoloSugg.length > 0
                          ? characters.concat(freeSoloSugg)
                          : characters
                      }
                      onBlur={handleSubmit}
                      filterSelectedOptions
                      value={
                        item.Character
                          ? item.Character.split(',').map((word) => word.trim())
                          : []
                      }
                      onChange={(e, newValue) =>
                        characterSave(newValue, ind, 'Character')
                      }
                      onInputChange={handlefreeSoloSugg}
                      filterOptions={(x) => x}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="filled"
                          onClick={handleSubmit}
                          InputProps={{
                            ...params.InputProps,
                            disableUnderline: true,
                            style: {
                              border: 'none',
                              backgroundColor: '#fff',
                              padding: '0',
                            },
                          }}
                        />
                      )}
                    />
                  </td>

                  <div
                    className="button-table"
                    onMouseEnter={() => setHoveredRowIndex(ind)}
                    onMouseLeave={() => setHoveredRowIndex(null)}
                  >
                    <PlusCircle size={23} />
                    {hoveredRowIndex === ind && (
                      <div className="modal-tableInsert">
                        <div
                          className="modal-table-action"
                          onClick={() => {
                            handleSubmit();
                            handleInsertRowBelow(ind);
                          }}
                        >
                          Insert Below
                        </div>
                        <div
                          className="modal-table-action"
                          onClick={() => {
                            handleSubmit();
                            handleInsertRowAbove(ind);
                          }}
                        >
                          Insert Above
                        </div>
                        <div
                          className="modal-table-action"
                          onClick={() => {
                            handleSubmit();
                            handleResetRow(ind);
                          }}
                        >
                          Reset Datas
                        </div>
                        <div
                          className="modal-table-action"
                          onClick={() => {
                            handleRemoveRow(ind);
                          }}
                        >
                          Remove
                        </div>
                      </div>
                    )}
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default IndexTable;

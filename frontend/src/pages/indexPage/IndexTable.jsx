import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled
} from '@mui/material';
import Style from './TextArea.module.css';

const IndexTable = () => {
  const [margin] = useState(3);
  const [tableData, setTableData] = useState([
    {
      no: '',
      location: '',
      scene: '',
      time: '',
      intExt: '',
      action: '',
      character: ''
    }
  ]);

  const TableCellStyled = styled(TableCell)({
    borderRight: '1px solid #DDDDDD',
    fontWeight: 'bold'
  });

  const handleCellChange = (event, index, key) => {
    const updatedTableData = tableData.map((row, i) => {
      if (i === index) {
        return {
          ...row,
          [key]: event.target.innerText // Update the specific key with the new content
        };
      }
      return row;
    });
    setTableData(updatedTableData);
  };

  const handleKeyPress = (event, index) => {
    if (event.key === 'Enter') {
      if (index === tableData.length - 1) {
        const newTableRow = {
          no: '',
          location: '',
          scene: '',
          time: '',
          intExt: '',
          action: '',
          character: ''
        };
        const updatedTableData = tableData.map((row, i) => {
          if (i === index) {
            return {
              ...row,
              character: event.target.innerText.trim() // Update character column in the last row
            };
          }
          return row;
        });
        setTableData([...updatedTableData, newTableRow]);
      }
    }
  };

  return (
    <>
      <Paper
        sx={{
          width: '1100px',
          minHeight: '1000px',
          boxShadow: '2.99253px 2.99253px 13.46637px 0px rgba(0, 0, 0, 0.10)',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '7rem'
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
          <TableContainer sx={{ border: '1px solid #DDDDDD' }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#F2F2F2' }}>
                <TableRow>
                  <TableCellStyled>No</TableCellStyled>
                  <TableCellStyled>Location</TableCellStyled>
                  <TableCellStyled>Scene</TableCellStyled>
                  <TableCellStyled>Time</TableCellStyled>
                  <TableCellStyled>Int/Ext</TableCellStyled>
                  <TableCellStyled>Action</TableCellStyled>
                  <TableCellStyled>Character</TableCellStyled>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCellStyled
                      contentEditable
                      onBlur={(event) => handleCellChange(event, index, 'no')}
                    >
                      {row.no}
                    </TableCellStyled>
                    <TableCellStyled
                      contentEditable
                      onBlur={(event) => handleCellChange(event, index, 'location')}
                    >
                      {row.location}
                    </TableCellStyled>
                    <TableCellStyled
                      contentEditable
                      onBlur={(event) => handleCellChange(event, index, 'scene')}
                    >
                      {row.scene}
                    </TableCellStyled>
                    <TableCellStyled
                      contentEditable
                      onBlur={(event) => handleCellChange(event, index, 'time')}
                    >
                      {row.time}
                    </TableCellStyled>
                    <TableCellStyled
                      contentEditable
                      onBlur={(event) => handleCellChange(event, index, 'intExt')}
                    >
                      {row.intExt}
                    </TableCellStyled>
                    <TableCellStyled
                      contentEditable
                      onBlur={(event) => handleCellChange(event, index, 'action')}
                    >
                      {row.action}
                    </TableCellStyled>
                    <TableCellStyled
                      contentEditable
                      onBlur={(event) => handleCellChange(event, index, 'character')}
                      onKeyDown={(event) => handleKeyPress(event, index)}
                    >
                      {row.character}
                    </TableCellStyled>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </>
  );
};

export default IndexTable;

import { useTransliteration } from '@hooks';
import { Button, Modal, Paper, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import AsyncSelect from 'react-select/async-creatable';
import { setLocation } from '@/store/slices/locationSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { VITE_BASE_URL } from '@/constants';

const AddLocationModal = ({ socket = {}, id }) => {
    const { location } = useSelector((state) => state.location);
    console.log(location);
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState([]);
    const transliterate = useTransliteration();
    const dispatch = useDispatch();

    const fetchTransliterated = async (inputString) => {
        const results = await transliterate(inputString);
        return results.map((value) => ({ value, label: value }));
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        if (!id) {
            throw new Response('id not found', { status: 404 });
        }
        if (socket && socket.connected) {
            socket.emit('save-location', { locations: values, id }, () => {
                dispatch(setLocation(values));
                setOpen(false);
            });
        } else {
            console.error('socket connection not open');
            setOpen(false);
        }
    };

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const res = await axios.get(
                    `${VITE_BASE_URL}/api/scripts/getLocations/${id}`,
                );
                console.log('location :', res.data.locations);
                dispatch(setLocation(res.data.locations));
            } catch (err) {
                console.log(err);
            }
        };

        fetchCharacters();
    }, [dispatch]);

    const modalContent = (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="manage-characters"
            aria-describedby="add/remove-characters"
            sx={{
                backdropFilter: 'blur(2px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper
                sx={{
                    width: '50%',
                    padding: '3rem 3rem 1rem 3rem',
                }}
            >
                <AsyncSelect
                    isMulti
                    defaultValue={location?.map((value) => ({
                        value,
                        label: value,
                    }))}
                    loadOptions={fetchTransliterated}
                    onChange={(values) => setValues(values.map(({ value }) => value))}
                />
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    width="60%"
                    marginTop="1rem"
                    marginX="auto"
                >
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </Stack>
            </Paper>
        </Modal>
    );
    return (
        <>
            <Button
                sx={{ backgroundColor: '#F2F2F2', height: 'fit-content' }}
                onClick={handleOpen}
            >
                Location
            </Button>
            {createPortal(modalContent, document.body)}
        </>
    );
};

AddLocationModal.propTypes = {
    socket: PropTypes.object,
    id: PropTypes.string,
    location: PropTypes.arrayOf(PropTypes.string),
};

export default AddLocationModal;
import React, { useEffect, useState } from 'react';
import "./AdminHall.css";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import HallCard from './HallCard';
import { Container } from '@mui/material';
import Appbar from '../AppBar/AppBar';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { createHallApi } from "../../../api/createhallapi";

export default function AdminHall() {
  const [modal, setmodal] = useState(false);
  const handleClose = () => setmodal(false);

  const [list, setlist] = useState([]);
  const [open, setOpen] = useState(true);
  const [name, setname] = useState("");
  const [capacity, setcapacity] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  let createHall = () => {
    setmodal(true);
  };

  const get_halls = async () => {
    setOpen(true);
    try {
      let response = await axios.get('http://localhost:8000/api/hall/view_halls', {
        withCredentials: true
      });
      let temp = response.data.halls.map((data) => {
        return (
          <Grid item xs={11} sm={7} md={5} lg={4} xl={4} key={data._id}>
            <HallCard data={data} gethall={get_halls} />
          </Grid>
        );
      });
      setlist(temp);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
    setOpen(false);
  };

  let handleCreateHallSubmit = async (e) => {
    e.preventDefault();
    const booking = {
      startTime: startTime,  // Time fields
      endTime: endTime
    };

    let data = {
      name: name,
      capacity: capacity,
      status: 'Available',  // Add status field
      bookings: [booking], // Include bookings with time slots
      
    };

    try {
      setmodal(false);
      setOpen(true);
      const response = await createHallApi(data);
      console.log(response);
      setOpen(false);
      get_halls();
      // Resetting states after hall creation
      setname('');
      setcapacity('');
      setStartTime('');
      setEndTime('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    get_halls();
  }, []);

  return (
    <div className='admin-hall-body'>
      <Backdrop
        sx={{ color: '#DC143C;', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='modal'>
          <Typography className='modal-text' sx={{ marginBottom: '1rem' }} variant="h6" component="h2"color='#990033'>
            CREATE HALL
          </Typography>

          <form onSubmit={handleCreateHallSubmit}>
            <FormControl fullWidth>
              <Input
                disableUnderline={true}
                type='text'
                placeholder="Hall Name"
                required={true}
                value={name}
                className='admin-input'
                onChange={(e) => setname(e.target.value)}
                sx={{ padding: '1rem' }}
              />
            </FormControl>

            <FormControl fullWidth>
              <Input
                disableUnderline={true}
                type='number'
                placeholder="Capacity"
                required={true}
                value={capacity}
                className='admin-input'
                onChange={(e) => setcapacity(e.target.value)}
                sx={{ padding: '1rem' }}
              />
            </FormControl>

            {/* New inputs for Start Time and End Time */}
            <FormControl fullWidth>
              <Input
                disableUnderline={true}
                type='time'
                required={true}
                value={startTime}
                className='admin-input'
                onChange={(e) => setStartTime(e.target.value)}
                sx={{ padding: '1rem' }}
              />
            </FormControl>

            <FormControl fullWidth>
              <Input
                disableUnderline={true}
                type='time'
                required={true}
                value={endTime}
                className='admin-input'
                onChange={(e) => setEndTime(e.target.value)}
                sx={{ padding: '1rem' }}
              />
            </FormControl>

            <Button size="medium" fullWidth className='btn-admin-hall' type='submit'>CREATE HALL</Button>
          </form>
        </Box>
      </Modal>

      <Appbar />

      <Grid container spacing={2} justifyContent={'flex-end'}>
        <Grid item xs={11} sm={5} md={4} lg={4} xl={3} justifyItems={'flex-end'}>
          <Button size="medium" fullWidth className='btn-admin-hall' onClick={createHall}>CREATE HALL</Button>
        </Grid>
      </Grid>

      <Container sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
        <Grid container spacing={6} justifyContent={'center'}>
          {list}
        </Grid>
      </Container>
    </div>
  );
}

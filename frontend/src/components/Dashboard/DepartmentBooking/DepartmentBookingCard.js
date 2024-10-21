import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import Grid from '@mui/material/Grid';
import { createBookingRequestApi } from "../../../api/createbookingapi";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function DepartmentBookingCard(props) {
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState(false);
    const [event, setEvent] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    // State to manage available time slots
    const [availableStartTimes, setAvailableStartTimes] = useState([
        "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM"
    ]);

    const [availableEndTimes, setAvailableEndTimes] = useState([
        "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
    ]);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleClose = () => {
        setModal(false);
        setEvent('');
        setStartTime('');
        setEndTime('');
    };

    const bookHall = () => {
        setModal(true);
    };

    const handleBookingRequestSubmit = async (e) => {
        e.preventDefault();
        const data = {
            hall: props.data.name,
            event: event,
            startTime: startTime,
            endTime: endTime,
        };

        try {
            const response = await createBookingRequestApi(data);
            setOpen(true);
            // Remove booked time slots
            setAvailableStartTimes(prevTimes => prevTimes.filter(time => time !== startTime));
            setAvailableEndTimes(prevTimes => prevTimes.filter(time => time !== endTime));
        } catch (err) {
            console.log(err);
        }

        handleClose();
        props.gethall();
    };

    return (
        <>
            <Snackbar
                vertical='top'
                horizontal='right' 
                open={open} 
                autoHideDuration={3000} 
                onClose={handleCloseAlert}
            >
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%', background: '#388e3c', color: 'white' }}>
                    Booking Request Made
                </Alert>
            </Snackbar>

            <Modal
                open={modal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='modal'>
                    <Typography className='modal-text' sx={{ marginBottom: '1rem' }} variant="h6" component="h2">
                        EVENT NAME
                    </Typography>     
                    <form onSubmit={handleBookingRequestSubmit}>
                        <FormControl fullWidth> 
                            <Input
                                disableUnderline={true}
                                type='text'
                                placeholder="Event Name"
                                required={true}
                                value={event}
                                className='admin-input'
                                onChange={(e) => setEvent(e.target.value)}
                                sx={{ padding: '1rem' }}
                            />
                        </FormControl>
                        
                        {/* Start Time Selection */}
                        <FormControl fullWidth sx={{ marginTop: '1rem' }}>
                            <Select
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                displayEmpty
                                required
                            >
                                <MenuItem value="" disabled>Select Start Time</MenuItem>
                                {availableStartTimes.map((time) => (
                                    <MenuItem key={time} value={time}>{time}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* End Time Selection */}
                        <FormControl fullWidth sx={{ marginTop: '1rem' }}>
                            <Select
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                displayEmpty
                                required
                            >
                                <MenuItem value="" disabled>Select End Time</MenuItem>
                                {availableEndTimes.map((time) => (
                                    <MenuItem key={time} value={time}>{time}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button size="medium" fullWidth className='btn-admin-hall' type='submit'>BOOK HALL</Button>
                    </form>
                </Box>
            </Modal>

            <Card sx={{}} className='hall-admin-card'>
                <CardMedia
                    sx={{ height: 140 }}
                    image="https://images.unsplash.com/photo-1594122230689-45899d9e6f69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uZmVyZW5jZSUyMGhhbHxlbnwwfHx8fDE2ODg1NzE1NjA&auto=format&fit=crop&w=500&q=60"
                    title="seminar hall"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className='hall-card-text'>
                        {props.data.name}
                    </Typography>
                    <Typography variant="body2" color="white" className='hall-card-text'>
                        <EventSeatIcon fontSize="large" />
                        <span className='number-seat'>{props.data.capacity}</span>
                    </Typography>

                    {/* Displaying Time Slot Information */}
                    <Typography variant="body2" color="text.secondary" className='time-slot'>
                        {props.data.bookings.length > 0 ? (
                            props.data.bookings.map((booking, index) => (
                                <div key={index}>
                                    Available Time: {booking.startTime} - {booking.endTime}
                                </div>
                            ))
                        ) : (
                            <span>No bookings available.</span>
                        )}
                    </Typography>
                </CardContent>
                <Grid container spacing={2} justifyContent={'center'}>
                    <Grid item xs={8} sm={5} md={4} lg={4} xl={4}>
                        {props.data.status === "Not Filled" ? (
                            <Button size="medium" onClick={bookHall} fullWidth className='btn-admin-hall'>BOOK</Button>
                        ) : (
                            <Button size="medium" fullWidth className='btn-admin-hall' disabled>FILLED</Button>
                        )}
                    </Grid>
                </Grid>
            </Card>
        </>
    );
}

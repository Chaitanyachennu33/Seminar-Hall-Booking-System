import React, { useEffect, useState } from 'react';
import Appbar from '../AppBar/AppBar';
import "./AdminBooking.css";
import Grid from '@mui/material/Grid';
import AdminBookingCard from './AdminBookingCard';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

export default function AdminBooking() {
    const [list, setlist] = useState([]);
    const [open, setOpen] = useState(true);

    const get_booking_requests = async () => {
        setOpen(true);  // Show the loading spinner
        try {
            const response = await axios.get('http://localhost:8000/api/booking/show_booking_requests', {
                withCredentials: true
            });

            // Check if booking_requests exists and is an array
            if (Array.isArray(response.data.booking_requests)) {
                let temp = response.data.booking_requests.map((data) => {
                    return (
                        <AdminBookingCard data={data} getrequest={get_booking_requests} />
                    );
                });
                setlist(temp);
            } else {
                setlist([]); // If no requests are found, set an empty list
            }
            setOpen(false);  // Hide the loading spinner
        } catch (err) {
            console.log(err);
            setOpen(false);  // Hide the loading spinner on error
        }
    };

    useEffect(() => {
        get_booking_requests();
    }, []);

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <div className='admin-booking-body'>
                <Appbar />

                <Grid container justifyContent={'center'}>
                    <Grid item>
                        <div className='admin-booking-title-div'>
                            <h2 className='admin-booking-title'>BOOKING REQUESTS</h2>
                        </div>
                    </Grid>
                </Grid>

                <Grid container spacing={6} justifyContent={'center'}>
                    {list}
                </Grid>
            </div>
        </>
    );
}

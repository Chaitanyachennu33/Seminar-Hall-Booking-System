import React from 'react'
import "./AdminHall.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import Grid from '@mui/material/Grid';
import { clearHallApi } from '../../../api/clearhallapi'

export default function HallCard(props) {

  const changeStatus = async () => {
    try {
      const data = {
        name: props.data.name,
        status: props.data.status === 'Filled' ? 'Not Filled' : 'Filled'  // Toggle status
      }
      const res = await clearHallApi(data);
      console.log(res);
      props.gethall();
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <Card sx={{}} className='hall-admin-card'>
      <CardMedia
        sx={{ height: 140 }}
        image="https://images.unsplash.com/photo-1594122230689-45899d9e6f69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uZmVyZW5jZSUyMGhhbGx8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
        title="seminar hall"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className='hall-card-text'color="black">
          {props.data.name}
        </Typography>
        
        {/* Capacity display */}
        <Typography variant="body2" color="black" className='hall-card-text'>
          <EventSeatIcon fontSize="large" />
          <span className='number-seat'>{props.data.capacity}</span>
        </Typography>
        
        {/* New Time Slot Display */}
        {props.data.bookings && props.data.bookings.length > 0 ? (
          props.data.bookings.map((booking, index) => (
            <Typography key={index} variant="body2" color="text.secondary" className='hall-card-text'>
              Time Slot: {booking.startTime} - {booking.endTime}
            </Typography>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary" className='hall-card-text'>
            No Bookings Available
          </Typography>
        )}
      </CardContent>
      
      <Grid container spacing={2} justifyContent={'center'}>
        <Grid item xs={8} sm={5} md={4} lg={4} xl={4}>
          <Button size="medium" fullWidth className='btn-admin-hall' onClick={changeStatus}>
            {props.data.status === 'Filled' ? 'Mark as Available' : 'Mark as Filled'}
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}

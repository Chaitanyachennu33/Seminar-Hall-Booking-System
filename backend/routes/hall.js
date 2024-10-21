const express = require('express');
const router = express.Router();
const Hall = require('../models/hall');

// Simple test route
router.get('/', (req, res) => {
  res.send({
    msg: 'Inside Hall Router'
  });
});

// Create Hall (Admin Restricted)
router.post('/create_hall', (req, res) => {
  
    const { name, capacity, bookings } = req.body;

    // Create a new hall document
    const newHall = new Hall({
      name: name,
      status: 'Available',  // New hall starts as 'Available'
      capacity: capacity,
      bookings: bookings  // Bookings array with startTime and endTime
    });

    newHall.save()
      .then((hall) => {
        res.status(201).json(hall);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to create hall' });
      });
  
});

// Get All Halls
router.get('/view_halls', (req, res) => {
  Hall.find({}, { _id: 0 })  // Optionally exclude the _id field
    .then((halls) => {
      res.json({ halls: halls });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to retrieve halls' });
    });
});

// Change the status of the hall and clear bookings (Admin Restricted)
router.post('/clear_hall', async (req, res) => {
  
    try {
      const updatedHall = await Hall.findOneAndUpdate(
        { name: req.body.name },
        { 
          department: "", 
          event: "", 
          status: "Available",  // Reset status to 'Available'
          bookings: []  // Clear all bookings
        },
        { new: true }  // Return the updated document
      );
      res.json({
        status: 'Hall cleared and status updated',
        updatedHall: updatedHall
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to clear hall' });
    }
  
});

module.exports = router;

const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    // Added status to be either 'Available', 'Booked', etc.
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  bookings: [
    {
      startTime: {
        type: String,  // Store times as strings (format: "HH:mm")
        required: true
      },
      endTime: {
        type: String,
        required: true
      }
    }
  ]
});

const Hall = mongoose.model('Hall', hallSchema);

module.exports = Hall;

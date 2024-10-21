const mongoose = require('mongoose');




const bookingrequestSchema = new mongoose.Schema({
    hall:{
        type:String,
        required:true
    },
    department:{
        type: String,
        ref: true,
        required:true
    },
    event:{
        type:String,
        required:true
    },
    bookings: [
        {
          startTime: {
            type: String,  // Use ISO string for easy validation and querying (e.g., "HH:mm")
            required: true
          },
          endTime: {
            type: String,
            required: true
          }
          
        }
    ]
});


const Booking_Requests = mongoose.model('Booking_Requests',bookingrequestSchema);

module.exports=Booking_Requests;
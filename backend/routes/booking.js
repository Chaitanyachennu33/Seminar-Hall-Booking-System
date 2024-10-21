const express = require('express');
const router = express.Router();
const Booking_Requests = require('../models/booking_requests');
const Hall = require('../models/hall');

// Test Route
router.get('/', (req, res) => {
    res.send({
        msg: 'Inside Booking Route'
    });
});

// Create Booking Request by Department
router.post('/create_booking', (req, res) => {
    const newUser = new Booking_Requests({
        hall: req.body.hall,
        department: req.user.id,
        event: req.body.event,
    });

    newUser.save()
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to create user' });
        });
});

// Show all the booking requests
router.get('/show_booking_requests', async (req, res) => {
    if (req.isAuthenticated() && req.user.type === 'Admin') {
        try {
            const requests = await Booking_Requests.find().populate('department').exec();

            // Check if requests exist and return a response accordingly
            if (!requests || requests.length === 0) {
                return res.status(404).json({ booking_requests: [] });
            }

            res.status(200).json({
                booking_requests: requests
            });
        } catch (err) {
            res.status(500).json({
                error: 'Failed to fetch booking requests'
            });
        }
    } else {
        res.status(403).json({
            msg: 'You are not authorized'
        });
    }
});

// Change Booking Request
router.post('/change_booking_request', async (req, res) => {
    if (req.body.decision === 'Yes') {
        try {
            // Find and delete the booking request by ID
            const requests = await Booking_Requests.findByIdAndDelete(req.body.id);

            // Update the hall with the department, event, and status
            const updatedDocument = await Hall.findOneAndUpdate(
                { name: req.body.name },
                { department: req.body.department, event: req.body.event, status: "Filled" },
                { new: true }
            );

            res.send({
                status: 'Booking Accepted',
                updates: updatedDocument
            });
        } catch (err) {
            res.send({
                error: err
            });
        }
    }
});

module.exports = router;

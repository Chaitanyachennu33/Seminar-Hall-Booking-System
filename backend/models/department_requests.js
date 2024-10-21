const mongoose = require('mongoose');

// Update schema to include department name
const departmentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensure unique emails for each user
        trim: true, // Remove extra spaces
        lowercase: true, // Store emails in lowercase
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum password length
    },
    department: {
        type: String,
        required: true, // If you want to keep it required
        trim: true, // Remove extra spaces
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Model for department users
const DepartmentUser = mongoose.model('DepartmentUser', departmentSchema);

module.exports = DepartmentUser;

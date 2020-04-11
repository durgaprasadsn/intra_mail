const mongoose = require('mongoose');

// defining user schema
const userSchema = mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    twoFA: {
        type: Boolean
    }
},{
    timestamps: true
});


module.exports = mongoose.model('User',userSchema);

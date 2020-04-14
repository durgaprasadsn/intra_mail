const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

// initialize the incrementor
autoIncrement.initialize(mongoose.connection);

// defining user schema
const userSchema = mongoose.Schema({
    userId: Number,
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
        type: String
    }
},{
    timestamps: true
});

userSchema.plugin(autoIncrement.plugin,{
    model : 'User',
    field : 'userId',
    startAt : 10000,
    incrementBy : 1 
});

module.exports = mongoose.model('User',userSchema);

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

// initialize the incrementor
autoIncrement.initialize(mongoose.connection);

// defining mail schema
const mailSchema = mongoose.Schema({
    mailID: Number,
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: [{
            type: String
        }]
    },
    timeSent: {
        type: Date,
        required: true
    },
    subject: {
        type: String
    },
    body: {
        type: String
    },
    readBy: {
        type: [{
            type: String
        }]
    },
    category: {
        type: String
    }
});

mailSchema.plugin(autoIncrement.plugin,{
    model : 'Mail',
    field : 'mailId',
    startAt : 10000,
    incrementBy : 1 
});

module.exports = mongoose.model('Mail',mailSchema);
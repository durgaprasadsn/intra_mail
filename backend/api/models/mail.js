const mongoose = require('mongoose');

// defining mail schema
const mailSchema = mongoose.Schema({
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
        type: {
            type: String
        }
    }
    // TODO attachments
});

module.exports = mongoose.model('Mail',mailSchema);
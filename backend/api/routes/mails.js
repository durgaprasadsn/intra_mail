// dependencies
const express = require('express');
const authenticate = require('../middlewares/authenticate');
const controller = require('../controllers/mails'); 

// variable 
const router = express.Router();

router.post('/post', authenticate,controller.postMail); // TO create a mail

router.get('/sent', authenticate, controller.getSentMails); // to send all sent mails

router.get('/received', authenticate, controller.getReceivedMails); // to send all received mails

router.post('/read', authenticate, controller.updateRead); // to save that particular user read the mail

router.delete('/:mailId', authenticate, controller.deleteMail); // to delete mail

module.exports = router; // export router
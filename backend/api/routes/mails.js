// dependencies
const express = require('express');
const request = require('request-promise');
const mongoose = require('mongoose');
const helper = require('../helper');
const authenticate = require('../middlewares/authenticate');
const Mail = require('../models/mail');

// variable 
const router = express.Router();

// to add mail
router.post('/post', authenticate, (req,res,next) =>{

});

// to send all sent mails
router.get('/sent', authenticate, (req,res,next) => {

});

// to send all received mails
router.get('/received', authenticate, (req,res,next) => {
    const category = req.query.category;
});

// to delete mail
router.delete('/:mailId', authenticate, (req,res,next) => {
    const mailId = req.params.mailId;
});




// export router
module.exports = router;
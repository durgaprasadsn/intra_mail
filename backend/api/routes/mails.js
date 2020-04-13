// dependencies
const express = require('express');
const request = require('request-promise');
const helper = require('../helper');
const authenticate = require('../middlewares/authenticate');
const Mail = require('../models/mail');

// variable 
const router = express.Router();

// to add mail
// receive { receivers=[] , subject=str, body=str  }
router.post('/post', authenticate, async (req, res, next) => {
    const sender = req.decodedToken.user;
    try {
        const category = JSON.parse(await request.get('')).category;
        const mail = new Mail({
            sender: sender,
            receiver: req.body.receiver,
            timeSent: new Date(),
            subject: req.body.subject,
            body: req.body.body,
            category: 5 //TODO get category based on the api call
        });
        await mail.save();
        res.status(201).json();
    } catch (err) {
        console.log(err);
        res.status(500).json({});
    }

});

// to send all sent mails
router.get('/sent', authenticate, async (req, res, next) => {
    const sender = req.decodedToken.user;
    try {
        const mails = Mail.find({ sender: sender });
        console.log(mails);
        if (mails.length >= 1) {
            res.status(200).json(mails);
        } else {
            res.status(200).json({});
        }
    } catch(err){
        console.log(err);
        res.status(500).json();
    } 
});

// to send all received mails
router.get('/received', authenticate, async (req, res, next) => {
    const category = req.query.category;
    const receiver = req.decodedToken.user;
    try {
        const mails = Mail.find({ receiver: receiver, category: category });
        console.log(mails);
        if (mails.length >= 1) {
            res.status(200).json(mails);
        } else {
            res.status(200).json({});
        }
    } catch(err){
        console.log(err);
        return res.status(500).json();
    } 
});

// to save that particular user read the mail
router.post('/read', authenticate, async (req,res,next) => {
    const mailId = req.body.mailId;
    const reader = req.decodedToken.user;
    try{
        const response = await Mail.updateOne({mailId: mailId},{ $addToSet: {readBy: reader}});
        console.log(response);
        if(response.nModified == 0){
            res.status(500).json();
        } else{
            res.status(200).json();
        }
    } catch(err){
        console.log(err);
        res.status(500).json();
    }
});

// to delete mail
router.delete('/:mailId', authenticate, async (req, res, next) => {
    const mailId = req.params.mailId;
    const user = req.decodedToken.user;

    try{
        response = await Mail.find({mailId: mailId, sender: user});
        if(response.length >= 1){
            await Mail.remove({mailId: mailId});
        } else{
            response = await Mail.find({mailId: mailId, receiver: user});
            if(response.length >= 1){
                await Mail.updateOne({mailId: mailId}, {$pull: {receiver: user}});
            }
        }
        res.status(200).json();
    } catch(err){
        console.log(err);
        res.status(500).json();
    }
});




// export router
module.exports = router;
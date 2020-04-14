const request = require('request-promise');
const Mail = require('../models/mail');

exports.postMail = async (req, res, next) => {
    const sender = req.decodedToken.user;
    try {
        //const category = JSON.parse(await request.get('')).category;
        category = 'assignment';
        const mail = new Mail({
            sender: sender,
            receiver: req.body.receiver,
            timeSent: new Date(),
            subject: req.body.subject,
            body: req.body.body,
            category: category
        });
        await mail.save();
        res.status(201).json();
    } catch (err) {
        console.log(err);
        res.status(500).json({});
    }
}

exports.getSentMails = async (req, res, next) => {
    console.log('Inside sent mails');
    const sender = req.decodedToken.user;
    console.log(sender);
    try {
        const mails = await Mail.find({ sender: sender });
        console.log('Got mail');
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
}

exports.getReceivedMails = async (req, res, next) => {
    const category = req.query.category;
    const receiver = req.decodedToken.user;
    console.log("Inside received mails");
    try {
        const mails = await Mail.find({ receiver: receiver, category: category });
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
}

exports.updateRead = async (req,res,next) => {
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
}

exports.deleteMail = async (req, res, next) => {
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
}
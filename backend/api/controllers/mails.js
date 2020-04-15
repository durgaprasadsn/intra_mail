const axios = require('axios');
const Mail = require('../models/mail');

exports.postMail = async (req, res, next) => {
    const sender = req.decodedToken.user;
    console.log("Inside postMail");
    const message = req.body.subject + " " + req.body.body; 
    const data = JSON.stringify({
        message: message
    })
    const options = {
        url: 'http://localhost:9000/api/classify',
        method: 'POST',
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        },
        data: data
    }
    try {
        //const category = JSON.parse(await request.get('')).category;
        console.log("sending to classifier");
        const category = JSON.parse(await axios.post(options)).category;
        Console.log("Category received");
        console.log(category);
        //category = 'assignment';
        const mail = new Mail({
            sender: sender,
            receiver: req.body.receiver,
            timeSent: new Date(),
            subject: req.body.subject,
            body: req.body.body,
            category: category
        });
        await mail.save();
        console.log("Sending 201");
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
        console.log("Sending 200");
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
    console.log("Inside update read");
    try{
        const response = await Mail.updateOne({mailId: mailId},{ $addToSet: {readBy: reader}});
        console.log(response);
        if(response.nModified == 0){
            console.log("Sending 500");
            res.status(500).json();
        } else{
            console.log("Sending 200");
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
    console.log("inside deleteMail");
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
        console.log("Sending 200");
        res.status(200).json();
    } catch(err){
        console.log(err);
        res.status(500).json();
    }
}
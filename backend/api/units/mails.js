const axios = require('axios');
const Mail = require('../models/mail');

exports.postMail = async (req) => {
    return new Promise(async (resolve) => {
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
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: data
        }
        try {
            //const category = JSON.parse(await request.get('')).category;
            console.log("sending to classifier");
            const response = await axios(options);
            console.log("Category received");
            console.log(response);
            console.log(response.data);
            console.log(response.data.category);
            category = response.data.category;
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
            //res.status(201).json();
            resolve(201);
        } catch (err) {
            console.log(err);
            resolve(500);
            //res.status(500).json({});
        }
    })
}

exports.getSentMail = async (req) {
    return new Promise(async (resolve) => {
        console.log('Inside sent mails');
        const sender = req.decodedToken.user;
        console.log(sender);
        let result = {}
        try {
            const mails = await Mail.find({ sender: sender });
            console.log('Got mail');
            console.log(mails);
            if (mails.length >= 1) {
                //res.status(200).json(mails);
                result.status = 200;
                result.mails = mails;
            } else {
                //res.status(200).json({});
                result.status = 200;
                result.mails = {};
            }
        } catch (err) {
            console.log(err);
            //res.status(500).json();
            result.status = 500;
        }
        resolve(result);
    });
}

exports.getReceivedMails = async (req) => {
    return new Promise(async (resolve) => {
        const category = req.query.category;
        const receiver = req.decodedToken.user;
        console.log("Inside received mails");
        let result = {}
        try {
            const mails = await Mail.find({ receiver: receiver, category: category });
            console.log(mails);
            console.log("Sending 200");
            result.status = 200;
            if (mails.length >= 1) {
                //res.status(200).json(mails);
                result.mails = mails;
            } else {
                //res.status(200).json({});
                result.mails = {};
            }
        } catch (err) {
            console.log(err);
            //return res.status(500).json();
            result.status = 500;
        }
        resolve(result);
    });
}

exports.updateRead = async (req) => {
    return new Promise(async (resolve) => {
        const mailId = req.body.mailId;
        const reader = req.decodedToken.user;
        console.log("Inside update read");
        let result = 0;
        try {
            const response = await Mail.updateOne({ mailId: mailId }, { $addToSet: { readBy: reader } });
            console.log(response);
            if (response.nModified == 0) {
                console.log("Sending 500");
                //res.status(500).json();
                result = 500;
            } else {
                console.log("Sending 200");
                //res.status(200).json();
                result = 200;
            }
        } catch (err) {
            console.log(err);
            //res.status(500).json();
            result = 500;
        }
        resolve(result);
    });
}

exports.deleteMail = async (req) => {
    return new Promise(async (resolve) => {
        const mailId = req.params.mailId;
        const user = req.decodedToken.user;
        console.log("inside deleteMail");
        let result = 0;
        try {
            response = await Mail.find({ mailId: mailId, sender: user });
            if (response.length >= 1) {
                await Mail.remove({ mailId: mailId });
            } else {
                response = await Mail.find({ mailId: mailId, receiver: user });
                if (response.length >= 1) {
                    await Mail.updateOne({ mailId: mailId }, { $pull: { receiver: user } });
                }
            }
            console.log("Sending 200");
            //res.status(200).json();
            result = 200;
        } catch (err) {
            console.log(err);
            //res.status(500).json();
            result = 500;
        }
        resolve(result);
    });
}
//const axios = require('axios');
//const Mail = require('../models/mail');
const mailUnit = require('../units/mails');

exports.postMail = async (req, res, next) => {
    let result = await mailUnit.postMail(req);
    console.log("Received result from unit");
    console.log(result);
    res.status(result).json({});
}

exports.getSentMails = async (req, res, next) => {
    let result = await mailUnit.getSentMail(req);
    console.log("Received result from unit");
    if(result.status == 200)
    {
        res.status(200).json(result.mails);
    } else {
        res.status(500).json();
    }
}

exports.getReceivedMails = async (req, res, next) => {
    let result = await mailUnit.getReceivedMails(req);
    console.log("Received result from unit");
    if(result.status == 200)
    {
        res.status(200).json(result.mails);
    } else {
        res.status(500).json();
    }
}

exports.updateRead = async (req,res,next) => {
    let result = await mailUnit.updateRead(req);
    console.log("Received result from unit");
    console.log(result);
    res.status(result).json();
}

exports.deleteMail = async (req, res, next) => {
    let result = await mailUnit.deleteMail(req);
    console.log("Received result from unit");
    console.log(result);
    res.status(result).json();
}
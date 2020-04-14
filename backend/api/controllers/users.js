const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

require('dotenv/config');

exports.checkUser = async (req, res, next) => {
    console.log("inside check user");
    try {
        user = await User.find({ user: req.body.user });
        if (user.length >= 1) {
            console.log("sending 200");
            res.status(200).json();
        }
        else {
            console.log("Sending 404");
            res.status(404).json();
        }
    } catch (err) {
        console.log(err);
        res.status(500).json();
    }
}

exports.userSignUP = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        console.log("bcrypt fn called");
        if (err) {
            console.log(err);
            res.status(500).json();
            return;
        }
        else {
            console.log("Returning hash");
            console.log(hash);
            const number = Number(req.body.no);
            const dob = new Date(req.body.dob);
            const user = new User({
                user: req.body.user,
                firstName: req.body.fname,
                lastName: req.body.lname,
                password: hash,
                dob: dob,
                mobile: number,
                twoFA: req.body.tfa
            });
            user.save().then(result => {
                console.log("Sending 201");
                res.status(201).json();
            }).catch(err => {
                console.log(err);
                res.status(500).json();
            });
        }
    });
}

exports.userLogin = async (req, res, next) => {
    console.log("Inside user login");
    try {
        user = await User.find({ user: req.body.user });
        if (user.length == 0) {
            console.log("Sending 401");
            res.status(401).json({
                message: 'Authentication Failed'
            });
            return;
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({});
            } else if (result) {
                const token = jwt.sign({ user: user[0].user }, process.env.KEY, { expiresIn: '1h' });
                console.log("Sending 200 with token");
                res.status(200).json({
                    token: token
                });
            } else {
                console.log("Sending 401");
                res.status(401).json({
                    message: 'Authentication Failed'
                });
            }

        });
    } catch (err) {
        console.log(err);
        res.status(500).json({});
    }
}

exports.deleteUser = async (req, res, next) => {
    const user = req.decodedToken.user;
    console.log("inside delete user");
    try {
        await User.remove({ user: user });
        console.log("Sending 200");
        res.status(200).json();
    } catch (err) {
        console.log(err);
        res.status(500).json();
    }
}
// dependencies
const express = require('express');
const helper = require('../helper');
const jwt = require('jsonwebtoken');
const authenticate = require('../middlewares/authenticate');
const User = require('../models/user');

require('dotenv/config');

// variables
const router = express.Router();

// check if user exists
router.get('/check', async (req, res, next) => {
    try {
        user = await User.find({ user: req.body.user });
        if (user.length >= 1) {
            res.status(200).json();
        }
        else {
            res.status(404).json();
        }
    } catch (err) {
        console.log(err);
        res.status(500).json();
    }
});

// handling user signup
router.post('/signup', async (req, res, next) => {
    hashedPassword = helper.getPassHash(req.body.password);
    if (hashedPassword.length === 0) {
        res.status(500).json();
        return;
    }
    const user = new User({
        user: req.body.user,
        firstname: req.body.fname,
        lastname: req.body.lname,
        password: hashedPassword,
        dob: req.body.dob,
        mobile: req.body.no,
        twoFA: req.body.tfa
    });
    try {
        await user.save();
        res.status(201).json();
    } catch (err) {
        console.log(err);
        res.status(500).json({});
    }
    return;
});

// to handle logging in and returning token
router.post('/login', async (req, res, next) => {
    try {
        user = await User.find({ user: req.body.user });
        if (helper.checkPass(req.body.password, user[0].password)) {
            const token = jwt.sign({
                user: user[0].user
            },
            process.env.KEY,
            {
                expiresIn: '1h',
            });
            return res.status(200).json({
                token : token
            });
        } else {
            return res.status(401).json({
                message: 'Authentication Failed'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({});
    }
});

// delete user
router.delete('/:user', authenticate, async (req, res, next) => {
    try {
        await User.remove({ user: req.params.user });
        res.status(200).json();
    } catch (err) {
        console.log(err);
        res.status(500).json();
    }
});

module.exports = router;
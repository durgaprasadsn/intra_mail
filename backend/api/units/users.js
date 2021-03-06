const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.checkUser = async (req) => {
    return new Promise(async (resolve) => {
        //console.log("inside check user");
        let result = 0;
        try {
            user = await User.find({ user: req.query.user });
            if (user.length >= 1) {
                //console.log("sending 200");
                //res.status(200).json();
                result = 200;
            }
            else {
                //console.log("Sending 404");
                //res.status(404).json();
                result = 404;
            }
        } catch (err) {
            //console.log(err);
            //res.status(500).json();
            result = 500;
        }
        resolve(result);
    });
}

exports.userSignUp = async (req) => {
    return new Promise((resolve) => {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            //console.log("bcrypt fn called");
            if (err) {
                //console.log(err);
                //res.status(500).json();
                //return 500;
                resolve(500);
            }
            else {
                //console.log("Returning hash");
                //console.log(hash);
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
                    //console.log("Sending 201");
                    //res.status(201).json();
                    //return 201;
                    resolve(201);
                }).catch(err => {
                    //console.log(err);
                    //res.status(500).json();
                    //return 500;
                    resolve(500);
                });
            }
        });
    })
    //console.log(req.body);

}

exports.userLogin = async (req) => {
    return new Promise(async (resolve) => {
        //console.log("Inside user login");
        let res = {};
        try {
            user = await User.find({ user: req.body.user });
            //console.log(user);
            if (user.length == 0) {
                //console.log("Sending 401");
                /*res.status(401).json({
                    message: 'Authentication Failed'
                });
                return;*/
                res.status = 401;
                res.body = {
                    message: 'Authentication Failed'
                }
                resolve(res);
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    //console.log(err);
                    //res.status(500).json({});
                    res.status = 500;
                    res.body = {};
                } else if (result) {
                    const token = jwt.sign({ user: user[0].user }, process.env.KEY, { expiresIn: '1h' });
                    //console.log("Sending 200 with token");
                    /*res.status(200).json({
                        token: token
                    });*/
                    res.status = 200;
                    res.body = {
                        token: token
                    };
                } else {
                    //console.log(result);
                    //console.log("Sending 401 becrypt");
                    /*res.status(401).json({
                        message: 'Authentication Failed'
                    });*/
                    res.status = 401;
                    res.body = {
                        message: 'Authentication Failed'
                    };
                }
                //console.log(res);
                resolve(res);
            });
        } catch (err) {
            //console.log(err);
            //res.status(500).json({});
            res.status = 500;
            res.body = {};
            resolve(res);
        }
    });
}

exports.deleteUser = async (req) => {
    return new Promise(async (resolve) => {
        const user = req.decodedToken.user;
        //console.log("inside delete user");
        let result = 0;
        try {
            await User.remove({ user: user });
            //console.log("Sending 200");
            //res.status(200).json();
            result = 200;
        } catch (err) {
            //console.log(err);
            //res.status(500).json();
            result = 500;
        }
        resolve(result);
    });
}
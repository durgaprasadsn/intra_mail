/*const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');*/
const userUnit = require('../units/users');

require('dotenv/config');

exports.checkUser = async (req, res, next) => {
    let result = await userUnit.checkUser(req);
    console.log("Received result from unit");
    console.log(result);
    res.status(result).json({});
}

exports.userSignUP = async (req, res, next) => {
    let result = await userUnit.userSignUp(req);
    console.log("Received result from unit");
    console.log(result);
    res.status(result).json({});
}

exports.userLogin = async (req, res, next) => {
    let result = await userUnit.userLogin(req);
    console.log("Received result from unit");
    console.log(result);
    res.status(result.status).json(result.body);
}

exports.checkLogin = (req,res) => {
    console.log("Login passed");
    res.status(200).json();
}

exports.deleteUser = async (req, res, next) => {
    let result = await userUnit.deleteUser(req);
    console.log("Received result from unit");
    console.log(result);
    res.status(result).json();
}
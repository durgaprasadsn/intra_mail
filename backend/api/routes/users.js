// dependencies
const express = require('express');
const authenticate = require('../middlewares/authenticate');
const controller = require('../controllers/users');

// variables
const router = express.Router();

router.get('/check', controller.checkUser); // check if user exists

router.post('/signup', controller.userSignUP); // handling user signup

router.post('/login', controller.userLogin); // to handle logging in and returning token

router.get('/checkLogged',authenticate,controller.checkLogin);

router.delete('/', authenticate, controller.deleteUser); // delete user

module.exports = router; // export router
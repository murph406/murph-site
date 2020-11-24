var express = require('express');
var mongoose = require('mongoose');

// need to include models or libs
// var User = require('./models/user');
var router = express.Router();
var account = require('./controllers/account');

// account
// router.route('/register').post(account.register);
router.route('/auth/login').post(account.login);
router.route('/auth/login').get(account.login);
// router.route('/logout').get(account.logout);
// router.route('/forgot-password').post(account.forgotPassword);
// router.route('/reset-password').post(account.resetPassword);


module.exports = router;
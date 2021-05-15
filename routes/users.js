'use strict';
var express = require('express');
var router = express.Router();
var initializePassport = require('../passport/passport')
const passport = require('passport');
var localStrategy = require('passport-local').Strategy;



/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

router.post('/', passport.authenticate('local',
    { session: true }, {
    failureRedirect: '/login', successRedirect: '/home'
    }
));
module.exports = router;

'use strict';
var express = require('express');
var router = express.Router();
var passport = require('passport');



/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

router.post('/', passport.authenticate('local', { failureRedirect: '/log' }),
            function (req, res) {
                res.redirect('/');
            });
module.exports = router;

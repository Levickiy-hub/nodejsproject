'use strict';
var express = require('express');
var router = express.Router();
var db = require('../db/DB')

/* GET home page. */
router.get('/log', function (req, res) {
    res.render('loginPage');
});
router.get('/',  async function (req, res) {
    const shops = await db.GetShops();
    console.log(shops)
    res.render('home', { shops: shops,req: req, res: res});
});
router.get('/reg', async function (req, res) {
    res.render('registrationPage');
});
router.post('/reg', async function (req, res) {
    console.log('post reg');
    console.log(req.body);
    const { username, login, pass, pass1 } = req.body;
    if (!await db.UserFindByLogin(login)) {
        if (pass == pass1) {
            db.UserCreate(username,login,pass,1);
        }
    }
    
    res.render('home');
});
router.post('/reg', async function (req, res) {
    console.log('post reg');
    console.log(req.body);
    const { username, login, pass, pass1 } = req.body;
    if (!await db.UserFindByLogin(login)) {
        if (pass == pass1) {
            db.UserCreate(username, login, pass, 1);
        }
    }

    res.render('home');
});

router.post('/serch', async function (req, res) {
    console.log(req.body);
    const { text } = req.body;
    const product = await db.GetProductsByName(text);
    if (!product) {
        res.render('home',);
    }
    res.render('home');
});
module.exports = router;

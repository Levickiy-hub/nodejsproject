'use strict';
var express = require('express');
var router = express.Router();
var db = require('../db/DB');
var bcrypt = require('bcrypt')
router.get('/log', function (req, res) {
    res.render('loginPage');
});
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
router.get('/', async function (req, res) {
    const shops = await db.GetShops();
    console.log(shops);
    var user;
    if (req.session.passport !== undefined) {
        user = req.session.passport.user;
    }
    res.render('home', { shops: shops, user: user }); 
});
router.get('/reg', async function (req, res) {
    res.render('registrationPage');
});

router.post('/reg', async function (req, res) {
    console.log('post reg');
    console.log(req.body);
    const { username, login, pass, pass1 } = req.body;
    console.log(username.length);
    if (username.length > 3 || login.length > 3 || pass.length>3) {
        if (!await db.UserFindByLogin(login)) {
            if (pass == pass1) {
                db.UserCreate(username, login, bcrypt.hashSync(pass, 10), 1);
                res.redirect('/');
            }
            res.render('RegistrationPage', { error: "пароли не совпадают" });
        }
        res.render('RegistrationPage', {error:"Логин занят"});
    }
    res.render('RegistrationPage', { error:"Минимальная длинна для поля ввода = 4" }); 
   
});

router.post('/serch', async function (req, res) {
    console.log(req.body);
    const { text } = req.body;
    const product = await db.GetProductsByName(text);
    console.log(product);
    var user;
    if (req.session.passport !== undefined) {
        user = req.session.passport.user;
    }
    if (!product || product.length==0) {
        res.redirect('/');
    }
    const shop = await db.GetShopsByProduct(product[0].id);
    const price = await db.GetShopPriceByProduct(product[0].id);
    res.render('product', { product:product[0],shops: shop, price: price,user:user });
});
module.exports = router;

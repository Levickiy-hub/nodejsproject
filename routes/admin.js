'use strict';
var express = require('express');
var router = express.Router();
var db = require('../db/DB')
var bcrypt = require('bcrypt');

router.get('/', async function (req, res) {
    var user;
    if (req.session.passport !== undefined && req.session.passport.user.role == true) {
        user = req.session.passport.user;
        const users = await db.GetUsers();
        const info = await db.AdminShopProduct();
        console.log(info[0]);
        res.render('admin', { info: info[0], user: user,users:users });
    }
    else {
        res.redirect('/log');
    }
  
});
router.post('/', function (req, res) {
    if (req.session.passport !== undefined && req.session.passport.user.role == true) {
        const { id, proof } = req.body;
        console.log(id);
        if (proof == 'proof') {
            if (id)
                db.ShopPriceUpdate(id);
        }
        else {
            db.ShopPriceDelete(id);
        }
        res.redirect("/admin");
    }
    else {
        res.redirect('/log');
    }
});
router.get('/create', async function (req, res) {
    if (!await db.UserFindByLogin("admin")) {
        db.UserCreate("admin", "admin", bcrypt.hashSync("admin", 10), 1);
    }
        res.redirect("/log");
});

router.post('/userdel', function (req, res) {
    if (req.session.passport !== undefined && req.session.passport.user.role == true) {
        const { id } = req.body;
        console.log(id);
        if(id)
        db.deleteUsers(id);
        res.redirect("/admin");
    } else {
        res.redirect('/log');
    }

});

module.exports = router;

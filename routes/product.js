'use strict';
var express = require('express');
var router = express.Router();
var db = require('../db/DB')


router.get('/', async function (req, res) {
    var user;
    if (req.session.passport !== undefined) {
        user = req.session.passport.user;
        const shops = await db.GetShops();
        res.render('productAdd', { shops: shops,user:user });
    }
});
router.post('/', async function (req, res) {
    var user;
    if (req.session.passport !== undefined) {
        user = req.session.passport.user;
        const { name, description, price, nameshop } = req.body;
        console.log(description);
        if (name.length > 3 && description.length > 3 && price != "" && name.length < 255 && description.length < 255 && price.length < 255) {
            if (price > 0) {
                const shop = await db.GetShopsByName(nameshop);
                console.log(shop.id);
                await db.ProductCreate(name, description, price, shop.id, user.id);
            } else {
                const shops = await db.GetShops();
                res.render('productAdd', { shops: shops, user: user, error: "цена не может быть 0" });
            }
        }
        else {
            const shops = await db.GetShops();
            res.render('productAdd', { shops: shops, user: user, error:"минимальная длинна ввода = 4" });
        }
    }
        res.redirect('/');
});

module.exports = router;
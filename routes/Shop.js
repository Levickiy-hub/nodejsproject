'use strict';
var express = require('express');
var router = express.Router();
var db = require('../db/DB');

router.get('/', async function (req, res) {
    var user;
    if (req.session.passport !== undefined && req.session.passport.user.role == true) {
        user = req.session.passport.user;
        res.render('ShopAdd', {user:user});
    }
}); 
router.post('/', function (req, res) {
    var user;
    if (req.session.passport !== undefined && req.session.passport.user.role == true) {
        const { name, address, info, locationX, locationY } = req.body;
        console.log(name);
        user = req.session.passport.user;
        if (name.length > 1 && address.length > 3&& info.length > 3&& locationX.length > 3&& locationY.length > 3) {
            if (name == "") {
                res.render('ShopAdd', { errorname: 'введите имя', user: user });
                return;
            }
            else if (address == "") {
                res.render('ShopAdd', { erroraddress: 'введите адрес', user: user });
                return;
            }
            else {
                db.ShopCreate(name, address, info, locationX, locationY);
                res.redirect('/');
                return;
            }
        }
        else {
            res.render('ShopAdd', { error: "минимальная длинна ввода = 4", user: user });
            return;
        }
    }
    res.redirect('/');
});
router.get('/info', async function (req, res) {
    var user;
    if (req.session.passport !== undefined) {
        user = req.session.passport.user;
    }
    var x = req.query.x;
    var y = req.query.y;
    const shop = await db.GetShopsByLocation(x, y);
    const product = await db.GetProductsByShop(shop.id);
    const price = await db.GetProductsPriceByShop(shop.id);
    const rating = await db.GetRaiting(shop.id);
    res.render('shop', { shop: shop, product: product, price: price, user: user, rating:rating });
});
router.post('/rait', async function (req, res) {
    var user;
    if (req.session.passport !== undefined) {
        const { rait, x, y } = req.body;
        user = req.session.passport.user;
        const shop = await db.GetShopsByLocation(x, y);
        db.CreateRating(user.id, shop.id, rait);
        res.redirect('/shop/info?x=' + x + '&y=' + y);
    }
    else res.redirect('/log');
}); 


module.exports = router;

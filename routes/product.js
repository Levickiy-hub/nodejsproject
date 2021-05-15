'use strict';
var express = require('express');
var router = express.Router();
var db = require('../db/DB')


router.get('/', async function (req, res) {
    const shops = await db.GetShops();
    res.render('product', {shops:shops});
});
router.post('/', async function (req, res) {
    const { name, description, price, nameshop } = req.body;
    console.log(description);
    const shop = await db.GetShopsByName(nameshop);
    console.log(shop.id);
   await db.ProductCreate(name, description, price, shop.id);
    res.redirect('/');
}); 
module.exports = router;
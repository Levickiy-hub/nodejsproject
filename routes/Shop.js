'use strict';
var express = require('express');
var router = express.Router();
var db = require('../db/DB')

router.get('/', async function (req, res) {
    
    res.render('Shop');
}); 
router.post('/', function (req, res) {
    const { name, address, info } = req.body;
    console.log(name);
    if (name == "") {
    //    if (address != ""||info!="") {
    //        res.render('Shop', { errorname: 'введите имя', address: address,info:info});
    //    }
       res.render('Shop', { errorname: 'введите имя' });
    }
    else if (address == "") {
    //    if (name != "" || info != "") {
    //        res.render('Shop', { errorname: 'введите имя', name:name, info: info });
    //    }
        res.render('Shop', { erroraddress: 'введите адрес' });
    }
    else {
        db.ShopCreate(name, address, info);
        res.redirect('/');
    }
});


module.exports = router;

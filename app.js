'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
const passport = require('passport');
const initializePassport = require('./passport/passport');
const WebSocket = require("ws");
var routes = require('./routes/index');
var users = require('./routes/users');
var shops = require('./routes/Shop');
var prod = require('./routes/product');
var admin = require('./routes/admin');


var app = express();

//// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//const ws = new WebSocket('ws://www.host.com/path');
//ws.on('open', function open() {
//    ws.send('something');
//});

//ws.on('message', function incoming(data) {
//    console.log(data);
//});

//// uncomment after placing your favicon in /public
////app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "asdasd", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
initializePassport(passport);

app.use('/', routes);
app.use('/users', users);
app.use('/shop', shops);
app.use('/product', prod);
app.use('/admin', admin);

//// catch 404 and forward to error handler
//app.use(function (req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});

//// error handlers

//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//    app.use(function (err, req, res, next) {
//        res.status(err.status || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
//}

//// production error handler
//// no stacktraces leaked to user
//app.use(function (err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
//});

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'));

﻿    const localStrategy = require('passport-local').Strategy,
    db = require('../db/DB');
var bcrypt = require('bcrypt')
var salt = bcrypt.genSaltSync(10);

const initializePassport = (passport) => {
    const authenticateUser = async (username, password, done) => {
        try {
            const user = await db.UserFindByLogin(username);
            if (user !== null) {
                if (bcrypt.compareSync(password, user.password)) {
                    //console.log(password);
                    console.log(user);
                    return done(null, user);
                } else {
                    //console.log(bcrypt.hashSync(password, salt))
                    return done(null, false, { message: 'password error' });
                }
            }
            else {
                console.log(bcrypt.hashSync(password, salt))
                return done(null, false, { message: 'User not exists' });
            }
        } catch (e) {
            console.log(e);
        }
    }
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
    passport.use(new localStrategy(authenticateUser));
}
module.exports = initializePassport;
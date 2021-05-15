    const localStrategy = require('passport-local').Strategy,
    db = require('../db/DB');
//passport.serializeUser((user, done) => {
//    done(null, user);
//})

//passport.deserializeUser((user, done) => {
//    done(null, user);
//})
//passport.use(new localStrategy(
//    async function (username, password, done) {
//        const user = await db.UserFindByLogin(username);
//        if (!user) {
//            if (user.login === username && user.password === password) {
//                return done(null, user);
//            }
//        }
//    return done(null, false, { message: "WRONG" });
//}));

//module.exports = {
//    passport: passport,
//    db:db
//};
const initializePassport = (passport) => {
    const authenticateUser = async (req, username, password, done) => {
        try {
            const user = await db.UserFindByLogin(username);
            if (user !== null) {
                if (user.password === password) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'password error' });
                }
            }
            else {
                return done(null, false, { message: 'User not exists' });
            }
        } catch (e) {
            console.log(e);
        }
    }
    passport.use(new localStrategy(authenticateUser));
    passport.serializeUser = (user, done) => done(null, user);
    passport.deserizalizeUser = (user, done) => done(null, user);
}

module.exports = initializePassport;
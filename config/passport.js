var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var User = require('../server/models/user');

// STRATEGY: local
passport.use(new LocalStrategy( function(username, password, done) {
    User.findOne({username: username}, function (err, user) {
        if (err) { // Database Error
            return done(err);
        }
        if (!user) {
            return (done(null, false, {message: 'Incorrect username or password'}));
        }
        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                return done(err, false, {message: 'Database had issue checking pw'});
            }
            if (!isMatch) {
                return done(null, false, {message: 'Incorrect username or password'});
            }
            return done(null, user, {message: 'Login successful'});
        });
    });
}));

var cookieExtractor = function (req){
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt']
    }
    return token;
};
var secretKeyExtractor = function (){
    return process.env.SECRETKEY
}

// STRATEGY: JWTs
//   Authentication using JWTs coming from cookies
passport.use(new JwtStrategy(
    {
        jwtFromRequest: cookieExtractor,
        secretOrKey: secretKeyExtractor
    },
    function(jwt_payload, done) {
    if (!jwt_payload) {
        return done(null)
    }
    return done(null, jwt_payload);
}));

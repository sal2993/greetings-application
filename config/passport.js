var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../server/models/user');

passport.use(new LocalStrategy( function(username, password, done) {
    User.findOne({username: username}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return (done(null, false, {message: 'incorrect username or password'}));
        }
        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                return done(err, false, {message: 'Database had issue cheching pw'})
            }
            if (!isMatch) {
                return done(null, false, {message: 'incorrect username or password'})
            }
            // Set up token
            console.log(user)
            return done(null, user, {message: 'login successfun'});
        });
    });
}));

var opts = {};
//opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
var cookieExtractor = function (req){
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt']
    }
    return token;
}
//opts.secretOrKey = 'secret1';
//opts.issuer = 'accounts.unix.xyz';
// opts.audience = 'unix.xyz';
passport.use(new JwtStrategy(
    // ExtractJwt.fromAuthHeaderAsBearerToken()
    {
        jwtFromRequest: cookieExtractor,
        secretOrKey: 'secret1'
    },
    function(jwt_payload, done) {
    if (!jwt_payload) {
        return done(null)
    }
    return done(null, jwt_payload);
}));

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../server/models/user');
console.log("here4");
passport.use(new LocalStrategy( function(username, password, done) {
    console.log("here3 \n");
    User.findOne({username: username}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return (done(null, false, {message: 'incorrect username'}));
        }
        user.comparePassword(password, function (err) {
            if (err) {
                return done(err, false, {message: 'incorrect pw'})
            }
            return done(null, user);
        });
    });
}));

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.unix.xyz';
opts.audience = 'unix.xyz';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOneById(jwt_payload.id, function(err, user) {
        if (err) { return done(err) }
        return done(null, user);
    })

}));

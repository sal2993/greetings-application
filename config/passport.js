var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
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


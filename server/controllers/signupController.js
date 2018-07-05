var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/greetingsDB";
var User = require('../models/user');

module.exports.home = home;
module.exports.signup_post = signup_post;

function home(req, res, next) {
    res.render('signup');
}

function signup_post( req, res, next) {

    mongoose.connect(url, {keepAlive: 120 });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        var newUser = new User({username: req.body.firstname,
            password: req.body.password});
        newUser.save(function (err) {
            if (err) {
                console.log("something went wrong");
            }
            res.render('index');
        });

    });
}
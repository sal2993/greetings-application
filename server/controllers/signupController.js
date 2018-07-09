var mongoose = require('mongoose');
var User = require('../models/user');

module.exports.home = home;
module.exports.signup_post = signup_post;

function home(req, res, next) {
    User.find({}, function(err, docs){
        if (err) {
            res.status(405);
        }
        res.render('signup', {people: docs });
    });
}

function signup_post( req, res, next) {

    var newUser = new User({username: req.body.firstname,
        password: req.body.password});
    newUser.save(function (err) {
        if (err) {
            console.log("something went wrong "+err);
        }
        res.render('index');
    });
}
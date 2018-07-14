var mongoose = require('mongoose');
var User = require('../models/user');
var jwt = require('jsonwebtoken');

module.exports.home = home;
module.exports.signup_post = signup_post;

function home(req, res, next) {
    return res.render('signup', {people: docs });
}

function signup_post( req, res, next) {

    var newUser = new User({username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password});

    newUser.save(function (err) {
        if (err) {
            return res.render("signup", {message: err});
        }
        // Create User token
        var token = jwt.sign(
            {
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname
            },
            process.env.SECRETKEY,
            {
                expiresIn: 1800, algorithm: "HS256",
                audience: "unix.xyz",
                issuer: "accounts.unix.xyz"
            }
        );

        // Send User Token via Cookie
        var cookieOptions = {
            httpOnly: true,
            expires: 1800
        };

        res.cookie('jwt', token, cookieOptions);
        res.render('index');

    });

}
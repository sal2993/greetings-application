var express = require('express');
var passport = require('passport');
var router = express.Router();
var JwtStrategy = require('passport-jwt').Strategy;
var jwt = require('jsonwebtoken');
var greetingsController = require('../server/controllers/greetingsController');



var secretKeyExtractor = function (){
    return process.env.SECRETKEY
}
/* GET users listing. */
router.get('/', function (req, res, next) {

    console.log(process.env.SECRETKEY);
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt']
    }
    console.log(token);

    jwt.verify(token, process.env.SECRETKEY,
        {ignoreExpiration: false},
        function (err, payload) {
            if (err) {
               res.render('login', {message: 'Invalid Token, please login'});
            }
            if (payload) {
                res.render('greetings', {message: 'welcome buddy', userToken: payload});
            }
    });


});


module.exports = router;

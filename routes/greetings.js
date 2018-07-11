var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function (req, res, next) {

    var token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt']
    }

    jwt.verify(token, process.env.SECRETKEY,
        {ignoreExpiration: false},
        function (err, payload) {
            if (err) {
               res.render('login', {message: 'Invalid Token, please login'});
            }
            if (payload) {
                res.render('greetings', {message: 'welcome buddy', userToken: payload});
            }
            else {res.render('login',
                {message: 'something unexpected happened with auth. Please try again'});
            }
    });

});

module.exports = router;

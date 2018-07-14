var express = require('express');
var router = express.Router();
var loginController = require('../server/controllers/loginController');
var passport = require('passport');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', loginController.home);

router.post('/', function(req, res, next) {
    passport.authenticate('local', {session: false},

        function(err, user, info) {
            if (err || !user) {
                return res.render('login', info);
            }

            // Give logged in user correct token via Cookies
            var token = jwt.sign({_id: user._id, username: user.username},
                process.env.SECRETKEY,
                {
                    expiresIn: 1800, algorithm: "HS256",
                    audience: "unix.xyz",
                    issuer: "accounts.unix.xyz"

                });

            const cookieOptions = {
                httpOnly: true,
                expires: 0
            };

            res.cookie('jwt', token, cookieOptions);
            return res.render('index');

        }
    )(req, res, next);
});

module.exports = router;

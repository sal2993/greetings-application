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
            var token = jwt.sign({_id: user._id, username: user.username}, 'secret1');

            //return res.json('login', info);
            // OPTION #1:
            //   res.set({'Authorization': "Bearer "+token });
            //   return res.render('index');
            // OPTION #2:
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

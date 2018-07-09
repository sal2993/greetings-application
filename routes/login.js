var express = require('express');
var router = express.Router();
var loginController = require('../server/controllers/loginController');
var passport = require('passport');

/* GET users listing. */
router.get('/', loginController.home);

router.post('/', function(req, res, next) {
    console.log("here1 \n");
    passport.authenticate('local', {session: false},
        function(err, user, info) {
            console.log("here2");
            if (err) {
                return res.status(err.status || 500);
            }
            if (err && !user) {
                return res.render('login', info);
            }
            if(!user) {
                return res.render('login', info);
            }
            return res.render('login', {message: 'Successful Login'});

        }
    );
});

// {successRedirect: '/',
//     failureRedirect: '/login'}
module.exports = router;

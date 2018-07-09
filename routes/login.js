var express = require('express');
var router = express.Router();
var loginController = require('../server/controllers/loginController');
var passport = require('passport');

/* GET users listing. */
router.get('/', loginController.home);

router.post('/', passport.authenticate('local', {session: false},
    function(err, user, info) {
        if (err) {
            res.status(err.status || 500);
            res.render('error; Could not connect w/ DB');
        }
        if (err && !user) {
            res.render('login', info);
        }
        if(!user) {
            res.render('login', info);
        }
        return res.render('login', {message: 'Successful Login'});


    }
));

// {successRedirect: '/',
//     failureRedirect: '/login'}
module.exports = router;

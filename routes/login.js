var express = require('express');
var router = express.Router();
var loginController = require('../server/controllers/loginController');
var passport = require('passport');

/* GET users listing. */
router.get('/', loginController.home);

router.post('/', passport.authenticate('local', {session: false},
    function(err, user, info) {
        if (err) {
            // End Here
        }
    }
));

// {successRedirect: '/',
//     failureRedirect: '/login'}
module.exports = router;

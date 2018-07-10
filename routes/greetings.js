var express = require('express');
var passport = require('passport');
var router = express.Router();
var greetingsController = require('../server/controllers/greetingsController');


/* GET users listing. */
router.get('/', passport.authenticate('jwt', { session: false }),
    greetingsController.home);


module.exports = router;

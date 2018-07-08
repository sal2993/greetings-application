var express = require('express');
var router = express.Router();
var loginController = require('../server/controllers/loginController');

/* GET users listing. */
router.get('/', loginController.home);

/*
router.post('/', passport.authenticate('local', {successRedirect: '/',
  failureRedirect: '/login'}));
  */

module.exports = router;

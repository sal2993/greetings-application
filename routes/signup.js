var express = require('express');
var router = express.Router();
var signupController = require('../server/controllers/signupController');

/* GET users listing. */
router.get('/', signupController.home);

module.exports = router;
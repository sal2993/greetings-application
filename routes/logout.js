var express = require('express');
var router = express.Router();
var logoutController = require('../server/controllers/logoutController');

/* GET */
router.get('/', logoutController.home);

module.exports = router;
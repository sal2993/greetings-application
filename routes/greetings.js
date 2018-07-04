var express = require('express');
var router = express.Router();
var greetingsController = require('../server/controllers/greetingsController');


/* GET users listing. */
router.get('/', greetingsController.home);

module.exports = router;
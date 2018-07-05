var express = require('express');
var router = express.Router();
var signupController = require('../server/controllers/signupController');

/* GET signup listing. */
router.get('/', signupController.home);
/* POST signup listing */

router.post('/', signupController.signup_post);
module.exports = router;
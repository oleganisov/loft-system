const express = require('express');
const router = express.Router();
const registrationCtrl = require('../controllers/registration');

router.get('/', registrationCtrl.get);

module.exports = router;

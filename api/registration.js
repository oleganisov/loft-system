const express = require('express');
const router = express.Router();
const registrationCtrl = require('../controllers/registration');

router.post('/', registrationCtrl.post);

module.exports = router;

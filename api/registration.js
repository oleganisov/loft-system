const express = require('express');
const router = express.Router();
const registrationCtrl = require('../controllers/registration');
const { validateRegistration } = require('../validation');

router.post('/', validateRegistration, registrationCtrl.post);

module.exports = router;

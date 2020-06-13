const express = require('express');
const router = express.Router();
const registrationCtrl = require('../controllers/registration');
const { validateUser } = require('../validation');

router.post('/', validateUser, registrationCtrl.post);

module.exports = router;

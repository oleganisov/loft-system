const express = require('express');
const router = express.Router();
const loginCtrl = require('../controllers/login');
const { validUser } = require('../validation');

router.post('/', validUser, loginCtrl.post);

module.exports = router;

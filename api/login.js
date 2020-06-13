const express = require('express');
const router = express.Router();
const loginCtrl = require('../controllers/login');
const { validateUser } = require('../validation');

router.post('/', validateUser, loginCtrl.post);

module.exports = router;

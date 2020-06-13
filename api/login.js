const express = require('express');
const router = express.Router();
const loginCtrl = require('../controllers/login');
const { validatelogin } = require('../validation');

router.post('/', validatelogin, loginCtrl.post);

module.exports = router;

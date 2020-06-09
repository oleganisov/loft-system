const express = require('express');
const router = express.Router();

router.use('/registration', require('./registration'));
router.use('/login', require('./login'));
router.use('/profile', require('./profile'));
router.use('/refresh-token', require('./refreshToken'));
router.use('/users', require('./users'));
router.use('/news', require('./news'));

module.exports = router;

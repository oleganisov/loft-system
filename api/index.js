const express = require('express');
const router = express.Router();

router.use('/registration', require('./registration'));
router.use('/users', require('./users'));
router.use('/news', require('./news'));

module.exports = router;

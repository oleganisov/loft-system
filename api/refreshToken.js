const express = require('express');
const router = express.Router();
const refreshTokenCtrl = require('../controllers/refreshToken');

router.post('/', refreshTokenCtrl.post);

module.exports = router;

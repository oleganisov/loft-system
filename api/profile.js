const express = require('express');
const router = express.Router();
const profileCtrl = require('../controllers/profile');

router.get('/', profileCtrl.get);
router.patch('/', profileCtrl.patch);

module.exports = router;

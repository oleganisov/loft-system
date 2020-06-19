const express = require('express');
const router = express.Router();
const profileCtrl = require('../controllers/profile');
const auth = require('../auth');
const { validateProfile } = require('../helpers/validation');

router.get('/', auth, profileCtrl.get);
router.patch('/', auth, profileCtrl.patch);

module.exports = router;

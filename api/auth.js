const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');
const {
  validateRegistration,
  validatelogin
} = require('../helpers/validation');

router.post('/registration', validateRegistration, authCtrl.registration);
router.post('/login', validatelogin, authCtrl.login);
router.post('/refresh-token', authCtrl.refreshToken);

module.exports = router;

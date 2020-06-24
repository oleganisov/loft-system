const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');
const auth = require('../auth');

router.get('/users', auth, usersCtrl.get);
router.delete('/users/:id', auth, usersCtrl.del);
router.patch('/users/:id/permission', auth, usersCtrl.patch);

router.get('/profile', auth, usersCtrl.getProfile);
router.patch('/profile', auth, usersCtrl.updateProfile);

module.exports = router;

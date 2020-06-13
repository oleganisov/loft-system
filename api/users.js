const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');
const auth = require('../auth');

router.get('/', auth, usersCtrl.get);
router.delete('/:id', auth, usersCtrl.del);
router.patch('/:id/permission', auth, usersCtrl.patch);

module.exports = router;

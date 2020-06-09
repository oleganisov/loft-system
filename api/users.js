const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');

router.get('/', usersCtrl.get);
router.delete('/:id', usersCtrl.del);
router.patch('/:id/permission', usersCtrl.patch);

module.exports = router;

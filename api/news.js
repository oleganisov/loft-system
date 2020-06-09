const express = require('express');
const router = express.Router();
const newsCtrl = require('../controllers/news');

router.get('/', newsCtrl.get);
router.post('/', newsCtrl.post);
router.patch('/:id', newsCtrl.patch);
router.delete('/:id', newsCtrl.del);

module.exports = router;

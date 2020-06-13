const express = require('express');
const router = express.Router();
const newsCtrl = require('../controllers/news');
const auth = require('../auth');

router.get('/', auth, newsCtrl.get);
router.get('/', auth, newsCtrl.get);
router.post('/', auth, newsCtrl.post);
router.patch('/:id', auth, newsCtrl.patch);
router.delete('/:id', auth, newsCtrl.del);

module.exports = router;

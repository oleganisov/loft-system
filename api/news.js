const express = require('express');
const router = express.Router();
const newsCtrl = require('../controllers/news');
const auth = require('../auth');

router.get('/news', auth, newsCtrl.get);
router.post('/news', auth, newsCtrl.post);
router.patch('/news:id', auth, newsCtrl.patch);
router.delete('/news:id', auth, newsCtrl.del);

module.exports = router;

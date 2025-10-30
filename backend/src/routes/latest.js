const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const ctrl = require('../controllers/latestController');

router.get('/', ctrl.listLatest);
router.post('/', upload.single('image'), ctrl.createLatest);
router.get('/:id', ctrl.getLatest);
router.put('/:id', upload.single('image'), ctrl.updateLatest);
router.delete('/:id', ctrl.deleteLatest);

module.exports = router;

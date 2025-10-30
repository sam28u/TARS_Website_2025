const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const ctrl = require('../controllers/galleryController');

router.get('/', ctrl.listItems);
router.post('/', upload.single('image'), ctrl.createItem);
router.get('/:id', ctrl.getItem);
router.put('/:id', upload.single('image'), ctrl.updateItem);
router.delete('/:id', ctrl.deleteItem);

module.exports = router;
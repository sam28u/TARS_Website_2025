const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const ctrl = require('../controllers/liveEventsController');

router.get('/', ctrl.listEvents);
router.get('/:id', ctrl.getEvent);
router.post('/', upload.single('image'), ctrl.createEvent);
router.put('/:id', upload.single('image'), ctrl.updateEvent);
router.delete('/:id', ctrl.deleteEvent);

module.exports = router;

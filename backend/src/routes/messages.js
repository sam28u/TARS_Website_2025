const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/messageController');

router.get('/', ctrl.listMessages);
router.get('/:id', ctrl.getMessage);
router.post('/', ctrl.createMessage);
router.delete('/:id', ctrl.deleteMessage);

module.exports = router;

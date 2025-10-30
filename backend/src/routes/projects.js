const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const ctrl = require('../controllers/projectController');

router.get('/', ctrl.listProjects);
router.post('/', upload.single('image'), ctrl.createProject);
router.get('/:id', ctrl.getProject);
router.put('/:id', upload.single('image'), ctrl.updateProject);
router.delete('/:id', ctrl.deleteProject);

module.exports = router;

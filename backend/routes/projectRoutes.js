const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { verifyAdminToken } = require('../middleware/authMiddleware');

router.get('/', projectController.getProjects);
router.post('/', verifyAdminToken, projectController.addProject);
router.put('/:id', verifyAdminToken, projectController.updateProject);
router.delete('/:id', verifyAdminToken, projectController.deleteProject);

module.exports = router;

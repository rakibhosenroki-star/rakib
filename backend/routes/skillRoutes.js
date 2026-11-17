const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const { verifyAdminToken } = require('../middleware/authMiddleware');

router.get('/', skillController.getSkills);
router.post('/', verifyAdminToken, skillController.addSkill);
router.put('/:id', verifyAdminToken, skillController.updateSkill);
router.delete('/:id', verifyAdminToken, skillController.deleteSkill);

module.exports = router;

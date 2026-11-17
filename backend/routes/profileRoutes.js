const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { verifyAdminToken } = require('../middleware/authMiddleware');

router.get('/', profileController.getProfile);
router.put('/', verifyAdminToken, profileController.updateProfile);
router.put('/about', verifyAdminToken, profileController.updateAbout);

module.exports = router;

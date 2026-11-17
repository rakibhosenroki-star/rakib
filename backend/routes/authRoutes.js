const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyAdminToken } = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.post('/change-password', verifyAdminToken, authController.changePassword);
router.get('/verify', verifyAdminToken, authController.verifyAuth);

module.exports = router;

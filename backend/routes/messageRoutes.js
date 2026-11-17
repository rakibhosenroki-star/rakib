const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { verifyAdminToken } = require('../middleware/authMiddleware');

router.post('/', messageController.sendMessage);
router.get('/', verifyAdminToken, messageController.getMessages);
router.put('/:id/read', verifyAdminToken, messageController.markAsRead);
router.delete('/:id', verifyAdminToken, messageController.deleteMessage);

module.exports = router;

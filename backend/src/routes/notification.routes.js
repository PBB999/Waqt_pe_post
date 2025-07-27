const express = require('express');
const notificationController = require('../controllers/notification.controller');

const router = express.Router();

router.post('/create', notificationController.createNotification);
router.get('/:notificationId', notificationController.getNotificationById);
router.get('/user/:userId', notificationController.getNotificationsByUserId);
router.put('/:notificationId/read', notificationController.markAsRead);
router.delete('/:notificationId', notificationController.deleteNotification);

module.exports = router;

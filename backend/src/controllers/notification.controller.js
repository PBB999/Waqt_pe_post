const notificationService = require('../services/notification.service');
const { z } = require('zod');

const createNotificationSchema = z.object({
    notificationId: z.string(),
    userId: z.string(),
    type: z.enum(['Status Update', 'Reminder', 'OTP Alert']),
    message: z.string(),
});

exports.createNotification = async (req, res) => {
    try {
        const data = createNotificationSchema.parse(req.body);
        const notification = await notificationService.createNotification(data);
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.errors || error.message });
    }
};

exports.getNotificationById = async (req, res) => {
    try {
        const notification = await notificationService.getNotificationById(req.params.notificationId);
        res.status(200).json(notification);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.getNotificationsByUserId = async (req, res) => {
    try {
        const notifications = await notificationService.getNotificationsByUserId(req.params.userId);
        res.status(200).json(notifications);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        const updatedNotification = await notificationService.markAsRead(req.params.notificationId);
        res.status(200).json(updatedNotification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteNotification = async (req, res) => {
    try {
        await notificationService.deleteNotification(req.params.notificationId);
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

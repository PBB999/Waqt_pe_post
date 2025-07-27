const Notification = require('../models/Notification');

exports.createNotification = async (data) => {
    const notification = new Notification(data);
    return await notification.save();
};

exports.getNotificationById = async (notificationId) => {
    const notification = await Notification.findOne({ notificationId });
    if (!notification) throw new Error('Notification not found');
    return notification;
};

exports.getNotificationsByUserId = async (userId) => {
    const notifications = await Notification.find({ userId });
    if (notifications.length === 0) throw new Error('No notifications found for this user');
    return notifications;
};

exports.markAsRead = async (notificationId) => {
    const notification = await Notification.findOneAndUpdate(
        { notificationId },
        { isRead: true },
        { new: true }
    );
    if (!notification) throw new Error('Notification not found');
    return notification;
};

exports.deleteNotification = async (notificationId) => {
    const result = await Notification.deleteOne({ notificationId });
    if (result.deletedCount === 0) throw new Error('Notification not found');
    return result;
};

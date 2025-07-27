const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    notificationId: { type: String, unique: true, required: true },
    userId: { type: mongoose.Schema.Types.String, ref: 'User', required: true },
    type: { type: String, enum: ['Status Update', 'Reminder', 'OTP Alert'], required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);

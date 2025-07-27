const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    feedbackId: { type: String, unique: true, required: true },
    parcelId: { type: mongoose.Schema.Types.String, ref: 'Parcel', required: true },
    receiverId: { type: mongoose.Schema.Types.String, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comments: { type: String },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', feedbackSchema);

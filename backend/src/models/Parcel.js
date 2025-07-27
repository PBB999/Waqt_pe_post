const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    beneficiaryId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    pickupAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
    deliveryAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
    status: {
        type: String,
        enum: [
            'Created',
            'Picked Up',
            'Out for Delivery',
            'Delivered',
            'Failed',
            'Sorting'
        ],
        default: 'Created',
        required: true
    },
    timeSlot: {
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true },
    },
    trackingHistory: [{
        status: { type: String, enum: ['Picked Up', 'Sorting', 'Out for Delivery', 'Delivered'], required: true },
        timestamp: { type: Date, required: true },
        location: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true },
        },
    }],
    feedback: {
        rating: { type: Number, min: 1, max: 5, default: null },
        comments: { type: String, default: null },
    },
    packageDetails: {
        selectedPackage: { type: String, default: null },
        customPackage: { type: String, default: null },
        selectedSize: { type: String, default: null },
        dimensions: {
            length: { type: Number, default: null },
            breadth: { type: Number, default: null },
            height: { type: Number, default: null },
        },
        weight: { type: Number, default: null },
        selectedContent: { type: String, default: null },
        customContent: { type: String, default: null },
    },
    deliveryType: { type: String, default: null }, 
    price: { type: Number, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

parcelSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Parcel', parcelSchema);


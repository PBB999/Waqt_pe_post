const mongoose = require('mongoose');

const failedDeliverySchema = new mongoose.Schema({
    failedDeliveryId: { type: String, unique: true, required: true },
    parcelId: { type: mongoose.Schema.Types.String, ref: 'Parcel', required: true },
    reason: { type: String, required: true },
    redirectedPostOffice: { type: String, required: true },
    redeliveryRequested: { type: Boolean, default: false },
    pickupScheduled: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});

module.exports = mongoose.model('FailedDelivery', failedDeliverySchema);

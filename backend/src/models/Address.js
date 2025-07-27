const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    label: { type: String, enum: ['Home', 'Work', 'Other'], required: true },
    name: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    flat: { type: String, required: false },
    area: { type: String, required: true },
    pincode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    userId: { type: mongoose.Schema.Types.String, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Address', addressSchema);

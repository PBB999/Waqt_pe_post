const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, unique: true, required: true },
    age: { type: Number, required: true, default: 18 },
    married: { type: String, required: true, default: 'No' },
    working: { type: String, required: true, default: 'No' },
    type: { type: String, default: 'user' },
    addressIds: [{ type: mongoose.Schema.Types.String, ref: 'Address' }],
    sentParcels: [{ type: mongoose.Schema.Types.String, ref: 'Parcel' }],
    receivedParcels: [{ type: mongoose.Schema.Types.String, ref: 'Parcel' }],
    beneficiaries: [{ type: mongoose.Schema.Types.String, ref: 'User' }],
    notifications: [{ type: mongoose.Schema.Types.String, ref: 'Notification' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});

module.exports = mongoose.model('User', userSchema);

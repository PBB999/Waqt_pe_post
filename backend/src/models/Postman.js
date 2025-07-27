const mongoose = require('mongoose');

const postmanSchema = new mongoose.Schema({
  postmanId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  phone: { type: String, unique: true, required: true },
  pincode: { type: String, required: true }, 
  password: { type: String, required: true }, 
  currentRoute: [{ type: mongoose.Schema.Types.String, ref: 'Parcel' }],
  location: {
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
  },
  type: { type: String, default: 'postman' }, 
  assignedParcels: [{ type: mongoose.Schema.Types.String, ref: 'Parcel' }],
  status: { type: String, enum: ['Active', 'On Duty', 'Inactive'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

module.exports = mongoose.model('Postman', postmanSchema);

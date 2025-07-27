const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  postmanId: { type: mongoose.Schema.Types.String, ref: 'Postman', required: true }, 
  date: { type: Date, required: true }, 
  present: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now }, 
  updatedAt: { type: Date }, 
});

module.exports = mongoose.model('Attendance', attendanceSchema);
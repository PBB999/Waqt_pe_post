const Attendance = require('../models/Attendance');

exports.addAttendance = async (req, res) => {
  try {
    const { postmanId, date, present } = req.body;

    const existingAttendance = await Attendance.findOne({ postmanId, date });
    if (existingAttendance) {
      return res.status(400).json({ message: 'Attendance already exists for this date.' });
    }

    const newAttendance = new Attendance({ postmanId, date, present });
    await newAttendance.save();

    res.status(201).json({ message: 'Attendance added successfully', data: newAttendance });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.fetchAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find().populate('postmanId');
    res.status(200).json({ message: 'All attendance records fetched', data: attendanceRecords });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.fetchAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const attendanceRecords = await Attendance.find({ date }).populate('postmanId');
    res.status(200).json({ message: `Attendance records for ${date} fetched`, data: attendanceRecords });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.fetchAttendanceByPostmanId = async (req, res) => {
  try {
    const { postmanId } = req.params;
    const attendanceRecords = await Attendance.find({ postmanId }).populate('postmanId');
    res.status(200).json({ message: `Attendance records for postman ID ${postmanId} fetched`, data: attendanceRecords });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

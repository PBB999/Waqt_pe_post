const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance.controller');

router.post('/attendance', attendanceController.addAttendance);
router.get('/attendance', attendanceController.fetchAllAttendance);
router.get('/attendance/date/:date', attendanceController.fetchAttendanceByDate);
router.get('/attendance/postman/:postmanId', attendanceController.fetchAttendanceByPostmanId);

module.exports = router;

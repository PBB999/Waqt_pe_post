const express = require('express');
const router = express.Router();
const complaintsController = require('../controllers/complaints.controller');


router.post('/Createcomplaints', complaintsController.createComplaint);
router.get('/getComplaint', complaintsController.getAllComplaints);
router.put('/update/:id', complaintsController.updateComplaint);
router.delete('/complaints/:id', complaintsController.deleteComplaint);

module.exports = router;

const express = require('express');
const feedbackController = require('../controllers/feedback.controller');

const router = express.Router();

router.post('/create', feedbackController.createFeedback);
router.get('/:feedbackId', feedbackController.getFeedbackById);
router.get('/parcel/:parcelId', feedbackController.getFeedbackByParcelId);
router.put('/:feedbackId', feedbackController.updateFeedback);
router.delete('/:feedbackId', feedbackController.deleteFeedback);

module.exports = router;

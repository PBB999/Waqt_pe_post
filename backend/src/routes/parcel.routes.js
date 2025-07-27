const express = require('express');
const parcelController = require('../controllers/parcel.controller');

const router = express.Router();
router.get('/', parcelController.getParcels);
router.post('/create', parcelController.createParcel);
router.get('/:parcelId', parcelController.getParcelById);
router.get('/sender/:senderId', parcelController.getParcelBySenderId);
router.get('/receiver/:receiverId', parcelController.getParcelByReceiverId);
router.get('/postman/:postmanId/today', parcelController.getTodaysParcelsByPostmanId);
router.get('/pin/:pincode', parcelController.getParcelsByPin);
router.put('/:parcelId', parcelController.updateParcel);
router.delete('/:parcelId', parcelController.deleteParcel);

router.post('/:parcelId/tracking', parcelController.addTrackingHistory);
router.put('/:parcelId/status', parcelController.updateParcelStatus);
router.put('/:parcelId/feedback', parcelController.addFeedback);

module.exports = router;

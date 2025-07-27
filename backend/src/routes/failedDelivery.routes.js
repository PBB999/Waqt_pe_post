const express = require('express');
const failedDeliveryController = require('../controllers/failedDelivery.controller');

const router = express.Router();

router.post('/create', failedDeliveryController.createFailedDelivery);
router.get('/:failedDeliveryId', failedDeliveryController.getFailedDeliveryById);
router.get('/parcel/:parcelId', failedDeliveryController.getFailedDeliveriesByParcelId);
router.put('/:failedDeliveryId/redelivery', failedDeliveryController.requestRedelivery);
router.delete('/:failedDeliveryId', failedDeliveryController.deleteFailedDelivery);

module.exports = router;

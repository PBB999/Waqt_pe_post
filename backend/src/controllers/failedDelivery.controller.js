const failedDeliveryService = require('../services/failedDelivery.service');
const { z } = require('zod');

const createFailedDeliverySchema = z.object({
    failedDeliveryId: z.string(),
    parcelId: z.string(),
    reason: z.string(),
    redirectedPostOffice: z.string(),
    redeliveryRequested: z.boolean().default(false),
    pickupScheduled: z.boolean().default(false),
});

exports.createFailedDelivery = async (req, res) => {
    try {
        const data = createFailedDeliverySchema.parse(req.body);
        const failedDelivery = await failedDeliveryService.createFailedDelivery(data);
        res.status(201).json(failedDelivery);
    } catch (error) {
        res.status(400).json({ message: error.errors || error.message });
    }
};

exports.getFailedDeliveryById = async (req, res) => {
    try {
        const failedDelivery = await failedDeliveryService.getFailedDeliveryById(req.params.failedDeliveryId);
        res.status(200).json(failedDelivery);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.getFailedDeliveriesByParcelId = async (req, res) => {
    try {
        const failedDeliveries = await failedDeliveryService.getFailedDeliveriesByParcelId(req.params.parcelId);
        res.status(200).json(failedDeliveries);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.requestRedelivery = async (req, res) => {
    try {
        const updatedFailedDelivery = await failedDeliveryService.requestRedelivery(req.params.failedDeliveryId);
        res.status(200).json(updatedFailedDelivery);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteFailedDelivery = async (req, res) => {
    try {
        await failedDeliveryService.deleteFailedDelivery(req.params.failedDeliveryId);
        res.status(200).json({ message: 'Failed delivery deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

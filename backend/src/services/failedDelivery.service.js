const FailedDelivery = require('../models/FailedDelivery');

exports.createFailedDelivery = async (data) => {
    const failedDelivery = new FailedDelivery(data);
    return await failedDelivery.save();
};

exports.getFailedDeliveryById = async (failedDeliveryId) => {
    const failedDelivery = await FailedDelivery.findOne({ failedDeliveryId });
    if (!failedDelivery) throw new Error('Failed delivery not found');
    return failedDelivery;
};

exports.getFailedDeliveriesByParcelId = async (parcelId) => {
    const failedDeliveries = await FailedDelivery.find({ parcelId });
    if (failedDeliveries.length === 0) throw new Error('No failed deliveries found for this parcel');
    return failedDeliveries;
};

exports.requestRedelivery = async (failedDeliveryId) => {
    const failedDelivery = await FailedDelivery.findOneAndUpdate(
        { failedDeliveryId },
        { redeliveryRequested: true },
        { new: true }
    );
    if (!failedDelivery) throw new Error('Failed delivery not found');
    return failedDelivery;
};

exports.deleteFailedDelivery = async (failedDeliveryId) => {
    const result = await FailedDelivery.deleteOne({ failedDeliveryId });
    if (result.deletedCount === 0) throw new Error('Failed delivery not found');
    return result;
};

const Address = require('../models/Address');
const Parcel = require('../models/Parcel');
const Postman = require('../models/Postman');

exports.createParcel = async (data) => {
    const parcel = new Parcel(data);
    return await parcel.save();
};

exports.getParcels = async () => {
    const parcels = await Parcel.find().populate('senderId receiverId pickupAddress deliveryAddress');
    return parcels;
}

exports.getParcelById = async (parcelId) => {
    const parcel = await Parcel.findOne({ _id: parcelId }).populate('senderId receiverId beneficiaryId deliveryAddress pickupAddress');
    if (!parcel) throw new Error('Parcel not found');
    return parcel;
};

// exports.getTodaysParcelsByPostmanId = async (postmanId) => {
//     try {
//         if (!postmanId) {
//             throw new Error('Postman ID is required.');
//         }
//         let startOfDay = new Date();
//         startOfDay.setHours(5, 30, 0);
//         const endOfDay = new Date();
//         endOfDay.setHours(29, 29, 59);
//         console.log("startdate", startOfDay, "enddate", endOfDay)
//         const postman = await Postman.findOne({ postmanId });
//         if (!postman) {
//             throw new Error('Postman not found.');
//         }
//         const parcels = await Parcel.find({
//             _id: { $in: postman.assignedParcels },
//             'timeSlot.startTime': { $gte: startOfDay, $lte: endOfDay },
//         }).populate('senderId receiverId beneficiaryId deliveryAddress pickupAddress');
//         console.log("parcels", parcels)
//         return parcels;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Error retrieving today\'s deliveries.');
//     }
// };
exports.getTodaysParcelsByPostmanId = async (postmanId) => {
    try {
        if (!postmanId) {
            throw new Error('Postman ID is required.');
        }

        const postman = await Postman.findOne({ postmanId });
        if (!postman) {
            throw new Error('Postman not found.');
        }

        const parcels = await Parcel.find({
            _id: { $in: postman.assignedParcels },
        }).populate('senderId receiverId beneficiaryId deliveryAddress pickupAddress');

        console.log("parcels", parcels);
        return parcels;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving parcels assigned to the postman.');
    }
};

exports.getParcelByPin = async (pincode) => {
    try {
        const matchingAddresses = await Address.find({ pincode }).select('_id').lean();
        console.log("address", matchingAddresses)
        const addressIds = matchingAddresses.map(address => address._id);
        const parcels = await Parcel.find({
            deliveryAddress: { $in: addressIds }
        }).populate('pickupAddress deliveryAddress senderId receiverId');
        console.log("parcels", parcels)

        return parcels;
    } catch (error) {
        console.error(`Error fetching parcels for pincode ${pincode}:`, error);
        throw error;
    }
}

exports.getParcelBySenderId = async (senderId) => {
    const parcel = await Parcel.find({ senderId }).populate('senderId receiverId pickupAddress deliveryAddress');
    if (!parcel) throw new Error('Parcel not found');
    return parcel;
};
exports.getParcelByReceiverId = async (receiverId) => {
    const parcel = await Parcel.find({ receiverId }).populate('senderId receiverId pickupAddress deliveryAddress');
    if (!parcel) throw new Error('Parcel not found');
    return parcel;
};

exports.updateParcel = async (parcelId, updates) => {
    const parcel = await Parcel.findOneAndUpdate({ _id: parcelId }, updates, { new: true });
    if (!parcel) throw new Error('Parcel not found');
    return parcel;
};

exports.deleteParcel = async (parcelId) => {
    return await Parcel.deleteOne({ parcelId });
};

exports.addTrackingHistory = async (parcelId, trackingData) => {
    const parcel = await Parcel.findOneAndUpdate(
        { parcelId },
        { $push: { trackingHistory: trackingData } },
        { new: true }
    );
    if (!parcel) throw new Error('Parcel not found');
    return parcel;
};

exports.updateParcelStatus = async (parcelId, status) => {
    const parcel = await Parcel.findOneAndUpdate(
        { parcelId },
        { status },
        { new: true }
    );
    if (!parcel) throw new Error('Parcel not found');
    return parcel;
};

exports.addFeedback = async (parcelId, feedback) => {
    const parcel = await Parcel.findOneAndUpdate(
        { parcelId },
        { feedback },
        { new: true }
    );
    if (!parcel) throw new Error('Parcel not found');
    return parcel;
};
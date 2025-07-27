const Address = require('../models/Address');

exports.createAddress = async (data) => {
    const address = new Address(data);
    return await address.save();
};

exports.getAddressesByUser = async (userId) => {
    return await Address.find({ userId });
};

exports.updateAddress = async (addressId, updates) => {
    const address = await Address.findByIdAndUpdate(addressId, updates, { new: true });
    if (!address) throw new Error('Address not found');
    return address;
};

exports.deleteAddress = async (addressId) => {
    return await Address.findByIdAndDelete(addressId);
};

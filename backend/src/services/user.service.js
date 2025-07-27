const User = require('../models/User');
const { createToken } = require('../utils/jwt.util');

exports.registerUser = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
};

exports.loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
    }
    const userToken = createToken({ id: user._id, email: user.email });
    return { ...user.toJSON(), userToken };
};

exports.getUserProfile = async (userId) => {
    const user = await User.findById(userId)
        .populate('addresses')
        .populate('sentParcels')
        .populate('receivedParcels')
        .populate('notifications')
        .populate('beneficiaries');

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};


exports.getUserById = async (userId) => {
    console.log("userId", userId);
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    return user;
};

exports.getUserbyMobileNumber = async (number) => {
    const user = await User.findOne({ phone: number });
    if (!user) throw new Error('User not found');
    return user;
};

exports.updateUser = async (userId, updateData) => {
    const user = await User.findOneAndUpdate({ _id: userId }, updateData, { new: true });
    console.log("user", user);
    if (!user) throw new Error('User not found');
    return user;
};

exports.deleteUser = async (userId) => {
    const user = await User.findOneAndDelete({ userId });
    if (!user) throw new Error('User not found');
};

exports.addAddress = async (userId, address) => {
    const user = await User.findOne({ userId });
    if (!user) throw new Error('User not found');
    user.addresses.push(address);
    return await user.save();
};

exports.deleteAddress = async (userId, addressId) => {
    const user = await User.findOne({ userId });
    if (!user) throw new Error('User not found');
    user.addresses = user.addresses.filter((addr) => addr._id.toString() !== addressId);
    return await user.save();
};

exports.getSentParcels = async (userId) => {
    const user = await User.findOne({ userId }).populate('sentParcels');
    if (!user) throw new Error('User not found');
    return user.sentParcels;
};

exports.getReceivedParcels = async (userId) => {
    const user = await User.findOne({ userId }).populate('receivedParcels');
    if (!user) throw new Error('User not found');
    return user.receivedParcels;
};

exports.getNotifications = async (userId) => {
    const user = await User.findOne({ userId }).populate('notifications');
    if (!user) throw new Error('User not found');
    return user.notifications;
};

exports.addBeneficiary = async (userId, beneficiaryId) => {
    const user = await User.findOne({ userId });
    if (!user) throw new Error('User not found');
    user.beneficiaries.push(beneficiaryId);
    return await user.save();
};

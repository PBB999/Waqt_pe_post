const Postman = require('../models/Postman');
const Parcel = require('../models/Parcel');
const { createToken } = require('../utils/jwt.util')

exports.registerPostman = async (data) => {
    const postman = new Postman(data);
    return await postman.save();
};

exports.loginPostman = async (postmanId, phone) => {
    const postman = await Postman.findOne({ postmanId, phone });
    if (!postman) throw new Error('Invalid credentials');
    return postman;
};

exports.loginUser = async (postmanId, password) => {
    const user = await Postman.findOne({ postmanId });
    if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
    }
    const userToken = createToken({ id: user._id, email: user.email });
    return { ...user.toJSON(), userToken };
};

exports.getPostmanById = async (postmanId) => {
    const postman = await Postman.findById(postmanId).populate('assignedParcels');
    if (!postman) throw new Error('Postman not found');
    return postman;
};

exports.updatePostman = async (postmanId, updates) => {
    const postman = await Postman.findByIdAndUpdate(postmanId, updates, { new: true });
    if (!postman) throw new Error('Postman not found');
    return postman;
};

exports.deletePostman = async (postmanId) => {
    return await Postman.findByIdAndDelete(postmanId);
};

exports.getRoutes = async (postmanId) => {
    const postman = await Postman.findById(postmanId).populate('currentRoute');
    if (!postman) throw new Error('Postman not found');
    return postman.currentRoute;
};

exports.updateCurrentRoute = async (postmanId, routes) => {
    const postman = await Postman.findByIdAndUpdate(postmanId, { currentRoute: routes }, { new: true });
    if (!postman) throw new Error('Postman not found');
    return postman.currentRoute;
};

exports.getAssignedParcels = async (postmanId) => {
    const postman = await Postman.findById(postmanId).populate('assignedParcels');
    if (!postman) throw new Error('Postman not found');
    return postman.assignedParcels;
};

exports.assignParcels = async (postmanId, parcels) => {
    const postman = await Postman.findById(postmanId);
    if (!postman) throw new Error('Postman not found');

    const newParcels = parcels.filter(parcel => !postman.assignedParcels.includes(parcel));

    if (newParcels.length > 0) {
        const updatedPostman = await Postman.findByIdAndUpdate(
            postmanId,
            { $push: { assignedParcels: { $each: newParcels } } },
            { new: true }
        );
        return updatedPostman.assignedParcels;
    }

    return postman.assignedParcels;
};

exports.updateParcelStatus = async (parcelId, status) => {
    const parcel = await Parcel.findByIdAndUpdate(parcelId, { status }, { new: true });
    if (!parcel) throw new Error('Parcel not found');
    return parcel;
};

exports.updateLocation = async (postmanId, location) => {
    const postman = await Postman.findByIdAndUpdate(postmanId, { location }, { new: true });
    if (!postman) throw new Error('Postman not found');
    return postman.location;
};

exports.updateStatus = async (postmanId, status) => {
    const postman = await Postman.findByIdAndUpdate(postmanId, { status }, { new: true });
    if (!postman) throw new Error('Postman not found');
    return postman.status;
};

exports.getAllPostmen = async () => {
    try {
        const postmen = await Postman.find();
        return postmen;
    } catch (error) {
        throw new Error('Error fetching postmen');
    }
};

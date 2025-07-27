const userService = require('../services/user.service');
const {
    registerUserSchema,
    loginUserSchema,
    updateUserSchema,
    addAddressSchema,
    beneficiarySchema
} = require('../validators/user.validator');

exports.registerUser = async (req, res) => {
    try {
        console.log("Registering user:", req.body);
        const data = registerUserSchema.parse(req.body);
        const user = await userService.registerUser(data);
        res.status(201).json({success: true, data: {user}});
    } catch (error) {
        console.log("Error", error);
        res.status(400).json({ message: error.errors || error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const data = loginUserSchema.parse(req.body);
        const user = await userService.loginUser(data.email, data.password);
        res.status(200).json({success: true, data: {user}});
    } catch (error) {
        console.log("Error", error);
        res.status(400).json({ message: error.errors || error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const userProfile = await userService.getUserProfile(req.user.id);
        res.status(200).json(userProfile);
    } catch (error) {
        console.log("Error", error);
        res.status(404).json({ message: error.message });
    }
};


exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getUserByMobileNumber = async (req, res) => {
    try {
        console.log("getting using mobile number", req.params.number)
        const user = await userService.getUserbyMobileNumber(req.params.number);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        console.log("Updating user:", req.body);
        const data = updateUserSchema.parse(req.body);
        const updatedUser = await userService.updateUser(req.params.userId, data);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error", error);
        res.status(400).json({ message: error.errors || error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addAddress = async (req, res) => {
    try {
        const data = addAddressSchema.parse(req.body); 
        const user = await userService.addAddress(req.params.userId, data);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.errors || error.message });
    }
};

exports.deleteAddress = async (req, res) => {
    try {
        const user = await userService.deleteAddress(req.params.userId, req.params.addressId);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getSentParcels = async (req, res) => {
    try {
        const parcels = await userService.getSentParcels(req.params.userId);
        res.status(200).json(parcels);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getReceivedParcels = async (req, res) => {
    try {
        const parcels = await userService.getReceivedParcels(req.params.userId);
        res.status(200).json(parcels);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await userService.getNotifications(req.params.userId);
        res.status(200).json(notifications);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addBeneficiary = async (req, res) => {
    try {
        const data = beneficiarySchema.parse(req.body); 
        const user = await userService.addBeneficiary(req.params.userId, data.beneficiaryId);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.errors || error.message });
    }
};

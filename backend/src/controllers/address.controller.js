const addressService = require('../services/address.service');
const { z } = require('zod');

const addressSchema = z.object({
    label: z.enum(['Home', 'Work', 'Other']),
    name: z.string(),
    flat: z.string(),
    area: z.string(),
    pincode: z.string(),
    mobileNumber: z.string(),
    city: z.string(),
    state: z.string(),
    location: z.object({
        latitude: z.number(),
        longitude: z.number(),
    }),
    userId: z.string(),
});

exports.createAddress = async (req, res) => {
    try {
        console.log("address create called")
        const data = addressSchema.parse(req.body);
        const address = await addressService.createAddress(data);
        res.status(201).json(address);
    } catch (error) {
        console.log("error", error);
        res.status(400).json({ message: error.errors || error.message });
    }
};

exports.getAddressesByUser = async (req, res) => {
    try {
        const addresses = await addressService.getAddressesByUser(req.params.userId);
        res.status(200).json(addresses);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.updateAddress = async (req, res) => {
    try {
        const updatedAddress = await addressService.updateAddress(req.params.addressId, req.body);
        res.status(200).json(updatedAddress);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAddress = async (req, res) => {
    try {
        await addressService.deleteAddress(req.params.addressId);
        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

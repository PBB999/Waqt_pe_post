const adminService = require('../services/admin.service');
const { z } = require('zod');
const jwt = require('jsonwebtoken');

const createAdminSchema = z.object({
    adminId: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(['Super Admin', 'Region Admin']),
    pincode: z.string().regex(/^\d{6}$/, 'Invalid pincode format'), 
});


const loginAdminSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});


const updateAdminSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    role: z.enum(['Super Admin', 'Region Admin']).optional(),
});

exports.createAdmin = async (req, res) => {
    try {
        const data = createAdminSchema.parse(req.body);
        const admin = await adminService.createAdmin(data);
        res.status(201).json(admin);
    } catch (error) {
        res.status(400).json({ message: error.errors || error.message });
    }
};

exports.getAdminById = async (req, res) => {
    try {
        const admin = await adminService.getAdminById(req.params.adminId);
        res.status(200).json(admin);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const updatedAdmin = await adminService.updateAdmin(req.params.adminId, req.body);
        res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        await adminService.deleteAdmin(req.params.adminId);
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.loginAdmin = async (req, res) => {
    try {
        const data = loginAdminSchema.parse(req.body);
        const admin = await adminService.getAdminByEmail(data.email);


        if (admin.password !== data.password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ adminId: admin.adminId, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("at backend login token" , token)

        const user = { ...admin._doc, userToken: token };
        res.status(200).json({ success: true, data: {user}});
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.errors || error.message });
    }
};

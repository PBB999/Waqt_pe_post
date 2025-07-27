const postmanService = require('../services/postman.service');
const { z } = require('zod');

const registerSchema = z.object({
    postmanId: z.string(),
    name: z.string(),
    phone: z.string().regex(/^[0-9]{10}$/),
    password:z.string(),
    pincode:z.string(),
    status: z.enum(['Active', 'On Duty', 'Inactive']),
});

const loginUserSchema = z.object({
    postmanId: z.string(),
    password: z.string()
});

const updateLocationSchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
});

const updateStatusSchema = z.object({
    status: z.enum(['Active', 'On Duty', 'Inactive']),
});

exports.registerPostman = async (req, res) => {
    try {
        const data = registerSchema.parse(req.body);
        console.log("Data at Backend" , data);
        const postman = await postmanService.registerPostman(data);
        console.log("postman", postman)
        res.status(201).json(postman);
    } catch (error) {
        console.log("req" , req);
        console.log("error occured ", error);
        res.status(400).json({ message: error.errors || error.message });
    }
};

exports.loginPostman = async (req, res) => {
    try {
        const data = loginUserSchema.parse(req.body);
        const user = await postmanService.loginUser(data.postmanId, data.password);
        res.status(200).json({ success: true, data: { user } });
    } catch (error) {
        console.log("Error", error);
        res.status(400).json({ message: error.errors || error.message });
    }
};

exports.getPostmanById = async (req, res) => {
    try {
        const postman = await postmanService.getPostmanById(req.params.postmanId);
        res.status(200).json(postman);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.updatePostman = async (req, res) => {
    try {
        const updatedPostman = await postmanService.updatePostman(req.params.postmanId, req.body);
        res.status(200).json(updatedPostman);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deletePostman = async (req, res) => {
    try {
        await postmanService.deletePostman(req.params.postmanId);
        res.status(200).json({ message: 'Postman deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getRoutes = async (req, res) => {
    try {
        const routes = await postmanService.getRoutes(req.params.postmanId);
        res.status(200).json(routes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.updateCurrentRoute = async (req, res) => {
    try {
        const updatedRoutes = await postmanService.updateCurrentRoute(req.params.postmanId, req.body.routes);
        res.status(200).json(updatedRoutes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAssignedParcels = async (req, res) => {
    try {
        const parcels = await postmanService.getAssignedParcels(req.params.postmanId);
        res.status(200).json(parcels);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.assignParcels = async (req, res) => {
    try {
        const assignedParcels = await postmanService.assignParcels(req.params.postmanId, req.body.parcels);
        res.status(201).json(assignedParcels);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateParcelStatus = async (req, res) => {
    try {
        const updatedStatus = await postmanService.updateParcelStatus(req.params.postmanId, req.params.parcelId, req.body.status);
        res.status(200).json(updatedStatus);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateLocation = async (req, res) => {
    try {
        const data = updateLocationSchema.parse(req.body);
        const updatedLocation = await postmanService.updateLocation(req.params.postmanId, data);
        res.status(200).json(updatedLocation);
    } catch (error) {
        res.status(400).json({ message: error.errors || error.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const data = updateStatusSchema.parse(req.body);
        const updatedStatus = await postmanService.updateStatus(req.params.postmanId, data.status);
        res.status(200).json(updatedStatus);
    } catch (error) {
        res.status(400).json({ message: error.errors || error.message });
    }
};


exports.getAllPostmen = async (req, res) => {
    try {
        const postmen = await postmanService.getAllPostmen();
        res.status(200).json(postmen); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
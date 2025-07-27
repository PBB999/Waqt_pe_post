const Admin = require('../models/Admin');

exports.createAdmin = async (data) => {
    const admin = new Admin(data);
    return await admin.save();
};

exports.getAdminById = async (adminId) => {
    const admin = await Admin.findOne({ adminId });
    if (!admin) throw new Error('Admin not found');
    return admin;
};

exports.updateAdmin = async (adminId, updates) => {
    const admin = await Admin.findOneAndUpdate({ adminId }, updates, { new: true });
    if (!admin) throw new Error('Admin not found');
    return admin;
};

exports.deleteAdmin = async (adminId) => {
    return await Admin.deleteOne({ adminId });
};


exports.getAdminByEmail = async (email) => {
    const admin = await Admin.findOne({ email });
    console.log("email  ", email)
    console.log(admin);
    if (!admin) throw new Error('Admin not found');
    return admin;
};

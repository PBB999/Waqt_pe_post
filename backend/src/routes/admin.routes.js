const express = require('express');
const adminController = require('../controllers/admin.controller');

const router = express.Router();

router.post('/create', adminController.createAdmin);
router.post('/login', adminController.loginAdmin);

router.get('/:adminId', adminController.getAdminById);
router.put('/:adminId', adminController.updateAdmin);
router.delete('/:adminId', adminController.deleteAdmin);

module.exports = router;

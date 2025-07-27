const express = require('express');
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');


const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/:userId', userController.getUserById);
router.patch('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.get('/profile', verifyToken, userController.getUserProfile);
router.post('/:userId/addresses', userController.addAddress);
router.delete('/:userId/addresses/:addressId', userController.deleteAddress);
router.get('/:userId/sent-parcels', userController.getSentParcels);
router.get('/:userId/received-parcels', userController.getReceivedParcels);
router.get('/:userId/notifications', userController.getNotifications);
router.post('/:userId/beneficiaries', userController.addBeneficiary);
router.get('/getUserByMobileNumber/:number', userController.getUserByMobileNumber);

module.exports = router;

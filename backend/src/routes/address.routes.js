const express = require('express');
const addressController = require('../controllers/address.controller');

const router = express.Router();

router.post('/create', addressController.createAddress);
router.get('/user/:userId', addressController.getAddressesByUser);
router.put('/:addressId', addressController.updateAddress);
router.delete('/:addressId', addressController.deleteAddress);

module.exports = router;
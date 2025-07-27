const express = require('express');
const postmanController = require('../controllers/postman.controller');

const router = express.Router();

router.post('/register', postmanController.registerPostman);
router.post('/login', postmanController.loginPostman);
router.get('/fetchAllPostmen', postmanController.getAllPostmen);

router.get('/:postmanId', postmanController.getPostmanById);
router.put('/:postmanId', postmanController.updatePostman);
router.delete('/:postmanId', postmanController.deletePostman);

router.get('/:postmanId/routes', postmanController.getRoutes);
router.put('/:postmanId/routes', postmanController.updateCurrentRoute);

router.get('/:postmanId/parcels', postmanController.getAssignedParcels);
router.post('/:postmanId/parcels', postmanController.assignParcels);
router.put('/:postmanId/parcels/:parcelId/status', postmanController.updateParcelStatus);

router.put('/:postmanId/location', postmanController.updateLocation);
router.put('/:postmanId/status', postmanController.updateStatus);

module.exports = router;

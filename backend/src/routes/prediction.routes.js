const express = require('express');
const predictionController = require('../controllers/prediction.controller');

const router = express.Router();

router.get('/user/:userId', predictionController.predict);

module.exports = router;
const { getPrediction } = require('../services/predictions.service');

exports.predict = async (req, res) => {
    try {
        const prediction = await getPrediction(req.params.userId);
        res.status(200).json(prediction);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
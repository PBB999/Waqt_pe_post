const feedbackService = require('../services/feedback.service');
const { z } = require('zod');

const createFeedbackSchema = z.object({
    feedbackId: z.string(),
    parcelId: z.string(),
    receiverId: z.string(),
    rating: z.number().min(1).max(5),
    comments: z.string().optional(),
});

exports.createFeedback = async (req, res) => {
    try {
        const data = createFeedbackSchema.parse(req.body);
        const feedback = await feedbackService.createFeedback(data);
        res.status(201).json(feedback);
    } catch (error) {
        res.status(400).json({ message: error.errors || error.message });
    }
};

exports.getFeedbackById = async (req, res) => {
    try {
        const feedback = await feedbackService.getFeedbackById(req.params.feedbackId);
        res.status(200).json(feedback);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.getFeedbackByParcelId = async (req, res) => {
    try {
        const feedback = await feedbackService.getFeedbackByParcelId(req.params.parcelId);
        res.status(200).json(feedback);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.updateFeedback = async (req, res) => {
    try {
        const updatedFeedback = await feedbackService.updateFeedback(req.params.feedbackId, req.body);
        res.status(200).json(updatedFeedback);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteFeedback = async (req, res) => {
    try {
        await feedbackService.deleteFeedback(req.params.feedbackId);
        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

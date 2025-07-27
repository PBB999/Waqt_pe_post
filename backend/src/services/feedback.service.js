const Feedback = require('../models/Feedback');

exports.createFeedback = async (data) => {
    const feedback = new Feedback(data);
    return await feedback.save();
};

exports.getFeedbackById = async (feedbackId) => {
    const feedback = await Feedback.findOne({ feedbackId });
    if (!feedback) throw new Error('Feedback not found');
    return feedback;
};

exports.getFeedbackByParcelId = async (parcelId) => {
    const feedback = await Feedback.find({ parcelId });
    if (feedback.length === 0) throw new Error('No feedback found for this parcel');
    return feedback;
};

exports.updateFeedback = async (feedbackId, data) => {
    const updatedFeedback = await Feedback.findOneAndUpdate(
        { feedbackId },
        { ...data, updatedAt: Date.now() },
        { new: true }
    );
    if (!updatedFeedback) throw new Error('Feedback not found');
    return updatedFeedback;
};

exports.deleteFeedback = async (feedbackId) => {
    const result = await Feedback.deleteOne({ feedbackId });
    if (result.deletedCount === 0) throw new Error('Feedback not found');
    return result;
};

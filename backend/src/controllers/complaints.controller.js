const Complaint = require('../models/Complaints');

exports.createComplaint = async (req, res) => {
  try {
    const { userId, username, description } = req.body;

    const newComplaint = new Complaint({
      userId,
      username,
      description
    });

    const savedComplaint = await newComplaint.save();
    res.status(201).json(savedComplaint);
  } catch (error) {
    res.status(500).json({ message: 'Error creating complaint', error });
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('userId', 'name email');
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints', error });
  }
};

exports.updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reply } = req.body;

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status, reply },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.status(200).json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: 'Error updating complaint', error });
  }
};

exports.deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedComplaint = await Complaint.findByIdAndDelete(id);

    if (!deletedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting complaint', error });
  }
};

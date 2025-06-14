const Feedback = require('../models/Feedback');


exports.submitFeedback = async (req, res) => {
  try {
    const { email, comment, rating } = req.body;

    const feedback = await Feedback.create({ email, comment, rating });

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully!',
      data: feedback
    });

  } catch (error) {
    console.error("Feedback submit error :", error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};


exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }); 
    res.status(200).json({
      success: true,
      data: feedbacks
    });
  } catch (error) {
        console.error("Feedback submit error :", error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ success: false, message: 'Feedback not found' });
    }

    await feedback.deleteOne();

    res.status(200).json({ success: true, message: 'Feedback deleted successfully' });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

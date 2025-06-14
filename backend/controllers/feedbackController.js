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
exports.getFeedbackStats = async (req, res) => {
  try {
    const totalFeedbacks = await Feedback.countDocuments();

    const avgResult = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" }
        }
      }
    ]);

    const averageRating = avgResult.length > 0 ? avgResult[0].avgRating.toFixed(2) : 0;

    const ratingsBreakdown = await Feedback.aggregate([
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 }
        }
      }
    ]);

    const ratingsCount = {};
    for (let i = 1; i <= 5; i++) {
      const found = ratingsBreakdown.find(item => item._id === i);
      ratingsCount[i] = found ? found.count : 0;
    }

    res.status(200).json({
      success: true,
      totalFeedbacks,
      averageRating,
      ratingsCount
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch stats", error });
  }
};

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

    const ratingCounts = {};
    for (let i = 1; i <= 5; i++) {
      const found = ratingsBreakdown.find(item => item._id === i);
      ratingCounts[i] = found ? found.count : 0;
    }

    res.status(200).json({
      success: true,
      total: totalFeedbacks,
      average: Number(averageRating),
      ratingCounts
    });

  } catch (error) {
    console.error(" Error in getFeedbackStats:", error);
    res.status(500).json({ success: false, message: "Failed to fetch stats", error });
  }
};
const { Parser } = require('json2csv');

exports.exportFeedbackToCSV = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();

    if (feedbacks.length === 0) {
      return res.status(404).json({ success: false, message: "No feedbacks found" });
    }

    const fields = ['email', 'comment', 'rating', 'createdAt'];
    const opts = { fields };

    const parser = new Parser(opts);
    const csv = parser.parse(feedbacks);

    res.header('Content-Type', 'text/csv');
    res.attachment('feedbacks.csv');
    res.send(csv);

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to export CSV", error });
  }
};

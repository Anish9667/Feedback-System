const express = require('express');
const router = express.Router();
const { submitFeedback, getAllFeedback, deleteFeedback, getFeedbackStats, exportFeedbackToCSV   } = require('../controllers/feedbackController');
const protect = require('../middleware/authMiddleware');


router.get('/All', protect, getAllFeedback);
router.post('/submit', submitFeedback);
router.get('/', getAllFeedback);
router.delete('/:id', protect, deleteFeedback);
router.get('/stats', protect, getFeedbackStats);
router.get('/export', protect, exportFeedbackToCSV);
module.exports = router;

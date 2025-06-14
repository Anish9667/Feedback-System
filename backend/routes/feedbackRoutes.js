const express = require('express');
const router = express.Router();
const { submitFeedback, getAllFeedback, deleteFeedback } = require('../controllers/feedbackController');
const protect = require('../middleware/authMiddleware');
router.get('/', protect, getAllFeedback);
router.post('/submit', submitFeedback);
router.get('/', getAllFeedback);
router.delete('/:id', protect, deleteFeedback);
module.exports = router;

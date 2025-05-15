import express from 'express';
import Answer from '../models/Answers.js';
import authMiddleware from '../middleware/middleware.js';

const router = express.Router();

router.post('/',authMiddleware, async (req, res) => {
  const { questionId, answerText, userId } = req.body;
  try {
    const answer = await Answer.create({ questionId, answerText, user: userId });
    res.status(201).json(answer);
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit answer', error: err.message });
  }
});

router.get('/:questionId', async (req, res) => {
  try {
    const answers = await Answer.find({ questionId: req.params.questionId }).populate('user', 'name');
    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch answers' });
  }
});

router.patch('/:id/vote', authMiddleware, async (req, res) => {
  const { voteType } = req.body; 
  const voteChange = voteType === 'up' ? 1 : -1;

  try {
    const answer = await Answer.findByIdAndUpdate(
      req.params.id,
      { $inc: { votes: voteChange } },
      { new: true }
    );
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update answer vote', error: err.message });
  }
});

export default router;
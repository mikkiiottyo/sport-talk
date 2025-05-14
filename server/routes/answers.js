import express from 'express';
import Answer from '../models/Answer.js';

const router = express.Router();

router.post('/', async (req, res) => {
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

export default router;
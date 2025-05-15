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

router.patch('/:id', authMiddleware, async (req, res) => {
  const { answerText } = req.body;
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });

    if (answer.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    answer.answerText = answerText;
    await answer.save();

    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json({ message: 'Failed to edit answer', error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });

    if (answer.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    await answer.deleteOne();
    res.status(200).json({ message: 'Answer deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete answer', error: err.message });
  }
});

export default router;
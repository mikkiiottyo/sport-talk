import express from 'express';
import Question from '../models/Question.js';
import authMiddleware from '../middleware/middleware.js';
import Answer from '../models/Answers.js';

const router = express.Router();

router.post('/',authMiddleware, async (req, res) => {
  const { title, description, category, subcategory, userId } = req.body;
  try {
    const question = await Question.create({ title, description, category, subcategory, user: userId });
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: 'Failed to post question', error: err.message });
  }
});

router.get('/', async (req, res) => {
  const { subcategory } = req.query;
  try {
    const questions = await Question.find({ subcategory }).populate('user', 'name');
    const enrichedQuestions = await Promise.all(
      questions.map(async (q) => {
        const answerCount = await Answer.countDocuments({ questionId: q._id });
        return {
          ...q._doc,
          answerCount,
        };
      })
    );
    res.status(200).json(enrichedQuestions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch questions' });
  }
});

router.patch('/:id/vote', authMiddleware, async (req, res) => {
  const { voteType } = req.body; 
  const voteChange = voteType === 'up' ? 1 : -1;

  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { $inc: { votes: voteChange } },
      { new: true }
    );
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update vote', error: err.message });
  }
});

export default router;
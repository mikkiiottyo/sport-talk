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
    const questions = await Question.find({ subcategory }).sort({ createdAt: -1 }).populate('user', 'name');
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
  const userId = req.user.id;

  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    if (question.votedBy.includes(userId)) {
      return res.status(400).json({ message: 'You already voted on this question' });
    }

    const voteChange = voteType === 'up' ? 1 : -1;
    question.votes += voteChange;
    question.votedBy.push(userId);
    await question.save();

    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update vote', error: err.message });
  }
});

router.patch('/:id', authMiddleware, async (req, res) => {
  const { title, description } = req.body;
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    if (question.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    question.title = title ?? question.title;
    question.description = description ?? question.description;
    await question.save();

    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ message: 'Failed to edit question', error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    if (question.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    await question.deleteOne();
    res.status(200).json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete question', error: err.message });
  }
});

export default router;
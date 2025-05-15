import express from 'express';
import Question from '../models/Question.js';
import authMiddleware from '../middleware/middleware.js';

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
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch questions' });
  }
});

export default router;
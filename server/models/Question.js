import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: String,
  subcategory: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  votes: { type: Number, default: 0 },
  votedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

export default mongoose.model('Question', QuestionSchema);
const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  drillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Drill', required: true },
  answers: [
    {
      qid: { type: String, required: true },   // question ID as string
      text: { type: String, required: true }   // user's answer
    }
  ],
  score: { type: Number, default: 0 },    // Calculated % score
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attempt', attemptSchema);

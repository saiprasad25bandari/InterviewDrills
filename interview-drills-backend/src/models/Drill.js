const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: { type: String, required: true },  // new field
  prompt: { type: String, required: true },
  keywords: [String],
});

const drillSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  tags: [String],
  questions: [questionSchema],
});

module.exports = mongoose.model('Drill', drillSchema);

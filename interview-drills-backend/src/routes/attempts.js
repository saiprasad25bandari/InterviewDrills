const express = require('express');
const Attempt = require('../models/Attempt');
const Drill = require('../models/Drill');
const auth = require('../middlewares/auth');

const router = express.Router();




router.post('/', auth, async (req, res) => {
  try {
    const { drillId, answers } = req.body;

    if (!drillId || !answers) {
      return res.status(400).json({ error: { code: 400, message: 'Missing drillId or answers' } });
    }

    const drill = await Drill.findById(drillId).lean();
    if (!drill) return res.status(404).json({ error: { code: 404, message: 'Drill not found' } });

    const score = answers.reduce((acc, ans, index) => {
  const question = drill.questions[index];  // Match by index
  if (!question || !question.keywords || question.keywords.length === 0) return acc;

  const hit = question.keywords.filter(k =>
    ans.text.toLowerCase().includes(k.toLowerCase())
  );

  return acc + hit.length / question.keywords.length;
}, 0);

const finalScore = answers.length > 0 ? Math.round((score / answers.length) * 100) : 0;

    const attempt = await Attempt.create({
      userId: req.user._id,
      drillId,
      answers,
      score: finalScore,
      createdAt: new Date()
    });

    res.json({ ok: true, attempt });
  } catch (err) {
    console.error('Attempt submission error:', err);
    res.status(500).json({ error: { code: 500, message: 'Server error' } });
  }
});


// GET /api/attempts → Get last 5 attempts
router.get('/', auth, async (req, res) => {
  try {
    const attempts = await Attempt.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('drillId', 'title difficulty tags')
      .lean();

    res.json(attempts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { code: 500, message: 'Failed to get attempts' } });
  }
});

module.exports = router;

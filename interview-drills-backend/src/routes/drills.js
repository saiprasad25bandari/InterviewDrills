const express = require('express');
const Drill = require('../models/Drill');

const router = express.Router();

// In-memory cache for drills list
let drillsCache = null;
let lastCacheTime = 0;
const CACHE_DURATION_MS = 60 * 1000;  // 60 seconds

// GET /api/drills → List of drills (cached)
router.get('/', async (req, res) => {
  try {
    const now = Date.now();
    if (!drillsCache || now - lastCacheTime > CACHE_DURATION_MS) {
      const drills = await Drill.find({}, 'title difficulty tags').lean();
      drillsCache = drills;
      lastCacheTime = now;
    }
    res.json(drillsCache);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { code: 500, message: 'Failed to fetch drills' } });
  }
});

// GET /api/drills/:id → Drill detail
router.get('/:id', async (req, res) => {
  try {
    const drill = await Drill.findById(req.params.id);
    if (!drill) return res.status(404).json({ error: { code: 404, message: 'Drill not found' } });
    res.json(drill);
  } catch (err) {
    console.error('Error fetching drill:', err);
    res.status(500).json({ error: { code: 500, message: 'Server error' } });
  }
});

module.exports = router;

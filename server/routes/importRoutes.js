const express = require('express');
const ImportLog = require('../models/ImportLog');
const router = express.Router();
// GET /api/imports?page=1&limit=10
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const logs = await ImportLog.find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    const total = await ImportLog.countDocuments();

    res.json({
      total,
      page,
      limit,
      logs
    });
  } catch (err) {
    console.error('Error fetching import logs:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

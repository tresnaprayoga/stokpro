const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Server is running normally'
  });
});

// Mount auth routes -> /api/auth/*
router.use('/auth', authRoutes);

module.exports = router;

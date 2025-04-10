// routes/public.js or part of your existing service.js

const express = require('express');
const router = express.Router();
const Service = require('../models/service'); // update path if needed

// GET all services (public)
router.get('/public/services', async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

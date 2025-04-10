const express = require('express');
const router = express.Router();
const Service = require('../models/service'); 
const Incident= require('../models/incident')

// GET all services (public)
router.get('/public/services', async (req, res) => {
  try {
    const services = await Service.find({});
    const activeIncidents = await Incident.find({ status: "active" }).sort({ createdAt: -1 });
    const timeline = await Incident.find({}).sort({ createdAt: -1 }).limit(10);
    res.json({ services, activeIncidents, timeline });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

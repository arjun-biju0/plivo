const express = require('express');
const router = express.Router();
const Service = require('../models/service');
const adminAuth = require('../middlewares/adminAuth');
const verifyToken = require('../middlewares/verify');

// Get all services
router.get('/', async (req, res) => {
    try {
        console.log("incoming request");
        
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new service
router.post('/',verifyToken, async (req, res) => {
    try {
        const service = new Service(req.body);
        await service.save();
        res.status(201).json(service);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
});

// Update a service
router.put('/:id', verifyToken, async (req, res) => {
    try {
      const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Delete a service
  router.delete('/:id', verifyToken, async (req, res) => {
    try {
      await Service.findByIdAndDelete(req.params.id);
      res.json({ message: 'Service deleted' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

module.exports = router;

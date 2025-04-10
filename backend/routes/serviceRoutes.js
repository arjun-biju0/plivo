const express = require('express');
const router = express.Router();
const Service = require('../models/service');
const adminAuth = require('../middlewares/adminAuth');
const verifyToken = require('../middlewares/verify');
const { emitStatusUpdate } = require("../socket");

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
        emitStatusUpdate({ type: "service", data: service });

        res.status(201).json(service);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
});

// Update a service
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  
    try {
      const updated = await Service.findByIdAndUpdate(id, {status}, { new: true });
      if (!updated) {
        return res.status(404).json({ message: 'Service not found' });
      }
      emitStatusUpdate({ type: "service", data: updated });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Delete a service
  router.delete('/:id', verifyToken, async (req, res) => {
    try {
      const deletedService= await Service.findByIdAndDelete(req.params.id);
      if (!deletedService) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      res.json({ message: 'Service deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

module.exports = router;

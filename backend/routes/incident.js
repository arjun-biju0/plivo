const express = require('express');
const router = express.Router();
const Incident = require('../models/incident');
const { emitStatusUpdate } = require("../socket");


// 🔹 Create a new incident or maintenance
router.post('/', async (req, res) => {
  try {
    const incident = new Incident(req.body);
    await incident.save();
    emitStatusUpdate({ type: "incident", data: incident });
    res.status(201).json(incident);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🔹 Get all incidents (optional filters)
router.get('/', async (req, res) => {
  try {
    const { status, type } = req.query;
    const query = {};
    if (status) query.status = status;
    if (type) query.type = type;

    const incidents = await Incident.find(query).sort({ createdAt: -1 });
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Get a single incident
router.get('/:id', async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) return res.status(404).json({ message: "Not found" });
    res.json(incident);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Update an incident (e.g., resolve it)
router.put('/:id', async (req, res) => {
  try {
    const update = req.body;
    if (update.status === "resolved" && !update.resolvedAt) {
      update.resolvedAt = new Date();
    }

    const updated = await Incident.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!updated) return res.status(404).json({ message: "Not found" });
    emitStatusUpdate({ type: "incident", data: updated });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Delete an incident
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Incident.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

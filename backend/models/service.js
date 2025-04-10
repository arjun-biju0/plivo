const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: { type: String, enum: ['operational', 'degraded', 'down'], default: 'operational' },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Service', ServiceSchema);

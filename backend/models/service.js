const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: { type: String, enum: ['Operational', 'Degraded Performance', 'Partial Outage', 'Major Outage'], default: 'Operational' },
  lastUpdated: { type: Date, default: Date.now },
//   organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" }
});

module.exports = mongoose.model('Service', ServiceSchema);

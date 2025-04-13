// models/Incident.js
const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: { type: String, enum: ["incident", "maintenance"], default: "incident" },
  servicesAffected: [String],
  status: { type: String, enum: ["active", "resolved"], default: "active" },
  createdAt: { type: Date, default: Date.now },
  resolvedAt: Date,
//   organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" }
});

module.exports = mongoose.model("Incident", incidentSchema);

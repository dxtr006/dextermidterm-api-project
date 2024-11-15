const mongoose = require('mongoose');

// Schema for components with timestamps
const componentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  description: { type: String },
  location: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Component', componentSchema);

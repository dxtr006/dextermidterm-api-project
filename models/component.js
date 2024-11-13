

const mongoose = require('mongoose');
// we can add more to these I just kinda threw these in as place holders
const componentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  description: { type: String },
  location: { type: String },
});

module.exports = mongoose.model('Component', componentSchema);

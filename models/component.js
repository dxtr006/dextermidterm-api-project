

const mongoose = require('mongoose');
// we can add more to these I just kinda threw these in as place holders
// 11/13/24@9:15pm(kass) added timestamps
const componentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  description: { type: String },
  location: { type: String },
}, {timestamps: true});

module.exports = mongoose.model('Component', componentSchema);

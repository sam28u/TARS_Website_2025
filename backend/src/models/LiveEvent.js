const mongoose = require('mongoose');

const LiveEventSchema = new mongoose.Schema({
  desc: String,     // <-- ADD THIS
  imageUrl: String,
  link: String,     // <-- ADD THIS
}, { timestamps: true });

module.exports = mongoose.model('LiveEvent', LiveEventSchema);
const mongoose = require('mongoose');

const LatestInTechSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: String,
  imageUrl: String,
  link: String,
}, { timestamps: true });

module.exports = mongoose.model('LatestInTech', LatestInTechSchema);

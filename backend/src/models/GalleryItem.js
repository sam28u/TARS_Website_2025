const mongoose = require('mongoose');

const GalleryItemSchema = new mongoose.Schema({
  imageUrl: String,
}, { timestamps: true });

module.exports = mongoose.model('GalleryItem', GalleryItemSchema);

const GalleryItem = require('../models/GalleryItem');
const cloudinary = require('../utils/cloudinary');

async function listItems(req, res) {
  try {
    const items = await GalleryItem.find().sort({ createdAt: -1 }).lean();
    res.json({ result: 'success', data: items });
  } catch (err) {
    console.error('listItems error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

async function createItem(req, res) {
  try {
    // GalleryItem model currently stores only imageUrl. Accept file upload and save imageUrl.
    let imageUrl;
    if (req.file && req.file.buffer) {
      const upload = await cloudinary.uploader.upload_stream_promise({ folder: 'gallery' }, req.file.buffer);
      imageUrl = upload.secure_url;
    }
    const doc = new GalleryItem({ imageUrl });
    await doc.save();
    res.json({ result: 'success', data: doc });
  } catch (err) {
    console.error('createItem error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

async function getItem(req, res) {
  try {
    const item = await GalleryItem.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ result: 'error', error: 'Not found' });
    res.json({ result: 'success', data: item });
  } catch (err) {
    console.error('getItem error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

async function updateItem(req, res) {
  try {
    const updates = {};
    if (req.file && req.file.buffer) {
      const upload = await cloudinary.uploader.upload_stream_promise({ folder: 'gallery' }, req.file.buffer);
      updates.imageUrl = upload.secure_url;
    }
    const doc = await GalleryItem.findByIdAndUpdate(req.params.id, updates, { new: true }).lean();
    if (!doc) return res.status(404).json({ result: 'error', error: 'Not found' });
    res.json({ result: 'success', data: doc });
  } catch (err) {
    console.error('updateItem error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

async function deleteItem(req, res) {
  try {
    const doc = await GalleryItem.findByIdAndDelete(req.params.id).lean();
    if (!doc) return res.status(404).json({ result: 'error', error: 'Not found' });
    res.json({ result: 'success' });
  } catch (err) {
    console.error('deleteItem error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

module.exports = { listItems, createItem, getItem, updateItem, deleteItem };

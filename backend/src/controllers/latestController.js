const LatestInTech = require('../models/LatestInTech');
const cloudinary = require('../utils/cloudinary');

async function listLatest(req, res) {
  try {
    const items = await LatestInTech.find().sort({ createdAt: -1 }).lean();
    res.json({ result: 'success', data: items });
  } catch (err) {
    console.error('listLatest error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

async function createLatest(req, res) {
  try {
    const { title, summary, link } = req.body || {};
    let imageUrl;
    if (req.file && req.file.buffer) {
      const upload = await cloudinary.uploader.upload_stream_promise({ folder: 'latest-in-tech' }, req.file.buffer);
      imageUrl = upload.secure_url;
    }
    const doc = new LatestInTech({ title, summary, link, imageUrl });
    await doc.save();
    res.json({ result: 'success', data: doc });
  } catch (err) {
    console.error('createLatest error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

async function getLatest(req, res) {
  try {
    const item = await LatestInTech.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ result: 'error', error: 'Not found' });
    res.json({ result: 'success', data: item });
  } catch (err) {
    console.error('getLatest error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

async function updateLatest(req, res) {
  try {
    const updates = {};
    const { title, summary, link } = req.body || {};
    if (title !== undefined) updates.title = title;
    if (summary !== undefined) updates.summary = summary;
    if (link !== undefined) updates.link = link;
    if (req.file && req.file.buffer) {
      const upload = await cloudinary.uploader.upload_stream_promise({ folder: 'latest-in-tech' }, req.file.buffer);
      updates.imageUrl = upload.secure_url;
    }
    const doc = await LatestInTech.findByIdAndUpdate(req.params.id, updates, { new: true }).lean();
    if (!doc) return res.status(404).json({ result: 'error', error: 'Not found' });
    res.json({ result: 'success', data: doc });
  } catch (err) {
    console.error('updateLatest error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

async function deleteLatest(req, res) {
  try {
    const doc = await LatestInTech.findByIdAndDelete(req.params.id).lean();
    if (!doc) return res.status(404).json({ result: 'error', error: 'Not found' });
    res.json({ result: 'success' });
  } catch (err) {
    console.error('deleteLatest error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

module.exports = { listLatest, createLatest, getLatest, updateLatest, deleteLatest };

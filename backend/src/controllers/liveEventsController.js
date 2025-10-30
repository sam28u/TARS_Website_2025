const LiveEvent = require('../models/LiveEvent');
const cloudinary = require('../utils/cloudinary');

// No changes needed
async function listEvents(req, res) {
  try {
    const items = await LiveEvent.find().sort({ createdAt: -1 }).lean();
    // The .lean() and find() will automatically include the new fields
    res.json({ result: 'success', data: items });
  } catch (err) {
    console.error('listEvents error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

// No changes needed
async function getEvent(req, res) {
  try {
    const item = await LiveEvent.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ result: 'error', error: 'Not found' });
    res.json({ result: 'success', data: item });
  } catch (err) {
    console.error('getEvent error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

// UPDATED
async function createEvent(req, res) {
  try {
    // Get text fields from the request body
    const { desc, link } = req.body;

    let imageUrl = undefined;
    if (req.file && req.file.buffer) {
      const upload = await cloudinary.uploader.upload_stream_promise({
        resource_type: 'image',
        folder: 'live-events',
      }, req.file.buffer);
      imageUrl = upload.secure_url;
    }

    // Add desc and link to the new document
    const doc = new LiveEvent({
      desc,
      link,
      imageUrl
    });

    await doc.save();
    res.json({ result: 'success', data: doc });
  } catch (err) {
    console.error('createEvent error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

// UPDATED
async function updateEvent(req, res) {
  try {
    // Get text fields from the request body
    const { desc, link } = req.body;
    const updates = {};

    // Add text fields to the updates object if they were provided
    if (desc !== undefined) updates.desc = desc;
    if (link !== undefined) updates.link = link;

    // Handle file upload for imageUrl
    if (req.file && req.file.buffer) {
      const upload = await cloudinary.uploader.upload_stream_promise({
        resource_type: 'image',
        folder: 'live-events',
      }, req.file.buffer);
      updates.imageUrl = upload.secure_url;
    }

    const doc = await LiveEvent.findByIdAndUpdate(req.params.id, updates, { new: true }).lean();
    if (!doc) return res.status(404).json({ result: 'error', error: 'Not found' });
    res.json({ result: 'success', data: doc });
  } catch (err) {
    console.error('updateEvent error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

// No changes needed
async function deleteEvent(req, res) {
  try {
    const doc = await LiveEvent.findByIdAndDelete(req.params.id).lean();
    if (!doc) return res.status(404).json({ result: 'error', error: 'Not found' });
    res.json({ result: 'success' });
  } catch (err) {
    console.error('deleteEvent error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

module.exports = { listEvents, getEvent, createEvent, updateEvent, deleteEvent };
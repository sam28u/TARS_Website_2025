const Message = require('../models/Message');

async function listMessages(req, res) {
  try {
    const items = await Message.find().sort({ createdAt: -1 }).limit(200).lean();
    res.json({ result: 'success', data: items });
  } catch (err) {
    console.error('listMessages error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

async function getMessage(req, res) {
  try {
    const item = await Message.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ result: 'error', error: 'Not found' });
    res.json({ result: 'success', data: item });
  } catch (err) {
    console.error('getMessage error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

async function createMessage(req, res) {
  try {
    const { name, message } = req.body || {};
    if (!name || !message) return res.status(400).json({ result: 'error', error: 'Missing name or message' });
    const doc = new Message({ name, message });
    await doc.save();
    res.json({ result: 'success', data: doc });
  } catch (err) {
    console.error('createMessage error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

async function deleteMessage(req, res) {
  try {
    const doc = await Message.findByIdAndDelete(req.params.id).lean();
    if (!doc) return res.status(404).json({ result: 'error', error: 'Not found' });
    res.json({ result: 'success' });
  } catch (err) {
    console.error('deleteMessage error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

module.exports = { listMessages, getMessage, createMessage, deleteMessage };

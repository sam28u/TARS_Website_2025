const Project = require('../models/Project');
const cloudinary = require('../utils/cloudinary');

async function listProjects(req, res) {
  try {
    const items = await Project.find().sort({ createdAt: -1 }).lean();
    res.json({ result: 'success', data: items });
  } catch (err) {
    console.error('listProjects error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

async function createProject(req, res) {
  try {
    const { title, description } = req.body || {};
    let imageUrl;
    if (req.file && req.file.buffer) {
      try {
        const upload = await cloudinary.uploader.upload_stream_promise({ folder: 'projects' }, req.file.buffer);
        imageUrl = upload.secure_url;
      } catch (err) {
        console.error('createProject cloudinary error', err);
        // If Cloudinary is not configured, return a helpful error so caller knows why upload failed
        return res.status(500).json({ result: 'error', error: 'Image upload failed: Cloudinary not configured or returned an error' });
      }
    }
    const doc = new Project({ title, description, imageUrl });
    await doc.save();
    res.json({ result: 'success', data: doc });
  } catch (err) {
    console.error('createProject error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

async function getProject(req, res) {
  try {
    const item = await Project.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ result: 'error', error: 'Not found' });
    res.json({ result: 'success', data: item });
  } catch (err) {
    console.error('getProject error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

async function updateProject(req, res) {
  try {
    const updates = {};
    const { title, description } = req.body || {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (req.file && req.file.buffer) {
      try {
        const upload = await cloudinary.uploader.upload_stream_promise({ folder: 'projects' }, req.file.buffer);
        updates.imageUrl = upload.secure_url;
      } catch (err) {
        console.error('updateProject cloudinary error', err);
        return res.status(500).json({ result: 'error', error: 'Image upload failed: Cloudinary not configured or returned an error' });
      }
    }
    const doc = await Project.findByIdAndUpdate(req.params.id, updates, { new: true }).lean();
    if (!doc) return res.status(404).json({ result: 'error', error: 'Not found' });
    res.json({ result: 'success', data: doc });
  } catch (err) {
    console.error('updateProject error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

async function deleteProject(req, res) {
  try {
    const doc = await Project.findByIdAndDelete(req.params.id).lean();
    if (!doc) return res.status(404).json({ result: 'error', error: 'Not found' });
    res.json({ result: 'success' });
  } catch (err) {
    console.error('deleteProject error', err);
    res.status(500).json({ result: 'error', error: 'Internal server error' });
  }
}

module.exports = { listProjects, createProject, getProject, updateProject, deleteProject };

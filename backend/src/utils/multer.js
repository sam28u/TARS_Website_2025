const multer = require('multer');

// Use memory storage since we'll upload buffer to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;

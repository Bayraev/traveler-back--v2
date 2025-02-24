const multer = require('multer');

// Configure multer storage to keep files in memory
const storage = multer.memoryStorage();

// Validate that uploaded files are images
const validateImageFile = (req, file, cb) => {
  const isImage = file.mimetype.startsWith('image/');
  if (isImage) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

// Configure multer options
const multerConfig = {
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
  fileFilter: validateImageFile,
};

// Create and export multer instance with config
const upload = multer(multerConfig);

module.exports = upload;

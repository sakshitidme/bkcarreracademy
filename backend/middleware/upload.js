const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../frontend/public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `doc-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDFs, Word docs, and Images are allowed.'));
  }
};

const multerInstance = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

const compressUploadedImages = require('./compressUploadedImages');

// Transparent wrapper to automatically append the image compression middleware
const upload = {
  single: (fieldName) => [multerInstance.single(fieldName), compressUploadedImages],
  array: (fieldName, maxCount) => [multerInstance.array(fieldName, maxCount), compressUploadedImages],
  fields: (fieldsArray) => [multerInstance.fields(fieldsArray), compressUploadedImages],
  any: () => [multerInstance.any(), compressUploadedImages],
  none: () => multerInstance.none()
};

module.exports = upload;

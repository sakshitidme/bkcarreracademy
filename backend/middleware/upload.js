const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Always resolve to an absolute path so it works regardless of CWD
const UPLOADS_DIR = path.resolve(__dirname, '../../frontend/public/uploads');

// Auto-create the uploads directory if it doesn't exist (prevents Multer crash on first run)
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  console.log(`[UPLOAD] Created uploads directory: ${UPLOADS_DIR}`);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
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

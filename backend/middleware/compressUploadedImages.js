const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const compressImageFile = async (file) => {
  // Only compress images
  const ext = path.extname(file.path).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    return;
  }

  const tempPath = file.path + '.tmp';
  try {
    let pipeline = sharp(file.path);
    if (ext === '.png') {
      pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
    } else {
      pipeline = pipeline.jpeg({ quality: 80, progressive: true });
    }
    
    await pipeline.toFile(tempPath);
    
    // Replace original file with compressed file
    fs.unlinkSync(file.path);
    fs.renameSync(tempPath, file.path);
    
    // Update size in file metadata
    const stat = fs.statSync(file.path);
    file.size = stat.size;
    console.log(`[COMPRESSION] Compressed uploaded file: ${file.filename} down to ${(stat.size / 1024).toFixed(1)} KB`);
  } catch (err) {
    console.error(`[COMPRESSION ERROR] Failed to compress ${file.filename}:`, err.message);
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  }
};

const compressUploadedImages = async (req, res, next) => {
  try {
    // 1. Single file upload (req.file)
    if (req.file) {
      await compressImageFile(req.file);
    }
    
    // 2. Multi-file uploads (req.files)
    if (req.files) {
      if (Array.isArray(req.files)) {
        for (const file of req.files) {
          await compressImageFile(file);
        }
      } else {
        // Object format: { fieldName: [file1, file2] }
        for (const field of Object.keys(req.files)) {
          for (const file of req.files[field]) {
            await compressImageFile(file);
          }
        }
      }
    }
  } catch (err) {
    console.error('[COMPRESSION MIDDLEWARE ERROR]', err);
  }
  next();
};

module.exports = compressUploadedImages;

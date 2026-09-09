const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, 'public');
const BACKUP_DIR = path.join(__dirname, '../backups/original-public-images');

// Create backup directory if it doesn't exist
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  console.log(`Created backup directory at: ${BACKUP_DIR}`);
}

async function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      await processDirectory(filePath);
      continue;
    }
    
    const ext = path.extname(file).toLowerCase();
    const isImage = ['.png', '.jpg', '.jpeg'].includes(ext);
    
    // Only compress images larger than 50KB to make sure we optimize all student photos
    if (isImage && stat.size > 50 * 1024) {
      const sizeMB = (stat.size / (1024 * 1024)).toFixed(3);
      console.log(`\nProcessing: ${path.relative(PUBLIC_DIR, filePath)} (${sizeMB} MB)`);
      
      // Mirror the structure inside the backup directory
      const relativePath = path.relative(PUBLIC_DIR, filePath);
      const backupPath = path.join(BACKUP_DIR, relativePath);
      const backupDir = path.dirname(backupPath);
      
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
      }
      
      // 1. Backup original file
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(filePath, backupPath);
        console.log(`- Backed up to ${backupPath}`);
      } else {
        console.log(`- Backup already exists`);
      }
      
      // 2. Compress in-place
      const tempPath = filePath + '.tmp';
      try {
        let pipeline = sharp(backupPath);
        
        if (ext === '.png') {
          // Compress PNG using palette-based quantization
          pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
        } else if (ext === '.jpg' || ext === '.jpeg') {
          // Compress JPEG/JPG
          pipeline = pipeline.jpeg({ quality: 80, progressive: true });
        }
        
        await pipeline.toFile(tempPath);
        
        // Replace original with compressed temp file
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);
        
        const newStat = fs.statSync(filePath);
        const newSizeKB = (newStat.size / 1024).toFixed(1);
        const percentSaved = (((stat.size - newStat.size) / stat.size) * 100).toFixed(1);
        
        console.log(`✅ Compressed successfully: ${newSizeKB} KB (${percentSaved}% saved)`);
      } catch (err) {
        console.error(`❌ Error compressing ${file}:`, err);
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
        }
      }
    }
  }
}

async function compressImages() {
  await processDirectory(PUBLIC_DIR);
  console.log('\nAll heavy images processed successfully!');
}

compressImages().catch(console.error);

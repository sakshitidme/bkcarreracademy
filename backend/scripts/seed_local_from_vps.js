const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/integrated_portal_db';

const WebContentSchema = new mongoose.Schema({
  section: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String },
  subCategory: { type: String },
  instructor: { type: String },
  image: { type: String },
  isRecent: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: true },
  status: { type: String, default: 'published' },
  examDate: { type: Date },
  buttonUrl: { type: String },
  media: [{
    mediaType: { type: String, default: 'image' },
    src: { type: String },
    title: { type: String },
    poster: { type: String }
  }],
  dynamicSections: [{
    title: { type: String },
    content: { type: String }
  }]
}, { timestamps: true });

const WebContent = mongoose.model('WebContent', WebContentSchema, 'portal_web_content');

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to Local MongoDB');

    await WebContent.deleteMany({});
    console.log('🗑️ Cleared existing local content');

    const heroItem = {
      section: 'hero',
      title: 'Your Career, Our Commitment.',
      isRecent: false,
      isFeatured: true,
      status: 'published',
      buttonUrl: 'https://youtube.com/@bkcareeracademy2025',
      media: [
        {
          mediaType: 'youtube',
          src: 'Jof92fozWuk',
          title: 'Success Story 1',
          poster: ''
        },
        {
          mediaType: 'youtube',
          src: 'z18YX4x1Lw8',
          title: 'Success Story 2',
          poster: ''
        },
        {
          mediaType: 'youtube',
          src: 'wn7i39rNblw',
          title: 'Success Story 3',
          poster: ''
        },
        {
          mediaType: 'youtube',
          src: 'cPLrVlE2uRQ',
          title: 'Success Story 4',
          poster: ''
        }
      ],
      dynamicSections: []
    };

    await new WebContent(heroItem).save();
    console.log('✅ Seeded local WebContent');

    await mongoose.disconnect();
    console.log('✅ Disconnected');
  } catch (err) {
    console.error('❌ Local seeding failed:', err);
  }
}

seed();

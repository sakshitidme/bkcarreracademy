const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/integrated_portal_db';

const WebContentSchema = new mongoose.Schema({
  section: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String },
  subCategory: { type: String },
  instructor: { type: String },
  image: { type: String },
  isFeatured: { type: Boolean, default: true },
  status: { type: String, default: 'published' },
  examDate: { type: Date },
  buttonUrl: { type: String },
  dynamicSections: [{
    title: { type: String },
    content: { type: String }
  }]
}, { timestamps: true });

const WebContent = mongoose.model('WebContent', WebContentSchema, 'portal_web_content');

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Clear existing content for the sections we are seeding
    await WebContent.deleteMany({ section: { $in: ['quick_exam_access', 'hero', 'courses', 'exams'] } });
    console.log('🗑️ Cleared existing content');

    const content = [
      // --- HERO CONTENT ---
      {
        section: 'hero',
        title: 'Your Career, Our Commitment.',
        category: 'hero',
        subCategory: 'BK Career Academy',
        instructor: 'Academy Experts',
        image: '/Ashok stambh.png',
        buttonUrl: 'https://youtube.com/@bkcareeracademy2025',
        dynamicSections: [
          { title: 'Headline', content: 'Your Career, <br /> <span class="text-primary">Our Commitment.</span>' },
          { title: 'Sub-headline', content: "Prepare for UPSC, PSI, STI, and other competitive exams with Nashik's most experienced mentors. We don't just teach subjects; we shape futures." }
        ]
      },

      // --- QUICK EXAM ACCESS (Insights Tabs) ---
      {
        section: 'quick_exam_access',
        category: 'psi',
        title: 'MPSC (MAHARASHTRA SERVICES)',
        subCategory: 'GROUP B & C',
        dynamicSections: [
          {
            title: 'ELIGIBILITY (पात्रता)',
            content: `<ul>
              <li><strong>Graduate (कोणतीही पदवी)</strong></li>
              <li>Age: 19-31 (PSI), 19-38 (Others)</li>
              <li>Height (PSI): 165cm (M), 157cm (F)</li>
            </ul>`
          },
          {
            title: 'STAGES (परीक्षेचे स्वरूप)',
            content: `<ul>
              <li>PRELIMS: 100 MARKS</li>
              <li>MAINS: 400 MARKS</li>
              <li>PHYSICAL & INTERVIEW (ONLY PSI)</li>
            </ul>`
          }
        ]
      },
      {
        section: 'quick_exam_access',
        category: 'tet',
        title: 'TEACHING & EDUCATION',
        subCategory: 'MAHA TET / CTET 2026',
        dynamicSections: [
          {
            title: 'PAPER I (PRIMARY)',
            content: 'HSC (12th) 50% + D.T.Ed / D.Ed 2-Year Diploma.'
          },
          {
            title: 'PAPER II (UPPER PR.)',
            content: 'Graduation (Degree) + B.Ed / Graduation + 2-Pr D.Ed.'
          }
        ]
      },
      {
        section: 'quick_exam_access',
        category: 'police',
        title: 'POLICE BHARTI 2026',
        subCategory: 'HSC LEVEL RECRUITMENT',
        dynamicSections: [
          {
            title: 'ELIGIBILITY (पात्रता)',
            content: `<ul>
              <li>12th Pass (HSC)</li>
              <li>Age: 18 - 28 Years</li>
              <li>Height: 165cm (M), 155cm (F)</li>
              <li>Chest: 79cm (+5cm Expand)</li>
            </ul>`
          },
          {
            title: 'EXAM PATTERN (स्वरूप)',
            content: `<ul>
              <li>50M: PHYSICAL GROUND TEST</li>
              <li>100M: WRITTEN EXAMINATION</li>
            </ul>`
          }
        ]
      },

      // --- POPULAR COURSES ---
      {
        section: 'courses',
        title: 'UPSC Civil Services (IAS, IPS, IFS)',
        category: 'Civil Services',
        instructor: 'Dr. Arjun Sharma',
        image: '/home/card1.png',
        isFeatured: true,
        dynamicSections: [
          { title: 'Overview', content: 'Comprehensive preparation for Prelims, Mains, and Interview.' }
        ]
      },
      {
        section: 'courses',
        title: 'MPSC Rajyaseva Batch',
        category: 'MPSC',
        instructor: 'Dnayneshwar Sapkal',
        image: '/mpsc_emblem.png',
        isFeatured: true,
        dynamicSections: [
          { title: 'Overview', content: 'Targeted coaching for Group A and B Gazetted posts.' }
        ]
      },
      {
        section: 'courses',
        title: 'Banking & IBPS Mastery',
        category: 'Banking',
        instructor: 'Meera Deshmukh',
        image: '/banking.jpg',
        isFeatured: true,
        dynamicSections: [
          { title: 'Overview', content: 'Specialized batch for PO and Clerk recruitment.' }
        ]
      },
      {
        section: 'courses',
        title: 'Police Bharti Special',
        category: 'Police',
        instructor: 'Academy Team',
        image: '/Ashok stambh.png',
        isFeatured: true,
        dynamicSections: [
          { title: 'Overview', content: 'Complete physical and written preparation for Police Bharti.' }
        ]
      }
    ];

    await WebContent.insertMany(content);
    console.log('✅ Successfully seeded all content!');

    await mongoose.disconnect();
    console.log('✅ Disconnected');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seed();

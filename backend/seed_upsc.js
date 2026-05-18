const mongoose = require('mongoose');
const WebContent = require('./models/WebContent');

const MONGODB_URI = 'mongodb://localhost:27017/integrated_portal_db';

const upscData = [
  {
    section: 'upsc_hub',
    category: 'psi',
    subCategory: 'MPSC Combined Group B & C',
    title: 'MPSC Combined Examination',
    instructor: 'MPSC Guidance Team',
    examDate: new Date('2026-04-15'),
    dynamicSections: [
      {
        title: 'Eligibility (पात्रता)',
        content: `• Any Graduate Degree
• Age: 18 - 38 Years (Gen), 43 (Reserved)
• PSI Specific: Height 165cm (M), 157cm (F)
• Proficiency in Marathi is mandatory.`
      },
      {
        title: 'Exam Pattern (स्वरूप)',
        content: `• Prelims: 100 Marks (Common)
• Mains: 400 Marks (Separate)
• PSI: Physical (100) + Interview (40)`
      }
    ],
    status: 'published'
  },
  {
    section: 'upsc_hub',
    category: 'police',
    subCategory: 'HSC Level Recruitment',
    title: 'Police Bharti 2026',
    instructor: 'Physical Training Dept',
    examDate: new Date('2026-03-20'),
    dynamicSections: [
      {
        title: 'Eligibility (पात्रता)',
        content: `• 12th Pass (HSC)
• Age: 18 - 28 Years
• Height: 165cm (M), 155cm (F)
• Chest: 79cm (+5cm Expand)`
      },
      {
        title: 'Exam Pattern (स्वरूप)',
        content: `• 50M: Physical Ground Test
• 100M: Written Examination`
      }
    ],
    status: 'published'
  },
  {
    section: 'upsc_hub',
    category: 'tet',
    subCategory: 'MAHA TET / CTET',
    title: 'Teacher Eligibility Test',
    instructor: 'Education Dept',
    examDate: new Date('2026-06-21'),
    dynamicSections: [
      {
        title: 'Eligibility (पात्रता)',
        content: `• Paper I: D.T.Ed / D.Ed
• Paper II: B.A / B.Com / B.Sc + B.Ed
• Valid for Life-time Certification.`
      },
      {
        title: 'Exam Pattern (स्वरूप)',
        content: `• Total Marks: 150 (Objective)
• Duration: 150 Minutes
• Qualifying: 60% (Gen), 55% (Reserved)`
      }
    ],
    status: 'published'
  },
  {
    section: 'upsc_hub',
    category: 'UPSC (IAS, IPS, IFS)',
    subCategory: 'UPSC Civil Services',
    title: 'UPSC Civil Services Examination',
    instructor: 'UPSC Expert Team',
    examDate: new Date('2026-05-31'),
    dynamicSections: [
      {
        title: 'Eligibility (पात्रता)',
        content: `• Graduate (कोणतीही पदवी)
• Age: 19-31 (PSI), 19-38 (Others)
• Height (PSI): 165cm (M), 157cm (F)`
      },
      {
        title: 'Stages (परीक्षेचे स्वरूप)',
        content: `• PRELIMS: 100 MARKS
• MAINS: 400 MARKS
• PHYSICAL & INTERVIEW (ONLY PSI)`
      }
    ],
    status: 'published'
  },
  {
    section: 'upsc_hub',
    category: 'MBA CET & Management Exams',
    subCategory: 'Management Entrance',
    title: 'MBA CET & Management Exams',
    instructor: 'Management Department',
    examDate: new Date('2026-03-15'),
    dynamicSections: [
      {
        title: 'Eligibility (पात्रता)',
        content: `• Any Graduate Degree (Min 50% Gen, 45% Reserved)
• Final year appearing candidates are eligible
• Valid Domicile of Maharashtra for MS Seats`
      },
      {
        title: 'Exam Pattern (स्वरूप)',
        content: `• Logical Reasoning: 75 Marks
• Abstract Reasoning: 25 Marks
• Quantitative Aptitude: 50 Marks
• Verbal Ability / Reading Comprehension: 50 Marks
• Total: 200 Marks | 150 Minutes | No Negative Marking`
      },
      {
        title: 'Age Limit & Attempts (वयोमर्यादा व संधी)',
        content: `• Age Limit: No upper age limit
• Minimum Age: 21 years (as per graduation norms)
• Number of Attempts: Unlimited
• Note: Must fulfill basic graduation eligibility criteria.`
      }
    ],
    status: 'published'
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Delete existing entries to avoid duplicates
    await WebContent.deleteMany({ section: 'upsc_hub' });
    
    await WebContent.insertMany(upscData);
    console.log('Strategic Insights Data seeded successfully');
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();

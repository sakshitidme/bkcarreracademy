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

    // We delete any existing documents matching titles related to MBA CET to avoid duplicate active exam data
    await WebContent.deleteMany({
      title: { $in: ['MBA CET & Management Exams', 'MBA CET & MANAGEMENT', 'MBA CET'] }
    });

    const examDate = new Date();
    examDate.setDate(examDate.getDate() + 90); // 90 days countdown

    const mbaData = new WebContent({
      section: 'exams',
      title: 'MBA CET & Management Exams',
      category: 'Explore Govt exam',
      subCategory: 'Management Entrance',
      instructor: 'BK Academy Experts',
      image: '/Successful student pho/MBA CET/111.jpeg',
      isFeatured: true,
      examDate: examDate,
      dynamicSections: [
        {
          title: 'What is MBA CET & Eligibility',
          content: `The MAH MBA CET (Maharashtra MBA Common Entrance Test) is a state-level entrance examination conducted for admission into MBA, MMS, and PGDM programs across Maharashtra. It provides entry to premier management institutes with highly competitive fees.

• Educational Qualification: Bachelor's Degree in any discipline.
• Minimum Marks: 50% Marks for General Category (45% for Maharashtra Reserved Categories).
• Final Year Students: Eligible to apply.
• Age Requirements: No Minimum or Maximum age limit.
• Physical / Medical Standards: No height, weight, physical fitness, running, or vision standards are required.`
        },
        {
          title: 'Exam Pattern & Structure',
          content: `The exam is conducted online as an MCQ test of 150 minutes with no negative marking.

• Logical Reasoning: 75 Questions (Most critical section, ~35-40% weightage)
• Abstract Reasoning: 25 Questions (Visual logic and pattern recognition)
• Quantitative Aptitude: 50 Questions (Arithmetic, Algebra, Geometry, Modern Maths)
• Verbal Ability & Reading Comprehension: 50 Questions (Grammar, Vocabulary, RC, Verbal Logic)
• Total: 200 Questions / 200 Marks (150 Minutes)`
        },
        {
          title: 'Complete Syllabus Breakdown',
          content: `• Logical Reasoning: Seating/Circular/Linear Arrangement, Blood Relations, Puzzle Solving, Coding-Decoding, Syllogisms, Cause/Effect, Input-Output.
• Abstract Reasoning: Figure Series, Pattern Recognition, Mirror Images, Visual Logic.
• Quantitative Aptitude: Arithmetic (Percentages, Profit/Loss, Time/Work, Speed/Distance), Algebra, Geometry, Probability, P&C.
• Verbal Ability: Grammar, Vocabulary, Synonyms/Antonyms, Para Jumbles, Reading Comprehension.`
        },
        {
          title: 'Top MBA CET Colleges & Cutoffs',
          content: `Target Percentiles & Institutions:

• Tier 1: JBIMS Mumbai (99.9+ Percentile), SIMSREE Mumbai (99+ Percentile), PUMBA Pune (95+ Percentile).
• Tier 2 (90+ Percentile): Welingkar Mumbai, SIES Mumbai, Chetana's Institute.
• Tier 3 (80+ Percentile): DY Patil Institutes, Indira Group, MIT-WPU.`
        },
        {
          title: '6-Month Preparation Plan',
          content: `Daily preparation schedule recommended by BK Academy experts:

• Quantitative Aptitude: 2 Hours daily
• Logical Reasoning: 2 Hours daily
• Abstract Reasoning: 1 Hour daily
• Verbal Ability: 1 Hour daily
• Mock Test Analysis: 1 Hour daily`
        },
        {
          title: 'Career & Salary Opportunities',
          content: `Specialization Areas:
• Marketing, Finance, HR, Operations, Business Analytics, IT Management.

Expected Salary Packages:
• Entry Level: ₹4 LPA – ₹8 LPA
• Good MBA Colleges: ₹8 LPA – ₹15 LPA
• Top MBA Colleges: ₹15 LPA – ₹35+ LPA`
        }
      ]
    });

    await mbaData.save();
    console.log('✅ Successfully seeded MBA CET & Management Exams detail data!');

    await mongoose.disconnect();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seed();

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Star, Globe, ChevronDown, CheckCircle, Clock, Ruler, Target, ExternalLink, ArrowRight, BookOpen, Users, Trophy, Shield } from 'lucide-react';
import HomeHero from '../components/HomeHero';
import CourseCard from '../components/CourseCard';
import SkeletonCard from '../components/SkeletonCard';
import StaffCarousel from '../components/StaffCarousel';
import SettingsPanel from '../components/SettingsPanel';
import { STAFF } from '../data/constants';
import { Story } from '../data/stories';

interface HomeProps {
  setView: (view: any) => void;
  setSelectedCategory: (id: number | null) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
  setIsAddStoryModalOpen: (open: boolean) => void;
  dynamicCourses: any[];
  dynamicExams: any[];
  stories: Story[];
  setSelectedExamName: (name: string) => void;
  quickAccessList: any[];
}

const FAQ_DATA = {
  MPSC: [
    { q: "Is Marathi compulsory for MPSC?", a: "Yes, proficiency in Marathi is mandatory. Candidates must have passed Marathi at 10th or 12th standard level." },
    { q: "What are the stages of MPSC Combined Exam?", a: "It consists of a common Preliminary Exam (100 marks) followed by separate Main Exams (400 marks) for different posts like PSI, STI, and ASO." },
    { q: "Are non-Maharashtra residents eligible?", a: "Yes, but they will be considered under the General/Open category regardless of their caste status in other states." }
  ],
  UPSC: [
    { q: "How many attempts are allowed in UPSC?", a: "General category candidates have 6 attempts, OBC have 9, and SC/ST candidates have no attempt limit until the age of 37." },
    { q: "What is the eligibility for UPSC?", a: "A degree from any recognized university is sufficient. Final year students can also apply for the Preliminary examination." },
    { q: "What is the general age limit?", a: "For the General category, it's 21 to 32 years. Relaxations apply for OBC (up to 35) and SC/ST (up to 37)." }
  ],
  SSC: [
    { q: "What is SSC CGL selection process?", a: "The selection typically involves Tier-I (Computer Based Examination), Tier-II (Objective Type), and sometimes Skill Tests/Physical Standards depending on the post." },
    { q: "What are the common posts under SSC?", a: "Common posts include Income Tax Inspector, Central Excise Inspector, Assistant Section Officer, and Auditor." },
    { q: "What is the minimum qualification?", a: "For CGL, a Bachelor's degree is required. For CHSL, 10+2 (Higher Secondary) is the minimum qualification." }
  ],
  BANK: [
    { q: "What is the difference between IBPS PO and Clerk?", a: "PO (Probationary Officer) is a managerial level post with a 2-stage exam + interview, while Clerk is an entry-level post with 2-stage exam and no interview." },
    { q: "How often are banking exams conducted?", a: "Major banking exams like IBPS PO, Clerk, RRB, and SBI PO/Clerk are conducted annually, usually between August and January." },
    { q: "What is the importance of Banking Awareness?", a: "Banking Awareness and General Awareness are crucial for the Mains examination and play a significant role in final selection and interviews." }
  ]
};

export const Home: React.FC<HomeProps> = ({
  setView,
  setSelectedCategory,
  setIsRegistrationModalOpen,
  dynamicCourses,
  setSelectedExamName,
  quickAccessList
}) => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = React.useState<string>('upsc');
  const [heroContent, setHeroContent] = React.useState<any>(null);
  const [faqCategory, setFaqCategory] = React.useState<string>('MPSC');

  React.useEffect(() => {
    fetch('/api/content/hero')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.items.length > 0) {
          setHeroContent(data.items[0]);
        }
      })
      .catch(err => console.error("Hero Fetch Error:", err));
  }, []);

  React.useEffect(() => {
    if (quickAccessList && quickAccessList.length > 0) {
      setSelectedTab(quickAccessList[0].category);
    }
  }, [quickAccessList]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-bg"
    >
      <HomeHero 
        setView={setView} 
        setSelectedCategory={setSelectedCategory} 
        onRegistration={() => setIsRegistrationModalOpen(true)}
        onAdmission={() => navigate('/admission')}
        heroContent={heroContent}
      />

      {/* Stats Section */}
      <section className="pt-4 pb-12 bg-white border-t border-gray-100 relative">
        <div className="section-container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Successful Aspirants', value: '10K+', icon: Users },
              { label: 'Expert Mentors', value: '25+', icon: GraduationCap },
              { label: 'Exam Categories', value: '12+', icon: BookOpen },
              { label: 'Success Rate', value: '95%', icon: Trophy },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                  <stat.icon size={24} />
                </div>
                <h3 className="text-3xl font-display font-black text-dark">{stat.value}</h3>
                <p className="label-text text-[10px] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="pt-12 pb-8 bg-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[120px] rounded-full" />
        <div className="max-w-[1600px] px-6 md:px-12 lg:px-16 mx-auto relative z-10">
          <header className="mb-8 text-center max-w-3xl mx-auto">
            <p className="text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-4">Our Curriculum</p>
            <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none mb-4">
              Popular <span className="text-primary">Learning Paths</span>
            </h2>
            <p className="text-gray-400 font-medium text-sm md:text-base">
              Structured for success, our courses are designed by experts who have been through the journey themselves. Choose your goal and start today.
            </p>
          </header>

          <div className="flex flex-wrap justify-center gap-3 md:gap-6 px-2 md:px-0">
            {!dynamicCourses || dynamicCourses.length === 0 ? (
              /* Skeleton Loading State */
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="w-[calc(50%-0.375rem)] md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.5rem)] max-w-[360px]">
                  <SkeletonCard className="h-full bg-white/5 border-white/10" />
                </div>
              ))
            ) : (
              /* Actual Dynamic Courses */
              [...dynamicCourses, {
                id: 'fallback-banking',
                title: 'Banking & Financial Services',
                category: 'Banking (IBPS/SBI)',
                instructor: 'BK Expert Team',
                image: '/home/card4.png',
                isRecent: true,
                isFallback: true
              }].slice(0, 4).map((course, index) => (
                <div key={course._id || course.id} className="w-[calc(50%-0.375rem)] md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.5rem)] max-w-[360px]">
                  <CourseCard 
                    course={course} 
                    index={index} 
                    onClick={() => {
                      if (course.isFallback) {
                        setView('courseDetailBANKING');
                        return;
                      }
                      const title = (course.title || "").toLowerCase();
                      if (course.id === 100 || title.includes('police')) {
                        setView('courseDetailPolice');
                      } else if (title.includes('mpsc')) {
                        setView('courseDetailMPSC');
                      } else if (title.includes('tet') || title.includes('teaching')) {
                        setView('courseDetailMAHATET');
                      } else if (course._id) {
                        setSelectedExamName(course.subCategory || course.title);
                        setView('dynamicExamDetail');
                      } else {
                        setSelectedCategory(course.id);
                        setView('courses');
                      }
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                </div>
              ))
            )}
          </div>

          <div className="mt-10 text-center">
            <button 
              onClick={() => setView('courses')}
              className="btn-outline-new px-10 py-4 text-white border-primary/40 hover:text-primary hover:border-primary"
            >
              View All Programs
            </button>
          </div>
        </div>
      </section>

      {/* Strategic Insights Section - Senior UI/UX Implementation */}
      <section className="py-16 bg-[#F9F9F9] relative overflow-hidden">
        <div className="max-w-[1600px] px-6 md:px-12 lg:px-16 mx-auto relative z-10">
          <div className="flex flex-col items-center text-center gap-8 mb-10">
            <div className="max-w-3xl">
              <p className="text-[#FFB800] font-black text-[10px] uppercase tracking-[0.2em] mb-4">Strategic Guidance</p>
              <h2 className="text-4xl md:text-5xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter leading-none mb-6">
                Strategic <span className="text-[#FFB800]">Insights</span>
              </h2>
              <p className="text-gray-500 font-medium text-sm md:text-base max-w-2xl mx-auto">
                Navigate the complexities of competitive examinations with our curated roadmap and eligibility frameworks.
              </p>
            </div>
            
            {/* Pill-Shaped Segmented Control */}
            <div className="inline-flex flex-wrap justify-center bg-white p-1.5 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden gap-1">
              {[
                { id: 'upsc', title: 'UPSC (IAS, IPS, IFS)' },
                { id: 'mpsc', title: 'MPSC (MAHARASHTRA SERVICES)' },
                { id: 'banking', title: 'BANKING (IBPS, SBI, RBI)' },
                { id: 'tet', title: 'TEACHING & EDUCATION' },
                { id: 'mbacet', title: 'MBA CET & MANAGEMENT' },
                { id: 'police', title: 'POLICE BHARTI 2026' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`px-6 py-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 relative z-10 ${
                    selectedTab === tab.id ? 'text-[#FFB800]' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {selectedTab === tab.id && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-[#1A1A1A] rounded-full -z-10 shadow-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {tab.title}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-6xl mx-auto"
            >
              <div className="bg-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-50 relative">
                {/* Card Header */}
                <div className="p-8 md:p-12 border-b border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div className="flex items-center gap-8">
                    <div className="w-20 h-20 bg-[#1A1A1A] rounded-2xl flex items-center justify-center text-[#FFB800] shadow-xl">
                      <Shield size={36} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-5xl font-display font-black text-[#1A1A1A] uppercase tracking-tighter leading-none mb-4">
                        {selectedTab === 'upsc' ? 'UPSC (IAS, IPS, IFS)' : 
                         selectedTab === 'mpsc' ? 'MPSC (MAHARASHTRA SERVICES)' : 
                         selectedTab === 'banking' ? 'BANKING & FINANCIAL SERVICES' :
                         selectedTab === 'tet' ? 'MAHA TET / CTET 2026' : 
                         selectedTab === 'mbacet' ? 'MBA CET & MANAGEMENT EXAMS' : 'POLICE BHARTI 2026'}
                      </h3>
                      <div className="flex items-center flex-wrap gap-4">
                        <span className="px-4 py-1.5 bg-[#FFF9E6] rounded-lg text-[10px] font-black text-[#FFB800] uppercase tracking-widest">
                          {selectedTab === 'upsc' ? 'Civil Services Examination' : 
                           selectedTab === 'mpsc' ? 'Group B & C Services' : 
                           selectedTab === 'banking' ? 'IBPS, SBI & RBI Examinations' :
                           selectedTab === 'tet' ? 'Teacher Eligibility' : 
                           selectedTab === 'mbacet' ? 'Management Entrance' : 'HSC Level Recruitment'}
                        </span>
                        <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Strategic Roadmap 2026</span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      if (selectedTab === 'upsc') setView('courseDetailUPSC');
                      else if (selectedTab === 'mpsc') setView('courseDetailMPSC');
                      else if (selectedTab === 'banking') setView('courseDetailBANKING');
                      else if (selectedTab === 'police') setView('courseDetailPolice');
                      else if (selectedTab === 'tet') setView('courseDetailMAHATET');
                      else if (selectedTab === 'mbacet') {
                        setSelectedExamName('MBA CET & Management Exams');
                        setView('dynamicExamDetail');
                      }
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group flex items-center gap-4 px-8 py-4 bg-[#1A1A1A] text-[#FFB800] rounded-xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#FFB800] hover:text-[#1A1A1A] transition-all duration-500 shadow-xl"
                  >
                    Deep Explanation 
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
                  </button>
                </div>
                
                {/* Card Content - Two Column Grid */}
                <div className="p-8 md:p-12 lg:p-16 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 relative">
                  {/* Subtle Vertical Divider */}
                  <div className="hidden md:block absolute left-1/2 top-16 bottom-16 w-px bg-gray-100 -translate-x-1/2" />
                  
                  {/* Eligibility Column */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-[#FFF9E6] flex items-center justify-center text-[#FFB800]">
                        <CheckCircle size={24} strokeWidth={2.5} />
                      </div>
                      <h4 className="text-xl font-display font-black text-[#1A1A1A] uppercase tracking-tight">Eligibility (पात्रता)</h4>
                    </div>
                    <ul className="space-y-5">
                      {(selectedTab === 'upsc' ? [
                        "Any Graduate Degree from recognized University",
                        "Age: 21 - 32 Years (General Category)",
                        "Attempts: 6 (Gen), 9 (OBC), Unlimited (SC/ST)",
                        "Final year students are eligible for Prelims"
                      ] : selectedTab === 'mpsc' ? [
                        "Graduate (कोणतीही पदवी)",
                        "Age: 19 - 31 (PSI), 19 - 38 (Others)",
                        "Height (PSI): 165cm (M), 157cm (F)",
                        "Proficiency in Marathi language is mandatory"
                      ] : selectedTab === 'banking' ? [
                        "Any Graduate Degree from recognized University",
                        "Age: 20 - 30 (PO), 20 - 28 (Clerk) for General",
                        "IBPS, SBI, RRB & RBI specific eligibility criteria",
                        "Final year students eligible subject to notification"
                      ] : selectedTab === 'tet' ? [
                        "Paper I: D.T.Ed / D.Ed (Primary)",
                        "Paper II: Graduation + B.Ed (Upper Primary)",
                        "Valid for Life-time Certification",
                        "Qualifying: 60% for General Candidates"
                      ] : selectedTab === 'mbacet' ? [
                        "Any Graduate Degree (Min 50% Gen, 45% Reserved)",
                        "Age Limit: No upper age limit",
                        "Attempts: Unlimited attempts allowed",
                        "Final year appearing candidates are eligible"
                      ] : [
                        "12th Pass (HSC) in any stream",
                        "Age: 18 - 28 Years (General)",
                        "Height: 165cm (M), 155cm (F)",
                        "Chest: 79cm (Expanded +5cm) for Male"
                      ]).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-gray-500 font-bold text-sm md:text-base leading-relaxed group">
                          <div className="w-1.5 h-1.5 bg-[#FFB800] rounded-full mt-2.5 shrink-0 group-hover:scale-150 transition-transform" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exam Pattern Column */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-[#FFF9E6] flex items-center justify-center text-[#FFB800]">
                        <Target size={24} strokeWidth={2.5} />
                      </div>
                      <h4 className="text-xl font-display font-black text-[#1A1A1A] uppercase tracking-tight">Exam Pattern (स्वरूप)</h4>
                    </div>
                    <ul className="space-y-5">
                      {(selectedTab === 'upsc' ? [
                        "Stage 1: Preliminary Exam (400 Marks)",
                        "Stage 2: Main Examination (1750 Marks)",
                        "Stage 3: Personality Test (275 Marks)",
                        "Negative Marking: 1/3rd (0.33) per wrong answer"
                      ] : selectedTab === 'mpsc' ? [
                        "Prelims: 100 Marks (Objective)",
                        "Mains: 400 Marks (Descriptive Pattern)",
                        "Physical Test & Interview (Only for PSI post)",
                        "Common Combined Prelims for Group B & C"
                      ] : selectedTab === 'banking' ? [
                        "Prelims: 100 Marks (English, Quant, Reasoning)",
                        "Mains: Objective + Descriptive (PO exams)",
                        "Interview: 100 Marks (Only for Officer Cadre)",
                        "Sectional Timing and Sectional Cut-offs apply"
                      ] : selectedTab === 'tet' ? [
                        "Total Marks: 150 (Objective Type)",
                        "Duration: 150 Minutes (2.5 Hours)",
                        "No Negative Marking for any paper",
                        "Paper I & II conducted in separate sessions"
                      ] : selectedTab === 'mbacet' ? [
                        "Total Marks: 200 Marks (Objective Type)",
                        "Duration: 150 Minutes (2.5 Hours)",
                        "No Negative Marking for wrong answers",
                        "Sections: Logical, Abstract, Quant, Verbal"
                      ] : [
                        "Physical Ground Test (50 Marks)",
                        "Written Examination (100 Marks)",
                        "Subjects: Maths, Marathi, GK, Reasoning",
                        "Total selection merit based on Combined Score"
                      ]).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-gray-500 font-bold text-sm md:text-base leading-relaxed group">
                          <div className="w-1.5 h-1.5 bg-[#FFB800] rounded-full mt-2.5 shrink-0 group-hover:scale-150 transition-transform" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Signature Footer Gradient */}
                <div className="h-[6px] w-full bg-gradient-to-r from-[#FFB800] via-[#1A1A1A] to-[#FFB800]" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Staff Section */}
      <section id="faculty-section" className="pt-8 pb-6 bg-dark w-full overflow-hidden relative">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[120px] rounded-full" />
        <div className="max-w-[1600px] mx-auto relative z-10">
          <header className="mb-4 text-center px-6">
            <p className="text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-4">Our Faculty</p>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none mb-4 relative inline-block">
              <span className="absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-px bg-white/20 hidden md:block"></span>
              Meet Our <span className="text-primary">Expert Mentors</span>
              <span className="absolute -right-12 top-1/2 -translate-y-1/2 w-8 h-px bg-white/20 hidden md:block"></span>
            </h2>
            <p className="text-white/60 font-medium text-sm md:text-base max-w-2xl mx-auto">
              Learn from the best. Our faculty includes former officers and industry veterans with years of experience.
            </p>
          </header>
          <div className="mt-2">
            <StaffCarousel staff={STAFF} />
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="pt-12 pb-4 md:pb-6 bg-white relative">
        <div className="max-w-[1600px] px-6 md:px-12 lg:px-16 mx-auto">
          <header className="mb-0 text-center max-w-3xl mx-auto">
            <p className="label-text mb-1">Learning Hub</p>
            <h2 className="section-heading">
              Important <span className="text-primary">Resources</span>
            </h2>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              { name: "THE HINDU", url: "https://www.thehindu.com", img: "/images/resources/the-hindu-new.webp" },
              { name: "PIB INDIA", url: "https://pib.gov.in", img: "/images/resources/press-information-bureau.webp" },
              { name: "THE INDIAN EXPRESS", url: "https://indianexpress.com", img: "/images/resources/the-indian-express.webp" },
              { name: "LOKSATTA", url: "https://www.loksatta.com", img: "/images/resources/loksatta.png" },
              { name: "UPSC", url: "https://www.upsc.gov.in", img: "/images/resources/upscs.jpeg" },
              { name: "MPSC", url: "https://mpsc.gov.in", img: "/images/resources/mpsc-logo.webp" },
              { name: "SSC", url: "https://ssc.nic.in", img: "/images/resources/ssc-resc-logo.webp" },
              { name: "RBI", url: "https://www.rbi.org.in", img: "/images/resources/download.jpg" },
              { name: "INDIAN RAILWAYS", url: "https://indianrailways.gov.in", img: "/images/resources/railways-logo.webp" },
              { name: "MAHARASHTRA TIMES", url: "https://maharashtratimes.com", img: "/images/resources/maharashtra-times.webp" },
              { name: "MY GOV", url: "https://www.mygov.in", img: "/images/resources/my-gov.webp" },
              { name: "AAPLE SARKAR", url: "https://aaplesarkar.mahaonline.gov.in", img: "/images/resources/aaple-sarkar.webp" },
            ].map((res, i) => (
              <a 
                key={res.name}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 aspect-square border border-gray-100"
              >
                <div className="h-20 w-full flex items-center justify-center mb-4">
                  <img 
                    src={res.img} 
                    alt={res.name}
                    className="max-w-[85%] max-h-full object-contain transition-all duration-500 group-hover:scale-110 filter brightness-100 contrast-100"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80?text=' + res.name;
                    }}
                  />
                </div>
                <div>
                  <span className="text-[10px] font-black text-dark/80 uppercase tracking-[0.15em] leading-tight block px-2">{res.name}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* App Promotion Section */}
      <section className="pt-8 md:pt-10 pb-6 md:pb-8 bg-gradient-to-br from-[#FCF9F2] via-[#FAF6EE] to-white relative overflow-hidden border-none">
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#E12C2C]/5 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-[#FFB800]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="section-container relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 max-w-xl mx-auto lg:mx-0 lg:col-span-6 xl:col-span-5">
              <div className="inline-flex px-4 py-1.5 bg-[#E12C2C] rounded-full shadow-[0_4px_12px_rgba(225,44,44,0.15)]">
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">BK CAREER ACADEMY APP</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl lg:text-[4.5rem] font-display font-black text-[#1A1A1A] leading-[0.95] tracking-tight uppercase">
                BEST EXAM PREP <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E12C2C] to-[#FF4D4D]">APP FOR</span>
              </h2>

              {/* Interactive Pills */}
              <div className="flex flex-wrap gap-2.5">
                {[
                  { name: 'UPSC', view: 'courseDetailUPSC' },
                  { name: 'MPSC', view: 'courseDetailMPSC' },
                  { name: 'SSC', view: 'courses' },
                  { name: 'Banking', view: 'courseDetailBANKING' },
                  { name: 'Police', view: 'courseDetailPolice' }
                ].map((pill) => (
                  <button 
                    key={pill.name}
                    onClick={() => {
                      setView(pill.view);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 bg-white rounded-full text-xs font-black text-gray-900 uppercase tracking-wider shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-gray-100/50 hover:bg-[#E12C2C] hover:text-white hover:border-[#E12C2C] hover:shadow-[0_6px_20px_rgba(225,44,44,0.2)] transition-all duration-300 cursor-pointer animate-none"
                  >
                    {pill.name}
                  </button>
                ))}
              </div>

              <p className="text-gray-600 font-bold text-sm md:text-base leading-relaxed">
                Download the BK Career Academy App & enhance your exam preparation anytime, anywhere! Get access to live and recorded lectures on your fingertips.
              </p>

              {/* Interactive Dual CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => {
                    setView('courses');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#E12C2C] to-[#FF4D4D] text-white rounded-2xl transition-all duration-300 shadow-[0_12px_24px_rgba(225,44,44,0.2)] hover:shadow-[0_16px_32px_rgba(225,44,44,0.35)] hover:-translate-y-0.5 group border border-red-500/20 font-black tracking-wider text-xs uppercase cursor-pointer"
                >
                  Explore All Courses
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <a 
                  href="https://play.google.com/store/apps/details?id=co.lazarus.qzrty&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 px-6 py-4 bg-[#111111] hover:bg-[#222222] text-white rounded-2xl transition-all duration-300 shadow-[0_12px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 group border border-white/5"
                >
                  <div className="w-7 h-7 bg-gradient-to-tr from-[#28509e] via-[#5b95f9] to-[#80c8ff] rounded-lg flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform shadow-inner">
                    <svg viewBox="0 0 24 24" fill="white" className="w-full h-full filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
                      <path d="M5 2.5v19l15-9.5-15-9.5z" />
                    </svg>
                  </div>
                  <div className="text-left leading-none">
                    <span className="block text-[6px] font-bold text-gray-400 group-hover:text-gray-300 uppercase tracking-[0.2em] mb-0.5">GET IT ON</span>
                    <span className="block text-sm font-display font-black uppercase tracking-tight text-white">Play Store</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="relative flex justify-center items-center lg:col-span-6 xl:col-span-7 h-[650px] w-full mt-12 lg:mt-0 select-none">
              {/* --- BACKGROUND FLOATING IMAGE PANELS --- */}
              
              {/* 1. Classic Administrative University Building (Top-Left) */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="hidden lg:block absolute top-[6%] left-[2%] md:left-[8%] lg:left-[10%] xl:left-[12%] w-[170px] md:w-[220px] aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.12)] border-4 border-white z-10 -rotate-6 hover:rotate-0 hover:scale-110 hover:z-30 transition-all duration-500 cursor-pointer"
              >
                <img 
                  src="/app-promo/admin_university.png" 
                  alt="University Administrative Building" 
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[8px] font-black text-white uppercase tracking-widest">Institutions</span>
                </div>
              </motion.div>

              {/* 2. Motivated Indian Students (Top-Right) */}
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="hidden lg:block absolute top-[2%] right-[2%] md:right-[8%] lg:right-[10%] xl:right-[12%] w-[180px] md:w-[230px] aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.12)] border-4 border-white z-10 rotate-3 hover:rotate-0 hover:scale-110 hover:z-30 transition-all duration-500 cursor-pointer"
              >
                <img 
                  src="/app-promo/motivated_students.png" 
                  alt="Motivated Indian Students" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[8px] font-black text-white uppercase tracking-widest">Aspirants</span>
                </div>
              </motion.div>

              {/* 3. Police Marching in Khaki Uniforms (Bottom-Left) */}
              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="hidden lg:block absolute bottom-[10%] left-[0%] md:left-[5%] lg:left-[7%] xl:left-[9%] w-[180px] md:w-[230px] aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.12)] border-4 border-white z-20 rotate-6 hover:rotate-0 hover:scale-110 hover:z-30 transition-all duration-500 cursor-pointer"
              >
                <img 
                  src="/app-promo/police_marching.png" 
                  alt="Indian Police Marching" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[8px] font-black text-white uppercase tracking-widest">Public Service</span>
                </div>
              </motion.div>

              {/* 4. Colorful Map of India (Bottom-Right) */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                className="hidden lg:block absolute bottom-[8%] right-[0%] md:right-[5%] lg:right-[7%] xl:right-[9%] w-[170px] md:w-[220px] aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.12)] border-4 border-white z-20 -rotate-3 hover:rotate-0 hover:scale-110 hover:z-30 transition-all duration-500 cursor-pointer"
              >
                <img 
                  src="/app-promo/india_map.png" 
                  alt="Map of India" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[8px] font-black text-white uppercase tracking-widest">National Level</span>
                </div>
              </motion.div>

              {/* --- VERTICAL SMARTPHONE MOCKUP --- */}      {/* --- VERTICAL SMARTPHONE MOCKUP --- */}
              <div className="relative z-25 w-[290px] md:w-[320px] aspect-[9/18.5] bg-[#111111] rounded-[50px] p-[10px] shadow-[0_32px_64px_rgba(0,0,0,0.22)] border-[10px] border-[#1A1A1A] flex flex-col overflow-hidden hover:scale-[1.02] transition-transform duration-500">
                {/* Dynamic Island / Notch */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-45 flex items-center justify-between px-3">
                  <div className="w-1.5 h-1.5 bg-[#111] rounded-full" />
                  <div className="w-8 h-1 bg-[#111] rounded-full" />
                </div>

                {/* Inner Screen */}
                <div className="flex-1 w-full bg-[#0F0F10] rounded-[38px] overflow-hidden flex flex-col relative select-none border border-white/5">
                  
                  {/* Status Bar */}
                  <div className="h-8 w-full flex items-center justify-between px-6 pt-2 z-40 text-white/80">
                    <span className="text-[9px] font-bold">12:00</span>
                    <div className="flex items-center gap-1.5">
                      {/* Signal */}
                      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3c-1.2 0-2.4.2-3.6.7L18.7 14c.5-1.2.7-2.4.7-3.6 0-4-3.3-7.4-7.4-7.4zM3.4 18.7C4.6 19.5 6 20 7.4 20h9.2L3.7 7.4C3.2 8.6 3 10 3 11.4c0 4 3.3 7.3 7.4 7.3z" />
                      </svg>
                      {/* Wifi */}
                      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21l-12-12c2.5-2.5 6-4 9.5-4s7 1.5 9.5 4l-12 12zm0-16.5c-2.8 0-5.5 1.1-7.5 3l7.5 7.5 7.5-7.5c-2-1.9-4.7-3-7.5-3z" />
                      </svg>
                      {/* Battery */}
                      <div className="w-4 h-2.5 border border-white/60 rounded-[3px] p-[1px] flex items-center">
                        <div className="h-full w-full bg-white rounded-[1px]" />
                      </div>
                    </div>
                  </div>

                  {/* App Screen Content */}
                  <div className="flex-1 overflow-y-auto no-scrollbar pb-6 flex flex-col">
                    
                    {/* Top Parliament Banner */}
                    <div className="relative w-full h-[155px] overflow-hidden">
                      <img 
                        src="/app-promo/indian_parliament.png" 
                        alt="Indian Parliament" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-[#0F0F10]" />
                    </div>

                    {/* App Brand Header */}
                    <div className="text-center px-4 py-3 z-10 -mt-2">
                      <h3 className="text-xs font-black tracking-tight text-[#FFD700] mb-0.5 font-display uppercase leading-tight">
                        <span className="text-[#FFC72C] opacity-100 font-extrabold">भारतातील परीक्षांसाठी</span> <span className="text-[#E12C2C]">BK Career</span>
                      </h3>
                      <p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">
                        शुरुवातीपासून शिखरापर्यंत
                      </p>
                    </div>

                    {/* Grid of Exam Category Cards */}
                    <div className="grid grid-cols-2 gap-2.5 px-4.5 mt-2">
                      
                      {/* 1. UPSC Card */}
                      <button 
                        onClick={() => {
                          setView('courseDetailUPSC');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-white p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100/10 hover:scale-[1.05] hover:bg-red-50/50 hover:border-red-100/30 transition-all duration-300 cursor-pointer"
                      >
                        <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center text-[#E12C2C] mb-1.5 shadow-sm">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                            <line x1="4" y1="20" x2="20" y2="20" />
                            <line x1="6" y1="20" x2="6" y2="9" />
                            <line x1="18" y1="20" x2="18" y2="9" />
                            <line x1="10" y1="20" x2="10" y2="9" />
                            <line x1="14" y1="20" x2="14" y2="9" />
                            <path d="M5 9h14M3 9l9-5 9 5" />
                          </svg>
                        </div>
                        <span className="text-[9px] font-black text-gray-900 uppercase tracking-widest">UPSC</span>
                      </button>

                      {/* 2. MPSC Card */}
                      <button 
                        onClick={() => {
                          setView('courseDetailMPSC');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-white p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100/10 hover:scale-[1.05] hover:bg-blue-50/50 hover:border-blue-100/30 transition-all duration-300 cursor-pointer"
                      >
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-1.5 shadow-sm">
                          {/* Solid Blue Maharashtra Geometric Map without any stars */}
                          <svg viewBox="0 0 100 100" fill="currentColor" className="w-7 h-7 text-blue-600">
                            <polygon points="20,42 32,32 50,34 68,26 88,32 84,54 74,64 56,72 42,64 28,58 22,48" />
                          </svg>
                        </div>
                        <span className="text-[9px] font-black text-gray-900 uppercase tracking-widest">MPSC</span>
                      </button>

                      {/* 3. DEFENSE Card */}
                      <button 
                        onClick={() => {
                          setView('courseDetailPolice');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-white p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100/10 hover:scale-[1.05] hover:bg-amber-50/50 hover:border-amber-100/30 transition-all duration-300 cursor-pointer"
                      >
                        <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 mb-1.5 shadow-sm">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l6 6M15 9l-6 6" />
                          </svg>
                        </div>
                        <span className="text-[9px] font-black text-gray-900 uppercase tracking-widest">DEFENSE</span>
                      </button>

                      {/* 4. GOVT EXAMS Card */}
                      <button 
                        onClick={() => {
                          setView('courses');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-white p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100/10 hover:scale-[1.05] hover:bg-emerald-50/50 hover:border-emerald-100/30 transition-all duration-300 cursor-pointer"
                      >
                        <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 mb-1.5 shadow-sm">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20M4 19.5v-13A2.5 2.5 0 016.5 4H20v13H6.5" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 6h6v4h-6zM14 4v8" />
                          </svg>
                        </div>
                        <span className="text-[9px] font-black text-gray-900 uppercase tracking-widest">GOVT EXAMS</span>
                      </button>
                    </div>

                    {/* Mini App Play Store Button */}
                    <div className="px-5 mt-auto pt-6 pb-2 flex justify-center w-full">
                      <a 
                        href="https://play.google.com/store/apps/details?id=co.lazarus.qzrty&pcampaignid=web_share"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full max-w-[210px] inline-flex items-center justify-center gap-3.5 px-4.5 py-3 bg-[#111111] rounded-xl border border-white/10 shadow-xl hover:scale-[1.05] hover:bg-[#222222] transition-all duration-300"
                      >
                        <div className="w-5.5 h-5.5 bg-gradient-to-tr from-[#28509e] via-[#5b95f9] to-[#80c8ff] rounded-lg flex items-center justify-center p-1 shadow-inner">
                          <svg viewBox="0 0 24 24" fill="white" className="w-full h-full filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
                            <path d="M5 2.5v19l15-9.5-15-9.5z" />
                          </svg>
                        </div>
                        <div className="text-left leading-none">
                          <span className="block text-[6px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-0.5">GET IT ON</span>
                          <span className="block text-[11px] font-display font-black uppercase text-white tracking-wide">Play Store</span>
                        </div>
                      </a>
                    </div>
                    
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* System Preferences / Settings Panel */}
      <section className="py-12 bg-bg border-t border-gray-100 dark:border-white/5">
        <div className="section-container max-w-4xl">
          <SettingsPanel />
        </div>
      </section>

      {/* FAQ */}
      <section className="pt-6 pb-8 md:pb-12 bg-bg">
        <div className="section-container max-w-4xl">
          <header className="mb-0 text-center">
            <h2 className="section-heading">
              Common <span className="text-primary">Queries</span>
            </h2>
            
            <div className="flex flex-wrap justify-center gap-2 mt-8">
               {['MPSC', 'UPSC', 'SSC', 'BANK'].map(cat => (
                 <button 
                  key={cat}
                  onClick={() => setFaqCategory(cat)}
                  className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${faqCategory === cat ? 'bg-dark text-primary shadow-lg' : 'bg-white text-dark border border-gray-100 hover:bg-gray-50'}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
          </header>

          <div className="space-y-4">
             {FAQ_DATA[faqCategory as keyof typeof FAQ_DATA]?.map((faq, i) => (
               <FAQItem key={i + faqCategory} question={faq.q} answer={faq.a} />
             ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between text-left"
      >
        <span className="text-sm font-bold text-dark uppercase tracking-wide">
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center transition-transform ${isOpen ? 'rotate-180 bg-primary text-dark' : 'text-muted'}`}>
           <ChevronDown size={18} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 text-sm text-body leading-relaxed border-t border-gray-50 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;

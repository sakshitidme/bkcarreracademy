import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  UserPlus, 
  Scale, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Ruler, 
  Target,
  Users,
  Globe,
  ArrowRight,
  ChevronRight,
  Trophy,
  BookOpen,
  HelpCircle,
  GraduationCap
} from 'lucide-react';

const MES_STUDENTS = [
  { name: "SARTHAK SRIKANTH RAO", photo: "/Successful student pho/MES/1.jpeg", post: "MES" },
  { name: "SHIVARAJ", photo: "/Successful student pho/MES/44.jpeg", post: "MES" },
  { name: "GANESHA R", photo: "/Successful student pho/MES/5.jpeg", post: "MES" },
  { name: "NAVANEETHA P", photo: "/Successful student pho/MES/55.jpeg", post: "MES" },
  { name: "JHALAK RAJDEV", photo: "/Successful student pho/MES/6.jpeg", post: "MES" },
  { name: "SACHIN", photo: "/Successful student pho/MES/77.jpeg", post: "MES" },
  { name: "HARJIT SINGH", photo: "/Successful student pho/MES/8.jpeg", post: "MES" },
  { name: "PARVEEN GUDWAL", photo: "/Successful student pho/MES/88.jpeg", post: "MES" }
];

interface MaharashtraEngineeringDetailsPageProps {
  onBack: () => void;
  onRegister: () => void;
  setView: (view: any) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
}

export const MaharashtraEngineeringDetailsPage: React.FC<MaharashtraEngineeringDetailsPageProps> = ({
  onBack,
  onRegister,
  setView,
  setIsRegistrationModalOpen
}) => {
  const navigate = useNavigate();
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-bg min-h-screen"
    >
      {/* Premium Navbar */}
      <nav className="fixed top-12 left-0 md:left-64 right-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-gray-100 h-20 pl-16 md:pl-0">
        <div className="section-container h-full flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setView('home')}
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-dark group-hover:scale-110 transition-transform">
              <ShieldCheck size={20} />
            </div>
            <div>
              <span className="text-xl font-display font-black text-dark block leading-none">अभियांत्रिकी सेवा</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Maharashtra Engineering Services</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a 
              href="https://mpsc.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors flex items-center gap-2"
            >
              <Globe size={14} /> MPSC Official Portal
            </a>
            <a 
              href="https://play.google.com/store/apps/details?id=co.lazarus.nqvxi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#111111] text-white rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-primary hover:text-dark transition-all flex items-center gap-2 border border-white/10"
            >
              Get MES Course on App
            </a>
            <button 
              onClick={() => setIsRegistrationModalOpen(true)}
              className="btn-primary-new px-6 py-2.5 text-[10px]"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-0 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-[-20deg] origin-top translate-x-20" />
        <div className="section-container relative z-10">
          {/* ─── PREMIUM DYNAMIC SUCCESS STORIES MARQUEE BAR (BREAKOUT TO FULL WIDTH) ─── */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-screen relative left-1/2 right-1/2 -translate-x-1/2 z-30 group mt-2 mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFC72C]/0 via-[#FFC72C]/10 to-[#FFC72C]/0 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="w-full bg-[#0a0a0a]/90 backdrop-blur-xl border-y border-[#FFC72C]/30 py-2.5 px-6 shadow-[0_15px_40px_rgba(255,199,44,0.15)] relative overflow-hidden flex flex-col gap-2">
              <div className="flex items-center justify-center gap-3 z-10 px-4">
                <div className="h-[1px] bg-gradient-to-r from-transparent to-[#FFC72C]/20 flex-grow max-w-[150px]" />
                <div className="flex items-center gap-2">
                  <GraduationCap className="text-[#FFC72C] w-4 h-4" />
                  <span className="text-[#FFC72C] font-display font-bold text-[10px] md:text-xs uppercase tracking-[0.25em]">
                    Our Successful MES Candidates
                  </span>
                </div>
                <div className="h-[1px] bg-gradient-to-l from-transparent to-[#FFC72C]/20 flex-grow max-w-[150px]" />
              </div>
              
              <div className="w-full overflow-hidden relative z-10 px-4">
                <div 
                  className="flex gap-8 whitespace-nowrap cursor-pointer"
                  onClick={() => setIsMarqueePaused(true)}
                  onMouseLeave={() => setIsMarqueePaused(false)}
                  style={{
                    animation: 'marquee-scroll 10s linear infinite',
                    animationPlayState: isMarqueePaused ? 'paused' : 'running',
                    width: 'max-content'
                  }}
                >
                  {/* Copy 1 */}
                  {MES_STUDENTS.map((student, idx) => (
                    <div 
                      key={`s1-${idx}`} 
                      className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-[#FFC72C]/50 px-5 py-2.5 rounded-2xl backdrop-blur-sm transition-all duration-300"
                    >
                      <div className="w-24 h-30 rounded-lg overflow-hidden border border-[#FFC72C]/40 shrink-0 shadow-md">
                        <img 
                          src={student.photo} 
                          alt={student.name} 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/bk.png';
                          }}
                        />
                      </div>
                      <div className="flex flex-col text-left gap-1">
                        <span className="text-white text-sm md:text-base font-extrabold tracking-wide">{student.name}</span>
                        <span className="text-[#FFC72C] text-xs font-black uppercase tracking-wider">{student.post}</span>
                      </div>
                    </div>
                  ))}
                  {/* Copy 2 */}
                  {MES_STUDENTS.map((student, idx) => (
                    <div 
                      key={`s2-${idx}`} 
                      className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-[#FFC72C]/50 px-5 py-2.5 rounded-2xl backdrop-blur-sm transition-all duration-300"
                    >
                      <div className="w-24 h-30 rounded-lg overflow-hidden border border-[#FFC72C]/40 shrink-0 shadow-md">
                        <img 
                          src={student.photo} 
                          alt={student.name} 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/bk.png';
                          }}
                        />
                      </div>
                      <div className="flex flex-col text-left gap-1">
                        <span className="text-white text-sm md:text-base font-extrabold tracking-wide">{student.name}</span>
                        <span className="text-[#FFC72C] text-xs font-black uppercase tracking-wider">{student.post}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-muted mb-4 hover:text-primary transition-colors"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Return to Courses</span>
          </button>
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-black text-dark leading-tight mb-4">
              Maharashtra <span className="text-primary text-glow">Engineering</span> <br />Services (MES) 2026
            </h1>
            <p className="text-xl text-body font-body leading-relaxed max-w-3xl">
              Become a Class-1 or Class-2 Gazetted Officer under the Maharashtra Government. Complete preparation for Civil, Mechanical, and Electrical engineering cadres.
            </p>
          </div>
        </div>
      </header>

      <main className="py-0">
        <div className="section-container space-y-12">
          
          {/* SECTION 1: DATES & VACANCIES */}
          <section className="scroll-mt-32 pt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Exam Dates Card */}
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all">
                <h3 className="text-xl font-display font-black text-dark uppercase mb-6 flex items-center gap-2 border-b-2 border-primary/20 pb-4">
                  <Calendar size={20} className="text-primary" /> Exam Timeline (2026)
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-xs text-muted uppercase font-bold">Notification Release</span>
                    <span className="text-sm font-black text-dark">March 2026</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-xs text-muted uppercase font-bold">Application Start</span>
                    <span className="text-sm font-black text-dark">16 March 2026</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-xs text-muted uppercase font-bold">Last Date to Apply</span>
                    <span className="text-sm font-black text-dark">30 March 2026</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs text-muted uppercase font-bold">Mains Examination</span>
                    <span className="text-sm font-black text-dark">16 May 2026</span>
                  </div>
                </div>
              </div>

              {/* Vacancy Card */}
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all">
                <h3 className="text-xl font-display font-black text-dark uppercase mb-6 flex items-center gap-2 border-b-2 border-primary/20 pb-4">
                  <Trophy size={20} className="text-primary" /> Vacancies & Posts
                </h3>
                <div className="space-y-4">
                  <div className="bg-primary/10 rounded-2xl p-4 text-center">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">Total Notified Vacancies</span>
                    <span className="text-4xl font-display font-black text-dark">296+</span>
                    <span className="text-[10px] text-muted font-bold block mt-1">(Civil Engineering Posts)</span>
                  </div>
                  <p className="text-xs text-body leading-relaxed">
                    Recruitment is done for key engineering positions including <strong>Assistant Executive Engineer (Group A)</strong>, <strong>Assistant Engineer Grade-I</strong>, <strong>Assistant Engineer Grade-II</strong>, and <strong>Deputy Engineer</strong> within PWD, WRD, and other government departments.
                  </p>
                </div>
              </div>

              {/* Eligibility Card */}
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all">
                <h3 className="text-xl font-display font-black text-dark uppercase mb-6 flex items-center gap-2 border-b-2 border-primary/20 pb-4">
                  <GraduationCap size={20} className="text-primary" /> Eligibility
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest block mb-1">Qualification</span>
                    <span className="text-sm font-black text-dark">B.E. / B.Tech Degree in Civil, Mechanical, or Electrical engineering.</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest block mb-1">Age Limits</span>
                    <div className="flex justify-between items-center py-1 border-b border-gray-50 text-xs font-bold text-body">
                      <span>Open Category</span>
                      <span>19 – 38 Years</span>
                    </div>
                    <div className="flex justify-between items-center py-1 text-xs font-bold text-body">
                      <span>Reserved</span>
                      <span>As per MPSC Rules</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION: MPSC OFFICIAL LINKS */}
          <section className="scroll-mt-32">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-[1px] bg-gray-200"></div>
                  <h3 className="text-xs font-black text-muted uppercase tracking-[0.2em]">MPSC Official Links</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'MPSC Notifications / Advertisements', url: 'https://mpsc.gov.in/adv_notification/8' },
                    { title: 'Syllabus & Scheme of Examination', url: 'https://mpsc.gov.in/examination_syllabus/18' },
                    { title: 'Previous Year Question Papers', url: 'https://mpsc.gov.in/prev_que_papers/9' },
                    { title: 'Answer Keys of Examinations', url: 'https://mpsc.gov.in/answer_keys_of_examinations/45' }
                  ].map((item, idx) => (
                    <a
                      key={idx}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-2xl hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all group"
                    >
                      <span className="text-xs font-bold text-dark uppercase tracking-tight">{item.title}</span>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Globe size={14} className="text-primary" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: SELECTION PROCESS */}
          <section className="scroll-mt-32">
            <header className="mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Target size={24} />
                </div>
                <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">Selection Stages</h2>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { stage: "Stage 1", title: "Preliminary Exam", desc: "Objective MCQ test focused on General Studies, Aptitude, and Language. Screening nature only." },
                { stage: "Stage 2", title: "Main Exam", desc: "Two descriptive technical papers. Marks scored here are counted for the final merit list." },
                { stage: "Stage 3", title: "Interview", desc: "Personality assessment conducted by the MPSC board (Personality Test)." },
                { stage: "Stage 4", title: "Final Merit List", desc: "Calculated based on Combined Marks from Mains Examination and Interview." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative group hover:border-primary transition-all">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-2">{item.stage}</span>
                  <h4 className="text-lg font-display font-black text-dark uppercase mb-3">{item.title}</h4>
                  <p className="text-xs text-body leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: SYLLABUS SPLIT */}
          <section className="scroll-mt-32">
            <header className="mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <BookOpen size={24} />
                </div>
                <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">Detailed Syllabus</h2>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Prelims Syllabus */}
              <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-display font-black text-dark uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                  <Zap size={18} className="text-primary" /> Prelims Syllabus
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h5 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">General Studies</h5>
                    <ul className="space-y-2 text-xs text-body font-bold uppercase tracking-tight">
                      <li>• Indian & Maharashtra History</li>
                      <li>• Geography</li>
                      <li>• Indian Economy</li>
                      <li>• Polity & Administration</li>
                      <li>• Science & Technology</li>
                      <li>• National & State Current Affairs</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Aptitude & Engineering</h5>
                    <ul className="space-y-2 text-xs text-body font-bold uppercase tracking-tight">
                      <li>• Logical Reasoning</li>
                      <li>• Quantitative Aptitude</li>
                      <li>• Data Interpretation</li>
                      <li>• General Engineering Aptitude</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Languages</h5>
                    <ul className="space-y-2 text-xs text-body font-bold uppercase tracking-tight">
                      <li>• Marathi Language</li>
                      <li>• English Language</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Mains Technical Syllabus */}
              <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-display font-black text-dark uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                  <FileText size={18} className="text-primary" /> Mains Technical Syllabi
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Civil */}
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <h4 className="text-sm font-display font-black text-dark uppercase mb-3 flex items-center gap-1.5 border-b border-gray-200 pb-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" /> Civil
                    </h4>
                    <ul className="space-y-1 text-[10px] text-body font-bold uppercase tracking-tight">
                      <li>• SOM & Structural Analysis</li>
                      <li>• RCC & Steel Designs</li>
                      <li>• Soil Mechanics & Foundation</li>
                      <li>• Fluid Mechanics & Hydrology</li>
                      <li>• Environmental Engineering</li>
                      <li>• Highway & Railway Engg</li>
                      <li>• Surveying & GPS Technology</li>
                      <li>• Construction Management</li>
                    </ul>
                  </div>

                  {/* Mechanical */}
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <h4 className="text-sm font-display font-black text-dark uppercase mb-3 flex items-center gap-1.5 border-b border-gray-200 pb-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" /> Mechanical
                    </h4>
                    <ul className="space-y-1 text-[10px] text-body font-bold uppercase tracking-tight">
                      <li>• Thermodynamics</li>
                      <li>• Fluid Mechanics</li>
                      <li>• Heat Transfer</li>
                      <li>• Refrigeration & AC</li>
                      <li>• Theory of Machines</li>
                      <li>• Machine Design</li>
                      <li>• Manufacturing Engg</li>
                      <li>• Power Plant & Industrial</li>
                    </ul>
                  </div>

                  {/* Electrical */}
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <h4 className="text-sm font-display font-black text-dark uppercase mb-3 flex items-center gap-1.5 border-b border-gray-200 pb-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" /> Electrical
                    </h4>
                    <ul className="space-y-1 text-[10px] text-body font-bold uppercase tracking-tight">
                      <li>• Network Theory</li>
                      <li>• Electrical Machines</li>
                      <li>• Power Systems</li>
                      <li>• Control Systems</li>
                      <li>• Power Electronics</li>
                      <li>• Electrical Measurements</li>
                      <li>• Analog & Digital Electronics</li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: STRATEGY & BOOKLIST */}
          <section className="scroll-mt-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Books list */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-display font-black text-dark uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                  <BookOpen size={18} className="text-primary" /> Recommended Books
                </h3>
                
                <div className="space-y-4 text-xs">
                  <div>
                    <span className="font-display font-black text-dark block uppercase mb-1">Civil Engineering</span>
                    <span className="text-body font-bold block">R.K. Rajput, B.C. Punmia, S.K. Garg, Made Easy Civil Study Notes</span>
                  </div>
                  <div>
                    <span className="font-display font-black text-dark block uppercase mb-1">Mechanical Engineering</span>
                    <span className="text-body font-bold block">R.S. Khurmi, P.K. Nag, Made Easy Mechanical Study Notes</span>
                  </div>
                  <div>
                    <span className="font-display font-black text-dark block uppercase mb-1">Electrical Engineering</span>
                    <span className="text-body font-bold block">B.L. Theraja, Nagrath & Kothari, V.K. Mehta</span>
                  </div>
                </div>
              </div>

              {/* Weightage Analysis */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-display font-black text-dark uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                  <Zap size={18} className="text-primary" /> High-Weightage Subjects
                </h3>
                
                <div className="grid grid-cols-3 gap-4 text-[10px] font-bold uppercase tracking-tight">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <span className="text-xs font-display font-black text-dark block mb-2">CIVIL</span>
                    <span>• RCC<br/>• SOM<br/>• Fluid Mechanics<br/>• Soil Mechanics<br/>• Environment</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <span className="text-xs font-display font-black text-dark block mb-2">MECHANICAL</span>
                    <span>• Thermodynamics<br/>• SOM<br/>• TOM<br/>• Manufacturing</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <span className="text-xs font-display font-black text-dark block mb-2">ELECTRICAL</span>
                    <span>• Power Systems<br/>• Machines<br/>• Network Theory<br/>• Control Systems</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 5: 6-MONTH STUDY PLAN */}
          <section className="scroll-mt-32">
            <header className="mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Trophy size={24} />
                </div>
                <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">6-Month Civil Engineering Study Plan</h2>
              </div>
              <p className="text-sm text-body mt-2">A high-performance roadmap designed for serious MES Civil aspirants studying 6–8 hours daily.</p>
            </header>

            {/* Months Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { month: "Month 1", focus: "Core Fundamentals", topics: ["Strength of Materials (SOM): Stress, Strain, Bending, Shear Force & BM, Deflections, Torsion", "Engineering Mechanics: Equilibrium, Friction, Centroids, Moment of Inertia", "Structural Analysis: Determinate structures, Trusses, ILD, Slope Deflection, Moment Distribution", "Daily: 50 MCQs & 10 numerical problems"] },
                { month: "Month 2", focus: "RCC, Steel & Materials", topics: ["RCC Design: LSM Beams, Slabs, Columns, Footings", "Steel Structures: Tension/Compression members, Connections (Welded/Bolted)", "Concrete Technology: Mix design, Workability, Tests, Admixtures", "Target: Solve 2,000+ MCQs by end of month"] },
                { month: "Month 3", focus: "Geotech & Surveying", topics: ["Soil Mechanics: Index properties, Permeability, Compaction, Consolidation, Shear strength", "Foundation Engineering: Bearing capacity, Settlement, Shallow/Deep foundations", "Surveying: Chain & Compass, Levelling, Theodolite, Total Station, GPS", "Focus: High-weightage Mains topics"] },
                { month: "Month 4", focus: "Hydraulics & Water", topics: ["Fluid Mechanics: Fluid properties, Hydrostatics, Bernoulli's, Pipe Flow", "Hydraulics: Open Channel Flow, Hydraulic Machines", "Water Resources: Hydrology, Irrigation engineering, Canal design, Reservoirs", "Practice: PYQ numericals & Formula Notebook"] },
                { month: "Month 5", focus: "Transport & Environment", topics: ["Highway Engineering: Geometric & Pavement design, Traffic, Materials", "Railway Engineering: Permanent Way, Signalling", "Environmental Engineering: Water & Wastewater treatment, Sewer design, Solid waste, Air/Noise pollution", "Focus: Paper-II core subjects"] },
                { month: "Month 6", focus: "Estimation, Revision & Mocks", topics: ["Estimation & Costing: Rate analysis, Contracts, Tendering, Valuation", "Construction Management: CPM, PERT, Resource planning", "Last 30 Days Strategy:", "• Day 1-10: Paper-I Revision", "• Day 11-20: Paper-II Revision", "• Day 21-30: Full Mock Tests & Formulas"] }
              ].map((m, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-2">{m.month}</span>
                  <h4 className="text-lg font-display font-black text-dark uppercase mb-4">{m.focus}</h4>
                  <ul className="space-y-2 text-xs text-body font-semibold">
                    {m.topics.map((t, tIdx) => (
                      <li key={tIdx} className={t.startsWith("•") || t.startsWith("Last") ? "pl-2 text-primary" : "text-muted"}>{t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Daily Timetable & Formula */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Daily Timetable */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm md:col-span-2">
                <h3 className="text-xl font-display font-black text-dark uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                  <Clock size={18} className="text-primary" /> Daily Time Table (Working Model)
                </h3>
                <div className="space-y-4">
                  {[
                    { time: "6:00 – 8:00 AM", activity: "Technical Subject 1 (Fresh Concept Study)" },
                    { time: "10:00 – 11:00 AM", activity: "Formula Revision & Short Notes Sync" },
                    { time: "2:00 – 4:00 PM", activity: "Technical Subject 2 (Advanced Topics/Numericals)" },
                    { time: "6:00 – 7:00 PM", activity: "MCQ Practice (High-speed drilling)" },
                    { time: "8:00 – 9:00 PM", activity: "PYQ Analysis & Performance review" }
                  ].map((row, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-50 last:border-0">
                      <span className="text-xs font-black text-primary uppercase tracking-wider">{row.time}</span>
                      <span className="text-sm font-bold text-dark">{row.activity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Formula */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-display font-black text-dark uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                  <Zap size={18} className="text-primary" /> Success Formula
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4 items-center">
                    <span className="text-3xl font-display font-black text-primary">70%</span>
                    <span className="text-xs font-bold text-body uppercase">Technical Subjects study time</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className="text-3xl font-display font-black text-primary">20%</span>
                    <span className="text-xs font-bold text-body uppercase">PYQs & MCQs Practice</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className="text-3xl font-display font-black text-primary">10%</span>
                    <span className="text-xs font-bold text-body uppercase">Daily & Weekly Revision</span>
                  </div>
                  <div className="pt-2 border-t border-gray-50 text-[10px] text-muted font-bold uppercase tracking-widest space-y-1">
                    <div>• Complete 10+ Years of PYQs</div>
                    <div>• Solve 8,000 – 10,000 MCQs</div>
                    <div>• Attempt 20 – 25 Full Mocks</div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Academic callout */}
          <div className="p-10 bg-primary rounded-[2.5rem] text-center shadow-lg shadow-primary/20">
            <p className="text-2xl font-display font-black text-dark uppercase leading-tight">
              Get Subject-wise Weightage Analysis & a dedicated 6-Month MES Study Plan from Our Expert Faculty.
            </p>
          </div>

        </div>
      </main>

      {/* Footer CTA */}
      <section className="bg-white border-t border-gray-100 py-16 text-center relative overflow-hidden mt-12">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 z-0" />
        <div className="section-container relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-black text-dark uppercase mb-8 leading-tight">
             Design Maharashtra's <span className="text-primary text-glow">Future</span>
          </h2>
          <p className="text-body mb-12 max-w-2xl mx-auto text-lg font-body">
             Prepare systematically for MES 2026 under the guidance of top engineering mentors. Start your offline batches now.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button onClick={() => setIsRegistrationModalOpen(true)} className="btn-primary-new px-12 py-5 text-lg group">
              Join Batch 2026
            </button>
            <button 
              onClick={() => navigate('/admission')}
              className="btn-outline-new px-12 py-5 text-lg"
            >
              Proceed to Admission
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default MaharashtraEngineeringDetailsPage;

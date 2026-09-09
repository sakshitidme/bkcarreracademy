import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Calendar, 
  FileText, 
  Clock, 
  Zap, 
  Target,
  Users,
  Globe,
  ArrowRight,
  Trophy,
  BookOpen,
  GraduationCap,
  Eye,
  Activity,
  DollarSign,
  TrendingUp,
  Award
} from 'lucide-react';

const IBPS_STUDENTS = [
  { name: "Vasundhara Ajay Gulhana", photo: "/Successful student pho/ibps/Vasundhara Ajay Gulhana.jpeg", post: "IBPS PO / Officer" },
  { name: "Sanghmitra Khobragade", photo: "/Successful student pho/ibps/sam.jpeg", post: "IBPS PO / Officer" },
  { name: "Shubham Jadhav", photo: "/Successful student pho/ibps/sumb.jpeg", post: "IBPS PO / Officer" },
  { name: "Tushar Pralhad Jadhav", photo: "/Successful student pho/ibps/tush.jpeg", post: "IBPS PO / Officer" },
  { name: "Vaibhav Kajale", photo: "/Successful student pho/ibps/vah.jpeg", post: "IBPS PO / Officer" },
  { name: "Vivek Dattatraya Bhasme", photo: "/Successful student pho/ibps/vike.jpeg", post: "IBPS PO / Officer" },
  { name: "Shrikrishnanath Panchal", photo: "/Successful student pho/ibps/wadawdawdad.jpeg", post: "IBPS PO / Officer" },
  { name: "Sneha Mehra", photo: "/Successful student pho/ibps/wadsaaw.jpeg", post: "IBPS PO / Officer" }
];

interface BankingDetailsPageProps {
  onBack: () => void;
  onRegister: () => void;
  setView: (view: any) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
}

export const BankingDetailsPage: React.FC<BankingDetailsPageProps> = ({
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
              <span className="text-xl font-display font-black text-dark block leading-none">IBPS PORTAL</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Banking & Finance Exams</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a 
              href="https://www.ibps.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors flex items-center gap-2"
            >
              <Globe size={14} /> Official IBPS Portal
            </a>
            <a 
              href="https://play.google.com/store/apps/details?id=co.lazarus.nqvxi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#111111] text-white rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-primary hover:text-dark transition-all flex items-center gap-2 border border-white/10"
            >
              Get Banking Course on App
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
                    Our Successful Banking Candidates
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
                  {IBPS_STUDENTS.map((student, idx) => (
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

                  {/* Golden Divider Line */}
                  <div className="w-[3px] self-stretch min-h-[60px] bg-gradient-to-b from-transparent via-[#FFC72C] to-transparent shadow-[0_0_8px_#FFC72C] mx-4 shrink-0" />

                  {/* Copy 2 */}
                  {IBPS_STUDENTS.map((student, idx) => (
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
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-primary">Public Sector Banking Careers</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-dark leading-tight mb-4">
              Banking Exams <br /><span className="text-primary text-glow">(IBPS)</span> Master Guide
            </h1>
            <p className="text-xl text-body font-body leading-relaxed max-w-3xl">
              Launch your corporate career in Indian Public Sector Banks. Master PO, Clerk, and Specialist IT Officer exams with target-oriented conceptual mentorship.
            </p>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="section-container space-y-12">

          {/* FOR YOUR PROFILE (BCS GRADUATE) */}
          <section className="bg-primary/10 rounded-[2.5rem] p-8 md:p-10 border border-primary/20 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="text-primary" size={28} />
                <h3 className="text-xl font-display font-black text-dark uppercase">For Computer Science & BCS Graduates</h3>
              </div>
              <p className="text-sm text-body leading-relaxed mb-6 max-w-3xl">
                Your **Bachelor of Computer Science (BCS)** degree unlocks the highly specialized **IBPS SO (IT Officer)** role alongside general PO tracks. This allows you to combine your technical background with a highly paid, executive-level banking career.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                {[
                  { name: "IBPS SO (IT Officer)", qualification: "BCS Eligible", target: "⭐⭐⭐⭐⭐ Top Target" },
                  { name: "IBPS PO", qualification: "Any Graduate", target: "⭐⭐⭐⭐⭐ Top Target" },
                  { name: "IBPS RRB PO", qualification: "Any Graduate", target: "⭐⭐⭐⭐ Recommended" },
                  { name: "IBPS Clerk", qualification: "Any Graduate", target: "⭐⭐⭐ Good Entry" },
                  { name: "IBPS RRB Clerk", qualification: "Any Graduate", target: "⭐⭐⭐ Good Entry" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <span className="text-[11px] font-black text-dark block mb-1">{item.name}</span>
                    <span className="text-[9px] font-bold text-muted uppercase block mb-2">{item.qualification}</span>
                    <span className="text-[10px] font-black text-primary block">{item.target}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-white/60 border border-primary/20 rounded-2xl text-xs font-bold text-dark uppercase tracking-wide">
                💡 **Academic Edge**: The Computer Awareness section in IBPS examinations is highly scoring and typically feels much easier for BCS graduates.
              </div>
            </div>
          </section>

          {/* SECTION 1: WHAT IS IBPS & KEY RECRUITMENTS */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-display font-black text-dark uppercase mb-4">What is IBPS?</h3>
                <p className="text-sm text-body leading-relaxed mb-6">
                  The <strong>Institute of Banking Personnel Selection (IBPS)</strong> is an autonomous agency that coordinates recruitment for Public Sector Banks, Regional Rural Banks (RRBs), and financial institutions across India.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-[10px] font-black text-muted uppercase tracking-wider block mb-2">Salary Scales (Approximate)</span>
                <div className="space-y-2 text-xs font-semibold">
                  <div className="flex justify-between border-b border-gray-100 pb-1"><span>IBPS SO (IT Officer)</span><span className="text-primary">₹65,000 – 90,000</span></div>
                  <div className="flex justify-between border-b border-gray-100 pb-1"><span>IBPS PO</span><span className="text-primary">₹60,000 – 85,000</span></div>
                  <div className="flex justify-between"><span>IBPS Clerk</span><span className="text-primary">₹35,000 – 45,000</span></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-display font-black text-dark uppercase mb-6 flex items-center gap-2 border-b-2 border-primary/20 pb-4">
                <Award size={20} className="text-primary" /> Major IBPS Recruitment Cycles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "IBPS PO", desc: "Probationary Officer. Management trainee role leading to assistant managers." },
                  { name: "IBPS Clerk", desc: "Customer Service Associates handling primary branch operations." },
                  { name: "IBPS SO", desc: "Specialist Officer. Focuses on IT Officers, Marketing, HR, and Law." },
                  { name: "IBPS RRB PO", desc: "Officer Scale-I roles in Regional Rural Banks." },
                  { name: "IBPS RRB Clerk", desc: "Office Assistant roles in rural and semi-urban banking sectors." },
                  { name: "RRB Scale II & III", desc: "Experienced professional entries for specialized banking officers." }
                ].map((exam, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl hover:bg-primary/5 transition-all">
                    <span className="text-sm font-black text-dark block mb-1">{exam.name}</span>
                    <p className="text-xs text-muted leading-relaxed">{exam.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 2: SELECTION PROCESS DETAILS */}
          <section className="scroll-mt-32">
            <header className="mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <FileText size={24} />
                </div>
                <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">IBPS PO Selection Process</h2>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Phase 1: Prelims */}
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-display font-black text-dark uppercase mb-6 border-b border-gray-50 pb-4">
                    Phase 1: Preliminary Exam
                  </h4>
                  <div className="space-y-3">
                    {[
                      { sub: "English Language", q: "30 Questions", m: "30 Marks" },
                      { sub: "Quantitative Aptitude", q: "35 Questions", m: "35 Marks" },
                      { sub: "Reasoning Ability", q: "35 Questions", m: "35 Marks" }
                    ].map((row, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0 text-xs font-bold text-body">
                        <span>{row.sub}</span>
                        <span className="text-muted">{row.q} | {row.m}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl text-center text-xs font-black text-dark uppercase mt-6">
                  ⏱️ Total: 100 Questions | 100 Marks | 60 Mins
                </div>
              </div>

              {/* Phase 2: Mains */}
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-display font-black text-dark uppercase mb-6 border-b border-gray-50 pb-4">
                    Phase 2: Main Exam
                  </h4>
                  <div className="space-y-2.5">
                    {[
                      { sub: "Reasoning & Computer Aptitude", m: "60 Marks" },
                      { sub: "Data Analysis & Interpretation", m: "60 Marks" },
                      { sub: "General Economy & Banking Awareness", m: "40 Marks" },
                      { sub: "English Language", m: "40 Marks" },
                      { sub: "Descriptive English (Essay/Letter)", m: "25 Marks" }
                    ].map((row, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0 text-xs font-bold text-body">
                        <span>{row.sub}</span>
                        <span className="text-primary">{row.m}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl text-center text-xs font-black text-dark uppercase mt-6">
                  📊 Total: 225 Marks (Objective + Descriptive)
                </div>
              </div>

              {/* Phase 3: Interview */}
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-display font-black text-dark uppercase mb-6 border-b border-gray-50 pb-4">
                    Phase 3: Interview
                  </h4>
                  <p className="text-xs text-body leading-relaxed mb-6">
                    A personal face-to-face interview conducted by the participating public sector banks to evaluate candidates on:
                  </p>
                  <ul className="space-y-2 text-xs font-bold text-dark uppercase tracking-tight">
                    <li className="flex items-center gap-2">🟢 Communication & Logic</li>
                    <li className="flex items-center gap-2">🟢 Practical Banking Knowledge</li>
                    <li className="flex items-center gap-2">🟢 Current Economy Developments</li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl text-center text-xs font-black text-dark uppercase mt-6">
                  👥 Final Merit: Mains (80%) + Interview (20%)
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: PHYSICAL & MEDICAL PARAMETERS */}
          <section className="scroll-mt-32">
            <header className="mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Target size={24} />
                </div>
                <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">Physical & Health Standards</h2>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: "Age Limits (PO)", desc: "20 Years Minimum | 30 Years Maximum (Relaxation: OBC +3, SC/ST +5, PwBD +10 Years)." },
                { title: "Height Standards", desc: "❌ No height requirements. Bank jobs do not require any physical height measurements." },
                { title: "Weight Limits", desc: "❌ No weight or chest measurements. Only basic medical fitness is needed." },
                { title: "Eyesight Rules", desc: "❌ No special eyesight standards. Spectacles are allowed; basic vision check applies." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:border-primary transition-all">
                  <span className="text-[10px] font-bold text-primary uppercase block mb-2">{item.title}</span>
                  <p className="text-xs text-body leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: DETAILED SYLLABI */}
          <section className="scroll-mt-32">
            <header className="mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <BookOpen size={24} />
                </div>
                <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">Exam Syllabi</h2>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* IBPS PO Syllabus */}
              <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-display font-black text-dark uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                  <Zap size={18} className="text-primary" /> IBPS PO Complete Syllabus
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <h5 className="text-[11px] font-bold text-primary uppercase tracking-widest mb-3">Maths (Quant)</h5>
                    <ul className="space-y-1 text-[9px] text-body font-bold uppercase tracking-tight">
                      <li>• Number System</li>
                      <li>• Simplification & Approx</li>
                      <li>• Percentage</li>
                      <li>• Profit & Loss</li>
                      <li>• Ratio & Average</li>
                      <li>• Simple & Compound Interest</li>
                      <li>• Time, Work & Pipes</li>
                      <li>• Speed, Distance & Boats</li>
                      <li>• Permutations & Probability</li>
                      <li>• Data Interpretation</li>
                      <li>• Quadratic Equations</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-[11px] font-bold text-primary uppercase tracking-widest mb-3">Reasoning</h5>
                    <ul className="space-y-1 text-[9px] text-body font-bold uppercase tracking-tight">
                      <li>• Seating Arrangements</li>
                      <li>• Puzzles (Floor/Box)</li>
                      <li>• Coding-Decoding</li>
                      <li>• Blood Relations</li>
                      <li>• Direction Sense</li>
                      <li>• Inequality & Syllogism</li>
                      <li>• Input-Output</li>
                      <li>• Statement Logic</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-[11px] font-bold text-primary uppercase tracking-widest mb-3">English</h5>
                    <ul className="space-y-1 text-[9px] text-body font-bold uppercase tracking-tight">
                      <li>• Reading Comprehension</li>
                      <li>• Cloze Test</li>
                      <li>• Error Detection</li>
                      <li>• Fill in the Blanks</li>
                      <li>• Para Jumbles</li>
                      <li>• Synonyms/Antonyms</li>
                      <li>• Grammar Essentials</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-[11px] font-bold text-primary uppercase tracking-widest mb-3">Banking Awareness</h5>
                    <ul className="space-y-1 text-[9px] text-body font-bold uppercase tracking-tight">
                      <li>• RBI & Monetary Policy</li>
                      <li>• NEFT, RTGS, IMPS, UPI</li>
                      <li>• Digital Banking Terms</li>
                      <li>• Financial Institutions</li>
                      <li>• Banking Reforms</li>
                      <li>• Current Economy News</li>
                      <li>• RBI Circulars</li>
                      <li>• Govt Schemes</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Specialist IT Officer Syllabus */}
              <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-display font-black text-dark uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                    <Zap size={18} className="text-primary" /> IBPS SO (IT Officer) Syllabus
                  </h3>
                  <p className="text-xs text-body leading-relaxed mb-4">
                    The Professional Knowledge paper for the IT Officer designation evaluates core computer science concepts:
                  </p>
                  <ul className="space-y-1.5 text-xs text-body font-bold uppercase tracking-tight">
                    <li>💻 Database Management System (DBMS)</li>
                    <li>💻 Operating Systems</li>
                    <li>💻 Data Structures & Algorithms</li>
                    <li>💻 Computer Networks</li>
                    <li>💻 Software Engineering</li>
                    <li>💻 Object Oriented Programming</li>
                    <li>💻 Cyber Security & Web Technologies</li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-center text-xs font-bold text-primary mt-6">
                  💡 This is highly recommended for BCS graduates!
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: RECOMMENDED BOOKS & 6-MONTH STUDY PLAN */}
          <section className="scroll-mt-32">
            <header className="mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <TrendingUp size={24} />
                </div>
                <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">Study Strategy & Books</h2>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Recommended Books */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-display font-black text-dark uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                  <BookOpen size={18} className="text-primary" /> Master Books List
                </h3>
                <div className="space-y-4 text-xs font-semibold text-body">
                  <div>
                    <span className="font-display font-black text-dark block uppercase mb-1">Quantitative Aptitude</span>
                    <span>Quantitative Aptitude by R.S. Aggarwal / Fast Track Arithmetic</span>
                  </div>
                  <div>
                    <span className="font-display font-black text-dark block uppercase mb-1">Reasoning Ability</span>
                    <span>Verbal & Non-Verbal Reasoning by R.S. Aggarwal</span>
                  </div>
                  <div>
                    <span className="font-display font-black text-dark block uppercase mb-1">English Language</span>
                    <span>Objective General English by S.P. Bakshi</span>
                  </div>
                  <div>
                    <span className="font-display font-black text-dark block uppercase mb-1">Banking Awareness</span>
                    <span>Banking Awareness by Arihant / Monthly Current Affairs</span>
                  </div>
                </div>
              </div>

              {/* Study Routine */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm md:col-span-2">
                <h3 className="text-xl font-display font-black text-dark uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                  <Clock size={18} className="text-primary" /> 6-Month Daily Preparation Plan
                </h3>
                <div className="space-y-4">
                  {[
                    { slot: "Morning Session (2 Hours)", focus: "Quantitative Aptitude drills and shortcuts" },
                    { slot: "Afternoon Session (2 Hours)", focus: "Reasoning puzzles and seating arrangements" },
                    { slot: "Evening Session (1 Hour)", focus: "English grammar, cloze tests, and comprehensions" },
                    { slot: "Night Session (1 Hour)", focus: "Banking Awareness study & daily current affairs notes" },
                    { slot: "Daily Targets", focus: "Solve 50 Quant questions, 50 Reasoning questions, 20 English questions, and maintain Banking News notes" }
                  ].map((row, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-2 border-b border-gray-50 last:border-0">
                      <span className="text-xs font-black text-primary uppercase tracking-wider shrink-0 mr-4 mb-1 sm:mb-0">{row.slot}</span>
                      <span className="text-sm font-bold text-dark">{row.focus}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Academic callout */}
          <div className="p-10 bg-primary rounded-[2.5rem] text-center shadow-lg shadow-primary/20">
            <p className="text-2xl font-display font-black text-dark uppercase leading-tight">
              Get access to custom banking mocks, daily Speed Tests, and direct doubt clarification channels.
            </p>
          </div>

        </div>
      </main>

      {/* Footer CTA */}
      <section className="bg-white border-t border-gray-100 py-16 text-center relative overflow-hidden mt-12">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 z-0" />
        <div className="section-container relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-black text-dark uppercase mb-8 leading-tight">
             Achieve Corporate Banking <span className="text-primary text-glow">Excellence</span>
          </h2>
          <p className="text-body mb-12 max-w-2xl mx-auto text-lg font-body">
             Prepare systematically with our custom IBPS mock databases, specialist IT modules, and target tracking tools.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button onClick={() => setIsRegistrationModalOpen(true)} className="btn-primary-new px-12 py-5 text-lg group">
              Start Preparation
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

export default BankingDetailsPage;

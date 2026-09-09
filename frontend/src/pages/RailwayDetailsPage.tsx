import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Target,
  Users,
  Globe,
  ArrowRight,
  ChevronRight,
  Trophy,
  BookOpen,
  GraduationCap,
  Eye,
  Activity,
  DollarSign,
  TrendingUp,
  Award
} from 'lucide-react';

const RRB_STUDENTS = [
  { name: "Khandale", photo: "/Successful student pho/RRB/Khandale.jpg", post: "RRB" },
  { name: "Patil", photo: "/Successful student pho/RRB/Patil PSI.jpg", post: "RRB" },
  { name: "Raj Panhale", photo: "/Successful student pho/RRB/RAJ PANHALE.jpeg", post: "RRB" },
  { name: "Ratnamala", photo: "/Successful student pho/RRB/Ratnamala.jpeg", post: "RRB" },
  { name: "Ravindra Patil", photo: "/Successful student pho/RRB/Ravindra Patil.jpg", post: "RRB" },
  { name: "Swapnil Shinde", photo: "/Successful student pho/RRB/Swapnil Shinde.jpeg", post: "RRB" },
  { name: "Ujwala Rokade", photo: "/Successful student pho/RRB/UjwalaRokade.jpeg", post: "RRB" }
];

interface RailwayDetailsPageProps {
  onBack: () => void;
  onRegister: () => void;
  setView: (view: any) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
}

export const RailwayDetailsPage: React.FC<RailwayDetailsPageProps> = ({
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
              <span className="text-xl font-display font-black text-dark block leading-none">RRB PORTAL</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Railway Recruitment Board</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a 
              href="https://rrbsecunderabad.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors flex items-center gap-2"
            >
              <Globe size={14} /> Official RRB Portal
            </a>
            <a 
              href="https://play.google.com/store/apps/details?id=co.lazarus.nqvxi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#111111] text-white rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-primary hover:text-dark transition-all flex items-center gap-2 border border-white/10"
            >
              Get Railway Course on App
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
                    Our Successful RRB Candidates
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
                  {RRB_STUDENTS.map((student, idx) => (
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
                  {RRB_STUDENTS.map((student, idx) => (
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
              <span className="text-[9px] font-black uppercase tracking-widest text-primary">Indian Railways Career Guide</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-dark leading-tight mb-4">
              Railway Exams <span className="text-primary text-glow">(RRB)</span> <br />recruitment 2026
            </h1>
            <p className="text-xl text-body font-body leading-relaxed max-w-3xl">
              Launch your career in Indian Railways, one of the world's largest employers. Complete preparation roadmap, selection standards, and specialized mentorship.
            </p>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="section-container space-y-12">

          {/* BCS GRADUATE CALLOUT (TARGETED STRATEGY) */}
          <section className="bg-primary/10 rounded-[2.5rem] p-8 md:p-10 border border-primary/20 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="text-primary" size={28} />
                <h3 className="text-xl font-display font-black text-dark uppercase">Targeted Strategy: For BCS Graduates</h3>
              </div>
              <p className="text-sm text-body leading-relaxed mb-6 max-w-3xl">
                As a <strong>Bachelor of Computer Science (BCS)</strong> graduate, you have a solid academic edge. Based on your degree, <strong>NTPC Graduate Level posts</strong> (like Station Master and Goods Train Manager) offer the best salary structure, career progression, and office-oriented work environments.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "NTPC Graduate", status: "✅ Eligible (Recommended)", desc: "Best fit for your degree." },
                  { title: "Station Master / Goods Mgr", status: "✅ Eligible", desc: "Top tier railway roles." },
                  { title: "Junior Engineer (JE)", status: "⚠️ Conditional", desc: "Depends on specific branch rules." },
                  { title: "ALP / Technician", status: "⚠️ Conditional", desc: "Requires specific technical disciplines." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <span className="text-[10px] font-bold text-primary uppercase block mb-1">{item.title}</span>
                    <span className="text-xs font-black text-dark block mb-2">{item.status}</span>
                    <p className="text-[11px] text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 1: WHAT IS RRB & MAJOR EXAMS */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-display font-black text-dark uppercase mb-4">What is RRB?</h3>
                <p className="text-sm text-body leading-relaxed mb-6">
                  The <strong>Railway Recruitment Board (RRB)</strong> is the official government organization responsible for recruiting technical, non-technical, and paramedical staff to power the massive Indian Railways network.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-[10px] font-black text-muted uppercase tracking-wider block mb-2">Key Highlights</span>
                <ul className="space-y-2 text-xs text-body font-semibold">
                  <li className="flex items-center gap-2">🟢 Central Government Job Security</li>
                  <li className="flex items-center gap-2">🟢 Comprehensive Medical Allowances</li>
                  <li className="flex items-center gap-2">🟢 Free Railway Passes & Travel Privileges</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-display font-black text-dark uppercase mb-6 flex items-center gap-2 border-b-2 border-primary/20 pb-4">
                <Award size={20} className="text-primary" /> Major RRB Recruitment Cycles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "RRB NTPC", desc: "Non-Technical Popular Categories (Station Master, Goods Guard, Clerks)." },
                  { name: "RRB JE", desc: "Junior Engineer posts in Civil, Mechanical, Electrical, and IT departments." },
                  { name: "RRB ALP", desc: "Assistant Loco Pilot (requires specific technical degrees/diplomas)." },
                  { name: "RRB Group D", desc: "Track Maintainers, Helpers, and assistant level positions." },
                  { name: "RRB Technician", desc: "Technical support staff across multiple operational departments." },
                  { name: "Paramedical & Ministerial", desc: "Nurses, lab assistants, translators, and isolated categories." }
                ].map((exam, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl hover:bg-primary/5 transition-all">
                    <span className="text-sm font-black text-dark block mb-1">{exam.name}</span>
                    <p className="text-xs text-muted leading-relaxed">{exam.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 2: ELIGIBILITY MATRIX & STANDARDS */}
          <section className="scroll-mt-32">
            <header className="mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Target size={24} />
                </div>
                <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">Physical & Vision Standards</h2>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Age Limits */}
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                <h4 className="text-lg font-display font-black text-dark uppercase mb-6 flex items-center gap-3 border-b border-gray-50 pb-4">
                  <Users size={20} className="text-primary" /> Age Limits
                </h4>
                <div className="space-y-4">
                  {[
                    { cat: "General", age: "18 – 33 Years" },
                    { cat: "OBC Candidates", age: "Relaxation up to +3 Years" },
                    { cat: "SC / ST Candidates", age: "Relaxation up to +5 Years" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                      <span className="text-xs text-muted uppercase font-bold">{item.cat}</span>
                      <span className="text-sm font-black text-dark">{item.age}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-muted mt-4">* Age limits can vary slightly by specific notification.</p>
              </div>

              {/* Physical Parameters */}
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                <h4 className="text-lg font-display font-black text-dark uppercase mb-6 flex items-center gap-3 border-b border-gray-50 pb-4">
                  <Activity size={20} className="text-primary" /> Physical Standards
                </h4>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <span className="text-[10px] font-bold text-primary uppercase block mb-1">Height Requirement</span>
                    <span className="text-xs font-bold text-dark leading-relaxed">
                      ❌ **No Height Requirement** for NTPC, JE, Technician, Station Master, Clerk, Goods Train Manager, etc.
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <span className="text-[10px] font-bold text-primary uppercase block mb-1">Weight & Chest Parameters</span>
                    <span className="text-xs font-bold text-dark leading-relaxed">
                      ❌ **No fixed weight or chest measurement requirements** for most RRB posts. Medical fitness is key.
                    </span>
                  </div>
                </div>
              </div>

              {/* Eyesight Standards */}
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                <h4 className="text-lg font-display font-black text-dark uppercase mb-6 flex items-center gap-3 border-b border-gray-50 pb-4">
                  <Eye size={20} className="text-primary" /> Eyesight Requirements
                </h4>
                <div className="space-y-3">
                  {[
                    { std: "A2 Standard", vision: "6/9, 6/9 without glasses (Station Master)" },
                    { std: "A3 Standard", vision: "6/9, 6/9 with/without glasses" },
                    { std: "C2 Standard", vision: "6/12 with/without glasses" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                      <span className="text-xs font-black text-dark uppercase">{item.std}</span>
                      <span className="text-[11px] text-body text-right font-semibold">{item.vision}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-muted mt-2">Note: Night vision and color vision tests are mandatory for operational posts.</p>
              </div>
            </div>
          </section>

          {/* SECTION 3: SALARY SCALES */}
          <section className="scroll-mt-32">
            <header className="mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <DollarSign size={24} />
                </div>
                <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">Approximate Salary Structure</h2>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  type: "RRB NTPC Posts", 
                  items: [
                    { post: "Commercial Apprentice", salary: "₹60,000 – ₹90,000+" },
                    { post: "Station Master", salary: "₹55,000 – ₹80,000+" },
                    { post: "Goods Train Manager", salary: "₹50,000 – ₹75,000+" },
                    { post: "Senior Clerk", salary: "₹40,000 – ₹60,000+" }
                  ] 
                },
                { 
                  type: "RRB Junior Engineer (JE)", 
                  items: [
                    { post: "Junior Engineer", salary: "₹50,000 – ₹80,000+" }
                  ] 
                },
                { 
                  type: "RRB Group D", 
                  items: [
                    { post: "Track Maintainer", salary: "₹28,000 – ₹40,000" },
                    { post: "Helper", salary: "₹28,000 – ₹40,000" }
                  ] 
                }
              ].map((sec, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                  <h4 className="text-md font-display font-black text-primary uppercase mb-6 pb-2 border-b border-gray-100">{sec.type}</h4>
                  <div className="space-y-4">
                    {sec.items.map((it, iIdx) => (
                      <div key={iIdx} className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
                        <span className="text-xs font-bold text-dark uppercase">{it.post}</span>
                        <span className="text-xs font-black text-primary">{it.salary}</span>
                      </div>
                    ))}
                  </div>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* NTPC Syllabus */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-display font-black text-dark uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                  <Zap size={18} className="text-primary" /> RRB NTPC Complete Syllabus
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Mathematics</h5>
                    <ul className="space-y-1.5 text-[10px] text-body font-bold uppercase tracking-tight">
                      <li>• Number System & BODMAS</li>
                      <li>• Decimals & Fractions</li>
                      <li>• LCM & HCF</li>
                      <li>• Ratio & Proportion</li>
                      <li>• Percentage</li>
                      <li>• Profit & Loss</li>
                      <li>• Simple & Compound Interest</li>
                      <li>• Time & Work / Pipes & Cisterns</li>
                      <li>• Time Speed Distance</li>
                      <li>• Algebra, Geometry & Mensuration</li>
                      <li>• Statistics & Trigonometry</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Reasoning</h5>
                    <ul className="space-y-1.5 text-[10px] text-body font-bold uppercase tracking-tight">
                      <li>• Analogies</li>
                      <li>• Coding Decoding</li>
                      <li>• Blood Relations</li>
                      <li>• Direction Sense</li>
                      <li>• Puzzles</li>
                      <li>• Seating Arrangement</li>
                      <li>• Statement & Conclusion</li>
                      <li>• Syllogism & Venn Diagrams</li>
                      <li>• Decision Making</li>
                      <li>• Figure Series</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">General Awareness</h5>
                    <ul className="space-y-1.5 text-[10px] text-body font-bold uppercase tracking-tight">
                      <li>• History & Geography</li>
                      <li>• Indian Polity & Constitution</li>
                      <li>• Indian Economy</li>
                      <li>• Physics, Chemistry & Biology</li>
                      <li>• Current Affairs</li>
                      <li>• Railway General Knowledge</li>
                      <li>• Sports & Awards</li>
                      <li>• Books & Authors</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Group D Syllabus */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-display font-black text-dark uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                    <Zap size={18} className="text-primary" /> RRB Group D Syllabus
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h5 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Mathematics</h5>
                      <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-2">Core Arithmetic Focus:</p>
                      <ul className="space-y-1 text-[10px] text-body font-bold uppercase tracking-tight">
                        <li>• Percentage</li>
                        <li>• Ratio & Proportion</li>
                        <li>• Profit & Loss</li>
                        <li>• Simple Interest</li>
                        <li>• Time & Work</li>
                        <li>• Speed & Distance</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">General Science</h5>
                      <ul className="space-y-1 text-[10px] text-body font-bold uppercase tracking-tight">
                        <li>• Physics</li>
                        <li>• Chemistry</li>
                        <li>• Biology</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Reasoning & GK</h5>
                      <ul className="space-y-1 text-[10px] text-body font-bold uppercase tracking-tight">
                        <li>• Analogy & Coding</li>
                        <li>• Series & Classification</li>
                        <li>• National & International Affairs</li>
                        <li>• Sports</li>
                        <li>• Government Schemes</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-red-50/50 border border-red-100 rounded-2xl">
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block mb-2">Group D Physical Efficiency Test (PET)</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-body">
                    <div>
                      <span className="text-[9px] text-muted block mb-1">MALE CANDIDATES</span>
                      <p>🏃 Carry 35 kg for 100 m in 2 minutes</p>
                      <p>🏃 Run 1000 m in 4 min 15 sec</p>
                    </div>
                    <div>
                      <span className="text-[9px] text-muted block mb-1">FEMALE CANDIDATES</span>
                      <p>🏃 Carry 20 kg for 100 m in 2 minutes</p>
                      <p>🏃 Run 1000 m in 5 min 40 sec</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: SELECTION PROCESS & JOB RANKING */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Selection Stages */}
            <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-display font-black text-dark uppercase mb-6 pb-4 border-b border-gray-100">
                Selection Process Stages
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { 
                    exam: "NTPC Stages", 
                    stages: ["1. CBT-1 (Screening)", "2. CBT-2 (Main Merit)", "3. Typing/Skill Test (if applicable)", "4. Document Verification", "5. Medical Exam"] 
                  },
                  { 
                    exam: "Group D Stages", 
                    stages: ["1. CBT (Objective MCQ)", "2. PET (Physical Test)", "3. Document Verification", "4. Medical Exam"] 
                  },
                  { 
                    exam: "Junior Engineer (JE)", 
                    stages: ["1. CBT-1 (Aptitude & Science)", "2. CBT-2 (Technical Core)", "3. Document Verification", "4. Medical Exam"] 
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-2xl">
                    <span className="text-xs font-black text-primary uppercase block mb-3">{item.exam}</span>
                    <ul className="space-y-2 text-xs font-bold text-dark uppercase tracking-tight">
                      {item.stages.map((stg, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-1.5">• {stg}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Job Ranking */}
            <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-display font-black text-dark uppercase mb-6 pb-4 border-b border-gray-100">
                  Railway Jobs Priority Ranking
                </h3>
                <div className="space-y-2">
                  {[
                    { rank: "1", title: "Station Master" },
                    { rank: "2", title: "Commercial Apprentice" },
                    { rank: "3", title: "Goods Train Manager" },
                    { rank: "4", title: "Junior Engineer" },
                    { rank: "5", title: "Senior Commercial Clerk" },
                    { rank: "6", title: "Technician" },
                    { rank: "7", title: "Group D Posts" }
                  ].map((job, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1.5 px-3 bg-gray-50 rounded-xl">
                      <span className="text-xs font-bold text-body uppercase">{job.title}</span>
                      <span className="w-5 h-5 rounded-full bg-primary text-dark font-display font-black text-[10px] flex items-center justify-center">
                        {job.rank}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6: 6-MONTH STUDY PLAN */}
          <section className="scroll-mt-32">
            <header className="mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <TrendingUp size={24} />
                </div>
                <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">6-Month High Performance Study Plan</h2>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Daily routine */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-display font-black text-dark uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                  <Clock size={18} className="text-primary" /> Daily Preparation Timetable
                </h3>
                <div className="space-y-4">
                  {[
                    { subject: "Mathematics", duration: "2 Hours", desc: "Core Arithmetic, shortcuts, and formula drilling" },
                    { subject: "General Intelligence & Reasoning", duration: "2 Hours", desc: "Logical puzzles, seating arrangements, and series" },
                    { subject: "General Awareness & Science", duration: "2 Hours", desc: "Static GK, Indian polity, geography, and general science" },
                    { subject: "Current Affairs & Railway GK", duration: "30 Minutes", desc: "Daily news digests and specific railway history/stats" },
                    { subject: "Topic Mock Test & Review", duration: "1 Hour", desc: "Sectional testing and direct analysis of errors" }
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-start py-2.5 border-b border-gray-50 last:border-0">
                      <div>
                        <span className="text-xs font-black text-dark uppercase block">{row.subject}</span>
                        <p className="text-[11px] text-muted leading-tight mt-0.5">{row.desc}</p>
                      </div>
                      <span className="text-xs font-black text-primary uppercase tracking-wider shrink-0 ml-4">{row.duration}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly strategy */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-display font-black text-dark uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                    <Calendar size={18} className="text-primary" /> Weekly Milestones
                  </h3>
                  <div className="space-y-4">
                    {[
                      { icon: "📝", title: "2 Full Length Mock Tests", desc: "Practice exact computer-based exam conditions weekly" },
                      { icon: "🔍", title: "Detailed Error Analysis", desc: "Review missed questions, note formulas, and correct weak concepts" },
                      { icon: "📚", title: "10 Years PYQ Solving", desc: "Analyze pattern repetitions and prioritize high-weightage topics" }
                    ].map((milestone, idx) => (
                      <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                        <span className="text-2xl shrink-0">{milestone.icon}</span>
                        <div>
                          <span className="text-xs font-black text-dark uppercase block mb-1">{milestone.title}</span>
                          <p className="text-[11px] text-muted leading-relaxed">{milestone.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-primary rounded-2xl text-center text-xs font-bold text-dark uppercase tracking-wide mt-6">
                  ⚡ Join our dedicated RRB mentorship program to track your weekly targets
                </div>
              </div>
            </div>
          </section>

          {/* Academic callout */}
          <div className="p-10 bg-primary rounded-[2.5rem] text-center shadow-lg shadow-primary/20">
            <p className="text-2xl font-display font-black text-dark uppercase leading-tight">
              Get access to custom mock exams, live interactive drills, and daily doubts clearing sessions.
            </p>
          </div>

        </div>
      </main>

      {/* Footer CTA */}
      <section className="bg-white border-t border-gray-100 py-16 text-center relative overflow-hidden mt-12">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 z-0" />
        <div className="section-container relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-black text-dark uppercase mb-8 leading-tight">
             Secure Your Railway <span className="text-primary text-glow">Career</span>
          </h2>
          <p className="text-body mb-12 max-w-2xl mx-auto text-lg font-body">
             Prepare systematically with our expert-led batches specifically designed for RRB NTPC & Junior Engineer examinations.
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

export default RailwayDetailsPage;

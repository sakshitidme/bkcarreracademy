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

const SSC_STUDENTS = [
  { name: "Pratibha Shinde", photo: "/Successful student pho/scc/Pratibha Shinde.jpeg", post: "SSC" },
  { name: "Roshan Makne", photo: "/Successful student pho/scc/Roshan Makne-.jpeg", post: "SSC" },
  { name: "Shelar Navnath", photo: "/Successful student pho/scc/Shelar Navnath (Nsk Gramin Police).jpg", post: "SSC" },
  { name: "Sunil Khairnar", photo: "/Successful student pho/scc/Sunil Khairnar.jpeg", post: "SSC" },
  { name: "Vaibhav Kadam", photo: "/Successful student pho/scc/Vaibhav Kadam Nsk Police.jpg", post: "SSC" },
  { name: "Yogesh Apsunde", photo: "/Successful student pho/scc/Yogesh Apsunde Nsk Police.jpg", post: "SSC" },
  { name: "Yogesh Wagh", photo: "/Successful student pho/scc/Yogesh Wagh (Pune Police).jpg", post: "SSC" },
  { name: "Yogita Gaikar", photo: "/Successful student pho/scc/yogita gaikar nsk police.jpg", post: "SSC" }
];

interface SSCDetailsPageProps {
  onBack: () => void;
  onRegister: () => void;
  setView: (view: any) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
}

export const SSCDetailsPage: React.FC<SSCDetailsPageProps> = ({
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
              <span className="text-xl font-display font-black text-dark block leading-none">SSC PORTAL</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Staff Selection Commission</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a 
              href="https://ssc.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors flex items-center gap-2"
            >
              <Globe size={14} /> Official SSC Portal
            </a>
            <a 
              href="https://play.google.com/store/apps/details?id=co.lazarus.nqvxi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#111111] text-white rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-primary hover:text-dark transition-all flex items-center gap-2 border border-white/10"
            >
              Get SSC Course on App
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
                    Our Successful SSC Candidates
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
                  {SSC_STUDENTS.map((student, idx) => (
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
                  {SSC_STUDENTS.map((student, idx) => (
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
              <span className="text-[9px] font-black uppercase tracking-widest text-primary">Central Government Careers</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-dark leading-tight mb-4">
              SSC Examinations <br /><span className="text-primary text-glow">recruitment</span> 2026
            </h1>
            <p className="text-xl text-body font-body leading-relaxed max-w-3xl">
              Recruiting employees for ministries, departments, and organizations under the Government of India. Clear, high-performance coaching structure tailored for competitive success.
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
                <h3 className="text-xl font-display font-black text-dark uppercase">For Your Profile: BCS Graduate Targets</h3>
              </div>
              <p className="text-sm text-body leading-relaxed mb-6 max-w-3xl">
                As a <strong>Bachelor of Computer Science (BCS)</strong> graduate, your primary focus should be <strong>SSC CGL</strong> because it offers the highest pay levels, fastest promotions, and prestigious office-based administrative posts.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { name: "SSC CGL", qualification: "Bachelor's Degree", target: "⭐ Primary Target" },
                  { name: "SSC CPO", qualification: "Bachelor's Degree", target: "⚠️ Physical Required" },
                  { name: "SSC CHSL", qualification: "12th Pass", target: "Secondary Target" },
                  { name: "SSC MTS", qualification: "10th Pass", target: "Backup Option" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <span className="text-xs font-black text-dark block mb-1">{item.name}</span>
                    <span className="text-[10px] font-bold text-muted uppercase block mb-2">{item.qualification}</span>
                    <span className="text-[11px] font-black text-primary block">{item.target}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-white/60 border border-primary/20 rounded-2xl text-xs font-bold text-dark uppercase tracking-wide">
                🏆 Priority Roadmap Recommendation: <span className="text-primary">SSC CGL ⭐</span> → <span className="text-primary">RRB NTPC ⭐</span> → SSC CPO → SSC CHSL → SSC MTS
              </div>
            </div>
          </section>

          {/* SECTION 1: WHAT IS SSC & KEY EXAMS */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-display font-black text-dark uppercase mb-4">What is SSC?</h3>
                <p className="text-sm text-body leading-relaxed mb-6">
                  The <strong>Staff Selection Commission (SSC)</strong> is an esteemed recruitment body under the Ministry of Personnel, Public Grievances and Pensions. It appoints personnel to various Group 'B' and Group 'C' posts across Central Ministries and Departments.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-[10px] font-black text-muted uppercase tracking-wider block mb-2">SSC CGL Salary Structure</span>
                <div className="space-y-2 text-xs font-semibold">
                  <div className="flex justify-between border-b border-gray-100 pb-1"><span>Level 7 Posts (e.g. ITI, ASO)</span><span className="text-primary">₹65,000 – 95,000</span></div>
                  <div className="flex justify-between border-b border-gray-100 pb-1"><span>Level 6 Posts</span><span className="text-primary">₹55,000 – 75,000</span></div>
                  <div className="flex justify-between border-b border-gray-100 pb-1"><span>Level 5 Posts</span><span className="text-primary">₹45,000 – 60,000</span></div>
                  <div className="flex justify-between"><span>Level 4 Posts</span><span className="text-primary">₹35,000 – 50,000</span></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-display font-black text-dark uppercase mb-6 flex items-center gap-2 border-b-2 border-primary/20 pb-4">
                <Award size={20} className="text-primary" /> SSC Examinations List
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "SSC CGL", desc: "Combined Graduate Level. For top executive posts like Income Tax, MEA & CBI." },
                  { name: "SSC CHSL", desc: "Combined Higher Secondary Level. For LDCs, JSA, and Data Entry Operators." },
                  { name: "SSC CPO", desc: "Central Police Organization. Recruits Sub-Inspectors in Delhi Police & CAPF." },
                  { name: "SSC GD", desc: "General Duty Constable. Recruits for BSF, CISF, SSB, ITBP, AR, and SSF." },
                  { name: "SSC MTS", desc: "Multi-Tasking Staff. Recruits general operational staff in central offices." },
                  { name: "Stenographer & JE", desc: "Specialist entries for Steno Grade C/D and Junior Engineers." }
                ].map((exam, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl hover:bg-primary/5 transition-all">
                    <span className="text-sm font-black text-dark block mb-1">{exam.name}</span>
                    <p className="text-xs text-muted leading-relaxed">{exam.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 2: AGE LIMITS, HEIGHT, WEIGHT & VISION */}
          <section className="scroll-mt-32">
            <header className="mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Target size={24} />
                </div>
                <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">Eligibility & Physical standards</h2>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Age Limits */}
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-display font-black text-dark uppercase mb-6 flex items-center gap-3 border-b border-gray-50 pb-4">
                    <Users size={20} className="text-primary" /> Age Limits (CGL)
                  </h4>
                  <p className="text-xs text-body leading-relaxed mb-4">
                    Most posts require ages ranging from <strong>18–27 years</strong>, <strong>18–30 years</strong>, or up to <strong>18–32 years</strong> depending on the designation.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-muted uppercase tracking-wider block mb-1">Age Relaxation</span>
                  {[
                    { cat: "OBC Candidates", val: "3 Years" },
                    { cat: "SC / ST Candidates", val: "5 Years" },
                    { cat: "PwD Candidates", val: "10 Years" }
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0 text-xs font-bold text-body">
                      <span>{row.cat}</span>
                      <span className="text-primary">{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Physical Requirements */}
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                <h4 className="text-lg font-display font-black text-dark uppercase mb-6 flex items-center gap-3 border-b border-gray-50 pb-4">
                  <Activity size={20} className="text-primary" /> Height & Weight Rules
                </h4>
                <div className="space-y-4 text-xs font-semibold text-body">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-[10px] font-bold text-primary uppercase block mb-1">Office CGL Posts</span>
                    <span>❌ **No Height / Weight requirements** for ASO, Auditor, Accountant, Tax Assistant, etc.</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-[10px] font-bold text-primary uppercase block mb-1">Inspector CGL Posts</span>
                    <p className="mt-1">👨 **Male**: 157.5 cm (Chest 81 cm + 5 cm expansion)</p>
                    <p className="mt-0.5">👩 **Female**: 152 cm (Weight 48 kg minimum)</p>
                  </div>
                </div>
              </div>

              {/* Eyesight & SI Rules */}
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-display font-black text-dark uppercase mb-6 flex items-center gap-3 border-b border-gray-50 pb-4">
                    <Eye size={20} className="text-primary" /> Eyesight & Specialist Posts
                  </h4>
                  <p className="text-xs text-body leading-relaxed mb-4">
                    Eyesight checks are rigorous for **CPO (Sub Inspector)** and **enforcement/inspector posts** (includes distance vision, near vision, and color vision tests).
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl space-y-1">
                  <span className="text-[10px] font-black text-primary uppercase block">SSC CPO (Delhi Police / CAPF SI)</span>
                  <div className="text-xs font-bold text-dark">
                    <p>👨 Height (Male): 170 cm (Chest: 80–85 cm)</p>
                    <p>👩 Height (Female): 157 cm</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: DETAILED SYLLABI */}
          <section className="scroll-mt-32">
            <header className="mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <BookOpen size={24} />
                </div>
                <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">Detailed Syllabi</h2>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* SSC CGL Syllabus */}
              <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-display font-black text-dark uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                  <Zap size={18} className="text-primary" /> SSC CGL Complete Syllabus
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <h5 className="text-[11px] font-bold text-primary uppercase tracking-widest mb-3">Maths (Quant)</h5>
                    <ul className="space-y-1 text-[9px] text-body font-bold uppercase tracking-tight">
                      <li>• Number System</li>
                      <li>• Simplification</li>
                      <li>• Percentage</li>
                      <li>• Profit & Loss</li>
                      <li>• Ratio & Average</li>
                      <li>• Time, Work & Speed</li>
                      <li>• Interest (SI & CI)</li>
                      <li>• Algebra & Geometry</li>
                      <li>• Mensuration</li>
                      <li>• Trigonometry</li>
                      <li>• Statistics & DI</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-[11px] font-bold text-primary uppercase tracking-widest mb-3">Reasoning</h5>
                    <ul className="space-y-1 text-[9px] text-body font-bold uppercase tracking-tight">
                      <li>• Analogy</li>
                      <li>• Classification</li>
                      <li>• Coding-Decoding</li>
                      <li>• Blood Relations</li>
                      <li>• Direction Sense</li>
                      <li>• Seating & Puzzles</li>
                      <li>• Syllogism</li>
                      <li>• Statement Rules</li>
                      <li>• Mirror/Paper folds</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-[11px] font-bold text-primary uppercase tracking-widest mb-3">English</h5>
                    <ul className="space-y-1 text-[9px] text-body font-bold uppercase tracking-tight">
                      <li>• Grammar Basics</li>
                      <li>• Error Detection</li>
                      <li>• Active & Passive</li>
                      <li>• Narration</li>
                      <li>• Synonyms/Antonyms</li>
                      <li>• One Word Sub</li>
                      <li>• Reading Comp</li>
                      <li>• Cloze Test</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-[11px] font-bold text-primary uppercase tracking-widest mb-3">General Awareness</h5>
                    <ul className="space-y-1 text-[9px] text-body font-bold uppercase tracking-tight">
                      <li>• History & Geography</li>
                      <li>• Polity & Constitution</li>
                      <li>• Indian Economy</li>
                      <li>• General Science</li>
                      <li>• Computer Awareness</li>
                      <li>• Static GK</li>
                      <li>• Current Events</li>
                      <li>• Govt Schemes</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CHSL & GD Syllabus */}
              <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-display font-black text-dark uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                    <Zap size={18} className="text-primary" /> CHSL & GD Constable Syllabus
                  </h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <span className="text-[10px] font-bold text-primary uppercase block mb-1">SSC CHSL Syllabus</span>
                      <p className="text-[11px] text-muted">Contains English, Mathematics, Reasoning, and General Awareness. The syllabus is structurally similar to SSC CGL but easier in complexity.</p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-xl">
                      <span className="text-[10px] font-bold text-primary uppercase block mb-1">SSC GD Constable (10th Pass)</span>
                      <p className="text-[11px] text-muted mb-2">Maths, Reasoning, General Awareness, and Choice of English or Hindi Language.</p>
                      <div className="text-[10px] font-bold text-dark">
                        <p>🏃 Male: 5 km run in 24 minutes</p>
                        <p>🏃 Female: 1.6 km run in 8.5 minutes</p>
                        <p>📏 Height: Male 170cm | Female 157cm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: TOP JOB POSITIONS */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-display font-black text-dark uppercase mb-6 pb-4 border-b border-gray-100">
                SSC CGL Priority Job Rankings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { rank: "1", title: "Assistant Section Officer (MEA)", desc: "Ministry of External Affairs. Highly sought after for foreign postings." },
                  { rank: "2", title: "Income Tax Inspector", desc: "Prestigious field job under CBDT with great career progression." },
                  { rank: "3", title: "CBI Sub Inspector", desc: "Central Bureau of Investigation. Enforcement role with special allowances." },
                  { rank: "4", title: "Examiner", desc: "Customs postings with rapid promotion tracks." },
                  { rank: "5", title: "GST Inspector", desc: "Under Central Board of Indirect Taxes and Customs (CBIC)." },
                  { rank: "6", title: "Preventive Officer / AEO", desc: "High authority executive roles in ports and enforcement." }
                ].map((job, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                    <span className="w-6 h-6 rounded-full bg-primary text-dark font-display font-black text-xs flex items-center justify-center shrink-0">
                      {job.rank}
                    </span>
                    <div>
                      <span className="text-xs font-black text-dark uppercase block mb-1">{job.title}</span>
                      <p className="text-[11px] text-muted leading-relaxed">{job.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Booklist */}
            <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-display font-black text-dark uppercase mb-6 pb-4 border-b border-gray-100">
                  Recommended Preparation Books
                </h3>
                <div className="space-y-4">
                  {[
                    { subject: "Quantitative Aptitude", books: "Quantitative Aptitude by R.S. Aggarwal / Fast Track Arithmetic" },
                    { subject: "Logical Reasoning", books: "Verbal and Non-Verbal Reasoning by R.S. Aggarwal" },
                    { subject: "English Comprehension", books: "Objective General English" },
                    { subject: "General Knowledge", books: "Lucent's General Knowledge & Current affairs digests" }
                  ].map((book, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-xl">
                      <span className="text-[10px] font-black text-primary uppercase block mb-1">{book.subject}</span>
                      <span className="text-xs font-bold text-dark">{book.books}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: DAILY STUDY TIMETABLE */}
          <section className="scroll-mt-32">
            <header className="mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <TrendingUp size={24} />
                </div>
                <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">Daily Study Routine</h2>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Day Schedule */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-display font-black text-dark uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                  <Clock size={18} className="text-primary" /> Daily Schedule Splits
                </h3>
                <div className="space-y-4">
                  {[
                    { slot: "Morning Session", duration: "2 Hours", focus: "Mathematics (Quant): Concepts & Speed formulas" },
                    { slot: "Afternoon Session", duration: "2 Hours", focus: "Logical Reasoning: Patterns, series, and puzzles" },
                    { slot: "Evening Session", duration: "1.5 Hours", focus: "English Grammar & Vocabulary building" },
                    { slot: "Night Session", duration: "1.5 Hours", focus: "General Awareness, Science & Current Affairs" }
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-start py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <span className="text-xs font-black text-dark uppercase block">{row.slot}</span>
                        <p className="text-[11px] text-muted leading-tight mt-1">{row.focus}</p>
                      </div>
                      <span className="text-xs font-black text-primary uppercase tracking-wider shrink-0 ml-4">{row.duration}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Targets */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-display font-black text-dark uppercase mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                    <Calendar size={18} className="text-primary" /> Target Drills
                  </h3>
                  <div className="space-y-4">
                    {[
                      { icon: "🔢", title: "50 Quant Questions Daily", desc: "Build logic and solve speed tests." },
                      { icon: "🧠", title: "50 Reasoning Questions Daily", desc: "Hone pattern recognition speeds." },
                      { icon: "📖", title: "20 English Questions & 30 GK Questions Daily", desc: "Consistent learning for vocabulary, static GK, and current affairs." }
                    ].map((target, idx) => (
                      <div key={idx} className="flex gap-4 p-3 bg-gray-50 rounded-2xl">
                        <span className="text-xl shrink-0">{target.icon}</span>
                        <div>
                          <span className="text-xs font-black text-dark uppercase block mb-0.5">{target.title}</span>
                          <p className="text-[11px] text-muted leading-relaxed">{target.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-primary rounded-2xl text-center text-xs font-bold text-dark uppercase tracking-wide mt-6">
                  ⚡ Consistency is key to cracking CGL. Track your daily numbers!
                </div>
              </div>
            </div>
          </section>

          {/* Academic callout */}
          <div className="p-10 bg-primary rounded-[2.5rem] text-center shadow-lg shadow-primary/20">
            <p className="text-2xl font-display font-black text-dark uppercase leading-tight">
              Access curated mock exams, previous year papers, and customized mentorship programs.
            </p>
          </div>

        </div>
      </main>

      {/* Footer CTA */}
      <section className="bg-white border-t border-gray-100 py-16 text-center relative overflow-hidden mt-12">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 z-0" />
        <div className="section-container relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-black text-dark uppercase mb-8 leading-tight">
             Secure Your Central <span className="text-primary text-glow">Govt Job</span>
          </h2>
          <p className="text-body mb-12 max-w-2xl mx-auto text-lg font-body">
             Prepare systematically with our specialized SSC coaching programs designed for the 2026 recruitment cycles.
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

export default SSCDetailsPage;

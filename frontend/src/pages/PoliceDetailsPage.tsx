import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  UserPlus, 
  Scale, 
  Dumbbell, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Utensils, 
  Zap, 
  Ruler, 
  Target,
  Users,
  Globe,
  ArrowRight,
  ChevronRight,
  Trophy
} from 'lucide-react';

interface PoliceDetailsPageProps {
  onBack: () => void;
  onRegister: () => void;
  setView: (view: any) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
}

export const PoliceDetailsPage: React.FC<PoliceDetailsPageProps> = ({
  onBack,
  onRegister,
  setView,
  setIsRegistrationModalOpen
}) => {
  const navigate = useNavigate();
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
              <span className="text-xl font-display font-black text-dark block leading-none">पोलीस भरती</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Maharashtra Police</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a 
              href="https://policerecruitment2024.mahait.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors flex items-center gap-2"
            >
              <Globe size={14} /> Recruitment Portal
            </a>
            <button 
              onClick={() => setIsRegistrationModalOpen(true)}
              className="btn-primary-new px-6 py-2.5 text-[10px]"
            >
              Start Training
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-0 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-[-20deg] origin-top translate-x-20" />
        <div className="section-container relative z-10">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-muted mb-4 hover:text-primary transition-colors"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Return to Courses</span>
          </button>
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-black text-dark leading-tight mb-4">
              Maharashtra <span className="text-primary text-glow">Police</span> <br />Bharti Training
            </h1>
            <p className="text-xl text-body font-body leading-relaxed max-w-3xl">
              Comprehensive orientation for the Maharashtra State Police recruitment. From application mastery to physical endurance and written exam excellence.
            </p>
          </div>
        </div>
      </header>

      <main className="py-0">
        <div className="section-container space-y-0">
          
          {/* SECTION 1: PROCESS */}
          <section className="scroll-mt-32">
            <header className="mb-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <UserPlus size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">अर्ज प्रक्रिया (Application Process)</h2>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all">
                <h3 className="text-lg font-display font-black text-dark uppercase mb-4">Recruitment Cycle</h3>
                <p className="text-sm text-body leading-relaxed">
                  Post-2019: Usually Written Exam followed by Physical Test. Note that sequence may change as per official notification.
                </p>
              </div>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all">
                <h3 className="text-lg font-display font-black text-dark uppercase mb-4">Multiple Applications</h3>
                <p className="text-sm text-body leading-relaxed">
                  Candidates can now apply for multiple posts (Driver, Bandsman) across different districts separately.
                </p>
              </div>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all">
                <h3 className="text-lg font-display font-black text-dark uppercase mb-4">Application Fee</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-xs text-muted uppercase font-bold">General</span>
                    <span className="text-sm font-black text-dark">₹450</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs text-muted uppercase font-bold">Reserved</span>
                    <span className="text-sm font-black text-dark">₹350</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm">
               <h3 className="text-2xl font-display font-black text-dark uppercase mb-8 flex items-center gap-3">
                 <FileText className="text-primary" /> आवश्यक कागदपत्रे (Required Documents)
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <ul className="space-y-4">
                     {[
                       "Educational Certificates (12th/10th)", 
                       "Domicile Certificate", 
                       "Caste Certificate (if applicable)",
                       "Non-Creamy Layer Certificate"
                     ].map((doc, i) => (
                       <li key={i} className="flex items-center gap-3 text-sm text-body">
                          <CheckCircle2 size={18} className="text-primary shrink-0" />
                          <span>{doc}</span>
                       </li>
                     ))}
                  </ul>
                  <ul className="space-y-4">
                     {[
                       "Driving License (for Driver post)", 
                       "Bandsman Certificate (if applicable)", 
                       "Sports Certificate (for reservation)",
                       "Valid Identity Proof (Aadhar/PAN)"
                     ].map((doc, i) => (
                       <li key={i} className="flex items-center gap-3 text-sm text-body">
                          <CheckCircle2 size={18} className="text-primary shrink-0" />
                          <span>{doc}</span>
                       </li>
                     ))}
                  </ul>
               </div>
            </div>
          </section>

          {/* SECTION 2: ELIGIBILITY */}
          <section className="scroll-mt-32">
            <header className="mb-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <ShieldCheck size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">पात्रता निकष (Eligibility Criteria)</h2>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                 { icon: Zap, label: "Education", val: "12th Pass for Constable, 10th for Driver/Bandsman." },
                 { icon: Clock, label: "Age Limit", val: "18 – 28 years (General), up to 33 years for Reserved." },
                 { icon: Ruler, label: "Height", val: "Male: 165cm+ | Female: 155cm+" },
                 { icon: Scale, label: "Weight", val: "Male: 50kg+ | Female: 45kg+" },
               ].map((item, i) => (
                 <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:border-primary transition-all">
                    <item.icon className="text-primary mb-6" size={28} />
                    <h4 className="text-sm font-display font-black text-dark uppercase mb-3">{item.label}</h4>
                    <p className="text-xs text-body leading-relaxed">{item.val}</p>
                 </div>
               ))}
            </div>
          </section>

          {/* SECTION 3: PHYSICAL TEST */}
          <section className="scroll-mt-32">
            <header className="mb-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Dumbbell size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">मैदानी चाचणी (Physical Endurance)</h2>
              </div>
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full" />
                  <h4 className="text-2xl font-display font-black uppercase text-dark mb-10 border-l-4 border-primary pl-6">Male (मुलांसाठी - 50 Marks)</h4>
                  <div className="space-y-8">
                     {[
                       { task: "1600m Running", sub: "Target: 5m 10s", pts: "20" },
                       { task: "100m Sprint", sub: "Target: 11.5s", pts: "15" },
                       { task: "Shot Put (7.25kg)", sub: "Target: 8.5m", pts: "15" }
                     ].map((row, i) => (
                       <div key={i} className="flex justify-between items-center group/item border-b border-gray-50 pb-6">
                          <div>
                            <h5 className="text-lg font-display font-black uppercase mb-1 text-dark">{row.task}</h5>
                            <p className="text-xs text-muted font-bold">{row.sub}</p>
                          </div>
                          <span className="text-3xl font-display font-black text-primary">{row.pts}</span>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm relative overflow-hidden group">
                  <h4 className="text-2xl font-display font-black uppercase text-dark mb-10 border-l-4 border-primary pl-6">Female (मुलींसाठी - 50 Marks)</h4>
                  <div className="space-y-8">
                     {[
                       { task: "800m Running", sub: "Target: 2m 50s", pts: "20" },
                       { task: "100m Sprint", sub: "Target: 14s", pts: "15" },
                       { task: "Shot Put (4kg)", sub: "Target: 6m", pts: "15" }
                     ].map((row, i) => (
                       <div key={i} className="flex justify-between items-center group/item border-b border-gray-50 pb-6">
                          <div>
                            <h5 className="text-lg font-display font-black uppercase mb-1 text-dark">{row.task}</h5>
                            <p className="text-xs text-muted font-bold">{row.sub}</p>
                          </div>
                          <span className="text-3xl font-display font-black text-primary">{row.pts}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </section>

          {/* SECTION 4: WRITTEN TEST */}
          <section className="scroll-mt-32">
            <header className="mb-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <FileText size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">लेखी परीक्षा (Written Assessment)</h2>
              </div>
            </header>
 
            <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                   <div className="lg:col-span-4 space-y-6">
                       <div className="p-8 bg-primary rounded-[2rem] text-dark">
                          <p className="text-[10px] font-bold text-dark/60 uppercase tracking-widest mb-2">Maximum Score</p>
                          <p className="text-5xl font-display font-black">100</p>
                       </div>
                      <div className="p-8 bg-gray-50 rounded-[2rem]">
                         <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">Duration</p>
                         <p className="text-2xl font-display font-black text-dark">90 Minutes</p>
                      </div>
                   </div>
                   <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {[
                        { t: "Arithmetic", d: "Number types, Profit/Loss, Time & Work", m: "25" },
                        { t: "Reasoning", d: "Logical codes, Relations, Directions", m: "25" },
                        { t: "Marathi Grammar", d: "Sandhi, Samas, Vocabulary", m: "25" },
                        { t: "GK & Current Affairs", d: "Geography, History, Appointments", m: "25" },
                      ].map((sub, i) => (
                        <div key={i} className="p-6 bg-white border border-gray-100 rounded-2xl hover:border-primary transition-all group">
                           <div className="flex justify-between items-start mb-3">
                              <h4 className="text-sm font-display font-black text-dark uppercase">{sub.t}</h4>
                              <span className="text-xs font-bold text-primary">{sub.m} Pts</span>
                           </div>
                           <p className="text-xs text-body leading-relaxed">{sub.d}</p>
                        </div>
                      ))}
                   </div>
                </div>
            </div>
          </section>
 
          {/* SECTION 5: STRATEGY */}
          <section className="scroll-mt-32">
            <header className="mb-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Target size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">यशस्वी दिनचर्या (Success Strategy)</h2>
              </div>
            </header>
 
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white rounded-3xl p-10 border border-gray-100 hover:shadow-xl transition-all">
                  <Utensils className="text-primary mb-8" size={32} />
                  <h3 className="text-xl font-display font-black text-dark uppercase mb-4 border-b-2 border-primary/20 pb-4">Balanced Diet</h3>
                  <ul className="space-y-4 text-sm text-body">
                    <li className="flex gap-3"><ChevronRight size={16} className="text-primary shrink-0" /> High protein intake (Pulses/Eggs)</li>
                    <li className="flex gap-3"><ChevronRight size={16} className="text-primary shrink-0" /> Green vegetables for stamina</li>
                    <li className="flex gap-3"><ChevronRight size={16} className="text-primary shrink-0" /> Maximum hydration (4L+ Water)</li>
                  </ul>
               </div>
               <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-xl shadow-primary/5">
                  <Clock className="text-primary mb-8" size={32} />
                  <h3 className="text-xl font-display font-black text-dark uppercase mb-4 border-b-2 border-primary/20 pb-4">Daily Routine</h3>
                  <ul className="space-y-4 text-sm text-body">
                    <li className="flex gap-3"><ChevronRight size={16} className="text-primary shrink-0" /> Minimum 7 hours of deep sleep</li>
                    <li className="flex gap-3"><ChevronRight size={16} className="text-primary shrink-0" /> Pre-dawn physical practice</li>
                    <li className="flex gap-3"><ChevronRight size={16} className="text-primary shrink-0" /> Regular newspaper analysis</li>
                  </ul>
               </div>
               <div className="bg-white rounded-3xl p-10 border border-gray-100 hover:shadow-xl transition-all">
                  <Users className="text-primary mb-8" size={32} />
                  <h3 className="text-xl font-display font-black text-dark uppercase mb-4 border-b-2 border-primary/20 pb-4">Smart Study</h3>
                  <ul className="space-y-4 text-sm text-body">
                    <li className="flex gap-3"><ChevronRight size={16} className="text-primary shrink-0" /> Solve last 5 years' papers</li>
                    <li className="flex gap-3"><ChevronRight size={16} className="text-primary shrink-0" /> Focus on repeated patterns</li>
                    <li className="flex gap-3"><ChevronRight size={16} className="text-primary shrink-0" /> Strategic notes for quick revision</li>
                  </ul>
               </div>
            </div>
 
            <div className="mt-16 p-10 bg-primary rounded-[2.5rem] text-center shadow-lg shadow-primary/20">
               <p className="text-2xl font-display font-black text-dark uppercase leading-tight">
                  Join BK Career Academy to experience disciplined training and expert mentorship.
               </p>
            </div>
          </section>
 
        </div>
      </main>
 
      {/* Footer CTA */}
      <section className="bg-white border-t border-gray-100 py-16 text-center relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-primary/5 z-0" />
         <div className="section-container relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-black text-dark uppercase mb-8 leading-tight">
               Answer the <span className="text-primary text-glow">Call</span> to Duty
            </h2>
            <p className="text-body mb-12 max-w-2xl mx-auto text-lg font-body">
               Your journey to wearing the uniform begins with the right guidance. Join our upcoming batch in Nashik.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <button onClick={onRegister} className="btn-primary-new px-12 py-5 text-lg group">
                  Apply for Batch 2026
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
 
export default PoliceDetailsPage;

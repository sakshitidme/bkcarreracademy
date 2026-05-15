import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Calendar, 
  CreditCard, 
  ClipboardList, 
  BookOpen, 
  Award, 
  Lightbulb, 
  Info,
  Globe,
  Zap,
  GraduationCap,
  Target,
  ChevronRight
} from 'lucide-react';

interface MAHATETDetailsPageProps {
  onBack: () => void;
  onRegister: () => void;
  setView: (view: any) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
}

export const MAHATETDetailsPage: React.FC<MAHATETDetailsPageProps> = ({
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
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-gray-100 h-20">
        <div className="section-container h-full flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setView('home')}
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-dark group-hover:scale-110 transition-transform">
              <Award size={20} />
            </div>
            <div>
              <span className="text-xl font-display font-black text-dark block leading-none">MAHA TET</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Teacher Excellence</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
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
      <header className="pt-20 pb-0 bg-white relative overflow-hidden">
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
              MAHA <span className="text-primary text-glow">TET</span> 2026 <br />Elite Coaching
            </h1>
            <p className="text-xl text-body font-body leading-relaxed max-w-3xl">
              'महाराष्ट्र शिक्षक पात्रता परीक्षा' (MAHA TET) - A state-level gateway for aspiring teachers (Std 1st to 8th). Get mentored by industry experts at BK Academy.
            </p>
          </div>
        </div>
      </header>

      <main className="py-0">
        <div className="section-container space-y-0">
          
          {/* TIMELINE */}
          <section className="scroll-mt-32">
            <header className="mb-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Calendar size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">महत्त्वाच्या तारखा (Key Timeline)</h2>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                 { label: "Notification", date: "March 26, 2026", status: "Released" },
                 { label: "Registration Start", date: "March 27, 2026", status: "Active" },
                 { label: "Last Date", date: "April 24, 2026", status: "Extended", highlight: true },
                 { label: "Exam Date", date: "June 21, 2026", status: "Upcoming" },
               ].map((item, i) => (
                 <div key={i} className={`rounded-3xl p-8 border transition-all ${item.highlight ? 'bg-dark border-dark text-white shadow-xl shadow-primary/10' : 'bg-white border-gray-100 hover:shadow-xl hover:shadow-primary/5'}`}>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${item.highlight ? 'text-primary' : 'text-muted'}`}>{item.label}</p>
                    <p className="text-2xl font-display font-black mb-4">{item.date}</p>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${item.highlight ? 'bg-primary text-dark' : 'bg-gray-50 text-muted'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${item.highlight ? 'bg-dark animate-pulse' : 'bg-muted'}`} />
                      {item.status}
                    </div>
                 </div>
               ))}
            </div>
          </section>

          {/* ELIGIBILITY */}
          <section className="scroll-mt-32">
            <header className="mb-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <GraduationCap size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">पात्रता निकष (Eligibility)</h2>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4">Paper I</div>
                  <h4 className="text-3xl font-display font-black text-dark mb-8">Std 1st to 5th</h4>
                  <div className="space-y-6">
                     {[
                       "Higher Secondary (HSC) with 50% marks.",
                       "D.T.Ed / D.Ed (2-year diploma) completed.",
                       "OR Graduate with 50% marks and B.Ed."
                     ].map((text, i) => (
                       <div key={i} className="flex gap-4">
                         <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                           <CheckCircle2 size={14} />
                         </div>
                         <p className="text-sm text-body leading-relaxed">{text}</p>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="bg-white border border-gray-100 rounded-[3rem] p-12 relative overflow-hidden group shadow-sm">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full" />
                  <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4">Paper II</div>
                  <h4 className="text-3xl font-display font-black text-dark mb-8">Std 6th to 8th</h4>
                  <div className="space-y-6">
                     {[
                       "Graduate with minimum 45% marks.",
                       "B.Ed. degree completed from recognized uni.",
                       "OR HSC with 50% + B.El.Ed / B.A.Ed."
                     ].map((text, i) => (
                       <div key={i} className="flex gap-4">
                         <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                           <CheckCircle2 size={14} />
                         </div>
                         <p className="text-sm text-body leading-relaxed">{text}</p>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </section>

          {/* APPLICATION STEPS */}
          <section className="scroll-mt-32">
            <header className="mb-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <ClipboardList size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">अर्ज प्रक्रिया (Step-by-Step)</h2>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { step: "01", text: "Visit official website mahatet.in" },
                 { step: "02", text: "Click on 'New Registration' button" },
                 { step: "03", text: "Receive ID & Password via SMS" },
                 { step: "04", text: "Login to enter the application" },
                 { step: "05", text: "Fill details & upload documents" },
                 { step: "06", text: "Verify information in Preview" },
                 { step: "07", text: "Pay application fee online" },
                 { step: "08", text: "Download application for reference" },
               ].map((item, i) => (
                 <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-primary transition-all group">
                    <span className="text-4xl font-display font-black text-gray-100 group-hover:text-primary/20 transition-colors block mb-4">{item.step}</span>
                    <p className="text-sm font-bold text-dark leading-relaxed">{item.text}</p>
                 </div>
               ))}
            </div>
          </section>

          {/* FEES */}
          <section className="scroll-mt-32">
            <header className="mb-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <CreditCard size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">अर्ज शुल्क (Fee Structure)</h2>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-display font-black text-dark uppercase mb-10 border-l-4 border-primary pl-6">SC / ST / PwD Candidates</h3>
                  <div className="space-y-6">
                     <div className="flex justify-between items-center py-6 border-b border-gray-50">
                        <span className="text-body font-bold">Single Paper (I or II)</span>
                        <span className="text-3xl font-display font-black text-dark">₹700</span>
                     </div>
                     <div className="flex justify-between items-center py-6">
                        <span className="text-body font-bold">Both Papers (I + II)</span>
                        <span className="text-3xl font-display font-black text-dark">₹900</span>
                     </div>
                  </div>
               </div>

               <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-xl shadow-primary/5">
                  <h3 className="text-xl font-display font-black text-dark uppercase mb-10 border-l-4 border-primary pl-6">General / OBC / EWS</h3>
                  <div className="space-y-6">
                     <div className="flex justify-between items-center py-6 border-b border-gray-50">
                        <span className="text-body font-bold">Single Paper (I or II)</span>
                        <span className="text-3xl font-display font-black text-primary">₹1000</span>
                     </div>
                     <div className="flex justify-between items-center py-6">
                        <span className="text-body font-bold">Both Papers (I + II)</span>
                        <span className="text-3xl font-display font-black text-primary">₹1200</span>
                     </div>
                  </div>
               </div>
            </div>
            <p className="mt-8 text-center text-xs font-bold text-muted uppercase tracking-widest italic">
               Fees are accepted via Online Payment only.
            </p>
          </section>

          {/* EXAM PATTERN */}
          <section className="scroll-mt-32">
            <header className="mb-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Target size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">परीक्षेचा नमुना (Exam Pattern)</h2>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
                  <div className="bg-gray-50 border-b border-gray-100 p-6 text-center">
                    <h4 className="text-lg font-display font-black text-dark uppercase">Paper I: Std 1st to 5th</h4>
                  </div>
                  <div className="p-8">
                     <table className="w-full text-sm">
                        <thead>
                           <tr className="text-[10px] font-black text-muted uppercase border-b border-gray-100">
                              <th className="text-left pb-4">Subject</th>
                              <th className="text-center pb-4">Questions</th>
                              <th className="text-right pb-4">Marks</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                           {[
                             { s: "Child Development", q: "30", m: "30" },
                             { s: "Language 1", q: "30", m: "30" },
                             { s: "Language 2", q: "30", m: "30" },
                             { s: "Mathematics", q: "30", m: "30" },
                             { s: "Environmental Studies", q: "30", m: "30" },
                           ].map((row, i) => (
                             <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 font-bold text-dark">{row.s}</td>
                                <td className="py-4 text-center text-body">{row.q}</td>
                                <td className="py-4 text-right font-black text-primary">{row.m}</td>
                             </tr>
                           ))}
                        </tbody>
                        <tfoot>
                           <tr className="bg-gray-50">
                              <td className="p-4 font-display font-black text-dark">Total</td>
                              <td className="p-4 text-center font-black text-dark">150</td>
                              <td className="p-4 text-right font-display font-black text-primary">150</td>
                           </tr>
                        </tfoot>
                     </table>
                  </div>
               </div>

               <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
                  <div className="bg-primary p-6 text-dark text-center">
                    <h4 className="text-lg font-display font-black uppercase">Paper II: Std 6th to 8th</h4>
                  </div>
                  <div className="p-8">
                     <table className="w-full text-sm">
                        <thead>
                           <tr className="text-[10px] font-black text-muted uppercase border-b border-gray-100">
                              <th className="text-left pb-4">Subject</th>
                              <th className="text-center pb-4">Questions</th>
                              <th className="text-right pb-4">Marks</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                           {[
                             { s: "Child Development", q: "30", m: "30" },
                             { s: "Language 1", q: "30", m: "30" },
                             { s: "Language 2", q: "30", m: "30" },
                             { s: "Maths/Science or SS", q: "60", m: "60" },
                           ].map((row, i) => (
                             <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 font-bold text-dark">{row.s}</td>
                                <td className="py-4 text-center text-body">{row.q}</td>
                                <td className="py-4 text-right font-black text-primary">{row.m}</td>
                             </tr>
                           ))}
                        </tbody>
                        <tfoot>
                           <tr className="bg-gray-50">
                              <td className="p-4 font-display font-black text-dark">Total</td>
                              <td className="p-4 text-center font-black text-dark">150</td>
                              <td className="p-4 text-right font-display font-black text-primary">150</td>
                           </tr>
                        </tfoot>
                     </table>
                  </div>
               </div>
            </div>
          </section>

          {/* QUALIFYING MARKS */}
          <section className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-xl shadow-primary/5">
            <header className="mb-12 border-b border-gray-100 pb-8">
              <div className="flex items-center gap-4 mb-2">
                <Award className="text-primary" size={28} />
                <h2 className="text-3xl font-display font-black text-dark uppercase">पात्रता गुण (Pass Criteria)</h2>
              </div>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="bg-gray-50 p-10 rounded-3xl">
                  <h3 className="text-sm font-bold text-muted uppercase tracking-widest mb-4">General Category</h3>
                  <div className="flex items-baseline gap-4">
                     <span className="text-6xl font-display font-black text-dark">60%</span>
                     <span className="text-lg font-bold text-muted">(90 / 150)</span>
                  </div>
               </div>
               <div className="bg-primary/10 p-10 rounded-3xl">
                  <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Reserved (SC/ST/PwD)</h3>
                  <div className="flex items-baseline gap-4">
                     <span className="text-6xl font-display font-black text-dark">55%</span>
                     <span className="text-lg font-bold text-primary">(82 / 150)</span>
                  </div>
               </div>
            </div>
          </section>

          {/* EXPERT TIPS */}
          <section className="scroll-mt-32">
            <header className="mb-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Lightbulb size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">यशस्वी तयारीच्या टिप्स (Expert Tips)</h2>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { t: "Foundations", d: "Master the fundamental concepts of Child Psychology & Pedagogy." },
                 { t: "Study Material", d: "Follow official SCERT textbooks and BK Academy's curated notes." },
                 { t: "Mock Tests", d: "Solve at least 20 full-length mock tests to improve time management." },
                 { t: "Current Affairs", d: "Stay updated with recent changes in education policies and GK." },
                 { t: "Revision", d: "Strategic revision cycles every week to ensure better retention." },
                 { t: "Question Pattern", d: "Analyze previous years' papers to identify high-weightage topics." }
               ].map((tip, i) => (
                 <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-all">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-dark mb-6">
                       <Zap size={18} />
                    </div>
                    <h3 className="text-lg font-display font-black text-dark uppercase mb-3">{tip.t}</h3>
                    <p className="text-xs text-body leading-relaxed font-bold">{tip.d}</p>
                 </div>
               ))}
            </div>
          </section>

          {/* LIFECYCLE INFO */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { icon: <ClipboardList size={24} />, title: "Answer Key", sub: "Released soon after exam" },
               { icon: <Info size={24} />, title: "Admit Card", sub: "Available 10 days before" },
               { icon: <Target size={24} />, title: "Cut-Off", sub: "Announced with results" },
               { icon: <Award size={24} />, title: "Results", sub: "Published on portal" }
             ].map((item, i) => (
               <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 flex flex-col items-center text-center">
                  <div className="text-primary mb-6">{item.icon}</div>
                  <h3 className="text-lg font-display font-black text-dark mb-2">{item.title}</h3>
                  <p className="text-xs text-muted font-bold">{item.sub}</p>
               </div>
             ))}
          </section>

        </div>
      </main>

      {/* Footer CTA */}
      <section className="bg-white border-t border-gray-100 py-16 text-center relative overflow-hidden">
         <div className="section-container relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-black text-dark uppercase mb-8 leading-tight">
               Shape the <span className="text-primary text-glow">Future</span> of Education
            </h2>
            <p className="text-body mb-12 max-w-2xl mx-auto text-lg font-body">
               Expert guidance for MAHA TET Paper I & II. Join Nashik's premier coaching for teachers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <button onClick={onRegister} className="btn-primary-new px-12 py-5 text-lg group">
                  Enroll for Batch 2026
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

export default MAHATETDetailsPage;

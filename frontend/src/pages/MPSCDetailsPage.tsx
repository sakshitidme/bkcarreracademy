import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  BookOpen, 
  GraduationCap, 
  Trophy, 
  Info, 
  CheckCircle2, 
  ListChecks, 
  Calendar, 
  Users,
  Coins,
  History,
  Globe2,
  PieChart,
  ShieldCheck,
  Zap,
  Globe,
  Monitor,
  Dna,
  Scale,
  ArrowRight,
  FileText,
  ChevronRight
} from 'lucide-react';

interface MPSCDetailsPageProps {
  onBack: () => void;
  onRegister: () => void;
  setView: (view: any) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
}

export const MPSCDetailsPage: React.FC<MPSCDetailsPageProps> = ({
  onBack,
  onRegister,
  setView,
  setIsRegistrationModalOpen
}) => {
  const navigate = useNavigate();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

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
              <Trophy size={20} />
            </div>
            <div>
              <span className="text-xl font-display font-black text-dark block leading-none">MPSC</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Guidance Portal</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
             <button onClick={() => scrollToSection('group-b')} className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors">Group B</button>
             <button onClick={() => scrollToSection('group-c')} className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors">Group C</button>
             <button onClick={() => scrollToSection('syllabus')} className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors">Syllabus</button>
             <button 
              onClick={() => setIsRegistrationModalOpen(true)}
              className="btn-primary-new px-6 py-2.5 text-[10px]"
            >
              Consult Mentor
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
              Maharashtra <span className="text-primary text-glow">Combined</span> <br />Services Exam
            </h1>
            <p className="text-xl text-body font-body leading-relaxed max-w-3xl">
              Strategic orientation for MPSC Group B and Group C recruitment. Navigate your roadmap to administrative excellence with Nashik's premier guidance institute.
            </p>
          </div>
        </div>
      </header>

      <main className="py-0">
        <div className="section-container space-y-0">
          
          {/* SECTION 1: GROUP B DETAILS */}
          <section id="group-b" className="scroll-mt-32">
            <header className="mb-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <BookOpen size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">Group B (गट ब) Orientation</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {["PSI", "STI", "ASO", "S-14 Scale"].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[10px] font-bold text-muted uppercase tracking-widest">{tag}</span>
                ))}
              </div>
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-1">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <GraduationCap size={20} />
                </div>
                <h3 className="text-lg font-display font-black text-dark uppercase mb-4">Educational Criteria</h3>
                <ul className="space-y-3 text-sm text-body leading-relaxed">
                  <li className="flex gap-2">
                    <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                    Degree from a recognized university.
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                    Final year students are eligible for Prelims.
                  </li>
                  <li className="flex gap-2 font-bold text-dark">
                    <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                    Proficiency in Marathi is mandatory.
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <ListChecks size={20} />
                </div>
                <h3 className="text-lg font-display font-black text-dark uppercase mb-4">Physical Standards (PSI)</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Male Candidates</p>
                    <p className="text-sm text-dark font-bold">Height: 165 cm | Chest: 79 cm</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Female Candidates</p>
                    <p className="text-sm text-dark font-bold">Height: 157 cm</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <Calendar size={20} />
                </div>
                <h3 className="text-lg font-display font-black text-dark uppercase mb-4">Age Limit</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-[10px] font-bold text-muted uppercase">General</span>
                    <span className="text-sm font-bold text-dark">18 – 43 Years</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-[10px] font-bold text-muted uppercase">PSI Specific</span>
                    <span className="text-sm font-bold text-dark">19 – 31 Years</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted">Post Name</th>
                      <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted">Exam Type</th>
                      <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted text-center">Prelims</th>
                      <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted text-center">Mains</th>
                      <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted text-center">Physical</th>
                      <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted text-center">Interview</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { name: "State Tax Inspector (STI)", type: "Combined Prelims + Separate Mains", pre: "100", main: "400", physical: "—", interview: "—" },
                      { name: "Assistant Section Officer (ASO)", type: "Combined Prelims + Separate Mains", pre: "100", main: "400", physical: "—", interview: "—" },
                      { name: "Sub-Registrar", type: "Combined Prelims + Separate Mains", pre: "100", main: "400", physical: "—", interview: "—" },
                      { name: "Police Sub-Inspector (PSI)", type: "Combined Prelims + Mains + Physical + PI", pre: "100", main: "400", physical: "100", interview: "40" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-6 text-sm font-bold text-dark">{row.name}</td>
                        <td className="px-8 py-6 text-xs text-body">{row.type}</td>
                        <td className="px-8 py-6 text-sm font-black text-dark text-center">{row.pre}</td>
                        <td className="px-8 py-6 text-sm font-black text-dark text-center">{row.main}</td>
                        <td className="px-8 py-6 text-sm font-bold text-muted text-center">{row.physical}</td>
                        <td className="px-8 py-6 text-sm font-bold text-muted text-center">{row.interview}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* SECTION 2: GROUP C DETAILS */}
          <section id="group-c" className="scroll-mt-32">
            <header className="mb-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Monitor size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">Group C (गट क) Orientation</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Clerk-Typist", "Tax Asst", "Excise Sub-Insp", "Typing Test"].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[10px] font-bold text-muted uppercase tracking-widest">{tag}</span>
                ))}
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-display font-black text-dark uppercase mb-6">Selection Matrix</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gray-50 rounded-2xl">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Combined Prelims</p>
                      <p className="text-2xl font-display font-black text-dark">100 Marks</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-2xl">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Mains Exam</p>
                      <p className="text-2xl font-display font-black text-dark">200 Marks</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 border border-dashed border-gray-200 rounded-2xl flex items-center gap-3">
                    <Info size={16} className="text-primary shrink-0" />
                    <p className="text-xs text-body italic">Typing test is mandatory for Clerk-Typist positions.</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-display font-black text-dark uppercase mb-6">Eligibility Benchmarks</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-primary mt-1" />
                      <div>
                        <p className="text-sm font-bold text-dark">Educational Background</p>
                        <p className="text-xs text-body">Graduation in any discipline. Must be completed by the time of Mains application.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-primary mt-1" />
                      <div>
                        <p className="text-sm font-bold text-dark">Age Eligibility</p>
                        <p className="text-xs text-body">18 – 38 years for General, with relaxations for Reserved and PWD candidates.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-[3rem] p-12 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[100px] rounded-full" />
                <h3 className="text-2xl font-display font-black text-dark uppercase mb-8 border-l-4 border-primary pl-6">Combined Exam Pattern</h3>
                <div className="space-y-10">
                  <div className="flex items-center justify-between group">
                    <span className="text-muted font-bold uppercase tracking-widest text-[10px]">Total Questions</span>
                    <span className="text-3xl font-display font-black text-primary">100</span>
                  </div>
                  <div className="flex items-center justify-between group">
                    <span className="text-muted font-bold uppercase tracking-widest text-[10px]">Total Marks</span>
                    <span className="text-3xl font-display font-black text-primary">100</span>
                  </div>
                  <div className="flex items-center justify-between group">
                    <span className="text-muted font-bold uppercase tracking-widest text-[10px]">Time Duration</span>
                    <span className="text-xl font-display font-black text-dark">60 Minutes</span>
                  </div>
                  <div className="flex items-center justify-between group">
                    <span className="text-muted font-bold uppercase tracking-widest text-[10px]">Negative Marking</span>
                    <span className="text-sm font-bold text-primary">0.25 (1/4th)</span>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                  <p className="text-xs text-muted italic">MCQ Based Objective Format</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: SALARY & SCHEDULE */}
          <section id="salary-schedule" className="grid grid-cols-1 lg:grid-cols-2 gap-12 scroll-mt-32">
             <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Coins size={24} />
                  </div>
                  <h3 className="text-2xl font-display font-black text-dark uppercase">Remuneration Matrix</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { post: "Assistant Section Officer (ASO)", scale: "S-14 Scale" },
                    { post: "State Tax Inspector (STI)", scale: "S-14 Scale" },
                    { post: "Police Sub-Inspector (PSI)", scale: "S-14 Scale" }
                  ].map((item, i) => (
                    <div key={i} className="group p-6 bg-gray-50 rounded-2xl hover:bg-white border border-transparent hover:border-gray-100 transition-all flex justify-between items-center">
                      <div>
                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">MPSC Group B</p>
                        <h4 className="text-sm font-bold text-dark uppercase">{item.post}</h4>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-primary uppercase mb-1">{item.scale}</p>
                        <p className="text-lg font-display font-black text-dark">₹38.6K – 1.2L</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>

             <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <History size={24} />
                  </div>
                  <h3 className="text-2xl font-display font-black text-dark uppercase">Strategic Timeline</h3>
                </div>
                <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
                  {[
                    { t: "Notification Release", d: "January 2026", active: true },
                    { t: "Preliminary Examination", d: "April 2026", active: true },
                    { t: "Prelims Result", d: "June 2026" },
                    { t: "Main Examination", d: "September 2026", active: true },
                    { t: "Final Merit List", d: "December 2026" },
                  ].map((step, i) => (
                    <div key={i} className="relative pl-10">
                      <div className={`absolute left-0 top-1.5 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center transition-all ${step.active ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-gray-100'}`}>
                        {step.active && <CheckCircle2 size={12} className="text-dark" />}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">{step.t}</p>
                        <p className={`text-lg font-display font-black uppercase ${step.active ? 'text-dark' : 'text-muted'}`}>{step.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </section>

          {/* SECTION 4: SYLLABUS */}
          <section id="syllabus" className="scroll-mt-32">
            <header className="mb-1 text-center max-w-3xl mx-auto">
              <p className="label-text mb-4">Curriculum Insight</p>
              <h2 className="section-heading text-center">Comprehensive <span className="text-primary text-glow">Syllabus</span></h2>
              <p className="body-text text-center mt-4 italic">Combined syllabus architecture for Joint Group B & C Examinations.</p>
            </header>

            <div className="space-y-1">
              {/* Prelims Syllabus */}
              <div className="space-y-8">
                <h3 className="text-2xl font-display font-black text-dark uppercase border-l-4 border-primary pl-6">I. Preliminary Roadmap</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                   {[
                     { t: "Current Affairs", d: "Global, National, and Regional events with focus on Maharashtra." },
                     { t: "Polity & Civic", d: "Constitution, State Management, Local Self-Government (Panchayat Raj)." },
                     { t: "History", d: "Modern Indian History with special focus on Maharashtra's social reform." },
                     { t: "Geography", d: "Earth, Climate, Rivers, Crops, and Industry in Maharashtra." },
                     { t: "Economics", d: "Banking, Population, Poverty, and Maharashtra's State Budget." },
                     { t: "General Science", d: "Physics, Chemistry, Botany, Zoology, and Public Hygiene." },
                     { t: "Mathematics", d: "Arithmetic, Logical Reasoning, and Data Interpretation." },
                     { t: "Aptitude", d: "Decision making and quick problem-solving techniques." },
                   ].map((sub, i) => (
                     <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-primary/50 transition-all group">
                       <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">{sub.t}</h4>
                       <p className="text-sm text-body leading-relaxed">{sub.d}</p>
                     </div>
                   ))}
                </div>
              </div>

              {/* Mains Syllabus */}
              <div className="space-y-8">
                <h3 className="text-2xl font-display font-black text-dark uppercase border-l-4 border-primary pl-6">II. Mains Specialization</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white border border-gray-100 rounded-[3rem] p-12 relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
                    <h4 className="text-2xl font-display font-black text-dark uppercase mb-8 border-b border-gray-100 pb-4">Joint Paper 1 (Common)</h4>
                    <div className="space-y-8">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">01</div>
                        <div>
                          <h5 className="text-lg font-display font-black text-dark uppercase mb-2">Marathi Language</h5>
                          <p className="text-sm text-body leading-relaxed">Grammar, Vocabulary, Comprehension, and Marathi Literature orientation.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">02</div>
                        <div>
                          <h5 className="text-lg font-display font-black text-dark uppercase mb-2">English Language</h5>
                          <p className="text-sm text-body leading-relaxed">Professional English, Sentence Structure, and Functional Grammar.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm">
                    <h4 className="text-2xl font-display font-black text-dark uppercase mb-8 border-b border-gray-50 pb-4">Paper 2 Core Matrix</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Logical Reasoning",
                        "RTI Act 2005",
                        "Indian Constitution",
                        "Maharashtra Geography",
                        "Economic Planning",
                        "Human Rights"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl group hover:bg-primary transition-colors cursor-default">
                          <CheckCircle2 size={16} className="text-primary group-hover:text-dark shrink-0" />
                          <span className="text-[10px] font-bold uppercase tracking-tight text-dark group-hover:text-dark">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer CTA */}
      <section className="bg-white border-t border-gray-100 py-16 text-center relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-primary/5 z-0" />
         <div className="section-container relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-black text-dark uppercase mb-8 leading-tight">
               Ready to <span className="text-primary text-glow">Lead</span> Maharashtra?
            </h2>
            <p className="text-body mb-12 max-w-2xl mx-auto text-lg">
               Our batches are more than just classes; they are a transformative experience designed to build the administrators of tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <button onClick={onRegister} className="btn-primary-new px-12 py-5 text-lg group">
                  Join Strategic Batch 2026
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

      {/* Mobile Floating Nav */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] md:hidden">
         <div className="bg-white/80 backdrop-blur-xl border border-gray-100 p-2 rounded-full flex gap-2 shadow-2xl">
            <button onClick={() => scrollToSection('group-b')} className="w-12 h-12 bg-primary text-dark rounded-full flex items-center justify-center active:scale-95 transition-all"><BookOpen size={20} /></button>
            <button onClick={() => scrollToSection('group-c')} className="w-12 h-12 bg-dark text-white rounded-full flex items-center justify-center active:scale-95 transition-all"><Monitor size={20} /></button>
            <button onClick={() => scrollToSection('syllabus')} className="w-12 h-12 bg-primary text-dark rounded-full flex items-center justify-center active:scale-95 transition-all"><PieChart size={20} /></button>
         </div>
      </div>
    </motion.div>
  );
};

export default MPSCDetailsPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Globe, 
  Search,
  ChevronRight,
  BookOpen,
  Calendar,
  FileText,
  Award,
  Info,
  Clock,
  ShieldCheck,
  Zap,
  Target,
  Users,
  Trophy,
  PieChart,
  Layout,
  ListChecks,
  Scale,
  ArrowRight,
  AlertCircle,
  Check,
  GraduationCap
} from 'lucide-react';

interface UPSCDetailsPageProps {
  onBack: () => void;
  onRegister: () => void;
  setView: (view: any) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
}

export const UPSCDetailsPage: React.FC<UPSCDetailsPageProps> = ({
  onBack,
  onRegister,
  setView,
  setIsRegistrationModalOpen
}) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = React.useState('overview');

  const menuItems = [
    { id: 'calendar', title: 'Calendar', icon: Calendar, url: 'https://upsc.gov.in/examinations/exam-calendar' },
    { id: 'active', title: 'Active Examinations', icon: Zap, url: 'https://upsc.gov.in/examinations/active-exams' },
    { id: 'forthcoming', title: 'Forthcoming Examinations', icon: Clock, url: 'https://upsc.gov.in/examinations/forthcoming-exams' },
    { id: 'pyq', title: 'Previous Year Question Papers', icon: History, url: 'https://upsc.gov.in/examinations/previous-question-papers' },
    { id: 'cutoff', title: 'Cut-off Marks', icon: Target, url: 'https://upsc.gov.in/examinations/cutoff-marks--' },
    { id: 'answerkeys', title: 'Answer Keys', icon: ListChecks, url: 'https://upsc.gov.in/examinations/answer-key' },
    { id: 'marks', title: 'Marks Information', icon: Info, url: 'https://upsconline.gov.in/marksheet/exam/marksheet_system/' },
    { id: 'recommended', title: 'Marks of Recommended Candidates', icon: Award, url: 'https://upsc.gov.in/examinations/marks-recommended-candidates' },
    { id: 'reserve', title: 'Marks of Recommended Candidates (Reserve List)', icon: Scale, url: 'https://upsc.gov.in/examinations/marks-recommended-candidates-reserve-list' },
    { id: 'pratibha', title: 'UPSC Pratibha Setu', icon: Globe, url: 'https://upsconline.gov.in/miscellaneous/pdoiac/' },
    { id: 'qcab', title: 'Specimen Question Cum Answer Booklets', icon: FileText, url: 'https://upsc.gov.in/examination/model-question-and-answer-booklets' },
    { id: 'mistakes', title: 'Common mistakes committed by the candidates in Conventional Papers', icon: ShieldCheck, url: 'https://upsc.gov.in/examination/common-mistakes-committed-candidates-conventional-papers' },
    { id: 'revised', title: 'Revised Syllabus and Scheme', icon: Layout, url: 'https://upsc.gov.in/examinations/revised-syllabus-scheme' },
    { id: 'representation', title: 'Representation on Question Papers', icon: Users, url: 'https://upsc.gov.in/examination/time-frame-representation' },
    { id: 'demo', title: 'Demo Files', icon: BookOpen, url: 'https://upsc.gov.in/examinations/demo-files-computer-based-combined-medical-service-examination' },
  ];

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
              <ShieldCheck size={20} />
            </div>
            <div>
              <span className="text-xl font-display font-black text-dark block leading-none">UPSC HUB</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Elite Civil Services</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
             <button onClick={() => scrollToSection('exams')} className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors">Civil Services</button>
             <button onClick={() => scrollToSection('resources')} className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors">Resources</button>
             <button onClick={() => scrollToSection('strategy')} className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors">Roadmap</button>
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
              Union Public Service <span className="text-primary text-glow">Commission</span> <br />Excellence Hub
            </h1>
            <p className="text-xl text-body font-body leading-relaxed max-w-3xl">
              Premier official resources for IAS, IPS, IFS and Central Group 'A' services. Mastering the standard of administrative excellence.
            </p>
          </div>
        </div>
      </header>

      <main className="py-8">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sidebar Menu - From Screenshot */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl sticky top-36">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-8 bg-primary rounded-full"></div>
                  <h3 className="text-xl font-display font-black text-dark uppercase tracking-tight">Examination Corner</h3>
                </div>
                
                <div className="space-y-1">
                  {menuItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <item.icon size={18} />
                        </div>
                        <span className="text-[10px] font-bold text-dark uppercase tracking-tight leading-tight">{item.title}</span>
                      </div>
                      <ChevronRight size={14} className="text-muted group-hover:translate-x-1 transition-transform" />
                    </a>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-50">
                   <a 
                    href="https://upsc.gov.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-primary text-dark py-4 rounded-xl font-display font-black uppercase text-[10px] tracking-widest hover:bg-dark hover:text-primary transition-all shadow-lg"
                   >
                     <Globe size={16} /> Official UPSC Portal
                   </a>
                </div>
              </div>
            </aside>

            {/* Content Area */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Overview Section */}
              <section id="overview" className="scroll-mt-32">
                <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
                  <header className="mb-12 relative z-10">
                    <p className="label-text mb-4">Strategic Overview</p>
                    <h2 className="text-4xl font-display font-black text-dark uppercase mb-6">Administrative <span className="text-primary">Mastery</span></h2>
                    <p className="body-text text-lg">
                      The Union Public Service Commission (UPSC) is India's premier central recruiting agency for Group 'A' and Group 'B' services, including the prestigious IAS, IPS, and IFS.
                    </p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="bg-gray-50 rounded-3xl p-8 border border-transparent hover:border-primary/20 transition-all">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-6">
                        <Target size={24} />
                      </div>
                      <h4 className="text-lg font-display font-black text-dark uppercase mb-4">Core Competency</h4>
                      <p className="text-sm text-body leading-relaxed">
                        Evaluates ethical judgment, analytical depth, and comprehensive knowledge across history, geography, economy, and current affairs.
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-3xl p-8 border border-transparent hover:border-primary/20 transition-all">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-6">
                        <Zap size={24} />
                      </div>
                      <h4 className="text-lg font-display font-black text-dark uppercase mb-4">Three-Tier Selection</h4>
                      <p className="text-sm text-body leading-relaxed">
                        Rigorous screening via Prelims, in-depth evaluation via Mains, and final personality assessment through the Interview stage.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Major Examinations */}
              <section id="exams" className="scroll-mt-32 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <ListChecks size={24} />
                  </div>
                  <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">Prestigious Services</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "IAS", desc: "Indian Administrative Service - The backbone of Indian administration.", code: "CSE" },
                    { title: "IPS", desc: "Indian Police Service - Ensuring internal security and public order.", code: "CSE" },
                    { title: "IFS", desc: "Indian Foreign Service - Representing India on the global stage.", code: "CSE" },
                    { title: "IFoS", desc: "Indian Forest Service - Specialized service for environment conservation.", code: "IFS" }
                  ].map((exam, i) => (
                    <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-primary/5 transition-all group">
                      <div className="flex justify-between items-start mb-6">
                        <h4 className="text-xl font-display font-black text-dark uppercase group-hover:text-primary transition-colors">{exam.title}</h4>
                        <span className="px-3 py-1 bg-gray-50 rounded-lg text-[9px] font-black text-muted uppercase tracking-widest">{exam.code}</span>
                      </div>
                      <p className="text-sm text-body leading-relaxed mb-6">{exam.desc}</p>
                      <button 
                        onClick={onRegister}
                        className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest hover:gap-4 transition-all"
                      >
                        Preparation Guide <ArrowRight size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
              {/* Government Gateways Section */}
              <section id="gateways" className="scroll-mt-32">
                <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
                  <header className="mb-12 relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <Globe size={24} />
                      </div>
                      <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">Official Gateways</h2>
                    </div>
                    <p className="body-text">Direct access to verified Union Public Service Commission (UPSC) portals.</p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                    {[
                      { title: "Main Portal", url: "https://upsc.gov.in", desc: "Official home of UPSC" },
                      { title: "Apply Online", url: "https://upsconline.nic.in", desc: "OTR & Application portal" },
                      { title: "Active Exams", url: "https://upsc.gov.in/examinations/active-exams", desc: "Current notifications" },
                      { title: "Exam Calendar", url: "https://upsc.gov.in/examinations/exam-calendar", desc: "Schedule for 2026" }
                    ].map((link, i) => (
                      <a 
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-6 bg-gray-50 rounded-[2rem] border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <ExternalLink size={18} />
                          </div>
                        </div>
                        <h5 className="font-display font-black text-dark uppercase text-sm mb-1">{link.title}</h5>
                        <p className="text-[10px] font-bold text-muted uppercase tracking-tight">{link.desc}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </section>

              {/* Eligibility & Standards Section */}
              <section id="eligibility" className="scroll-mt-32">
                <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
                  <header className="mb-12 relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <GraduationCap size={24} />
                      </div>
                      <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">Eligibility Matrix</h2>
                    </div>
                    <p className="body-text">Core requirements for the Civil Services Examination (CSE).</p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    {/* Qualification */}
                    <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-primary/20 transition-all">
                      <h4 className="text-lg font-display font-black text-dark uppercase mb-6 flex items-center gap-3">
                        <BookOpen size={20} className="text-primary" /> Qualification
                      </h4>
                      <ul className="space-y-4 text-sm text-body font-bold uppercase tracking-tight">
                        <li className="flex items-start gap-3">
                          <Check size={16} className="text-primary mt-0.5 shrink-0" />
                          <span>Graduate degree in any stream</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check size={16} className="text-primary mt-0.5 shrink-0" />
                          <span>Final year students (appearing) eligible</span>
                        </li>
                      </ul>
                    </div>

                    {/* Age & Attempts */}
                    <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-primary/20 transition-all">
                      <h4 className="text-lg font-display font-black text-dark uppercase mb-6 flex items-center gap-3">
                        <Users size={20} className="text-primary" /> Age & Attempts
                      </h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-white rounded-2xl">
                          <p className="text-[10px] font-black text-muted uppercase mb-1">General Age Limit</p>
                          <p className="text-xl font-display font-black text-dark">21 - 37 YEARS</p>
                        </div>
                        <div className="p-4 bg-white rounded-2xl">
                          <p className="text-[10px] font-black text-muted uppercase mb-1">Max Attempts (Gen)</p>
                          <p className="text-xl font-display font-black text-dark">06 ATTEMPTS</p>
                        </div>
                      </div>
                    </div>

                    {/* Physical Standards */}
                    <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-primary/20 transition-all">
                      <h4 className="text-lg font-display font-black text-dark uppercase mb-6 flex items-center gap-3">
                        <ShieldCheck size={20} className="text-primary" /> IPS / IFoS Standards
                      </h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-white rounded-2xl flex justify-between items-center">
                          <span className="text-[10px] font-black text-muted uppercase">Male Height</span>
                          <span className="text-lg font-display font-black text-dark">165 CM</span>
                        </div>
                        <div className="p-4 bg-white rounded-2xl flex justify-between items-center">
                          <span className="text-[10px] font-black text-muted uppercase">Female Height</span>
                          <span className="text-lg font-display font-black text-dark">150 CM</span>
                        </div>
                        <p className="text-[9px] font-bold text-muted uppercase px-2">* Medical vision standards apply.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Strategy Section */}
              <section id="strategy" className="scroll-mt-32">
                <div className="bg-white border border-gray-100 rounded-[3rem] p-12 md:p-16 relative overflow-hidden shadow-sm">
                  <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
                  <div className="relative z-10">
                    <h2 className="text-4xl font-display font-black text-dark uppercase mb-8 border-l-4 border-primary pl-6">Mission <span className="text-primary text-glow">UPSC</span></h2>
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                          { id: "01", title: "Deep Concepts", icon: Target, desc: "Focus on 'Why' and 'How' rather than just 'What'. Integrated Prelims-Mains approach." },
                          { id: "02", title: "Answer Writing", icon: FileText, desc: "Daily practice for articulation, structure, and keyword optimization in Mains." },
                          { id: "03", title: "Current Linkage", icon: Zap, desc: "Connecting static subjects with dynamic current events for a holistic view." }
                        ].map((item, i) => (
                          <div 
                            key={i}
                            className="group p-8 bg-white hover:bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden shadow-sm hover:shadow-xl"
                          >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full translate-x-16 -translate-y-16 group-hover:bg-primary/20 transition-colors" />
                            
                            <div className="flex justify-between items-start mb-6 relative z-10">
                              <h5 className="text-primary font-display font-black text-4xl text-glow">{item.id}</h5>
                              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm">
                                <item.icon size={24} />
                              </div>
                            </div>
                            
                            <h6 className="text-lg font-display font-black uppercase mb-4 text-dark tracking-tight group-hover:text-primary transition-colors">{item.title}</h6>
                            <p className="text-sm text-body leading-relaxed group-hover:text-dark transition-colors">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Refund Policy Section */}
              <section id="refund" className="scroll-mt-32">
                <div className="bg-red-50 rounded-[3rem] p-10 md:p-16 border-2 border-red-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[100px] rounded-full" />
                  <header className="mb-10 relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-600">
                        <AlertCircle size={24} />
                      </div>
                      <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">Refund & Cancellation</h2>
                    </div>
                  </header>

                  <div className="space-y-6 relative z-10">
                    <div className="p-6 bg-white rounded-3xl border border-red-50">
                      <p className="text-sm text-body leading-relaxed font-bold uppercase tracking-tight">
                        Course fees once paid are <span className="text-red-600">non-refundable</span> under any circumstances. However, students may request to transfer their admission to another batch or course within 7 days of enrollment, subject to management approval.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-black text-muted uppercase tracking-widest bg-red-600/5 p-4 rounded-xl">
                      <Info size={14} className="text-red-600" />
                      <span>Please read all course details carefully before completing your transaction.</span>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      {/* Footer CTA */}
      <section className="bg-white py-16 text-center relative border-t border-gray-100">
         <div className="section-container">
            <h2 className="text-4xl md:text-6xl font-display font-black text-dark uppercase mb-8 leading-tight">
               Craft Your <span className="text-primary">Legacy</span>
            </h2>
            <p className="text-body mb-12 max-w-2xl mx-auto text-lg italic opacity-70">
               Join our elite UPSC mentorship program designed for aspirants who dare to lead the nation.
            </p>
            <div className="flex flex-col sm:row justify-center gap-6">
               <button onClick={onRegister} className="btn-primary-new px-12 py-5 text-lg">
                  Apply for UPSC 2026
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

const History: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l4 2" />
  </svg>
);

export default UPSCDetailsPage;

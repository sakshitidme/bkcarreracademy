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
  const [activeSection, setActiveSection] = useState('overview');

  const [expandedSubmenus, setExpandedSubmenus] = useState<string[]>([]);

  const toggleSubmenu = (id: string) => {
    setExpandedSubmenus(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const menuItems = [
    { 
      id: 'browse', 
      title: 'Browse by Examinations', 
      icon: Search, 
      url: '#',
      children: [
        { title: 'Selection Posts Examination', url: 'https://ssc.gov.in/for-candidates/cgl-exam/xsd91hjkshdk92xk' },
        { title: 'Combined Graduate Level Examination', url: 'https://ssc.gov.in/for-candidates/cgl-exam/59g9y0svo3zgwiu' },
        { title: 'Stenographer Grade \'C\' and \'D\' Examination, 2024', url: 'https://ssc.gov.in/for-candidates/cgl-exam/g21irqg6pmtxbag' },
        { title: 'Junior Engineer (Civil, Mechanical & Electrical) Examination', url: 'https://ssc.gov.in/for-candidates/cgl-exam/s40d16nackd16h0' },
        { title: 'Combined Higher Secondary Level (10+2) Examination', url: 'https://ssc.gov.in/for-candidates/cgl-exam/q7sw4cqpvyitarc' },
        { title: 'Constable (GD) in CAPFs, SSF, Rifleman (GD) in Assam Rifles and Sepoy in NCB', url: 'https://ssc.gov.in/for-candidates/cgl-exam/nri55c0igl5cs45' },
        { title: 'Combined Hindi Translators Examination', url: 'https://ssc.gov.in/for-candidates/cgl-exam/f2tt2k1tpp3qpb5' },
        { title: 'Sub-Inspector in Delhi Police and CAPFs Examination', url: 'https://ssc.gov.in/for-candidates/cgl-exam/yafd7c3qloz8ixl' },
        { title: 'Others', url: 'https://ssc.gov.in/for-candidates/cgl-exam/yafd7c3qloz8ixl' },
        { title: 'Departmental Examination', url: 'https://ssc.gov.in/for-candidates/browse-by-examinations/departmental' }
      ]
    },
    { id: 'scribe', title: "SSC's Scribe Procedure", icon: Users, url: 'https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Scribe%20Procedure%20Notice251024.pdf' },
    { id: 'evaluation', title: 'Script Evaluation', icon: FileText, url: 'https://ssc.gov.in/for-candidates/script-evaluation' },
    { id: 'calendar', title: 'Examination Calendar', icon: Calendar, url: 'https://ssc.gov.in/for-candidates/examination-calendar' },
    { id: 'scheme', title: 'Scheme of Examination', icon: Layout, url: 'https://ssc.gov.in/for-candidates/scheme-of-examination' },
    { id: 'syllabus', title: 'Syllabus', icon: BookOpen, url: 'https://ssc.gov.in/for-candidates/syllabus' },
    { id: 'instruction', title: 'Special Instruction', icon: Info, url: 'https://ssc.gov.in/for-candidates/special-instruction' },
    { id: 'pyq', title: 'Previous Year Question Paper', icon: History, url: 'https://ssc.gov.in/for-candidates/previous-year-question-paper' },
    { id: 'certificates', title: 'Format of Certificates', icon: Award, url: 'https://ssc.gov.in/for-candidates/form-of-certificates' },
    { id: 'vacancy', title: 'Tentative Vacancy', icon: PieChart, url: 'https://ssc.gov.in/for-candidates/tentative-vacancy' },
    { id: 'normalization', title: 'Normalization Method', icon: Scale, url: 'https://ssc.gov.in/for-candidates/normalization-method' },
    { id: 'mock', title: 'Mock Test', icon: Zap, url: 'https://ssccbt.com/sscmocktest/mocktest.aspx' },
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
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-gray-100 h-20">
        <div className="section-container h-full flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setView('home')}
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-dark group-hover:scale-110 transition-transform">
              <Search size={20} />
            </div>
            <div>
              <span className="text-xl font-display font-black text-dark block leading-none">SSC HUB</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Candidate Gateway</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
             <button onClick={() => scrollToSection('exams')} className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors">Examinations</button>
             <button onClick={() => scrollToSection('resources')} className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors">Resources</button>
             <button onClick={() => scrollToSection('strategy')} className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors">Strategy</button>
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
              Staff Selection <span className="text-primary text-glow">Commission</span> <br />Resource Hub
            </h1>
            <p className="text-xl text-body font-body leading-relaxed max-w-3xl">
              Official candidate resources and strategic guidance for CGL, CHSL, MTS, and other national recruitment examinations. Your gateway to central government excellence.
            </p>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sidebar Menu - Mimicking Screenshot 1 */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl sticky top-36">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-8 bg-primary rounded-full"></div>
                  <h3 className="text-xl font-display font-black text-dark uppercase tracking-tight">Candidate Corner</h3>
                </div>
                
                <div className="space-y-1">
                  {menuItems.map((item) => (
                    <div key={item.id}>
                      <a
                        href={item.url}
                        target={item.children ? undefined : "_blank"}
                        rel={item.children ? undefined : "noopener noreferrer"}
                        onClick={(e) => {
                          if (item.children) {
                            e.preventDefault();
                            toggleSubmenu(item.id);
                          }
                        }}
                        className={`group flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 ${expandedSubmenus.includes(item.id) ? 'bg-gray-50' : ''}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${expandedSubmenus.includes(item.id) ? 'bg-primary text-dark' : 'bg-gray-50 text-muted group-hover:bg-primary/10 group-hover:text-primary'}`}>
                            <item.icon size={18} />
                          </div>
                          <span className="text-xs font-bold text-dark uppercase tracking-tight">{item.title}</span>
                        </div>
                        {item.children ? (
                          <ChevronRight size={14} className={`text-muted transition-transform duration-300 ${expandedSubmenus.includes(item.id) ? 'rotate-90' : ''}`} />
                        ) : (
                          <ChevronRight size={14} className="text-muted group-hover:translate-x-1 transition-transform" />
                        )}
                      </a>
                      
                      <AnimatePresence>
                        {item.children && expandedSubmenus.includes(item.id) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-gray-50/50 rounded-2xl mt-1 mb-2"
                          >
                            {item.children.map((child, idx) => (
                              <a
                                key={idx}
                                href={child.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 py-3 pl-14 pr-6 text-[10px] font-bold text-muted hover:text-primary transition-colors uppercase tracking-tight relative group/child"
                              >
                                <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-gray-200 group-hover/child:bg-primary/30" />
                                <div className="absolute left-8 top-1/2 w-3 h-[1px] bg-gray-200 group-hover/child:bg-primary/30" />
                                {child.title}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-50">
                   <a 
                    href="https://ssc.gov.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-dark text-white py-4 rounded-xl font-display font-black uppercase text-[10px] tracking-widest hover:bg-primary hover:text-dark transition-all shadow-lg"
                   >
                     <Globe size={16} /> Official SSC Portal
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
                    <h2 className="text-4xl font-display font-black text-dark uppercase mb-6">Examination <span className="text-primary">Ecosystem</span></h2>
                    <p className="body-text text-lg">
                      The Staff Selection Commission (SSC) conducts various examinations for recruitment to Group B and Group C posts in various Ministries and Departments of the Government of India.
                    </p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="bg-gray-50 rounded-3xl p-8 border border-transparent hover:border-primary/20 transition-all">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-6">
                        <Target size={24} />
                      </div>
                      <h4 className="text-lg font-display font-black text-dark uppercase mb-4">Core Focus</h4>
                      <p className="text-sm text-body leading-relaxed">
                        Emphasis on logical reasoning, quantitative aptitude, English comprehension, and general awareness across multi-tier examination formats.
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-3xl p-8 border border-transparent hover:border-primary/20 transition-all">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-6">
                        <Zap size={24} />
                      </div>
                      <h4 className="text-lg font-display font-black text-dark uppercase mb-4">Selection Path</h4>
                      <p className="text-sm text-body leading-relaxed">
                        Computer-based exams followed by descriptive tests or skill tests (typing/data entry) depending on the specific job profile.
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
                  <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">Major Examinations</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "SSC CGL", desc: "Combined Graduate Level for Inspector, Auditor, and Assistant roles.", level: "Graduate" },
                    { title: "SSC CHSL", desc: "Combined Higher Secondary Level for LDC, DEO, and Postal Assistants.", level: "10+2" },
                    { title: "SSC MTS", desc: "Multi-Tasking Staff for non-technical government department roles.", level: "10th" },
                    { title: "SSC GD", desc: "General Duty Constable for Paramilitary forces and CAPFs.", level: "10th" }
                  ].map((exam, i) => (
                    <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-primary/5 transition-all group">
                      <div className="flex justify-between items-start mb-6">
                        <h4 className="text-xl font-display font-black text-dark uppercase group-hover:text-primary transition-colors">{exam.title}</h4>
                        <span className="px-3 py-1 bg-gray-50 rounded-lg text-[9px] font-black text-muted uppercase tracking-widest">{exam.level}</span>
                      </div>
                      <p className="text-sm text-body leading-relaxed mb-6">{exam.desc}</p>
                      <button 
                        onClick={onRegister}
                        className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest hover:gap-4 transition-all"
                      >
                        Explore Syllabus <ArrowRight size={14} />
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
                    <p className="body-text">Direct access to verified Staff Selection Commission (SSC) portals.</p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                    {[
                      { title: "Main Portal", url: "https://ssc.gov.in", desc: "Official home of SSC" },
                      { title: "Candidate Login", url: "https://ssc.gov.in/login", desc: "Access your profile" },
                      { title: "Latest News", url: "https://ssc.gov.in/notice-board", desc: "Recent notifications" },
                      { title: "Exam Calendar", url: "https://ssc.gov.in/for-candidates/examination-calendar", desc: "Annual schedule" }
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
                    <p className="body-text">Core requirements for the Staff Selection Commission (SSC) Examinations.</p>
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
                          <span>Graduate / 12th / 10th (Post-wise)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check size={16} className="text-primary mt-0.5 shrink-0" />
                          <span>Citizenship: Indian National</span>
                        </li>
                      </ul>
                    </div>

                    {/* Age Limit */}
                    <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-primary/20 transition-all">
                      <h4 className="text-lg font-display font-black text-dark uppercase mb-6 flex items-center gap-3">
                        <Users size={20} className="text-primary" /> Age limits
                      </h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-white rounded-2xl">
                          <p className="text-[10px] font-black text-muted uppercase mb-1">CGL / CHSL Range</p>
                          <p className="text-xl font-display font-black text-dark">18 - 32 YEARS</p>
                        </div>
                        <p className="text-[9px] font-bold text-muted uppercase px-2">* Age relaxation as per Govt. Category rules.</p>
                      </div>
                    </div>

                    {/* Physical Standards */}
                    <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-primary/20 transition-all">
                      <h4 className="text-lg font-display font-black text-dark uppercase mb-6 flex items-center gap-3">
                        <ShieldCheck size={20} className="text-primary" /> Physical standards
                      </h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-white rounded-2xl flex justify-between items-center">
                          <span className="text-[10px] font-black text-muted uppercase">Male H</span>
                          <span className="text-lg font-display font-black text-dark">157.5 CM</span>
                        </div>
                        <div className="p-4 bg-white rounded-2xl flex justify-between items-center">
                          <span className="text-[10px] font-black text-muted uppercase">Female H</span>
                          <span className="text-lg font-display font-black text-dark">152 CM</span>
                        </div>
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
                    <h2 className="text-4xl font-display font-black text-dark uppercase mb-8 border-l-4 border-primary pl-6">Preparation <span className="text-primary text-glow">Strategy</span></h2>
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                          { id: "01", title: "Base Building", icon: BookOpen, desc: "Master NCERTs and basic arithmetic before moving to advanced problem sets." },
                          { id: "02", title: "Speed Mastery", icon: Zap, desc: "Daily calculation drills and vocabulary building to reduce per-question time." },
                          { id: "03", title: "Mock Drills", icon: Layout, desc: "Bi-weekly full-length tests in actual exam environments to build endurance." }
                        ].map((item, i) => (
                          <div 
                            key={i}
                            className="group p-10 bg-gray-50/50 hover:bg-white rounded-[3rem] border border-gray-100 hover:border-primary/60 transition-all duration-500 hover:-translate-y-3 relative overflow-hidden shadow-sm"
                          >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-[80px] rounded-full translate-x-20 -translate-y-20 group-hover:bg-primary/20 transition-all duration-700" />
                            
                            <div className="flex justify-between items-start mb-10 relative z-10">
                              <h5 className="text-5xl font-display font-black text-primary text-glow drop-shadow-sm">{item.id}</h5>
                              <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-sm">
                                <item.icon size={28} />
                              </div>
                            </div>
                            
                            <h6 className="text-xl font-display font-black uppercase mb-4 text-dark tracking-wide group-hover:text-primary transition-colors">{item.title}</h6>
                            <p className="text-sm text-body leading-relaxed">{item.desc}</p>
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
                    <div className="p-8 bg-white rounded-[2rem] border border-red-50">
                      <ul className="space-y-4 text-sm text-body font-bold uppercase tracking-tight">
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 shrink-0" />
                          <span>Fees paid are <span className="text-red-600">Strictly Non-Refundable</span> once the batch commences.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 shrink-0" />
                          <span>Batch transfer requests must be submitted within 7 days of enrollment.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 shrink-0" />
                          <span>Study material costs are deducted if materials have already been issued.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-black text-muted uppercase tracking-widest bg-red-600/5 p-4 rounded-xl">
                      <Info size={14} className="text-red-600" />
                      <span>Administrative approval is mandatory for all cancellation/transfer requests.</span>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      {/* Footer CTA */}
      <section className="bg-white py-1 text-center relative border-t border-gray-100">
         <div className="section-container">
            <h2 className="text-4xl md:text-6xl font-display font-black text-dark uppercase mb-8 leading-tight">
               Start Your <span className="text-primary">Central Govt</span> Career
            </h2>
            <p className="text-body mb-12 max-w-2xl mx-auto text-lg italic opacity-70">
               Join our specialized SSC batches designed for high-speed accuracy and comprehensive concept mastery.
            </p>
            <div className="flex flex-col sm:row justify-center gap-6">
               <button onClick={onRegister} className="btn-primary-new px-12 py-5 text-lg">
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

export default SSCDetailsPage;

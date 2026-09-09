import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Globe, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Target,
  ListChecks,
  ArrowRight,
  AlertCircle,
  Check,
  GraduationCap,
  BookOpen,
  Info,
  Users,
  Ruler,
  Dumbbell,
  Trophy
} from 'lucide-react';
import { GOVT_RESOURCES } from '../data/govtResources';

interface GeneralExamDetailsPageProps {
  categoryId: string;
  onBack: () => void;
  onRegister: () => void;
  setView: (view: any) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
}

export const GeneralExamDetailsPage: React.FC<GeneralExamDetailsPageProps> = ({
  categoryId,
  onBack,
  onRegister,
  setView,
  setIsRegistrationModalOpen
}) => {
  const navigate = useNavigate();
  const resource = useMemo(() => GOVT_RESOURCES.find(r => r.id === categoryId), [categoryId]);

  const [expandedSubmenus, setExpandedSubmenus] = useState<string[]>([]);

  const toggleSubmenu = (title: string) => {
    setExpandedSubmenus(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const [activeExamTab, setActiveExamTab] = useState<'nda' | 'cds' | 'afcat' | 'inet' | 'ta' | 'coastguard'>('nda');

  if (!resource) return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="text-center">
        <h2 className="text-4xl font-display font-black text-dark uppercase mb-4">Portal Offline</h2>
        <button onClick={onBack} className="btn-primary-new px-8 py-3">Return Safety</button>
      </div>
    </div>
  );

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
              <span className="text-xl font-display font-black text-dark block leading-none uppercase">{resource.name}</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Resource Portal</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
               <a 
                href="https://play.google.com/store/apps/details?id=co.lazarus.nqvxi"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#111111] text-white rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-primary hover:text-dark transition-all flex items-center gap-2 border border-white/10"
               >
                Get {resource.id === 'mbacet' ? 'MBA CET Course' : `${resource.name} Course`} on App
               </a>
               <button 
                onClick={() => navigate('/admission')}
                className="btn-outline-new px-12 py-5 text-lg"
              >
                Proceed to Admission
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
            <span className="text-[10px] font-bold uppercase tracking-widest">Back to Gallery</span>
          </button>
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-black text-dark leading-tight mb-4 uppercase">
              {resource.name} <span className="text-primary text-glow">Gateway</span>
            </h1>
            <p className="text-xl text-body font-body leading-relaxed max-w-3xl">
              {resource.description}
            </p>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="section-container">
          <div className="w-full space-y-12">
            
            {/* Official Resources Bar */}
            <div className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-primary rounded-full"></div>
                <div>
                  <h3 className="text-xl font-display font-black text-dark uppercase tracking-tight">Official Resources</h3>
                  <p className="text-xs text-muted font-bold uppercase tracking-wider">Quick links & portal access</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                {resource.resources[0].items.map((item: any, idx: number) => (
                  <div key={idx} className="relative group">
                    {item.isSubmenu ? (
                      <div className="relative">
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-black text-dark uppercase tracking-wider hover:bg-gray-100 transition-colors">
                          <Globe size={12} className="text-primary" /> {item.title}
                          <ChevronRight size={10} className="rotate-95" />
                        </button>
                        <div className="absolute top-full left-0 mt-1 hidden group-hover:block bg-white border border-gray-100 rounded-xl shadow-xl p-2 z-[110] min-w-[200px]">
                          {item.children.map((child: any, cIdx: number) => (
                            <a
                              key={cIdx}
                              href={child.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-2 text-[10px] font-bold text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg uppercase tracking-wider transition-colors"
                            >
                              {child.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-black text-dark uppercase tracking-wider hover:bg-gray-100 hover:border-primary/20 transition-all"
                      >
                        <Globe size={12} className="text-primary" /> {item.title}
                      </a>
                    )}
                  </div>
                ))}
                
                <a 
                  href={resource.officialWebsite} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary text-dark rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-dark hover:text-primary transition-all shadow-md shadow-primary/10"
                >
                  <Globe size={12} /> Visit Main Portal
                </a>
              </div>
            </div>

            {/* Content Area */}
            <div className="space-y-16">
              
              {categoryId === 'defence' ? (
                <>
                  {/* OVERVIEW SECTION */}
                  <section className="scroll-mt-32">
                    <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFB800]/5 blur-[100px] rounded-full" />
                      <header className="mb-12 relative z-10">
                        <p className="label-text mb-4">Armed Forces Officer Entry</p>
                        <h2 className="text-4xl font-display font-black text-dark uppercase mb-6">Indian <span className="text-primary">Armed Forces</span></h2>
                        <p className="body-text text-lg">
                          Explore prestigious careers in the Indian Armed Forces through NDA, CDS, AFCAT, INET, Territorial Army, and Coast Guard examinations.
                        </p>
                      </header>

                      {/* Interactive Exam Selector Tabs */}
                      <div className="flex flex-wrap gap-2.5 bg-gray-50 p-2 rounded-2xl border border-gray-100 mb-10">
                        {[
                          { key: 'nda', label: 'NDA' },
                          { key: 'cds', label: 'CDS' },
                          { key: 'afcat', label: 'AFCAT' },
                          { key: 'inet', label: 'INET' },
                          { key: 'ta', label: 'Territorial Army' },
                          { key: 'coastguard', label: 'Coast Guard' }
                        ].map((t) => (
                          <button
                            key={t.key}
                            onClick={() => setActiveExamTab(t.key as any)}
                            className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
                              activeExamTab === t.key 
                                ? 'bg-dark text-primary shadow-md' 
                                : 'text-gray-400 hover:text-gray-600'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>

                      {/* Dynamic Tab Content */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeExamTab}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.3 }}
                          className="bg-gray-50 rounded-[2.5rem] p-8 md:p-10 border border-gray-100"
                        >
                           {activeExamTab === 'nda' && (
                            <div className="space-y-8">
                              <div>
                                <h3 className="text-2xl font-display font-black text-dark uppercase mb-2">🇮🇳 NDA (National Defence Academy)</h3>
                                <p className="text-xs font-bold text-[#FFB800] uppercase tracking-widest">Prestigious entry level officer exam after 12th standard</p>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Eligibility</h4>
                                    <ul className="space-y-2 text-sm font-bold text-gray-700">
                                      <li className="flex items-start gap-2.5"><Check size={14} className="text-primary mt-1 shrink-0" /> 12th Pass</li>
                                      <li className="flex items-start gap-2.5"><Check size={14} className="text-primary mt-1 shrink-0" /> PCM required for Air Force & Navy</li>
                                      <li className="flex items-start gap-2.5"><Check size={14} className="text-primary mt-1 shrink-0" /> Any stream for Army Wing</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Age Limit</h4>
                                    <p className="text-sm font-bold text-gray-750 bg-white p-3 rounded-xl border border-gray-150 inline-block">
                                      16.5 – 19.5 Years
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Height Requirements</h4>
                                    <ul className="space-y-2 text-sm font-bold text-gray-700">
                                      <li className="flex items-start gap-2.5"><Check size={14} className="text-primary mt-1 shrink-0" /> Male: ~157 cm minimum</li>
                                      <li className="flex items-start gap-2.5"><Check size={14} className="text-primary mt-1 shrink-0" /> Female: As per latest UPSC NDA standards</li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Selection Process</h4>
                                    <ol className="space-y-2 text-sm font-bold text-gray-700 list-decimal pl-4">
                                      <li>Written Exam</li>
                                      <li>SSB Interview</li>
                                      <li>Medical Examination</li>
                                      <li>Merit List</li>
                                    </ol>
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Career Opportunities</h4>
                                    <ul className="space-y-2 text-sm font-bold text-gray-700">
                                      <li className="flex items-center gap-2.5"><Check size={14} className="text-primary shrink-0" /> Indian Army Officer</li>
                                      <li className="flex items-center gap-2.5"><Check size={14} className="text-primary shrink-0" /> Indian Navy Officer</li>
                                      <li className="flex items-center gap-2.5"><Check size={14} className="text-primary shrink-0" /> Indian Air Force Officer</li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Syllabus</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {['Mathematics', 'English', 'Physics', 'Chemistry', 'History', 'Geography', 'Current Affairs', 'General Knowledge'].map((sub, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-white border border-gray-150 rounded-lg text-xs font-bold text-gray-750">{sub}</span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {activeExamTab === 'cds' && (
                            <div className="space-y-8">
                              <div>
                                <h3 className="text-2xl font-display font-black text-dark uppercase mb-2">🎖️ CDS (Combined Defence Services)</h3>
                                <p className="text-xs font-bold text-[#FFB800] uppercase tracking-widest">Officer recruitment after graduation</p>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Eligibility</h4>
                                    <ul className="space-y-2 text-sm font-bold text-gray-700">
                                      <li className="flex items-start gap-2.5"><Check size={14} className="text-primary mt-1 shrink-0" /> Graduation Required</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Age Limit</h4>
                                    <p className="text-sm font-bold text-gray-750 bg-white p-3 rounded-xl border border-gray-150 inline-block">
                                      19–25 Years (varies by academy)
                                    </p>
                                  </div>
                                </div>
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Selection Process</h4>
                                    <ol className="space-y-2 text-sm font-bold text-gray-700 list-decimal pl-4">
                                      <li>Written Examination</li>
                                      <li>SSB Interview</li>
                                      <li>Medical Test</li>
                                    </ol>
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Career Opportunities</h4>
                                    <div className="flex flex-col gap-2">
                                      {['IMA (Indian Military Academy)', 'OTA (Officers Training Academy)', 'INA (Indian Naval Academy)', 'Air Force Academy'].map((opp, idx) => (
                                        <span key={idx} className="px-3 py-1.5 bg-[#FFF9E6] border border-primary/20 rounded-xl text-xs font-black text-[#FFB800] text-center">{opp}</span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Syllabus</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {['English', 'General Knowledge', 'Mathematics'].map((sub, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-white border border-gray-150 rounded-lg text-xs font-bold text-gray-750">{sub}</span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {activeExamTab === 'afcat' && (
                            <div className="space-y-8">
                              <div>
                                <h3 className="text-2xl font-display font-black text-dark uppercase mb-2">✈️ AFCAT (Indian Air Force)</h3>
                                <p className="text-xs font-bold text-[#FFB800] uppercase tracking-widest">Air Force Common Admission Test for officers</p>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Eligibility</h4>
                                    <ul className="space-y-2 text-sm font-bold text-gray-700">
                                      <li className="flex items-start gap-2.5"><Check size={14} className="text-primary mt-1 shrink-0" /> Graduation with required percentage</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Age Limit</h4>
                                    <p className="text-sm font-bold text-gray-750 bg-white p-3 rounded-xl border border-gray-150 inline-block">
                                      20–24 Years
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Branches</h4>
                                    <ul className="space-y-2 text-sm font-bold text-gray-700">
                                      <li className="flex items-center gap-2.5"><Check size={14} className="text-primary shrink-0" /> Flying Branch</li>
                                      <li className="flex items-center gap-2.5"><Check size={14} className="text-primary shrink-0" /> Ground Duty Technical</li>
                                      <li className="flex items-center gap-2.5"><Check size={14} className="text-primary shrink-0" /> Ground Duty Non-Technical</li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Selection Process</h4>
                                    <ol className="space-y-2 text-sm font-bold text-gray-700 list-decimal pl-4">
                                      <li>AFCAT Exam</li>
                                      <li>AFSB Interview</li>
                                      <li>Medical Examination</li>
                                    </ol>
                                  </div>
                                </div>
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Syllabus</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {['English', 'Reasoning', 'Numerical Ability', 'General Awareness', 'Military Aptitude'].map((sub, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-white border border-gray-150 rounded-lg text-xs font-bold text-gray-750">{sub}</span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {activeExamTab === 'inet' && (
                            <div className="space-y-8">
                              <div>
                                <h3 className="text-2xl font-display font-black text-dark uppercase mb-2">⚓ INET (Indian Navy)</h3>
                                <p className="text-xs font-bold text-[#FFB800] uppercase tracking-widest">Indian Navy Entrance Test for officer commission</p>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Eligibility</h4>
                                    <ul className="space-y-2 text-sm font-bold text-gray-700">
                                      <li className="flex items-start gap-2.5"><Check size={14} className="text-primary mt-1 shrink-0" /> B.Tech / Graduation (as per branch)</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Age Limit</h4>
                                    <p className="text-sm font-bold text-gray-750 bg-white p-3 rounded-xl border border-gray-150 inline-block">
                                      As per notification
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Career Opportunities</h4>
                                    <ul className="space-y-2 text-sm font-bold text-gray-700">
                                      <li className="flex items-center gap-2.5"><Check size={14} className="text-primary shrink-0" /> Executive Branch</li>
                                      <li className="flex items-center gap-2.5"><Check size={14} className="text-primary shrink-0" /> Technical Branch</li>
                                      <li className="flex items-center gap-2.5"><Check size={14} className="text-primary shrink-0" /> Education Branch</li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Selection Process</h4>
                                    <ol className="space-y-2 text-sm font-bold text-gray-700 list-decimal pl-4">
                                      <li>INET Exam</li>
                                      <li>SSB Interview</li>
                                      <li>Medical Examination</li>
                                    </ol>
                                  </div>
                                </div>
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Syllabus</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {['English', 'Reasoning', 'Quantitative Aptitude', 'General Awareness', 'Technical Subjects'].map((sub, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-white border border-gray-150 rounded-lg text-xs font-bold text-gray-750">{sub}</span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {activeExamTab === 'ta' && (
                            <div className="space-y-8">
                              <div>
                                <h3 className="text-2xl font-display font-black text-dark uppercase mb-2">🏹 TERRITORIAL ARMY</h3>
                                <p className="text-xs font-bold text-[#FFB800] uppercase tracking-widest">Serve the Nation while maintaining your civilian career</p>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Eligibility</h4>
                                    <ul className="space-y-2 text-sm font-bold text-gray-700">
                                      <li className="flex items-start gap-2.5"><Check size={14} className="text-primary mt-1 shrink-0" /> Graduate</li>
                                      <li className="flex items-start gap-2.5"><Check size={14} className="text-primary mt-1 shrink-0" /> Employed Citizen</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Age Limit</h4>
                                    <p className="text-sm font-bold text-gray-750 bg-white p-3 rounded-xl border border-gray-150 inline-block">
                                      18–42 Years
                                    </p>
                                  </div>
                                </div>
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Selection Process</h4>
                                    <ol className="space-y-2 text-sm font-bold text-gray-700 list-decimal pl-4">
                                      <li>Written Test</li>
                                      <li>SSB Interview</li>
                                      <li>Medical Examination</li>
                                    </ol>
                                  </div>
                                </div>
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Benefits</h4>
                                    <ul className="space-y-2 text-sm font-bold text-gray-700">
                                      <li className="flex items-start gap-2.5"><Check size={14} className="text-primary mt-1 shrink-0" /> Serve Nation While Continuing Civilian Career</li>
                                      <li className="flex items-start gap-2.5"><Check size={14} className="text-primary mt-1 shrink-0" /> Officer Rank Opportunities</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {activeExamTab === 'coastguard' && (
                            <div className="space-y-8">
                              <div>
                                <h3 className="text-2xl font-display font-black text-dark uppercase mb-2">🚢 INDIAN COAST GUARD</h3>
                                <p className="text-xs font-bold text-[#FFB800] uppercase tracking-widest">Guardian of the Indian Coasts</p>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Posts</h4>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                      {['Navik (GD)', 'Navik (DB)', 'Yantrik', 'Assistant Commandant'].map((post, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-white border border-gray-150 rounded-lg text-xs font-bold text-gray-700">{post}</span>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Eligibility</h4>
                                    <p className="text-sm font-bold text-gray-700 bg-white p-3 rounded-xl border border-gray-100 inline-block">
                                      10th / 12th / Diploma / Graduation
                                    </p>
                                  </div>
                                </div>
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Selection Process</h4>
                                    <ol className="space-y-2 text-sm font-bold text-gray-700 list-decimal pl-4">
                                      <li>Written Examination</li>
                                      <li>Physical Fitness Test</li>
                                      <li>Medical Examination</li>
                                      <li>Document Verification</li>
                                    </ol>
                                  </div>
                                </div>
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Physical Standards</h4>
                                    <ul className="space-y-2 text-sm font-bold text-gray-700">
                                      <li className="flex items-center gap-2.5"><Check size={14} className="text-primary shrink-0" /> Running</li>
                                      <li className="flex items-center gap-2.5"><Check size={14} className="text-primary shrink-0" /> Push-ups</li>
                                      <li className="flex items-center gap-2.5"><Check size={14} className="text-primary shrink-0" /> Squats</li>
                                      <li className="flex items-center gap-2.5"><Check size={14} className="text-primary shrink-0" /> Medical Fitness</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </section>

                  {/* PHYSICAL STANDARDS SECTION */}
                  <section id="eligibility" className="scroll-mt-32">
                    <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
                      <header className="mb-12 relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <GraduationCap size={24} />
                          </div>
                          <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">Physical Standards & Fitness</h2>
                        </div>
                        <p className="body-text">General height and physical requirements for Indian Armed Forces entries.</p>
                      </header>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        {/* Height Requirements */}
                        <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-primary/20 transition-all">
                          <h4 className="text-lg font-display font-black text-dark uppercase mb-6 flex items-center gap-3">
                            <Ruler size={20} className="text-primary" /> Height Standards
                          </h4>
                          <ul className="space-y-4 text-sm text-body font-bold uppercase tracking-tight">
                            <li className="flex justify-between items-center py-2 border-b border-gray-200/50">
                              <span>Indian Army</span>
                              <span className="text-dark font-black">~157 cm+</span>
                            </li>
                            <li className="flex justify-between items-center py-2 border-b border-gray-200/50">
                              <span>Indian Navy</span>
                              <span className="text-dark font-black">~157 cm+</span>
                            </li>
                            <li className="flex justify-between items-center py-2">
                              <span>Indian Air Force</span>
                              <span className="text-dark font-black">~162.5 cm+</span>
                            </li>
                          </ul>
                        </div>

                        {/* Physical Fitness */}
                        <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-primary/20 transition-all">
                          <h4 className="text-lg font-display font-black text-dark uppercase mb-6 flex items-center gap-3">
                            <Dumbbell size={20} className="text-primary" /> Fitness Tests
                          </h4>
                          <ul className="space-y-3 text-xs font-bold text-gray-700">
                            <li className="flex items-center gap-2"><Check size={14} className="text-primary" /> Running (Time-bound 1.6 Km / 800m)</li>
                            <li className="flex items-center gap-2"><Check size={14} className="text-primary" /> Push-ups and Sit-ups</li>
                            <li className="flex items-center gap-2"><Check size={14} className="text-primary" /> Squats and Chin-ups (as per post)</li>
                          </ul>
                        </div>

                        {/* Medical Standards */}
                        <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-primary/20 transition-all">
                          <h4 className="text-lg font-display font-black text-dark uppercase mb-6 flex items-center gap-3">
                            <ShieldCheck size={20} className="text-primary" /> Medical Fitness
                          </h4>
                          <ul className="space-y-3 text-xs font-bold text-gray-700">
                            <li className="flex items-center gap-2"><Check size={14} className="text-primary" /> Excellent Vision (As per UPSC specifications)</li>
                            <li className="flex items-center gap-2"><Check size={14} className="text-primary" /> Good physical hearing & dental standards</li>
                            <li className="flex items-center gap-2"><Check size={14} className="text-primary" /> No major physical deformities or diseases</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* SYLLABUS SECTION */}
                  <section className="scroll-mt-32">
                    <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
                      <header className="mb-12 relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <BookOpen size={24} />
                          </div>
                          <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">Common Defence Syllabus</h2>
                        </div>
                        <p className="body-text">Major subjects and components tested in military officer entry examinations.</p>
                      </header>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                        {[
                          { t: "Mathematics", d: "Algebra, Trigonometry, Geometry, Mensuration, Statistics, Calculus" },
                          { t: "English", d: "Grammar, Vocabulary, Reading Comprehension, Sentence Correction" },
                          { t: "General Knowledge", d: "Indian History, Geography, Indian Polity, Economics, Physics, Chemistry, Biology, Current Affairs" },
                          { t: "Reasoning", d: "Verbal Reasoning, Non-Verbal Diagrams, Logical Ability, Spatial Ability" }
                        ].map((sub, i) => (
                          <div key={i} className="p-6 bg-gray-50 border border-gray-100 rounded-3xl hover:border-primary transition-all">
                            <h4 className="text-sm font-display font-black text-dark uppercase mb-3 border-b border-gray-200 pb-2">{sub.t}</h4>
                            <p className="text-xs text-body leading-relaxed">{sub.d}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* SALARY RANGE SECTION */}
                  <section className="scroll-mt-32">
                    <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-sm relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
                      <header className="mb-12 relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <Trophy size={24} />
                          </div>
                          <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">Officer Salary Packages</h2>
                        </div>
                        <p className="body-text">Approximate basic pay ranges according to recent 7th Pay Commission scales.</p>
                      </header>

                      <div className="space-y-4 relative z-10">
                        {[
                          { entry: "NDA Officers", range: "₹56,000 – ₹1,77,500+", desc: "National Defence Academy (After 12th)" },
                          { entry: "CDS Officers", range: "₹56,000 – ₹2,00,000+", desc: "Combined Defence Services (After Graduation)" },
                          { entry: "AFCAT Officers", range: "₹70,000 – ₹2,20,000+", desc: "Indian Air Force Officers (Flying/Ground Duty)" },
                          { entry: "Navy Officers", range: "₹70,000 – ₹2,20,000+", desc: "Indian Navy Officers (Executive/Technical)" },
                          { entry: "Coast Guard Officers", range: "₹60,000 – ₹2,00,000+", desc: "Assistant Commandant & Officer ranks" }
                        ].map((sal, i) => (
                          <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-gray-50 hover:bg-[#FFF9E6]/30 border border-gray-100 hover:border-primary/20 rounded-3xl transition-all gap-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-[#FFB800]/10 rounded-2xl flex items-center justify-center text-lg">
                                🎖️
                              </div>
                              <div>
                                <h4 className="text-base font-display font-black text-dark uppercase tracking-tight">{sal.entry}</h4>
                                <p className="text-xs text-muted font-bold uppercase tracking-wider">{sal.desc}</p>
                              </div>
                            </div>
                            <div className="px-6 py-3 bg-[#FFF9E6] border border-primary/20 rounded-2xl text-left sm:text-right min-w-[200px]">
                              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-1">Monthly Pay Scale</span>
                              <span className="text-lg font-display font-black text-[#FFB800] leading-none">{sal.range}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* BATCH PROMO */}
                  <section className="scroll-mt-32">
                    <div className="bg-white rounded-[3rem] p-12 md:p-16 border border-gray-100 relative overflow-hidden shadow-sm">
                      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
                      <div className="relative z-10 text-center">
                        <h2 className="text-4xl font-display font-black text-dark uppercase mb-8 leading-tight">Join Our <span className="text-primary text-glow">Specialized</span> Batches</h2>
                        <p className="text-body mb-10 max-w-xl mx-auto">
                          Get access to verified resources, physical training modules, mock tests, and personal SSB mentorship.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                          <button onClick={onRegister} className="btn-primary-new px-12 py-5 text-xl">Enroll Now</button>
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              ) : (
                <>
                  {/* Default Content */}
                  <section className="scroll-mt-32">
                    <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
                      <header className="mb-12 relative z-10">
                        <p className="label-text mb-4">Strategic Overview</p>
                        <h2 className="text-4xl font-display font-black text-dark uppercase mb-6">{resource.name} <span className="text-primary">Ecosystem</span></h2>
                        <p className="body-text text-lg">
                          Mastering the recruitment protocols for {resource.name} through disciplined preparation and expert mentorship.
                        </p>
                      </header>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        <div className="bg-gray-50 rounded-3xl p-8 border border-transparent hover:border-primary/20 transition-all">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-6">
                            <Target size={24} />
                          </div>
                          <h4 className="text-lg font-display font-black text-dark uppercase mb-4">Core Focus</h4>
                          <p className="text-sm text-body leading-relaxed">
                            Evaluates subject matter expertise, logical reasoning, and technical proficiency required for specialized services.
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-3xl p-8 border border-transparent hover:border-primary/20 transition-all">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-6">
                            <Zap size={24} />
                          </div>
                          <h4 className="text-lg font-display font-black text-dark uppercase mb-4">Roadmap</h4>
                          <p className="text-sm text-body leading-relaxed">
                            Comprehensive training phases covering foundational concepts, advanced drills, and final interview simulations.
                          </p>
                        </div>
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
                        <p className="body-text">Core requirements for {resource.name} recruitment cycles.</p>
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
                              <span>Graduate / Post-Graduate in relevant field</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <Check size={16} className="text-primary mt-0.5 shrink-0" />
                              <span>Valid identification documents required</span>
                            </li>
                          </ul>
                        </div>

                        {/* Age & Rounds */}
                        <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-primary/20 transition-all">
                          <h4 className="text-lg font-display font-black text-dark uppercase mb-6 flex items-center gap-3">
                            <Users size={20} className="text-primary" /> Age & Rounds
                          </h4>
                          <div className="space-y-4">
                            <div className="p-4 bg-white rounded-2xl flex justify-between items-center">
                              <span className="text-[10px] font-black text-muted uppercase tracking-widest">Age bracket</span>
                              <span className="text-lg font-display font-black text-dark">18 - 35 YRS</span>
                            </div>
                            <div className="p-4 bg-white rounded-2xl flex justify-between items-center">
                              <span className="text-[10px] font-black text-muted uppercase tracking-widest">Selection</span>
                              <span className="text-lg font-display font-black text-dark">2-3 ROUNDS</span>
                            </div>
                          </div>
                        </div>

                        {/* General Standards */}
                        <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-primary/20 transition-all">
                          <h4 className="text-lg font-display font-black text-dark uppercase mb-6 flex items-center gap-3">
                            <ShieldCheck size={20} className="text-primary" /> General standards
                          </h4>
                          <div className="space-y-4">
                             <div className="p-4 bg-white rounded-2xl">
                               <p className="text-[10px] font-black text-muted uppercase mb-1">Medical</p>
                               <p className="text-sm font-bold text-dark uppercase">Physical fitness certificate may be mandatory.</p>
                             </div>
                             <p className="text-[9px] font-bold text-primary uppercase px-2 tracking-[0.1em] underline decoration-primary/30 underline-offset-4 cursor-help">Detailed protocol PDF available in portal.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="scroll-mt-32">
                    <div className="bg-white rounded-[3rem] p-12 md:p-16 border border-gray-100 relative overflow-hidden shadow-sm">
                      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
                      <div className="relative z-10 text-center">
                        <h2 className="text-4xl font-display font-black text-dark uppercase mb-8 leading-tight">Join Our <span className="text-primary text-glow">Specialized</span> Batches</h2>
                        <p className="text-body mb-10 max-w-xl mx-auto">
                          Get access to verified resources, mock tests, and personal mentorship for {resource.name} exams.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                          <button onClick={onRegister} className="btn-primary-new px-12 py-5 text-xl">Enroll Now</button>
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              )}

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
                          <span>Course fees are <span className="text-red-600">Non-Refundable</span> after batch allocation.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 shrink-0" />
                          <span>Batch change window: Within 10 days of course start.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 shrink-0" />
                          <span>Documentation for cancellation must be submitted in person.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-black text-muted uppercase tracking-widest bg-red-600/5 p-4 rounded-xl">
                      <Info size={14} className="text-red-600" />
                      <span>Contact academic office for specific policy clarifications.</span>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default GeneralExamDetailsPage;

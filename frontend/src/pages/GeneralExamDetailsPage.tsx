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
  Users
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sidebar Menu */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl sticky top-36">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-8 bg-primary rounded-full"></div>
                  <h3 className="text-xl font-display font-black text-dark uppercase tracking-tight">Official Links</h3>
                </div>
                
                <div className="space-y-1">
                  {resource.resources[0].items.map((item: any, idx: number) => (
                    <div key={idx}>
                      {item.isSubmenu ? (
                        <div>
                          <button
                            onClick={() => toggleSubmenu(item.title)}
                            className="w-full group flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                 <Globe size={18} />
                              </div>
                              <span className="text-[10px] font-bold text-dark uppercase tracking-tight leading-tight">{item.title}</span>
                            </div>
                            <ChevronRight 
                              size={14} 
                              className={`text-muted transition-transform ${expandedSubmenus.includes(item.title) ? 'rotate-90' : ''}`} 
                            />
                          </button>
                          <AnimatePresence>
                            {expandedSubmenus.includes(item.title) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-gray-50/50 rounded-2xl mt-1 ml-4"
                              >
                                {item.children.map((child: any, cIdx: number) => (
                                  <a
                                    key={cIdx}
                                    href={child.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-4 text-[9px] font-bold text-muted hover:text-primary uppercase tracking-widest transition-colors border-b border-gray-100/50 last:border-0"
                                  >
                                    <div className="w-1 h-1 bg-primary rounded-full" />
                                    {child.title}
                                  </a>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                               <Globe size={18} />
                            </div>
                            <span className="text-[10px] font-bold text-dark uppercase tracking-tight leading-tight">{item.title}</span>
                          </div>
                          <ChevronRight size={14} className="text-muted group-hover:translate-x-1 transition-transform" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-50">
                    <a 
                     href={resource.officialWebsite} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex items-center justify-center gap-3 w-full bg-primary text-dark py-4 rounded-xl font-display font-black uppercase text-[10px] tracking-widest hover:bg-dark hover:text-primary transition-all shadow-lg shadow-primary/20"
                    >
                      <Globe size={16} /> Visit Main Portal
                    </a>
                </div>
              </div>
            </aside>

            {/* Content Area */}
            <div className="lg:col-span-8 space-y-16">
              
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

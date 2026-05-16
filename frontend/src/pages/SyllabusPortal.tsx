import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  ChevronRight, 
  Globe, 
  Pin, 
  X, 
  ExternalLink, 
  Plus, 
  Minus,
  FileText,
  Calendar,
  Award,
  BookOpen,
  Info,
  ChevronDown
} from 'lucide-react';
import { GOVT_RESOURCES, ExamResource, ResourceLink } from '../data/govtResources';

interface SyllabusPortalProps {
  onBack: () => void;
  onRegister: () => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
  setSelectedResource: (resource: ExamResource | null) => void;
}

export const SyllabusPortal: React.FC<SyllabusPortalProps> = ({
  onBack,
  onRegister,
  setIsRegistrationModalOpen,
  setSelectedResource
}) => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [pinnedExams, setPinnedExams] = useState<string[]>(() => {
    const saved = localStorage.getItem('pinned_exam_resources');
    return saved ? JSON.parse(saved) : [];
  });

  const categories = ['ALL', 'UPSC', 'MPSC', 'SSC', 'BANKING', 'RAILWAY', 'DEFENCE', 'TEACHING', 'INSURANCE', 'ENGINEERING'];

  useEffect(() => {
    localStorage.setItem('pinned_exam_resources', JSON.stringify(pinnedExams));
  }, [pinnedExams]);

  const togglePin = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setPinnedExams(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const filteredExams = useMemo(() => {
    let list = GOVT_RESOURCES;
    
    // Category Filter
    if (activeTab !== 'ALL') {
      list = list.filter(e => e.category === activeTab);
    }

    // Search Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(e => 
        e.name.toLowerCase().includes(q) || 
        e.description.toLowerCase().includes(q) ||
        e.resources.some(r => r.items.some(item => 
          item.title.toLowerCase().includes(q) || 
          (item.children && item.children.some(c => c.title.toLowerCase().includes(q)))
        ))
      );
    }

    // Sort: Pinned first, then alphabetic
    return [...list].sort((a, b) => {
      const aPinned = pinnedExams.includes(a.id);
      const bPinned = pinnedExams.includes(b.id);
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [activeTab, searchQuery, pinnedExams]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-bg min-h-screen relative"
    >
      {/* Premium Navbar Offset Adjustment handled by App.tsx pt-12 */}
      
      {/* Header Section */}
      <header className="bg-white border-b border-gray-100 pt-20 pb-8 md:pt-24 md:pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-[-20deg] origin-top translate-x-20 pointer-events-none" />
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl">
            <button 
              onClick={onBack}
              className="group flex items-center gap-2 text-muted mb-6 hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">Back</span>
            </button>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-4"
            >
              <Globe size={12} className="text-primary animate-spin-slow" />
              <span className="text-[9px] font-black uppercase tracking-widest text-primary">Resource Hub</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-display font-black text-dark leading-none tracking-tight mb-4">
              KNOWLEDGE <span className="text-primary">REPOSITORY</span>
            </h1>

            <p className="text-base text-body font-body max-w-xl leading-relaxed mb-8">
              Official government gateways for civil services and competitive examinations.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors">
                <Search size={24} />
              </div>
              <input 
                type="text" 
                placeholder="Search exams, results, or resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-white border-2 border-gray-100 rounded-2xl text-base font-body focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-lg shadow-gray-100/10"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Categories & Grid Section */}
      <main className="py-8 md:py-12">
        {/* Category Tabs */}
        <div className="mb-8">
          <div className="section-container">
            <h3 className="text-[9px] font-black text-primary uppercase tracking-[0.4em] mb-4">Categories</h3>
          </div>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 px-[5%] md:px-[8%] min-w-max pb-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`relative px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border-2 transition-all duration-300 ${
                    activeTab === cat 
                      ? 'bg-primary text-dark border-primary shadow-xl shadow-primary/10' 
                      : 'bg-white text-muted border-gray-100 hover:border-primary/40 hover:text-dark'
                  }`}
                >
                  <span className="relative z-10">{cat}</span>
                  {activeTab === cat && (
                    <motion.div 
                      layoutId="active-cat-bg"
                      className="absolute inset-0 bg-primary rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="section-container">
          {filteredExams.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              <AnimatePresence mode="popLayout">
                {filteredExams.map((exam) => (
                  <motion.div
                    key={exam.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white rounded-2xl md:rounded-[2.5rem] p-4 md:p-8 border border-gray-100 shadow-md hover:shadow-2xl hover:shadow-primary/15 hover:border-primary/40 transition-all duration-300 group flex flex-col relative"
                  >
                    {/* Pin Button */}
                    <button 
                      onClick={(e) => togglePin(e, exam.id)}
                      className={`absolute top-3 right-3 md:top-6 md:right-6 w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        pinnedExams.includes(exam.id) 
                          ? 'bg-primary text-dark shadow-lg shadow-primary/20' 
                          : 'bg-gray-50 text-muted hover:bg-primary/20 hover:text-dark'
                      }`}
                    >
                      <Pin size={12} className={`md:w-4 md:h-4 transition-transform group-hover:scale-110 ${pinnedExams.includes(exam.id) ? 'fill-current' : ''}`} />
                    </button>

                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl md:rounded-2xl p-2 md:p-4 flex items-center justify-center mb-3 md:mb-6 group-hover:from-primary/10 group-hover:to-primary/20 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-500">
                      <img src={exam.logo} alt={exam.name} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                        <div className="h-[1px] w-3 md:w-4 bg-primary transition-all duration-300 group-hover:w-6"></div>
                        <span className="text-[8px] md:text-[9px] font-black text-primary uppercase tracking-[0.2em] truncate">{exam.category}</span>
                      </div>
                      <h3 className="text-sm md:text-2xl font-display font-black text-dark uppercase mb-2 md:mb-4 tracking-tight leading-none group-hover:text-primary transition-colors line-clamp-2">{exam.name}</h3>
                      {/* Description removed for cleaner UI */}
                    </div>

                    <button 
                      onClick={() => setSelectedResource(exam)}
                      className="w-full bg-white text-dark border-2 border-gray-100 py-2 md:py-4 rounded-lg md:rounded-xl font-display font-black uppercase text-[8px] md:text-[10px] tracking-widest flex items-center justify-center gap-1 md:gap-3 hover:border-primary hover:bg-primary/10 hover:text-primary hover:shadow-md transition-all duration-300 group/btn shadow-sm whitespace-nowrap"
                    >
                      View Hub 
                      <ChevronRight size={12} className="md:w-3.5 md:h-3.5 group-hover/btn:translate-x-1 transition-transform shrink-0" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-40 flex flex-col items-center text-center max-w-md mx-auto"
            >
              <div className="w-24 h-24 bg-gray-50 rounded-[3rem] flex items-center justify-center mb-10 text-muted/20 animate-pulse">
                <Search size={48} />
              </div>
              <h3 className="text-3xl font-display font-black text-dark uppercase mb-6">Protocol Not Found</h3>
              <p className="text-body font-body mb-10 leading-relaxed opacity-70">
                Strategic resources for this query are not yet indexed in our repository. Please try an alternative keyword.
              </p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveTab('ALL'); }}
                className="px-12 py-5 bg-dark text-white rounded-2xl font-display font-black uppercase text-[11px] tracking-widest hover:bg-primary hover:text-dark transition-all shadow-2xl shadow-dark/10"
              >
                Refresh Protocols
              </button>
            </motion.div>
          )}
        </div>
      </main>
    </motion.div>
  );
};

export default SyllabusPortal;

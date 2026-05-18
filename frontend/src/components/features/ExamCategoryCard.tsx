import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Clock, GraduationCap, MapPin } from "lucide-react";
import { GOVT_RESOURCES } from "../../data/govtResources";

// ── Mini Countdown ──────────────────────────────────────────────────────────
function useCountdown(examDate: string | null) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, active: false });

  useEffect(() => {
    if (!examDate) return;
    const calc = () => {
      const diff = new Date(examDate).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, active: false }); return; }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        active: true
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [examDate]);

  return timeLeft;
}

interface ExamCategoryCardProps {
  category: any;
  idx: number;
  isOpen: boolean;
  onToggle: () => void;
  onViewSyllabus: () => void;
  onRegister: () => void;
  isSelected?: boolean;
  onSelect?: () => void;
  onViewMPSC?: () => void;
  onViewPolice?: () => void;
  onViewMAHATET?: () => void;
  onViewSSC?: () => void;
  onViewUPSC?: () => void;
  onViewBanking?: () => void;
  onViewRailway?: () => void;
  onViewDefence?: () => void;
  onViewTeaching?: () => void;
  onViewInsurance?: () => void;
  onViewEngineering?: () => void;
  onViewDynamicExam?: (examName: string) => void;
  setSelectedResource?: (resource: any) => void;
  examDate?: string | null;
}

export function ExamCategoryCard({ 
  category, 
  idx, 
  isOpen, 
  onToggle, 
  onViewSyllabus, 
  onRegister, 
  isSelected, 
  onSelect,
  onViewMPSC,
  onViewPolice,
  onViewMAHATET,
  onViewSSC,
  onViewUPSC,
  onViewBanking,
  onViewRailway,
  onViewDefence,
  onViewTeaching,
  onViewInsurance,
  onViewEngineering,
  onViewDynamicExam,
  setSelectedResource,
  examDate
}: ExamCategoryCardProps) {
  const countdown = useCountdown(examDate || null);

  const handleViewHub = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!setSelectedResource) return;
    
    const resourceMap: Record<number, string> = {
      1: 'upsc',
      2: 'ssc',
      3: 'banking',
      4: 'railway',
      5: 'defence',
      6: 'teaching',
      7: 'insurance',
      8: 'engineering',
      14: 'police_bharti',
      15: 'mbacet'
    };

    const resourceId = resourceMap[category.id];
    if (resourceId) {
      const resource = GOVT_RESOURCES.find(r => r.id === resourceId);
      if (resource) {
        setSelectedResource(resource);
        return;
      }
    }
    
    // Fallback to old behavior if no resource found
    onViewSyllabus();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.05 }}
      onClick={() => onToggle()}
      className={`group flex flex-col bg-white rounded-2xl border border-gray-100 transition-all duration-300 relative cursor-pointer overflow-hidden ${isOpen ? 'shadow-2xl ring-2 ring-primary -translate-y-2' : 'hover:shadow-lg hover:-translate-y-1'}`}
    >
      <div className={`relative h-36 md:h-48 overflow-hidden ${category.id === 15 ? 'bg-[#f8f9fa]' : ''}`}>
        <img 
          src={category.thumb} 
          alt={`${category.title} Coaching`}
          className={`w-full h-full transition-transform duration-700 group-hover:scale-110 ${category.id === 15 ? 'object-contain p-2 md:p-4 mix-blend-multiply' : 'object-cover'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
        
        <div className="absolute top-2 left-2 md:top-4 md:left-4 flex items-center gap-1 md:gap-2">
          <div className="bg-white/20 backdrop-blur-md rounded-full px-2 py-0.5 md:px-3 md:py-1 flex items-center gap-1 md:gap-2">
            <span className="text-xs md:text-sm">{category.icon}</span>
            <span className="text-[8px] md:text-[10px] font-bold text-white uppercase tracking-widest truncate max-w-[80px] md:max-w-none">Exam Center</span>
          </div>
        </div>

        <div className="absolute bottom-2 left-3 md:bottom-4 md:left-6 pr-8 md:pr-12">
          <h3 className="text-xs md:text-xl font-display font-black !text-white leading-tight line-clamp-2">
            {category.title}
          </h3>
        </div>

        <div className={`absolute top-2 right-2 md:top-4 md:right-4 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown size={14} className="md:w-4 md:h-4" />
        </div>
      </div>

      {/* Timer Section */}
      <div className="px-3 py-2 md:px-6 md:py-4 bg-gray-50/50 border-b border-gray-100">
        {countdown.active ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 md:gap-2">
              <Clock size={12} className="text-primary md:w-3.5 md:h-3.5" />
              <span className="text-[8px] md:text-[10px] font-bold text-muted uppercase tracking-wider truncate max-w-[60px] md:max-w-none">Countdown</span>
            </div>
            <div className="flex gap-1 md:gap-2">
              {[
                { val: countdown.days, label: 'd' },
                { val: countdown.hours, label: 'h' },
                { val: countdown.minutes, label: 'm' },
              ].map((b) => (
                <div key={b.label} className="flex items-baseline gap-0.5">
                  <span className="text-dark font-black text-xs md:text-sm">{String(b.val).padStart(2, '0')}</span>
                  <span className="text-[8px] md:text-[9px] font-bold text-primary uppercase">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1 md:gap-2 opacity-50">
            <Clock size={12} className="md:w-3.5 md:h-3.5" />
            <span className="text-[8px] md:text-[10px] font-bold text-muted uppercase tracking-wider truncate">Batches Starting Soon</span>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-3 space-y-3">
              <div>
                {category.subcategories && category.subcategories.length > 0 ? (
                  category.subcategories.map((sub: any) => (
                    <div key={sub.name} className="mb-2 last:mb-0">
                      <p className="label-text mb-1 text-[8px]">{sub.name}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {sub.exams && sub.exams.map((exam: string) => (
                          <button 
                            key={exam} 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              if (category.id === 12 && onViewMPSC) onViewMPSC();
                              else if ((category.id === 14 || exam.includes("Maharashtra Police Bharti")) && onViewPolice) onViewPolice();
                              else if (category.id === 6 && onViewMAHATET) onViewMAHATET();
                              else if (category.id === 2 && onViewSSC) onViewSSC();
                              else if (category.id === 1 && onViewUPSC) onViewUPSC();
                              else if (category.id === 3 && onViewBanking) onViewBanking();
                              else if (category.id === 4 && onViewRailway) onViewRailway();
                              else if (category.id === 5 && onViewDefence) onViewDefence();
                              else if (category.id === 7 && onViewInsurance) onViewInsurance();
                              else if (category.id === 8 && onViewEngineering) onViewEngineering();
                              else if (onViewDynamicExam) onViewDynamicExam(category.title);
                              else onRegister();
                            }}
                            className="text-[9px] font-bold text-dark px-2 py-1 bg-gray-50 rounded-md hover:bg-primary/20 hover:text-dark transition-colors border border-gray-100 uppercase tracking-tight"
                          >
                            {exam}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted italic">Preparing strategic resources for you...</p>
                )}
              </div>

              <div className="flex flex-col gap-2 pt-3 border-t border-gray-100">
                <button 
                  onClick={(e) => { e.stopPropagation(); onSelect && onSelect(); onRegister(); }}
                  className="w-full btn-primary-new py-2 text-[10px]"
                >
                  {isSelected ? 'Course Selected ✓' : 'Inquire Now'}
                </button>
                <button 
                  onClick={handleViewHub}
                   className="w-full btn-outline-new py-2 text-[10px]"
                 >
                   Official Resource Hub
                  </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ExamCategoryCard;

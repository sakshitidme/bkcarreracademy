import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Play, CheckCircle, GraduationCap } from "lucide-react";
import StudentSuccessShorts from "./StudentSuccessShorts";

interface HomeHeroProps {
  setView: (view: string) => void;
  setSelectedCategory: (category: any) => void;
  onRegistration: () => void;
  onAdmission: () => void;
  heroContent?: any;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ 
  onRegistration,
  onAdmission,
  heroContent
}) => {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const EXAM_WORDS = [
    "Banking",
    "MPSC",
    "UPSC",
    "MBA CET",
    "Police Bharti",
    "SSC CGL"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIdx((prev) => (prev + 1) % EXAM_WORDS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <section className="relative min-h-[80vh] flex flex-col pt-12 pb-8 bg-bg overflow-hidden">
      {/* ─── PREMIUM DYNAMIC MOTIVATIONAL QUOTE BAR ─── */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full relative z-30 group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFC72C]/0 via-[#FFC72C]/10 to-[#FFC72C]/0 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="w-full bg-[#0a0a0a]/90 backdrop-blur-xl border-y border-[#FFC72C]/30 py-5 sm:py-6 px-6 md:px-12 shadow-[0_15px_40px_rgba(255,199,44,0.15)] text-center relative overflow-hidden">
          
          {/* Animated Shine Effect */}
          <motion.div 
            animate={{ x: ['-200%', '300%'] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "linear", repeatDelay: 3 }}
            className="absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#FFC72C]/20 to-transparent -skew-x-12 z-0"
          />

          <div className="max-w-[1400px] mx-auto relative z-10 flex items-center justify-center">
            <p className="text-[#FFC72C] font-display font-black text-xs sm:text-sm md:text-base lg:text-[17px] tracking-[0.08em] leading-relaxed uppercase drop-shadow-md">
              "Motivation only gets you to the starting line. 
              <span className="text-white font-black underline decoration-white/30 decoration-2 mx-1 transition-all duration-300 hover:text-[#FFC72C] hover:decoration-[#FFC72C] cursor-pointer">Discipline</span> 
              is what keeps you moving when you want to quit. But 
              <motion.span 
                animate={{ 
                  scale: [1, 1.05, 1], 
                  boxShadow: ["0px 0px 0px rgba(225,44,44,0)", "0px 0px 25px rgba(225,44,44,0.7)", "0px 0px 0px rgba(225,44,44,0)"] 
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-white bg-gradient-to-br from-[#E12C2C] to-[#b31b1b] px-4 py-1.5 rounded-md font-black tracking-[0.15em] text-[11px] md:text-xs shadow-[0_4px_15px_rgba(225,44,44,0.4)] mx-2 inline-block border border-white/20 relative z-20 cursor-default"
              >
                OBSESSION
              </motion.span>
              ? Obsession builds the 
              <span className="text-white font-black underline decoration-white/30 decoration-2 mx-1 transition-all duration-300 hover:text-[#FFC72C] hover:decoration-[#FFC72C] cursor-pointer">empire</span> 
              you were born to rule!"
            </p>
          </div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="section-container relative z-10 my-auto mt-6">
        {(() => {
          const hasVideos = !heroContent || (heroContent?.media && heroContent.media.length > 0);
          return (
            <div className={`grid grid-cols-1 ${hasVideos ? 'lg:grid-cols-2' : ''} gap-8 lg:gap-16 items-center`}>
              
              {/* Content Side */}
              <div className={`flex flex-col items-start space-y-8 ${!hasVideos ? 'lg:items-center lg:text-center mx-auto max-w-3xl' : ''}`}>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-2"
                >
                  <button 
                    onClick={onAdmission}
                    className="group flex items-center gap-3 px-6 py-2.5 bg-dark text-primary hover:bg-primary hover:text-dark transition-all duration-500 rounded-full shadow-lg border border-primary/30"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-primary group-hover:bg-dark animate-pulse" />
                    <span className="font-display font-black text-xs md:text-sm uppercase tracking-[0.2em]">Admissions Open</span>
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className="px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20">
                    <span className="text-primary font-bold text-[10px] uppercase tracking-widest">Since 2009</span>
                  </div>
                  <div className="px-4 py-1.5 bg-white rounded-full shadow-sm border border-gray-100">
                    <span className="text-dark font-bold text-[10px] uppercase tracking-widest">Trusted by 10,000+ Students</span>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`hero-heading w-full ${!hasVideos ? 'lg:text-center' : ''}`}
                >
                  <span className="text-dark block mb-1">Prepare for</span>
                  <div className={`h-[1.2em] relative overflow-hidden my-2 w-full ${!hasVideos ? 'flex justify-center' : ''}`}>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={EXAM_WORDS[currentWordIdx]}
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -40, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className={`absolute top-0 text-primary text-glow font-black whitespace-nowrap block ${!hasVideos ? '' : 'left-0'}`}
                      >
                        {EXAM_WORDS[currentWordIdx]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <span className="text-dark block mt-1">Excellence.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`body-text text-lg max-w-xl ${!hasVideos ? 'lg:text-center mx-auto' : ''}`}
                >
                  Prepare for UPSC, PSI, STI, and other competitive exams with Nashik's most experienced mentors. We don't just teach subjects; we shape futures.
                </motion.p>

                <div className={`flex flex-col sm:flex-row items-end gap-8 w-full ${!hasVideos ? 'justify-center' : ''}`}>
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className={`space-y-3 flex-1 ${!hasVideos ? 'flex flex-col items-center' : ''}`}
                  >
                    {["Expert Faculty from Delhi & Pune", "Comprehensive Study Material", "Regular Mock Test Series"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-body font-medium">
                        <CheckCircle size={18} className="text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </motion.ul>

                  <motion.a
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    href="https://play.google.com/store/apps/details?id=co.lazarus.qzrty&pcampaignid=web_share"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-3xl shadow-xl hover:shadow-2xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group min-w-[200px]"
                  >
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-dark group-hover:bg-primary group-hover:text-dark transition-colors shrink-0">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M5 2.5v19l15-9.5-15-9.5z" />
                       </svg>
                    </div>
                    <div className="text-left">
                      <span className="block text-[9px] font-bold text-muted uppercase tracking-widest mb-0.5">Download Our</span>
                      <span className="block text-sm font-display font-black text-dark uppercase leading-tight group-hover:text-primary transition-colors">Mobile App</span>
                    </div>
                  </motion.a>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full max-w-md ${!hasVideos ? 'justify-center mx-auto' : ''}`}
                >
                  <button
                    onClick={() => window.open(heroContent?.buttonUrl || "https://youtube.com/@bkcareeracademy2025?si=Rgum3MpCrkzthafB", "_blank")}
                    className="btn-primary-new flex items-center justify-center gap-3 whitespace-nowrap w-full sm:w-auto shadow-lg hover:shadow-primary/20"
                  >
                    Start Learning
                    <ArrowRight size={18} />
                  </button>
                  <button
                    onClick={onRegistration}
                    className="btn-outline-new text-dark flex items-center justify-center gap-3 whitespace-nowrap w-full sm:w-auto hover:bg-dark hover:text-white transition-all duration-300"
                  >
                    Book Free Demo
                  </button>
                </motion.div>
              </div>

              {/* Image/Video Side */}
              {hasVideos && (
                <motion.div
                  id="success-stories"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="relative flex justify-center lg:justify-end"
                >
                  <div className="w-full max-w-[350px] md:max-w-[500px] lg:max-w-[800px] min-h-[450px] lg:min-h-[650px] relative z-10 flex items-center justify-center overflow-visible">
                    <StudentSuccessShorts media={heroContent?.media} />
                  </div>
                </motion.div>
              )}
            </div>
          );
        })()}
      </div>
    </section>
  );
};

export default HomeHero;

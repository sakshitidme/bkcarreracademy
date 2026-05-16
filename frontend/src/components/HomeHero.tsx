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
    <section className="relative min-h-[80vh] flex items-center pt-20 lg:pt-24 pb-8 bg-bg overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Content Side */}
          <div className="flex flex-col items-start space-y-8">
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
              className="hero-heading w-full"
            >
              <span className="text-dark block mb-1">Prepare for</span>
              <div className="h-[1.2em] relative overflow-hidden my-2 w-full">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={EXAM_WORDS[currentWordIdx]}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute left-0 top-0 text-primary text-glow font-black whitespace-nowrap block"
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
              className="body-text text-lg max-w-xl"
            >
              Prepare for UPSC, PSI, STI, and other competitive exams with Nashik's most experienced mentors. We don't just teach subjects; we shape futures.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              {["Expert Faculty from Delhi & Pune", "Comprehensive Study Material", "Regular Mock Test Series"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-body font-medium">
                  <CheckCircle size={18} className="text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full max-w-md"
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
        </div>
      </div>
    </section>
  );
};

export default HomeHero;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export const ScrollToTop: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      
      setScrollProgress(scroll);
      setIsVisible(totalScroll > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 36; // 80/2 - 8/2 = 36
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-24 md:bottom-28 right-4 md:right-8 z-[80] cursor-pointer"
          onClick={scrollToTop}
        >
          {/* Base Container */}
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-dark shadow-2xl border-2 border-primary/20 hover:border-primary transition-all duration-300 group overflow-hidden">
            {/* SVG Progress Circle */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 64 64"
            >
              <motion.circle
                cx="32"
                cy="32"
                r="30"
                fill="none"
                stroke="#F5A623"
                strokeWidth="2"
                strokeDasharray={2 * Math.PI * 30}
                animate={{ strokeDashoffset: (1 - scrollProgress) * (2 * Math.PI * 30) }}
                transition={{ duration: 0.1 }}
                className="opacity-40"
              />
            </svg>

            {/* Arrow Icon */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-primary group-hover:scale-110 transition-transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
              </svg>
            </motion.div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;

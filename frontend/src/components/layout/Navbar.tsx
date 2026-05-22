import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Home, Circle, Hexagon, Diamond, Search } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  setView: (view: any) => void;
  setSelectedCategory: (id: number | null) => void;
  setSelectedSyllabusId: (id: number | null) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
  setIsCounselingModalOpen: (open: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  setView,
  setSelectedCategory,
  setSelectedSyllabusId,
  setIsRegistrationModalOpen,
  setIsCounselingModalOpen,
  isMenuOpen,
  setIsMenuOpen
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTickerIndex, setActiveTickerIndex] = useState(0);

  const tickerItems = [
    { text: "UPSC (IAS, IPS, IFS)", action: () => { navigate('/courses'); setSelectedCategory(1); } },
    { text: "MPSC (MAHARASHTRA SERVICES)", action: () => { navigate('/courses'); setSelectedCategory(2); } },
    { text: "BANKING (IBPS, SBI, RBI)", action: () => { navigate('/courses'); setSelectedCategory(3); } },
    { text: "POLICE BHARTI 2026", action: () => navigate('/courses') },
    { text: "TEACHING & EDUCATION", action: () => navigate('/courses') },
    { text: "MBA CET & MANAGEMENT", action: () => navigate('/courses') }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTickerIndex((prev) => (prev + 1) % tickerItems.length);
    }, 2000); // Change highlight every 2 seconds
    return () => clearInterval(interval);
  }, [tickerItems.length]);

  return (
    <>
      {/* Mobile Nav Toggle */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-3 left-4 z-[120] md:hidden w-10 h-10 rounded-full bg-white border border-gray-100 text-dark flex items-center justify-center shadow-lg focus:outline-none hover:bg-primary/10 transition-colors"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-dark/40 backdrop-blur-md z-[105] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Ticker */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-dark border-b border-white/5 h-12 flex items-center overflow-hidden shadow-2xl">
        <div className="flex whitespace-nowrap animate-[marquee-scroll_100s_linear_infinite]">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-12">
              {tickerItems.map((item, idx) => (
                <button 
                  key={idx}
                  onClick={item.action}
                  className={`text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:text-primary ${
                    idx === activeTickerIndex 
                      ? 'text-primary drop-shadow-[0_0_8px_rgba(245,166,35,0.6)] font-extrabold' 
                      : 'text-gray-300'
                  }`}
                >
                  {item.text}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Sidebar */}
      {/* Navigation Sidebar */}
      <aside className={`fixed top-12 left-0 bottom-0 w-64 bg-white z-[110] flex flex-col items-center py-6 transition-transform duration-500 shadow-xl overflow-y-auto scrollbar-hide ${isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <Link 
          to="/"
          onClick={() => { 
            setSelectedCategory(null); 
            setIsMenuOpen(false); 
          }}
          className="mb-6 flex flex-col items-center group px-8"
        >
          <div className="relative p-2 rounded-[1.5rem] bg-gray-50 group-hover:bg-primary/10 transition-colors">
            <BrandLogo className="w-16 h-16 transition-transform duration-500 group-hover:scale-110 rounded-xl" />
          </div>

          <div className="mt-3 text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="text-xl font-black text-red-600 font-display">BK</span>
              <span className="text-xl font-black text-dark font-display">CAREER</span>
            </div>
            <span className="text-xs font-bold text-gray-400 font-display tracking-[0.3em] uppercase block -mt-1">Academy</span>
          </div>
        </Link>

        <nav className="flex-grow w-full px-8 flex flex-col gap-1">
          {[
            { id: 'home', label: 'HOME', icon: <Home size={18} />, path: '/' },
            { id: 'about', label: 'ABOUT US', icon: <Circle size={18} />, path: '/about' },
            { id: 'courses', label: 'EXPLORE GOVT EXAM', icon: <Hexagon size={18} />, path: '/courses' },
            { id: 'syllabus', label: 'BOOKS', icon: <Diamond size={18} />, path: '/syllabus' },
          ].map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => { 
                if (item.id === 'courses' || item.id === 'home') {
                  setSelectedCategory(null);
                }
                setIsMenuOpen(false); 
              }}
              className={`flex flex-col items-center gap-1 py-3 transition-all duration-300 group text-dark hover:scale-105 ${location.pathname === item.path ? 'scale-105' : ''}`}
            >
              <span className={`${location.pathname === item.path ? 'text-primary scale-110 drop-shadow-md' : 'text-dark group-hover:text-primary'} transition-all duration-300`}>{item.icon}</span>
              <span className="font-display font-black text-[11px] font-extrabold tracking-[0.2em] drop-shadow-sm text-dark">{item.label}</span>
              {location.pathname === item.path && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="absolute left-0 w-1 h-10 bg-primary rounded-r-full shadow-[0_0_15px_rgba(245,166,35,0.5)]"
                />
              )}
            </Link>
          ))}
          
          <div className="mt-4 pt-4 border-t-2 border-dark flex flex-col gap-3">
            <button 
              onClick={() => setIsRegistrationModalOpen(true)}
              className="w-full bg-primary text-dark font-display font-black uppercase text-[10px] tracking-widest px-4 py-4 border-[3px] border-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Search size={16} /> INQUIRY
            </button>

            <button 
              onClick={() => { setIsMenuOpen(false); navigate('/admission'); }}
              className="w-full bg-[#E89C10] text-dark font-display font-black uppercase text-[10px] tracking-widest px-4 py-4 border-[3px] border-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95"
            >
              ADMISSION
            </button>

            <button 
              onClick={() => setIsCounselingModalOpen(true)}
              className="w-full bg-white text-dark font-display font-black uppercase text-[10px] tracking-widest px-4 py-4 border-[3px] border-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Hexagon className="text-primary" size={16} /> FREE COUNSELING
            </button>
          </div>
        </nav>


        <div className="px-8 mt-auto pt-8 w-full">
          <p className="text-[10px] text-gray-400 font-medium text-center leading-relaxed">
            Leading Coaching Institute for UPSC & Competitive Exams
          </p>
        </div>
      </aside>
    </>
  );
};

export default Navbar;

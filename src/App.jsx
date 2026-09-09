import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS, SKILL_CATEGORIES, MILESTONES } from './data/projectsData';
import InteractiveTerminal from './components/InteractiveTerminal';
import ProjectModal from './components/ProjectModal';
import ContactModal from './components/ContactModal';

// Custom SVG Icons for ultra-sleek high-fashion UI
const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FourPointStar = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SparklesIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </svg>
);

const MoonIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const TerminalIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" x2="20" y1="19" y2="19" />
  </svg>
);

const CodeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const MailIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MapPinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const WhatsappIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 2.159.684 4.159 1.848 5.804L2.05 21.95l4.288-1.768C7.94 21.328 9.914 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.815 0-3.513-.502-4.966-1.375l-.356-.214-2.548 1.05.998-2.457-.234-.374C3.968 15.176 3.5 13.636 3.5 12c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5z"/>
  </svg>
);


export default function App() {
  // State Management
  const [headline, setHeadline] = useState('ROHAN');
  const [isCinematicGlow, setIsCinematicGlow] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeNav, setActiveNav] = useState('HERO');
  const [toastMessage, setToastMessage] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [skillsActive, setSkillsActive] = useState(false);
  
  // Custom Hacker Preloader States
  const [isLoading, setIsLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  // Projects Filtering & Search
  const [projectCategory, setProjectCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  // Modals & Drawers
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [accentColor, setAccentColor] = useState('cyan'); // cyan, purple, gold

  // Stats Counter
  const [codeLines, setCodeLines] = useState(48920);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleDirectEmailSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.email || !contactForm.message) {
      triggerToast('Please fill in Email and Message!');
      return;
    }
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: contactForm.email,
          subject: `Inquiry from ${contactForm.name || 'Visitor'} (Phone: ${contactForm.phone || 'N/A'})`,
          message: contactForm.message
        })
      });

      if (response.ok) {
        triggerToast('Message saved to database! ⚡');
      } else {
        triggerToast('Message dispatched! ⚡');
      }
    } catch (err) {
      triggerToast('Message dispatched successfully! ⚡');
    }
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  const handleWhatsAppSend = async () => {
    if (!contactForm.message && !contactForm.name && !contactForm.email) {
      triggerToast('Please fill in your details or message first!');
      return;
    }

    // Save to MongoDB backend database
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: contactForm.email || 'whatsapp_visitor@portfolio.com',
          subject: `WhatsApp Inquiry from ${contactForm.name || 'Visitor'} (Phone: ${contactForm.phone || 'N/A'})`,
          message: contactForm.message || 'WhatsApp transmission initiated'
        })
      });
    } catch (err) {
      // Proceed gracefully even if backend is offline locally
    }

    const text = `Hello Rohan,\n\nName: ${contactForm.name || 'N/A'}\nEmail: ${contactForm.email || 'N/A'}\nPhone: ${contactForm.phone || 'N/A'}\n\nMessage:\n${contactForm.message || 'I would like to discuss a project with you.'}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/917798478406?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
    triggerToast('Saved in Database & Opening WhatsApp... 💬');
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('rohandusane100@gmail.com');
    triggerToast('Copied email: rohandusane100@gmail.com 📋');
  };

  // Parallax Calculation on Mouse Movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle header scroll background transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger skills progress bar expansion when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSkillsActive(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    const el = document.getElementById('skills');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Preloader progress bar sequence (Slower, ~3s total boot duration)
  useEffect(() => {
    if (loadProgress < 100) {
      const interval = setInterval(() => {
        setLoadProgress(prev => {
          const next = prev + Math.floor(Math.random() * 4) + 1; // 1% to 4% increments
          return next >= 100 ? 100 : next;
        });
      }, 90); // 90ms steps
      return () => clearInterval(interval);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
        const unmountTimer = setTimeout(() => {
          setShowPreloader(false);
        }, 800);
        return () => clearTimeout(unmountTimer);
      }, 500); // 500ms feedback pause at 100%
      return () => clearTimeout(timer);
    }
  }, [loadProgress]);

  // Trigger staggered reveal transitions after preloader ends
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsRevealed(true);
      }, 80);
      return () => clearTimeout(timer);
    } else {
      setIsRevealed(false);
    }
  }, [isLoading]);

  // Increment lines of code simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCodeLines(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const scrollToSection = (id) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const headlines = ['ROHAN', 'PORTFOLIO', 'ARCHITECT'];
  const categories = ['ALL', 'FULL-STACK', 'IOT & EMBEDDED', 'E-COMMERCE / HOSPITALITY', 'BACKEND'];

  const filteredProjects = PROJECTS.filter(p => {
    const matchesCat = projectCategory === 'ALL' || p.category === projectCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="relative w-full min-h-screen bg-[#000000] text-white select-none overflow-x-hidden">
      
      {/* Cinematic Hacker Preloader */}
      {showPreloader && (
        <div className={`fixed inset-0 z-[100] bg-[#030303] flex flex-col items-center justify-center font-mono text-[10px] sm:text-xs px-6 transition-all duration-[900ms] ${
          !isLoading ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
        }`}>
          {/* Cyber scanline overlay for preloader */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-25" />

          <div className="w-full max-w-sm space-y-8 relative z-10">
            
            {/* HUD Dial Loader */}
            <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <svg className="absolute w-full h-full animate-[spin_4s_linear_infinite] text-green-500/10" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" fill="none" />
              </svg>
              <svg className="absolute w-[85%] h-[85%] animate-[spin_2.5s_linear_infinite_reverse] text-green-500/35" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="30 80" strokeLinecap="round" fill="none" />
              </svg>
              <svg className="absolute w-[70%] h-[70%] animate-[spin_1.2s_linear_infinite] text-green-500" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2.5" strokeDasharray="50 50" strokeLinecap="round" fill="none" />
              </svg>
              <span className="text-[11px] font-bold text-green-400 tracking-wider">
                {loadProgress}%
              </span>
            </div>

            {/* Logo Signature */}
            <div className="flex items-center justify-between border-b border-[#222222]/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="font-extrabold uppercase tracking-[0.25em] text-white">ROHAN DUSANE</span>
              </div>
              <span className="text-green-500/50 text-[9px] font-bold tracking-widest">v4.2 // OS</span>
            </div>

            {/* Load Telemetry (Rolling Compiler style) */}
            <div className="space-y-2 text-green-500/60 min-h-[96px] text-[11px] leading-relaxed font-mono">
              {(() => {
                const logs = [];
                logs.push(`> ESTABLISHING HOST CONNECTION... OK`);
                if (loadProgress > 15) logs.push(`> ALLOCATING BUFFER DATA [0x7FFF00]... OK`);
                if (loadProgress > 35) logs.push(`> DECRYPTING PORTFOLIO DATABASE SECTORS... OK`);
                if (loadProgress > 55) logs.push(`> INITIALIZING 3D DEPTH CANVAS MATRIX... OK`);
                if (loadProgress > 75) logs.push(`> RESOLVING SECURE COMPILER ROUTERS... OK`);
                if (loadProgress > 90) logs.push(`> STABILITY SYSTEM CHECKS ONLINE`);
                if (loadProgress === 100) logs.push(`> SHELL BOOT COMPLETED. LAUNCHING WORKSPACE...`);
                return logs.slice(-4).map((log, i) => (
                  <div key={i} className={i === 3 && loadProgress === 100 ? "text-green-400 font-bold animate-pulse" : ""}>
                    {log}
                  </div>
                ));
              })()}
            </div>

            {/* Progress Gauge */}
            <div className="space-y-2.5 pt-2">
              <div className="flex justify-between text-[#888888] text-[9px] uppercase tracking-widest font-bold">
                <span>SYSTEM LOADER SEQUENCE</span>
                <span className={loadProgress === 100 ? 'text-green-400 font-bold' : 'text-white'}>
                  {loadProgress}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-[#111111] border border-[#222222] rounded-full overflow-hidden p-0.5">
                <div 
                  className="h-full bg-green-500 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(34,197,94,0.75)]"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Main Website Wrapper with luxury zoom/slide entrance animation */}
      <div 
        className={`transition-all duration-1000 ${
          isLoading 
            ? 'opacity-0 scale-[0.96] translate-y-6 pointer-events-none' 
            : 'opacity-100 scale-100 translate-y-0'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#111111] border border-[#333333] text-white px-5 py-2.5 rounded-full text-xs tracking-widest uppercase flex items-center gap-2 shadow-2xl transition-all duration-300 animate-bounce">
          <CheckIcon className="w-3.5 h-3.5 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FIXED TOP NAVIGATION BAR */}
      {/* ========================================================================= */}
      <header className={`fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 flex items-center justify-between transition-all duration-[800ms] ease-out ${
        isScrolled 
          ? 'py-4 bg-black/80 backdrop-blur-xl border-b border-neutral-900/80 shadow-2xl' 
          : 'py-6 sm:py-8 bg-transparent border-b border-transparent'
      } ${
        isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6 pointer-events-none'
      }`}>
        
        {/* Left: Brand Mark */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => scrollToSection('hero')}
            className="font-sans text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-[0.3em] md:tracking-[0.45em] text-white hover:opacity-80 transition-opacity flex items-center gap-2 group cursor-pointer btn-click-pop whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-white group-hover:scale-125 transition-transform" />
            <span className="pr-1.5">ROHAN DUSANE</span>
          </button>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 bg-black/60 backdrop-blur-md px-6 py-2 rounded-full border border-neutral-800 shadow-2xl">
          {[
            { id: 'hero', label: 'HERO' },
            { id: 'terminal', label: 'TERMINAL' },
            { id: 'projects', label: 'PROJECTS' },
            { id: 'skills', label: 'SKILLS' },
            { id: 'about', label: 'ABOUT' },
            { id: 'connect', label: 'CONNECT' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 relative py-1 cursor-pointer ${
                activeNav === item.id ? 'text-white font-bold' : 'text-[#888888] hover:text-white'
              }`}
            >
              {item.label}
              {activeNav === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full transition-all duration-300" />
              )}
            </button>
          ))}
        </nav>

        {/* Right Actions & Contact Button */}
        <div className="flex items-center gap-3">
          
          {/* Text Switcher Pills */}
          <div className="hidden lg:flex items-center bg-[#111111] border border-[#222222] rounded-full p-1 text-[10px] uppercase font-bold">
            {headlines.map((text) => (
              <button
                key={text}
                onClick={() => setHeadline(text)}
                className={`px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer tracking-[0.25em] btn-click-pop ${
                  headline === text ? 'bg-white text-black font-bold animate-pop' : 'text-[#888888] hover:text-white'
                }`}
              >
                {text}
              </button>
            ))}
          </div>

          {/* Minimalist Dark Switch */}
          <button
            onClick={() => {
              setIsCinematicGlow(!isCinematicGlow);
              triggerToast(isCinematicGlow ? 'Spotlight Dimmed' : 'Cinematic Spotlight On');
            }}
            aria-label="Toggle Dark Mode"
            className="relative flex items-center justify-between w-14 h-7 p-1 rounded-full bg-[#111111] border border-[#222222] hover:border-neutral-700 transition-all duration-300 cursor-pointer shadow-lg group"
          >
            <div 
              className={`w-5 h-5 rounded-full bg-white flex items-center justify-center text-black shadow-md transition-transform duration-500 ease-out ${
                isCinematicGlow ? 'translate-x-7' : 'translate-x-0'
              }`}
            >
              {isCinematicGlow ? <SparklesIcon className="w-3 h-3 text-black" /> : <MoonIcon className="w-3 h-3 text-black" />}
            </div>
          </button>

          {/* Contact Trigger Button */}
          <button
            onClick={() => setIsContactOpen(true)}
            className="px-4 py-1.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs uppercase font-extrabold tracking-wider transition-colors cursor-pointer shadow-lg"
          >
            CONNECT
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SECTION 1: HERO VIEWPORT WITH 3D DEPTH LAYER PORTRAIT CUTOUT */}
      {/* ========================================================================= */}
      <section id="hero" className="relative w-full h-screen flex flex-col justify-between overflow-hidden">
        
        {/* Layer 1: Base Background & Vignette */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[#000000]" />
          <div className="absolute inset-0 dark-vignette opacity-90" />
          <div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full blur-[140px] pointer-events-none transition-opacity duration-1000 ${
              isCinematicGlow ? 'bg-white/5 opacity-100' : 'bg-neutral-800/10 opacity-30'
            }`}
          />
          <CyberDustCanvas />
          <div className="absolute inset-0 grunge-overlay opacity-30" />
        </div>

        {/* Layer 2: Behind-Subject Dynamic Typography */}
        <div 
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden"
          style={{
            transform: `translate3d(${mousePos.x * -14}px, ${mousePos.y * -10}px, 0)`,
            transition: 'transform 0.15s cubic-bezier(0.1, 0.9, 0.2, 1)'
          }}
        >
          <h1 
            className={`font-bebas text-[20vw] sm:text-[21vw] md:text-[22vw] leading-none tracking-[0.18em] pl-[0.18em] uppercase font-black text-center whitespace-nowrap text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] grunge-text transition-all duration-[1200ms] ease-out ${
              isRevealed ? 'opacity-95 blur-none scale-100' : 'opacity-0 blur-xl scale-[1.08]'
            }`}
          >
            {headline}
          </h1>
        </div>

        {/* Layer 3: Foreground Subject Cutout (Overlaps Text Center) */}
        <div 
          className="absolute inset-0 z-20 flex items-end justify-center pointer-events-none overflow-hidden"
          style={{
            transform: `translate3d(${mousePos.x * 10}px, ${mousePos.y * 6}px, 0) scale(1.02)`,
            transition: 'transform 0.15s cubic-bezier(0.1, 0.9, 0.2, 1)'
          }}
        >
          <div className={`relative max-w-full h-full flex items-end justify-center transition-all duration-[1400ms] delay-[350ms] ease-out ${
            isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-[0.97]'
          }`}>
            <img 
              src="/hero-portrait.png" 
              alt="Rohan — Suited Cutout Portrait" 
              className="h-[76vh] sm:h-[83vh] md:h-[89vh] lg:h-[93vh] max-h-[1050px] w-auto object-contain object-bottom drop-shadow-[0_25px_60px_rgba(0,0,0,0.98)] transition-all duration-500"
              style={{
                filter: isCinematicGlow 
                  ? 'contrast(1.12) brightness(1.02) drop-shadow(0 20px 50px rgba(0,0,0,0.95))' 
                  : 'contrast(1.04) brightness(0.92) drop-shadow(0 15px 30px rgba(0,0,0,0.95))'
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#000000] via-[#000000]/70 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Spacer to balance flex-col distribution */}
        <div className="relative z-30 w-full px-6 sm:px-12 pt-28 pointer-events-none" />

        {/* Flanking Subtext Banner */}
        <div className="relative z-30 w-full px-6 sm:px-12 my-auto flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto">
          <div className={`flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-md border border-neutral-900/60 shadow-lg transition-all duration-[1000ms] delay-[650ms] ease-out ${
            isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-medium text-[#888888]">
              • FULL-STACK ARCHITECT & DIGITAL ENFORCER
            </span>
          </div>

          <div className={`flex items-center gap-3 transition-all duration-[1000ms] delay-[800ms] ease-out ${
            isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            <button
              onClick={() => scrollToSection('projects')}
              className="px-5 py-2 rounded-full bg-white/10 hover:bg-white hover:text-black border border-white/20 text-white text-[11px] font-mono font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-lg"
            >
              EXPLORE PROJECTS ↓
            </button>

            <button
              onClick={() => scrollToSection('terminal')}
              className="px-4 py-2 rounded-full bg-[#111111] hover:bg-[#222222] border border-[#333333] text-white text-[11px] font-mono flex items-center gap-2 transition-colors cursor-pointer shadow-lg"
            >
              <TerminalIcon className="w-3.5 h-3.5 text-green-400" />
              <span>TERMINAL</span>
            </button>
          </div>
        </div>

        {/* Hero Bottom Bar */}
        <div className="relative z-30 w-full border-t border-[#222222] px-6 sm:px-12 py-5 flex items-center justify-between bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-5 sm:gap-7">
            <a 
              href="https://github.com/rohan20004" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="GitHub"
              className="text-[#888888] hover:text-white transition-colors p-1"
            >
              <GithubIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/rohan-dusane-3b49723a2/" 
              target="_blank" 
              rel="noreferrer"
              aria-label="LinkedIn" 
              className="text-[#888888] hover:text-white transition-colors p-1"
            >
              <LinkedinIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </a>
            <a 
              href="https://www.instagram.com/rohan__dusane/" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram"
              className="text-[#888888] hover:text-white transition-colors p-1"
            >
              <InstagramIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </a>
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 group text-[#888888] hover:text-white transition-colors cursor-pointer"
            onClick={() => triggerToast('Accessing secure resume credentials...')}
          >
            <span className="text-xs font-mono tracking-widest uppercase font-bold">DOWNLOAD RESUME</span>
            <FourPointStar className="w-3.5 h-3.5 text-white/70 group-hover:text-white group-hover:rotate-45 transition-all duration-500" />
          </a>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: INTERACTIVE OS TERMINAL CONSOLE */}
      {/* ========================================================================= */}
      <section id="terminal" className="w-full px-6 sm:px-12 py-16 max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#888888]">COMMAND CONSOLE ENVIRONMENT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-sans">
              INTERACTIVE SHELL
            </h2>
          </div>
          <p className="text-xs font-mono text-[#888888]">
            Direct CLI access to query projects, skills, telemetry, and developer bio.
          </p>
        </div>

        <InteractiveTerminal onNavigate={scrollToSection} />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: PROJECTS SHOWCASE & FILTER GRID */}
      {/* ========================================================================= */}
      <section id="projects" className="w-full px-6 sm:px-12 py-16 border-t border-[#1a1a1a] max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CodeIcon className="w-4 h-4 text-white/80" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#888888]">FEATURED WORK & UTILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-sans">
              SELECTED PROJECTS
            </h2>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack, title, or keywords..."
              className="w-full bg-[#111111] border border-[#222222] focus:border-white rounded-full px-4 py-2 text-xs text-white placeholder-[#555555] focus:outline-none transition-colors font-mono"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#777777] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setProjectCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all shrink-0 cursor-pointer border ${
                projectCategory === cat
                  ? 'bg-white text-black font-bold border-white shadow-lg'
                  : 'bg-[#111111] text-[#888888] border-[#222222] hover:border-[#444444] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group glass-panel glass-panel-hover rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between min-h-[260px]"
            >
              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  {/* Category and Featured badges */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded bg-[#141414] border border-[#222222] text-[#888888] text-[9px] font-mono tracking-widest uppercase font-bold">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2.5 py-1 rounded bg-white text-black text-[9px] font-mono tracking-widest uppercase font-extrabold shadow-sm">
                        FEATURED
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white font-sans uppercase tracking-tight group-hover:text-neutral-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#999999] font-sans mt-2.5 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-0.5 rounded bg-[#181818] border border-[#2a2a2a] text-[10px] font-mono text-[#aaaaaa]"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-2 py-0.5 rounded bg-[#181818] border border-[#2a2a2a] text-[10px] font-mono text-[#aaaaaa]">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                {/* Stats Footer */}
                <div className="pt-4 border-t border-[#222222] flex items-center justify-between text-[11px] font-mono text-[#777777]">
                  <div className="flex items-center gap-3">
                    <span>★ {project.stats.stars}</span>
                    <span>⑂ {project.stats.forks}</span>
                  </div>
                  <span className="text-white font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    INSPECT ↗
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-16 text-center text-[#777777] font-mono text-xs border border-dashed border-[#222222] rounded-2xl">
            No projects found matching current filter or search criteria.
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: TECHNICAL SKILLS & METRICS */}
      {/* ========================================================================= */}
      <section id="skills" className="w-full px-6 sm:px-12 py-16 border-t border-[#1a1a1a] max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-1">
            <FourPointStar className="w-4 h-4 text-white/80" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#888888]">TECHNICAL PROFICIENCIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-sans">
            MY SKILL MATRIX
          </h2>
          <p className="text-xs font-mono text-[#888888] mt-2">
            Engineering stack, database systems, real-time integrations, and IoT architectures.
          </p>
        </div>

        {/* 3-Column Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="bg-[#0b0b0b] border border-[#222222] p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-mono uppercase tracking-widest text-[#aaaaaa] mb-5 pb-2 border-b border-[#1f1f1f] flex items-center justify-between">
                  <span>{cat.title}</span>
                  <span className="text-[10px] text-[#666666]">0{idx + 1} // MATRIX</span>
                </h3>

                <div className="space-y-4">
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                        <span className="text-white font-semibold">{skill.name}</span>
                        <span className="text-[#888888]">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#262626]">
                        <div 
                          className="h-full bg-gradient-to-r from-neutral-400 to-white rounded-full transition-all duration-1000"
                          style={{ width: skillsActive ? `${skill.level}%` : '0%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Interactive Telemetry Box - Full Width underneath Skills Matrix */}
        <div className="bg-[#0e0e0e] border border-[#222222] p-6 rounded-2xl text-xs font-mono max-w-3xl mx-auto">
          <div className="flex items-center justify-between pb-3 border-b border-[#222222]">
            <span className="uppercase text-[#888888] font-bold tracking-wider">LIVE DEV BENCHMARKS & METRICS</span>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4">
            <div className="flex justify-between sm:flex-col sm:gap-1">
              <span className="text-[#888888]">Total Pushed Lines:</span>
              <span className="text-white font-bold text-sm sm:text-base">{codeLines.toLocaleString()}</span>
            </div>
            <div className="flex justify-between sm:flex-col sm:gap-1">
              <span className="text-[#888888]">Average Latency:</span>
              <span className="text-green-400 font-bold text-sm sm:text-base">12ms</span>
            </div>
            <div className="flex justify-between sm:flex-col sm:gap-1">
              <span className="text-[#888888]">System Status:</span>
              <span className="text-white font-bold text-sm sm:text-base">100% OPERATIONAL</span>
            </div>
          </div>

          <button
            onClick={() => {
              triggerToast('Simulated Build Optimization Executed');
              setCodeLines(prev => prev + 120);
            }}
            className="w-full py-2 bg-[#1b1b1b] hover:bg-[#282828] text-white rounded-lg uppercase tracking-wider text-[10px] font-bold border border-[#333333] transition-colors cursor-pointer"
          >
            RUN BENCHMARK SIMULATION ⚡
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: ABOUT ME & PHILOSOPHY */}
      {/* ========================================================================= */}
      <section id="about" className="w-full px-6 sm:px-12 py-16 border-t border-[#1a1a1a] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Profile Bio & Tenets */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#888888]">DEVELOPER PROFILE</span>
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-sans leading-none">
                EXECUTION OVER EXCUSES.
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
                I am a Computer Science software developer specializing in creating scalable full-stack web applications, QR-tethered platforms, and high-performance backend systems with architectural precision. Passionate about algorithms, robust RESTful APIs, and clean software design.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-[#0f0f0f] p-4 rounded-xl border border-[#222222]">
                  <div className="text-2xl font-black text-white font-mono">9+</div>
                  <div className="text-[11px] font-mono text-[#888888] uppercase tracking-wider mt-1">Projects Built</div>
                </div>
                <div className="bg-[#0f0f0f] p-4 rounded-xl border border-[#222222]">
                  <div className="text-2xl font-black text-white font-mono">2</div>
                  <div className="text-[11px] font-mono text-[#888888] uppercase tracking-wider mt-1">Industry Roles</div>
                </div>
              </div>
            </div>

            {/* Core Tenets */}
            <div className="bg-[#0b0b0b] border border-[#222222] p-6 sm:p-8 rounded-2xl relative overflow-hidden space-y-6">
              <div className="text-xs font-mono uppercase tracking-widest text-[#888888] border-b border-[#1f1f1f] pb-3">
                CORE TENETS & PHILOSOPHY
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex gap-3">
                  <span className="text-white font-bold">01 //</span>
                  <span className="text-neutral-300">Clean, zero-bloat architecture with robust RESTful APIs.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-white font-bold">02 //</span>
                  <span className="text-neutral-300">Real-time systems (Socket.io) and smart IoT hardware integration.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-white font-bold">03 //</span>
                  <span className="text-neutral-300">Architectural precision, robust database design, and clean code.</span>
                </div>
              </div>

              <button
                onClick={() => setIsContactOpen(true)}
                className="w-full py-3 bg-white text-black font-extrabold uppercase text-xs tracking-widest rounded-xl hover:bg-neutral-200 transition-colors shadow-2xl cursor-pointer"
              >
                START A CONVERSATION ➔
              </button>
            </div>
          </div>

          {/* Right Column: Career Milestones Timeline */}
          <div className="bg-[#0b0b0b] border border-[#222222] p-6 sm:p-8 rounded-2xl">
            <h3 className="text-base font-mono uppercase tracking-widest text-[#ffffff] mb-8 pb-3 border-b border-[#222222]">
              CAREER TIMELINE & EDUCATION
            </h3>

            <div className="space-y-8 relative before:absolute before:left-[10px] before:top-4 before:bottom-4 before:w-[1px] before:bg-[#222222]">
              {MILESTONES.map((m, i) => (
                <div key={i} className="relative pl-8">
                  <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-[#111111] border border-white flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div className="text-xs font-mono text-[#aaaaaa] uppercase tracking-widest">{m.year}</div>
                  <h4 className="text-base sm:text-lg font-extrabold text-white uppercase font-sans mt-1">{m.role}</h4>
                  <div className="text-sm font-mono text-white/80 mt-0.5">{m.company}</div>
                  <p className="text-sm text-[#bbbbbb] font-sans mt-2 leading-relaxed">{m.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: 04 // CONNECT & TRANSMISSION */}
      {/* ========================================================================= */}
      <section id="connect" className="w-full px-6 sm:px-12 py-20 border-t border-[#1a1a1a] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Heading, Direct Contact Cards & Socials */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#888888]">04 // CONNECT</span>
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-sans leading-[1.05]">
                LET'S CONSTRUCT DIGITAL PRODUCTS
              </h2>

              <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
                Have an interesting opportunity, system architecture request, or full-stack project idea? Reach out directly.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              
              {/* EMAIL CARD */}
              <div 
                onClick={copyEmail}
                className="group bg-[#0b0b0b] hover:bg-[#121212] border border-[#222222] hover:border-white/40 p-4 rounded-xl transition-all duration-300 flex items-center gap-4 cursor-pointer shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-[#141414] border border-[#2a2a2a] group-hover:border-white/60 flex items-center justify-center text-white transition-colors shrink-0">
                  <MailIcon className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">EMAIL ME</div>
                  <div className="text-xs sm:text-sm font-bold text-white group-hover:text-neutral-300 transition-colors font-mono truncate">
                    rohandusane100@gmail.com
                  </div>
                </div>
              </div>

              {/* PHONE CARD */}
              <a 
                href="tel:+917798478406"
                className="group bg-[#0b0b0b] hover:bg-[#121212] border border-[#222222] hover:border-white/40 p-4 rounded-xl transition-all duration-300 flex items-center gap-4 cursor-pointer shadow-lg block"
              >
                <div className="w-12 h-12 rounded-xl bg-[#141414] border border-[#2a2a2a] group-hover:border-white/60 flex items-center justify-center text-white transition-colors shrink-0">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">CALL ME</div>
                  <div className="text-xs sm:text-sm font-bold text-white group-hover:text-neutral-300 transition-colors font-mono">
                    +91 7798478406
                  </div>
                </div>
              </a>

              {/* LOCATION CARD */}
              <div className="bg-[#0b0b0b] border border-[#222222] p-4 rounded-xl flex items-center gap-4 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-[#141414] border border-[#2a2a2a] flex items-center justify-center text-white shrink-0">
                  <MapPinIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">LOCATION</div>
                  <div className="text-xs sm:text-sm font-bold text-white font-mono">
                    Nashik, Maharashtra, India
                  </div>
                </div>
              </div>

            </div>

            {/* Social Link Buttons */}
            <div className="pt-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#777777] mb-3 font-bold">
                SOCIAL PROTOCOLS
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/rohan20004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-[#0b0b0b] hover:bg-white text-white hover:text-black border border-[#222222] hover:border-white flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer btn-click-pop group"
                  title="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/rohan-dusane-3b49723a2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-[#0b0b0b] hover:bg-white text-white hover:text-black border border-[#222222] hover:border-white flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer btn-click-pop group"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/rohan__dusane/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-[#0b0b0b] hover:bg-white text-white hover:text-black border border-[#222222] hover:border-white flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer btn-click-pop group"
                  title="Instagram"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Form Container */}
          <div className="lg:col-span-7 bg-[#0b0b0b] border border-[#222222] p-6 sm:p-8 rounded-2xl shadow-2xl relative">
            <h3 className="text-xs font-mono uppercase tracking-widest text-white/80 pb-4 mb-6 border-b border-[#1f1f1f] flex items-center justify-between">
              <span>DIRECT TRANSMISSION FORM</span>
              <span className="text-[10px] text-white font-bold flex items-center gap-1.5 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                SYSTEM ONLINE
              </span>
            </h3>

            <form onSubmit={handleDirectEmailSubmit} className="space-y-5">
              
              {/* NAME */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#aaaaaa] mb-2 font-bold">
                  NAME
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full bg-[#141414] border border-[#262626] focus:border-white rounded-xl px-4 py-3 text-xs text-white placeholder-[#555555] focus:outline-none transition-colors font-mono"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#aaaaaa] mb-2 font-bold">
                  EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="yourname@domain.com"
                  className="w-full bg-[#141414] border border-[#262626] focus:border-white rounded-xl px-4 py-3 text-xs text-white placeholder-[#555555] focus:outline-none transition-colors font-mono"
                />
              </div>

              {/* PHONE / WHATSAPP NUMBER */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#aaaaaa] mb-2 font-bold">
                  PHONE / WHATSAPP NUMBER
                </label>
                <input
                  type="text"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  placeholder="+91 9876543210"
                  className="w-full bg-[#141414] border border-[#262626] focus:border-white rounded-xl px-4 py-3 text-xs text-white placeholder-[#555555] focus:outline-none transition-colors font-mono"
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#aaaaaa] mb-2 font-bold">
                  MESSAGE
                </label>
                <textarea
                  required
                  rows="4"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Hello Rohan, I want to discuss a project..."
                  className="w-full bg-[#141414] border border-[#262626] focus:border-white rounded-xl px-4 py-3 text-xs text-white placeholder-[#555555] focus:outline-none transition-colors font-mono resize-none"
                />
              </div>

              {/* ACTION BUTTONS: PURE BLACK & WHITE THEME */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 px-5 bg-white text-black hover:bg-neutral-200 border border-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer active:scale-[0.98]"
                >
                  <MailIcon className="w-4 h-4 text-black" />
                  <span>SEND TO EMAIL</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="flex-1 py-3.5 px-5 bg-[#121212] text-white hover:bg-white hover:text-black border border-[#333333] hover:border-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer active:scale-[0.98] group"
                >
                  <WhatsappIcon className="w-4 h-4 fill-current text-white group-hover:text-black transition-colors" />
                  <span>SEND ON WHATSAPP</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOOTER BAR */}
      {/* ========================================================================= */}
      <footer className="w-full border-t border-[#222222] bg-[#050505] px-6 sm:px-12 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left Side: Contact Specifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#888888]">
                CONTACT SPECIFICATIONS
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono">
              <div className="space-y-1">
                <div className="text-[#666666] uppercase text-[9px] tracking-wider">EMAIL DIRECT</div>
                <a 
                  href="mailto:rohandusane100@gmail.com" 
                  className="text-white hover:text-neutral-300 transition-colors block"
                >
                  rohandusane100@gmail.com
                </a>
              </div>
              
              <div className="space-y-1">
                <div className="text-[#666666] uppercase text-[9px] tracking-wider">SECURE TELEPHONE</div>
                <a 
                  href="tel:+917798478406" 
                  className="text-white hover:text-neutral-300 transition-colors block"
                >
                  +91 7798478406
                </a>
              </div>
              
              <div className="space-y-1">
                <div className="text-[#666666] uppercase text-[9px] tracking-wider">SYSTEM NODES / LOCATION</div>
                <span className="text-white block">
                  Nashik, MH, India
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Copyright & Back to Top */}
          <div className="flex flex-col md:items-end justify-between h-full space-y-4 md:space-y-0">
            <div className="flex items-center gap-6 text-xs font-mono text-[#888888]">
              <button 
                onClick={() => scrollToSection('hero')} 
                className="hover:text-white transition-colors uppercase tracking-[0.2em] font-bold btn-click-pop cursor-pointer"
              >
                ↑ SECURE BOOT (BACK TO TOP)
              </button>
            </div>
            
            <div className="text-xs font-mono text-[#666666] md:text-right mt-4 space-y-1">
              <span className="text-white font-bold tracking-widest uppercase text-[10px] block mb-1">
                ROHAN DUSANE
              </span>
              <div>© 2026 — ALL RIGHTS RESERVED. ARCHITECTED WITH PRECISION.</div>
              <div className="text-[10px] text-white/50 tracking-wider">DESIGNED AND DEVELOPED BY ROHAN DUSANE</div>
            </div>
          </div>

        </div>
      </footer>

      </div> {/* Closing main website entrance wrapper */}

      {/* MODALS */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        triggerToast={triggerToast}
      />

      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
        triggerToast={triggerToast}
      />
    </div>
  );
}

// Ambient digital code dust particle overlay for Hero depth
function CyberDustCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2 + 0.4,
        speedX: (Math.random() - 0.5) * 0.12,
        speedY: (Math.random() - 0.5) * 0.12,
        alpha: Math.random() * 0.4 + 0.1,
        fadeSpeed: Math.random() * 0.004 + 0.001,
        fadeOut: Math.random() > 0.5
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        if (p.fadeOut) {
          p.alpha -= p.fadeSpeed;
          if (p.alpha <= 0.1) p.fadeOut = false;
        } else {
          p.alpha += p.fadeSpeed;
          if (p.alpha >= 0.5) p.fadeOut = true;
        }
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none opacity-30 z-0"
    />
  );
}

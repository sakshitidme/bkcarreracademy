import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Calendar, GraduationCap, ArrowLeft, Target, ShieldCheck, Sparkles, Zap, ArrowRight, BookOpen, AlertCircle, Check, Info, ExternalLink, Globe } from 'lucide-react';
import SEO from '../components/common/SEO';

interface DynamicExamDetailsPageProps {
  examName?: string;
  onBack: () => void;
  onRegister: () => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
}

// ── Smart Content Renderer ──────────────────────────────────────────────
const SmartContentRenderer: React.FC<{ content: string }> = ({ content }) => {
  const isRoutine = content.toLowerCase().includes('daily routine') || content.includes('→');
  const isPhases = content.toLowerCase().includes('phase') && (content.includes('1') || content.includes('Foundation'));
  const isChecklist = content.toLowerCase().includes('task tracker') || content.includes('[ ]');

  if (isRoutine) {
    const lines = content.split('\n').filter(l => l.includes('→') || l.includes(':'));
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lines.map((line, i) => {
          const parts = line.split(/[→:]/);
          if (parts.length < 2) return null;
          const [time, activity] = parts.map(s => s.trim());
          return (
            <div key={i} className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 hover:border-primary/30 transition-all group">
               <div className="px-4 py-2 bg-primary/10 rounded-xl text-primary font-bold text-[10px] uppercase tracking-widest">
                  {time}
               </div>
               <div className="font-display font-black text-dark uppercase tracking-tight text-sm">{activity}</div>
            </div>
          );
        })}
      </div>
    );
  }

  if (isPhases) {
    const phases = content.split(/Phase\s*\d+/i).filter(p => p.trim().length > 10);
    return (
      <div className="space-y-8">
        {phases.map((p, i) => (
          <div key={i} className="relative pl-8 border-l-2 border-primary/20">
            <div className="absolute left-[-9px] top-0 w-4 h-4 bg-primary rounded-full ring-4 ring-white" />
            <div className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100">
               <h4 className="text-primary font-bold uppercase tracking-widest text-[10px] mb-4">Phase {i+1} Roadmap</h4>
               <div className="text-body font-body leading-relaxed whitespace-pre-wrap text-sm">{p.trim()}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isChecklist) {
    const items = content.split('\n').filter(l => l.trim().startsWith('[ ]') || l.trim().startsWith('-'));
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-2xl hover:border-primary/50 transition-all group">
             <div className="w-5 h-5 rounded-full border-2 border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
                <ShieldCheck size={12} className="text-white opacity-0 group-hover:opacity-100" />
             </div>
             <span className="font-display font-black uppercase text-[10px] tracking-widest text-dark">{item.replace(/\[\s?\]|-/, '').trim()}</span>
          </div>
        ))}
      </div>
    );
  }

  return <div className="whitespace-pre-wrap font-body text-body leading-relaxed">{content}</div>;
};

// ── Premium Countdown Widget ───────────────────────────────────────────────
const CountdownTimer: React.FC<{ examDate: string }> = ({ examDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: false });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(examDate).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        passed: false
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [examDate]);

  if (timeLeft.passed) return null;

  return (
    <div className="mb-1 bg-white border border-gray-100 rounded-[3rem] p-4 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-2 relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Clock className="text-primary animate-pulse" size={32} />
            </div>
            <div>
              <h4 className="text-dark text-3xl font-display font-black tracking-tight uppercase">Strategic <span className="text-primary">Deadline</span></h4>
              <p className="text-muted font-bold text-[10px] uppercase tracking-[0.4em] mt-1">Countdown to Excellence</p>
            </div>
          </div>
          <div className="px-6 py-3 bg-gray-50 border border-gray-100 rounded-full flex items-center gap-3 backdrop-blur-md">
            <Calendar size={18} className="text-primary" />
            <span className="text-dark font-display font-black uppercase text-xs tracking-widest">
              {new Date(examDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
          {[
            { l: 'Days', v: timeLeft.days },
            { l: 'Hrs', v: timeLeft.hours },
            { l: 'Min', v: timeLeft.minutes },
            { l: 'Sec', v: timeLeft.seconds }
          ].map(b => (
            <div key={b.l} className="group">
              <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-3xl text-center backdrop-blur-md transition-all hover:bg-primary/10 hover:border-primary/30">
                <span className="text-5xl md:text-7xl font-display font-black text-dark block mb-2 tracking-tighter tabular-nums">
                  {String(b.v).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60 group-hover:text-primary transition-colors">{b.l}</span>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export const DynamicExamDetailsPage: React.FC<DynamicExamDetailsPageProps> = ({
  examName: propsExamName,
  onBack,
  onRegister,
  setIsRegistrationModalOpen
}) => {
  const navigate = useNavigate();
  const { examName: urlExamName } = useParams();
  const examName = propsExamName || urlExamName || '';
  
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const [upscResp, coursesResp, examsResp] = await Promise.all([
          fetch('/api/content/upsc_hub'),
          fetch('/api/content/courses'),
          fetch('/api/content/exams')
        ]);
        const [upscData, coursesData, examsData] = await Promise.all([
          upscResp.json(),
          coursesResp.json(),
          examsResp.json()
        ]);
        const allItems = [...(upscData.items || []), ...(coursesData.items || []), ...(examsData.items || [])];
        const matches = allItems.filter(item => 
          item.subCategory?.trim().toLowerCase() === examName.trim().toLowerCase() ||
          item.title?.trim().toLowerCase() === examName.trim().toLowerCase() ||
          item.category?.trim().toLowerCase() === examName.trim().toLowerCase()
        ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        if (matches.length > 0) {
          const allSections = matches.reduce((acc, curr) => [...acc, ...(curr.dynamicSections || [])], []);
          const firstWithImage = matches.find(m => m.image);
          const firstWithDate = matches.find(m => m.examDate);
          
          setContent({ 
            ...matches[0], 
            image: firstWithImage ? firstWithImage.image : matches[0].image,
            examDate: firstWithDate ? firstWithDate.examDate : matches[0].examDate,
            dynamicSections: allSections 
          });
        } else {
          setContent(null);
        }
      } catch (err) {
        console.error("Failed to fetch exam details", err);
      } finally {
        setLoading(false);
      }
    };
    if (examName) fetchContent();
  }, [examName]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-bg relative">
      <SEO 
        title={`${examName} Coaching & Exam Details | BK Academy`}
        description={`Get complete details about ${examName} exam pattern, syllabus, and coaching at BK Career Academy Nashik.`}
        canonical={`https://bkeducation.in/exam/${encodeURIComponent(examName)}`}
      />
      
      {/* Premium Navbar */}
      <nav className="fixed top-0 left-0 md:left-64 right-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-gray-100 h-20 pl-16 md:pl-0">
        <div className="section-container h-full flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={onBack}
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-dark group-hover:scale-110 transition-transform">
              <GraduationCap size={20} />
            </div>
            <div>
              <span className="text-xl font-display font-black text-dark block leading-none uppercase">{examName}</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Master Blueprint</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setIsRegistrationModalOpen(true)}
              className="btn-primary-new px-6 py-2.5 text-[10px]"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </nav>

      <header className="pt-20 pb-0 bg-white relative overflow-hidden">
        <div className="section-container">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full mb-1">
            <Sparkles size={14} className="text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Strategic Framework 2026</span>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-dark uppercase tracking-tight leading-none mb-0">
            {examName} <br/> <span className="text-primary text-glow">Blueprints</span>
          </h1>
          <p className="text-body text-xl font-body max-w-3xl leading-relaxed">
            The ultimate institutional framework for {examName} candidates. Designed for high-performance outcomes.
          </p>
        </div>
      </header>

      <main className="py-0">
        <div className="section-container">
          {loading ? (
             <div className="py-40 text-center flex flex-col items-center gap-6">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <span className="font-bold text-[10px] uppercase tracking-widest text-muted">Syncing Protocols...</span>
             </div>
          ) : content ? (
            <div className="space-y-0">
              {content.examDate && <CountdownTimer examDate={content.examDate} />}
              


              <div className="grid grid-cols-1 gap-12">
                {content.dynamicSections?.map((sec: any, idx: number) => (
                  <motion.section 
                    key={idx}
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-[3rem] p-4 border border-gray-100 hover:shadow-2xl hover:shadow-primary/5 transition-all group"
                  >
                    <div className="flex items-center gap-6 mb-1 border-b border-gray-100 pb-1">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                         {idx % 2 === 0 ? <Target size={28} /> : <Zap size={28} />}
                      </div>
                      <div>
                        <h3 className="text-3xl md:text-5xl font-display font-black text-dark uppercase tracking-tight leading-none">{sec.title}</h3>
                        <div className="mt-2 text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Strategic Module 0{idx + 1}</div>
                      </div>
                    </div>
                    <div className="prose-container">
                       <SmartContentRenderer content={sec.content} />
                    </div>
                  </motion.section>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-40 bg-white rounded-[4rem] border border-gray-100">
              <h3 className="text-4xl font-display font-black text-dark uppercase mb-8">Protocol Not Active</h3>
              <button onClick={onRegister} className="btn-primary-new px-12 py-5 text-xl">
                Request Briefing
              </button>
            </div>
          )}
          
          {/* Government Gateways Section */}
          <section id="gateways" className="scroll-mt-32 mt-12">
            <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
              <header className="mb-12 relative z-10 border-l-4 border-primary pl-6">
                <div className="flex items-center gap-4 mb-4">
                  <Globe size={32} className="text-primary" />
                  <h2 className="text-4xl font-display font-black text-dark uppercase tracking-tight">Official Gateways</h2>
                </div>
                <p className="text-body font-body text-lg italic">Direct institutional access to verified government recruitment portals.</p>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {[
                  { title: "National Career Service", url: "https://www.ncs.gov.in", desc: "All India Job Portal" },
                  { title: "MyGov India", url: "https://www.mygov.in", desc: "Citizen Engagement Platform" },
                  { title: "Digital India", url: "https://www.digitalindia.gov.in", desc: "E-Governance Services" },
                  { title: "Employment News", url: "http://employmentnews.gov.in", desc: "Official Weekly Publication" }
                ].map((link, i) => (
                  <a 
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-8 bg-gray-50/50 hover:bg-white rounded-[2.5rem] border border-gray-100 hover:border-primary/40 transition-all duration-500 backdrop-blur-sm"
                  >
                    <div className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-dark transition-all duration-300 mb-6 shadow-sm">
                      <ExternalLink size={20} />
                    </div>
                    <h5 className="font-display font-black uppercase text-lg mb-2 text-dark group-hover:text-primary transition-colors">{link.title}</h5>
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest">{link.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>
              {/* Eligibility & Standards Section */}
              <section id="eligibility" className="scroll-mt-32 mb-12">
                <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
                  <header className="mb-12 relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <GraduationCap size={24} />
                      </div>
                      <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">Eligibility Matrix</h2>
                    </div>
                    <p className="body-text">Core requirements for {examName} training and certification.</p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    {/* Qualification */}
                    <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-primary/20 transition-all">
                      <h4 className="text-lg font-display font-black text-dark uppercase mb-6 flex items-center gap-3">
                        <BookOpen size={20} className="text-primary" /> Qualification
                      </h4>
                      <ul className="space-y-4 text-sm text-body font-bold uppercase tracking-tight">
                        <li className="flex items-start gap-3">
                          <Check size={16} className="text-primary mt-0.5 shrink-0" />
                          <span>Recognized Degree or Diploma in relevant field</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check size={16} className="text-primary mt-0.5 shrink-0" />
                          <span>Final year appearing candidates eligibility as per norms</span>
                        </li>
                      </ul>
                    </div>

                    {/* Standards */}
                    <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-primary/20 transition-all">
                      <h4 className="text-lg font-display font-black text-dark uppercase mb-6 flex items-center gap-3">
                        <ShieldCheck size={20} className="text-primary" /> Standards
                      </h4>
                      <div className="space-y-6">
                        <div className="p-4 bg-white rounded-2xl">
                          <p className="text-[10px] font-black text-muted uppercase mb-1">Age limit</p>
                          <p className="text-xl font-display font-black text-dark">18 - 35 YEARS</p>
                        </div>
                        <div className="p-4 bg-white rounded-2xl">
                          <p className="text-[10px] font-black text-muted uppercase mb-1">Fitness Protocol</p>
                          <p className="text-sm font-bold text-dark uppercase">Subject to specific medical and physical assessment.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Refund Policy Section */}
              <section id="refund" className="scroll-mt-32 mb-12">
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
                    <div className="p-6 bg-white rounded-3xl border border-red-50">
                      <p className="text-sm text-body leading-relaxed font-bold uppercase tracking-tight">
                        Course fees once paid are <span className="text-red-600">non-refundable</span> under any circumstances. However, students may request to transfer their admission to another batch or course within 7 days of enrollment, subject to management approval.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-black text-muted uppercase tracking-widest bg-red-600/5 p-4 rounded-xl">
                      <Info size={14} className="text-red-600" />
                      <span>Please read all course details carefully before completing your transaction.</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>

      <section className="bg-white border-t border-gray-100 py-16 text-center relative overflow-hidden">
        <div className="section-container relative z-10">
          <h2 className="text-5xl md:text-7xl font-display font-black text-dark uppercase mb-8 leading-tight">
            Initiate Your <br/> <span className="text-primary text-glow">Training</span> Phase
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button onClick={onRegister} className="btn-primary-new px-12 py-5 text-xl group">
               Join Academy <ArrowRight className="inline-block ml-2 group-hover:translate-x-2 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/admission')}
              className="btn-outline-new px-12 py-5 text-xl"
            >
              Proceed to Admission
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default DynamicExamDetailsPage;

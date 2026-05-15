import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, CheckCircle2, ArrowLeft, Sparkles, Target, Zap, GraduationCap } from 'lucide-react';

interface AboutUPSCProps {
  onBack: () => void;
  onRegister: () => void;
  setView: (view: any) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const AboutUPSC: React.FC<AboutUPSCProps> = ({
  onBack,
  onRegister,
  setView,
  setIsRegistrationModalOpen,
  isMenuOpen,
  setIsMenuOpen
}) => {
  const navigate = useNavigate();
  const [hubContent, setHubContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content/upsc_hub')
      .then(res => res.json())
      .then(data => {
        if (data.success) setHubContent(data.items);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-bg min-h-screen"
    >
      {/* Premium Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-gray-100 h-20">
        <div className="section-container h-full flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setView('home')}
          >
            <div className="w-10 h-10 bg-dark rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <GraduationCap size={20} />
            </div>
            <div>
              <span className="text-xl font-display font-black text-dark block leading-none">UPSC HUB</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Admin Orientation</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setIsRegistrationModalOpen(true)}
              className="btn-primary-new px-6 py-2.5 text-[10px]"
            >
              Consultant Hub
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="pt-48 pb-24 bg-white border-b border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-[-20deg] origin-top translate-x-20" />
        <div className="section-container relative z-10">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-muted mb-8 hover:text-primary transition-colors"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Back to Dashboard</span>
          </button>
          <div className="max-w-4xl">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full mb-8">
              <Sparkles size={14} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Official Strategic Content</span>
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-display font-black text-dark leading-tight mb-8">
              Career <span className="text-primary text-glow">Opportunities</span> Through UPSC
            </h1>
            <p className="text-xl text-body font-body leading-relaxed max-w-3xl">
              A Gateway to Prestigious Government Services — The blueprint for absolute administrative leadership in modern India.
            </p>
          </div>
        </div>
      </header>

      <main className="py-24">
        <div className="section-container">
          <div className="max-w-5xl mx-auto space-y-32">
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-40 space-y-6">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-[10px] font-bold text-muted uppercase tracking-[0.3em]">Syncing Insights...</p>
              </div>
            ) : hubContent.length > 0 ? (
              hubContent.map((item, idx) => (
                <section key={idx} className="space-y-12">
                  <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
                    <div>
                      <h2 className="text-3xl md:text-5xl font-display font-black text-dark uppercase tracking-tight leading-none mb-4">
                        {item.title}
                      </h2>
                      <div className="flex items-center gap-3">
                        <span className="text-primary text-[10px] font-bold uppercase tracking-widest">{item.subCategory}</span>
                        {item.isFeatured && (
                          <span className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 uppercase rounded-full">Strategic Hub</span>
                        )}
                      </div>
                    </div>
                    <div className="w-20 h-2 bg-primary rounded-full" />
                  </header>
                  
                  <div className="grid grid-cols-1 gap-8">
                    {item.dynamicSections.map((sec: any, sIdx: number) => (
                      <div key={sIdx} className="bg-white p-12 rounded-[3rem] border border-gray-100 hover:shadow-2xl hover:shadow-primary/5 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full" />
                        <h3 className="text-xl font-display font-black text-dark uppercase tracking-wider mb-8 flex items-center gap-4">
                           <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                             {sIdx % 2 === 0 ? <Target size={20} /> : <Zap size={20} />}
                           </div>
                           {sec.title}
                        </h3>
                        <div className="text-body text-lg leading-relaxed font-body whitespace-pre-wrap">
                          {sec.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <div className="text-center py-40 bg-white border border-gray-100 rounded-[4rem]">
                <p className="text-muted text-xl font-body italic mb-8">
                  "Strategic content for this hub is being finalized. Check back soon for the full blueprint."
                </p>
                <button onClick={onBack} className="btn-outline-new px-8 py-3">Return to Hub</button>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* Footer CTA */}
      <section className="bg-white border-t border-gray-100 py-32 text-center relative overflow-hidden">
         <div className="section-container relative z-10">
            <h2 className="text-4xl md:text-7xl font-display font-black text-dark uppercase mb-12 leading-tight">
              Ready to Forge Your <br /> <span className="text-primary text-glow">Legacy?</span>
            </h2>
            <p className="text-body mb-16 max-w-2xl mx-auto text-lg font-body">
              "Motivation fades, but discipline stays forever. A career through UPSC CSE opens doors to impactful roles that contribute to India’s growth."
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <button onClick={onRegister} className="btn-primary-new px-16 py-6 text-xl group">
                  Start Your Journey
               </button>
               <button 
                onClick={() => navigate('/admission')}
                className="btn-outline-new px-16 py-6 text-xl"
              >
                Proceed to Admission
               </button>
            </div>
         </div>
      </section>
    </motion.div>
  );
};

export default AboutUPSC;

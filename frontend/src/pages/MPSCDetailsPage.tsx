import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  BookOpen, 
  GraduationCap, 
  Trophy, 
  Info, 
  CheckCircle2, 
  ListChecks, 
  Calendar, 
  Users,
  Coins,
  History,
  Globe2,
  PieChart,
  ShieldCheck,
  Zap,
  Globe,
  Monitor,
  Dna,
  Scale,
  ArrowRight,
  FileText,
  ChevronRight
} from 'lucide-react';

const IPS_STUDENTS = [
  { name: "Bharat Nagre", photo: "/Successful student pho/IPS/Bharat Nagre.jpeg", post: "UPSC / IPS" },
  { name: "Chaudhari", photo: "/Successful student pho/IPS/Chaudhari PSI.jpg", post: "PSI (पोलीस उपनिरीक्षक)" },
  { name: "Darade Soniya", photo: "/Successful student pho/IPS/Darade Soniya.jpeg", post: "UPSC / IPS" },
  { name: "Dattraj Tandale", photo: "/Successful student pho/IPS/Dattraj Tandale.jpeg", post: "UPSC / IPS" },
  { name: "Dattu Sadgir", photo: "/Successful student pho/IPS/Dattu Sadgır Clerk.jpg", post: "Clerk (लिपिक)" },
  { name: "Ganesh Tarage", photo: "/Successful student pho/IPS/Ganesh Tarage.jpeg", post: "UPSC / IPS" },
  { name: "Gite", photo: "/Successful student pho/IPS/Gite PSI.jpg", post: "PSI (पोलीस उपनिरीक्षक)" }
];

interface MPSCDetailsPageProps {
  onBack: () => void;
  onRegister: () => void;
  setView: (view: any) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
}

export const MPSCDetailsPage: React.FC<MPSCDetailsPageProps> = ({
  onBack,
  onRegister,
  setView,
  setIsRegistrationModalOpen
}) => {
  const navigate = useNavigate();
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

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
              <Trophy size={20} />
            </div>
            <div>
              <span className="text-xl font-display font-black text-dark block leading-none">MPSC</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">मार्गदर्शन केंद्र</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
             <button onClick={() => scrollToSection('group-b')} className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors">गट ब (Group B)</button>
             <button onClick={() => scrollToSection('group-c')} className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors">गट क (Group C)</button>
             <button onClick={() => scrollToSection('syllabus')} className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors">अभ्यासक्रम</button>
             <a 
              href="https://play.google.com/store/apps/details?id=co.lazarus.nqvxi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#111111] text-white rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-primary hover:text-dark transition-all flex items-center gap-2 border border-white/10"
             >
              Get MPSC Course on App
             </a>
             <button 
              onClick={() => setIsRegistrationModalOpen(true)}
              className="btn-primary-new px-6 py-2.5 text-[10px]"
            >
              मार्गदर्शकांशी बोला
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-0 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-[-20deg] origin-top translate-x-20" />
        <div className="section-container relative z-10">
          {/* ─── PREMIUM DYNAMIC SUCCESS STORIES MARQUEE BAR (BREAKOUT TO FULL WIDTH) ─── */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-screen relative left-1/2 right-1/2 -translate-x-1/2 z-30 group mt-2 mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFC72C]/0 via-[#FFC72C]/10 to-[#FFC72C]/0 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="w-full bg-[#0a0a0a]/90 backdrop-blur-xl border-y border-[#FFC72C]/30 py-2.5 px-6 shadow-[0_15px_40px_rgba(255,199,44,0.15)] relative overflow-hidden flex flex-col gap-2">
              <div className="flex items-center justify-center gap-3 z-10 px-4">
                <div className="h-[1px] bg-gradient-to-r from-transparent to-[#FFC72C]/20 flex-grow max-w-[150px]" />
                <div className="flex items-center gap-2">
                  <GraduationCap className="text-[#FFC72C] w-4 h-4" />
                  <span className="text-[#FFC72C] font-display font-bold text-[10px] md:text-xs uppercase tracking-[0.25em]">
                    आमचे यशस्वी MPSC / UPSC अधिकारी
                  </span>
                </div>
                <div className="h-[1px] bg-gradient-to-l from-transparent to-[#FFC72C]/20 flex-grow max-w-[150px]" />
              </div>
              
              <div className="w-full overflow-hidden relative z-10 px-4">
                <div 
                  className="flex gap-8 whitespace-nowrap cursor-pointer"
                  onClick={() => setIsMarqueePaused(true)}
                  onMouseLeave={() => setIsMarqueePaused(false)}
                  style={{
                    animation: 'marquee-scroll 10s linear infinite',
                    animationPlayState: isMarqueePaused ? 'paused' : 'running',
                    width: 'max-content'
                  }}
                >
                  {/* Copy 1 */}
                  {IPS_STUDENTS.map((student, idx) => (
                    <div 
                      key={`s1-${idx}`} 
                      className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-[#FFC72C]/50 px-5 py-2.5 rounded-2xl backdrop-blur-sm transition-all duration-300"
                    >
                      <div className="w-24 h-30 rounded-lg overflow-hidden border border-[#FFC72C]/40 shrink-0 shadow-md">
                        <img 
                          src={student.photo} 
                          alt={student.name} 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/bk.png';
                          }}
                        />
                      </div>
                      <div className="flex flex-col text-left gap-1">
                        <span className="text-white text-sm md:text-base font-extrabold tracking-wide">{student.name}</span>
                        <span className="text-[#FFC72C] text-xs font-black uppercase tracking-wider">{student.post}</span>
                      </div>
                    </div>
                  ))}

                  {/* Golden Divider Line */}
                  <div className="w-[3px] self-stretch min-h-[60px] bg-gradient-to-b from-transparent via-[#FFC72C] to-transparent shadow-[0_0_8px_#FFC72C] mx-4 shrink-0" />

                  {/* Copy 2 */}
                  {IPS_STUDENTS.map((student, idx) => (
                    <div 
                      key={`s2-${idx}`} 
                      className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-[#FFC72C]/50 px-5 py-2.5 rounded-2xl backdrop-blur-sm transition-all duration-300"
                    >
                      <div className="w-24 h-30 rounded-lg overflow-hidden border border-[#FFC72C]/40 shrink-0 shadow-md">
                        <img 
                          src={student.photo} 
                          alt={student.name} 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/bk.png';
                          }}
                        />
                      </div>
                      <div className="flex flex-col text-left gap-1">
                        <span className="text-white text-sm md:text-base font-extrabold tracking-wide">{student.name}</span>
                        <span className="text-[#FFC72C] text-xs font-black uppercase tracking-wider">{student.post}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-muted mb-4 hover:text-primary transition-colors"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">अभ्याक्रमांकडे परत जा</span>
          </button>
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-black text-dark leading-tight mb-4">
              महाराष्ट्र अराजपत्रित <br /><span className="text-primary text-glow">संयुक्त नागरी</span> सेवा परीक्षा
            </h1>
            <p className="text-xl text-body font-body leading-relaxed max-w-3xl">
              MPSC गट ब (Group B) आणि गट क (Group C) भरतीसाठी सखोल रणनीती आणि दर्जेदार मार्गदर्शन. नाशिकमधील उत्कृष्ट मार्गदर्शकांसोबत तुमची प्रशासकीय यशाची वाटचाल सुरू करा.
            </p>
          </div>
        </div>
      </header>

      <main className="py-0">
        <div className="section-container space-y-0">
          
          {/* SECTION 1: GROUP B DETAILS */}
          <section id="group-b" className="scroll-mt-32">
            <header className="mb-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <BookOpen size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">गट ब (Group B) सविस्तर माहिती</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {["PSI (पोलीस उपनिरीक्षक)", "STI (राज्य कर निरीक्षक)", "ASO (सहाय्यक कक्ष अधिकारी)", "S-14 वेतन श्रेणी"].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[10px] font-bold text-muted uppercase tracking-widest">{tag}</span>
                ))}
              </div>
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-1">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <GraduationCap size={20} />
                </div>
                <h3 className="text-lg font-display font-black text-dark uppercase mb-4">शैक्षणिक पात्रता</h3>
                <ul className="space-y-3 text-sm text-body leading-relaxed">
                  <li className="flex gap-2">
                    <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                    शासनमान्य विद्यापीठाची कोणतीही पदवी आवश्यक.
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                    पदवीच्या अंतिम वर्षात असणारे विद्यार्थी पूर्व परीक्षेसाठी पात्र.
                  </li>
                  <li className="flex gap-2 font-bold text-dark">
                    <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                    मराठी भाषेचे ज्ञान असणे बंधनकारक.
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <ListChecks size={20} />
                </div>
                <h3 className="text-lg font-display font-black text-dark uppercase mb-4">शारीरिक पात्रता (केवळ PSI पदासाठी)</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">पुरुष उमेदवार</p>
                    <p className="text-sm text-dark font-bold">उंची: १६५ सेमी (किमान) | छाती: ७९ सेमी (न फुगवता, ५ सेमी फुगवणे आवश्यक)</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">महिला उमेदवार</p>
                    <p className="text-sm text-dark font-bold">उंची: १५७ सेमी (किमान)</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <Calendar size={20} />
                </div>
                <h3 className="text-lg font-display font-black text-dark uppercase mb-4">वयोमर्यादा निकष</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-[10px] font-bold text-muted uppercase">सर्वसाधारण प्रवर्ग</span>
                    <span className="text-sm font-bold text-dark">१८ – ४३ वर्षे (राखीव: शासकीय नियमांनुसार शिथिलता)</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-[10px] font-bold text-muted uppercase">PSI पदासाठी</span>
                    <span className="text-sm font-bold text-dark">१९ – ३१ वर्षे</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted">पदाचे नाव</th>
                      <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted">परीक्षेचे स्वरूप</th>
                      <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted text-center">पूर्व परीक्षा</th>
                      <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted text-center">मुख्य परीक्षा</th>
                      <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted text-center">शारीरिक चाचणी</th>
                      <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted text-center">मुलाखत</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { name: "राज्य कर निरीक्षक (STI)", type: "संयुक्त पूर्व परीक्षा + स्वतंत्र मुख्य परीक्षा", pre: "१०० गुण", main: "४०० गुण", physical: "—", interview: "—" },
                      { name: "सहाय्यक कक्ष अधिकारी (ASO)", type: "संयुक्त पूर्व परीक्षा + स्वतंत्र मुख्य परीक्षा", pre: "१०० गुण", main: "४०० गुण", physical: "—", interview: "—" },
                      { name: "दुय्यम निबंधक / मुद्रांक निरीक्षक", type: "संयुक्त पूर्व परीक्षा + स्वतंत्र मुख्य परीक्षा", pre: "१०० गुण", main: "४०० गुण", physical: "—", interview: "—" },
                      { name: "पोलीस उपनिरीक्षक (PSI)", type: "संयुक्त पूर्व + मुख्य परीक्षा + शारीरिक चाचणी + मुलाखत", pre: "१०० गुण", main: "४०० गुण", physical: "१०० गुण", interview: "४० गुण" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-6 text-sm font-bold text-dark">{row.name}</td>
                        <td className="px-8 py-6 text-xs text-body">{row.type}</td>
                        <td className="px-8 py-6 text-sm font-black text-dark text-center">{row.pre}</td>
                        <td className="px-8 py-6 text-sm font-black text-dark text-center">{row.main}</td>
                        <td className="px-8 py-6 text-sm font-bold text-muted text-center">{row.physical}</td>
                        <td className="px-8 py-6 text-sm font-bold text-muted text-center">{row.interview}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* SECTION 2: GROUP C DETAILS */}
          <section id="group-c" className="scroll-mt-32">
            <header className="mb-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Monitor size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">गट क (Group C) सविस्तर माहिती</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {["लिपिक-टंकलेखक", "कर सहाय्यक", "दुय्यम निरीक्षक (उत्पादन शुल्क)", "टंकलेखन चाचणी (Typing)"].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[10px] font-bold text-muted uppercase tracking-widest">{tag}</span>
                ))}
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-display font-black text-dark uppercase mb-6">गुणदान पद्धत (Exam Pattern)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gray-50 rounded-2xl">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">संयुक्त पूर्व परीक्षा</p>
                      <p className="text-2xl font-display font-black text-dark">१०० गुण</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-2xl">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">मुख्य परीक्षा</p>
                      <p className="text-2xl font-display font-black text-dark">२०० गुण</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 border border-dashed border-gray-200 rounded-2xl flex items-center gap-3">
                    <Info size={16} className="text-primary shrink-0" />
                    <p className="text-xs text-body italic">लिपिक-टंकलेखक आणि कर सहाय्यक पदांसाठी व्यावसायिक टंकलेखन (Typing Skill Test) चाचणी अनिवार्य आहे.</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-display font-black text-dark uppercase mb-6">पात्रता निकष (Eligibility)</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-primary mt-1" />
                      <div>
                        <p className="text-sm font-bold text-dark">शैक्षणिक पात्रता</p>
                        <p className="text-xs text-body">शासनमान्य विद्यापीठाची कोणत्याही शाखेतील पदवी उत्तीर्ण. मुख्य परीक्षेचा अर्ज भरण्याच्या अंतिम तारखेपर्यंत पदवी पूर्ण असणे आवश्यक.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-primary mt-1" />
                      <div>
                        <p className="text-sm font-bold text-dark">वयोमर्यादा निकष</p>
                        <p className="text-xs text-body">किमान वय १८ वर्षे आणि खुला प्रवर्ग कमाल वय ३८ वर्षे (मागासवर्गीय उमेदवारांसाठी शासकीय नियमांनुसार ५ वर्षांची शिथिलता).</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-[3rem] p-12 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[100px] rounded-full" />
                <h3 className="text-2xl font-display font-black text-dark uppercase mb-8 border-l-4 border-primary pl-6">संयुक्त पूर्व परीक्षा पॅटर्न</h3>
                <div className="space-y-10">
                  <div className="flex items-center justify-between group">
                    <span className="text-muted font-bold uppercase tracking-widest text-[10px]">एकूण प्रश्न</span>
                    <span className="text-3xl font-display font-black text-primary">१००</span>
                  </div>
                  <div className="flex items-center justify-between group">
                    <span className="text-muted font-bold uppercase tracking-widest text-[10px]">एकूण गुण</span>
                    <span className="text-3xl font-display font-black text-primary">१००</span>
                  </div>
                  <div className="flex items-center justify-between group">
                    <span className="text-muted font-bold uppercase tracking-widest text-[10px]">कालावधी</span>
                    <span className="text-xl font-display font-black text-dark">६० मिनिटे</span>
                  </div>
                  <div className="flex items-center justify-between group">
                    <span className="text-muted font-bold uppercase tracking-widest text-[10px]">नकारात्मक गुण पद्धत</span>
                    <span className="text-sm font-bold text-primary">०.२५ (१/४ गुणांची वजावट)</span>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                  <p className="text-xs text-muted italic">परीक्षा बहुपर्यायी वस्तुनिष्ठ (MCQ) स्वरूपाची असते</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: SALARY & SCHEDULE */}
          <section id="salary-schedule" className="grid grid-cols-1 lg:grid-cols-2 gap-12 scroll-mt-32">
             <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Coins size={24} />
                  </div>
                  <h3 className="text-2xl font-display font-black text-dark uppercase">वेतन श्रेणी (Remuneration Matrix)</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { post: "सहाय्यक कक्ष अधिकारी (ASO)", scale: "S-14 वेतन श्रेणी" },
                    { post: "राज्य कर निरीक्षक (STI)", scale: "S-14 वेतन श्रेणी" },
                    { post: "पोलीस उपनिरीक्षक (PSI)", scale: "S-14 वेतन श्रेणी" }
                  ].map((item, i) => (
                    <div key={i} className="group p-6 bg-gray-50 rounded-2xl hover:bg-white border border-transparent hover:border-gray-100 transition-all flex justify-between items-center">
                      <div>
                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">MPSC गट ब (Group B) राजपत्रित</p>
                        <h4 className="text-sm font-bold text-dark uppercase">{item.post}</h4>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-primary uppercase mb-1">{item.scale}</p>
                        <p className="text-lg font-display font-black text-dark">₹३८,६०० – १,२२,८०० + शासकीय भत्ते</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>

             <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <History size={24} />
                  </div>
                  <h3 className="text-2xl font-display font-black text-dark uppercase">संभाव्य वेळापत्रक (Exam Cycle)</h3>
                </div>
                <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
                  {[
                    { t: "जाहिरात प्रसिद्धी", d: "जानेवारी २०२६", active: true },
                    { t: "संयुक्त पूर्व परीक्षा", d: "एप्रिल २०२६", active: true },
                    { t: "पूर्व परीक्षेचा निकाल", d: "जून २०२६" },
                    { t: "मुख्य परीक्षा आयोजन", d: "सप्टेंबर २०२६", active: true },
                    { t: "अंतिम निवड यादी", d: "डिसेंबर २०२६" },
                  ].map((step, i) => (
                    <div key={i} className="relative pl-10">
                      <div className={`absolute left-0 top-1.5 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center transition-all ${step.active ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-gray-100'}`}>
                        {step.active && <CheckCircle2 size={12} className="text-dark" />}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">{step.t}</p>
                        <p className={`text-lg font-display font-black uppercase ${step.active ? 'text-dark' : 'text-muted'}`}>{step.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </section>

          {/* SECTION 4: SYLLABUS */}
          <section id="syllabus" className="scroll-mt-32">
            <header className="mb-1 text-center max-w-3xl mx-auto">
              <p className="label-text mb-4">अभ्यासक्रम ओळख</p>
              <h2 className="section-heading text-center">सविस्तर <span className="text-primary text-glow">अभ्यासक्रम</span></h2>
              <p className="body-text text-center mt-4 italic">महाराष्ट्र अराजपत्रित गट ब आणि गट क संयुक्त परीक्षेसाठी सविस्तर अभ्यासक्रम रचना.</p>
            </header>

            <div className="space-y-1">
              {/* Prelims Syllabus */}
              <div className="space-y-8">
                <h3 className="text-2xl font-display font-black text-dark uppercase border-l-4 border-primary pl-6">I. पूर्व परीक्षा अभ्यासक्रम (१०० गुण)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                   {[
                     { t: "चालू घडामोडी", d: "जागतिक, राष्ट्रीय तसेच महाराष्ट्रातील महत्त्वाच्या घडामोडींचे आकलन." },
                     { t: "राज्यशास्त्र आणि नागरीशास्त्र", d: "भारतीय राज्यघटना, संघराज्य, राज्य प्रशासन व स्थानिक स्वराज्य संस्था (पंचायत राज)." },
                     { t: "इतिहास", d: "आधुनिक भारताचा विशेषतः महाराष्ट्राचा इतिहास आणि समाजसुधारकांचे योगदान." },
                     { t: "भूगोल", d: "महाराष्ट्राच्या भूगोलाच्या विशेष अभ्यासासह: पृथ्वी, हवामान, नद्या, पिके आणि प्रमुख उद्योग." },
                     { t: "अर्थव्यवस्था", d: "भारतीय अर्थव्यवस्था, शासकीय अर्थसंकल्प, बँकिंग, लोकसंख्या, दारिद्र्य आणि नियोजन." },
                     { t: "सामान्य विज्ञान", d: "भौतिकशास्त्र (Physics), रसायनशास्त्र (Chemistry), वनस्पतीशास्त्र, प्राणीशास्त्र आणि आरोग्यशास्त्र." },
                     { t: "अंकगणित", d: "बेरीज, वजाबाकी, गुणाकार, भागाकार, सरासरी आणि दशांश अपूर्णांक." },
                     { t: "बुद्धिमत्ता चाचणी", d: "उमेदवार किती लवकर व अचूकपणे विचार करू शकतो हे मोजण्यासाठीचे तार्किक प्रश्न." },
                   ].map((sub, i) => (
                     <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-primary/50 transition-all group">
                       <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">{sub.t}</h4>
                       <p className="text-sm text-body leading-relaxed">{sub.d}</p>
                     </div>
                   ))}
                </div>
              </div>

              {/* Mains Syllabus */}
              <div className="space-y-8">
                <h3 className="text-2xl font-display font-black text-dark uppercase border-l-4 border-primary pl-6">II. मुख्य परीक्षा अभ्यासक्रम (४०० गुण)</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white border border-gray-100 rounded-[3rem] p-12 relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
                    <h4 className="text-2xl font-display font-black text-dark uppercase mb-8 border-b border-gray-100 pb-4">संयुक्त पेपर १ (सर्व पदांसाठी अनिवार्य)</h4>
                    <div className="space-y-8">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">01</div>
                        <div>
                          <h5 className="text-lg font-display font-black text-dark uppercase mb-2">मराठी भाषा व्याकरण</h5>
                          <p className="text-sm text-body leading-relaxed">सर्वसाधारण शब्दसंग्रह, वाक्यरचना, व्याकरण (संधी, समास, अलंकार), आणि उताऱ्यावरील प्रश्नांची उत्तरे.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">02</div>
                        <div>
                          <h5 className="text-lg font-display font-black text-dark uppercase mb-2">इंग्रजी भाषा व्याकरण</h5>
                          <p className="text-sm text-body leading-relaxed">Common Vocabulary, Sentence Structure, Grammar, Idioms & Phrases, and Comprehension.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm">
                    <h4 className="text-2xl font-display font-black text-dark uppercase mb-8 border-b border-gray-50 pb-4">पेपर २ सामान्य क्षमता व बुद्धिमापन चाचणी</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "तार्किक बुद्धिमत्ता चाचणी",
                        "माहिती अधिकार अधिनियम २००५",
                        "महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५",
                        "भारतीय राज्यघटना व प्रशासन",
                        "आर्थिक व सामाजिक विकास",
                        "विज्ञान, तंत्रज्ञान व मानवी हक्क"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl group hover:bg-primary transition-colors cursor-default">
                          <CheckCircle2 size={16} className="text-primary group-hover:text-dark shrink-0" />
                          <span className="text-[10px] font-bold uppercase tracking-tight text-dark group-hover:text-dark">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer CTA */}
      <section className="bg-white border-t border-gray-100 py-16 text-center relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-primary/5 z-0" />
         <div className="section-container relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-black text-dark uppercase mb-8 leading-tight">
               महाराष्ट्र शासनात अधिकारी <span className="text-primary text-glow">होण्यास</span> सज्ज आहात का?
            </h2>
            <p className="text-body mb-12 max-w-2xl mx-auto text-lg">
               आमच्या बॅचेस केवळ वर्ग नसून; तर उद्याचे कर्तव्यदक्ष आणि सक्षम प्रशासकीय अधिकारी घडवण्यासाठी तयार केलेले एक विशेष व्यासपीठ आहे.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <button onClick={onRegister} className="btn-primary-new px-12 py-5 text-lg group">
                  नवीन धोरणात्मक बॅच २०२६ जॉइन करा
               </button>
               <button 
                onClick={() => navigate('/admission')}
                className="btn-outline-new px-12 py-5 text-lg"
              >
                थेट प्रवेश प्रक्रियेकडे जा
               </button>
            </div>
         </div>
      </section>

      {/* Mobile Floating Nav */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] md:hidden">
         <div className="bg-white/80 backdrop-blur-xl border border-gray-100 p-2 rounded-full flex gap-2 shadow-2xl">
            <button onClick={() => scrollToSection('group-b')} className="w-12 h-12 bg-primary text-dark rounded-full flex items-center justify-center active:scale-95 transition-all"><BookOpen size={20} /></button>
            <button onClick={() => scrollToSection('group-c')} className="w-12 h-12 bg-dark text-white rounded-full flex items-center justify-center active:scale-95 transition-all"><Monitor size={20} /></button>
            <button onClick={() => scrollToSection('syllabus')} className="w-12 h-12 bg-primary text-dark rounded-full flex items-center justify-center active:scale-95 transition-all"><PieChart size={20} /></button>
         </div>
      </div>
    </motion.div>
  );
};

export default MPSCDetailsPage;

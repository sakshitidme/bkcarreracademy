import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  UserPlus, 
  Scale, 
  Dumbbell, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Utensils, 
  Zap, 
  Ruler, 
  Target,
  Users,
  Globe,
  ArrowRight,
  ChevronRight,
  Trophy,
  GraduationCap
} from 'lucide-react';

const POLICE_STUDENTS = [
  { name: "Anita Jadhav", photo: "/Successful student pho/polic/Anita Jadhav Nsk.jpeg", post: "नाशिक पोलीस" },
  { name: "Anjali Sahani", photo: "/Successful student pho/polic/Anjali Sahani Nsk.jpeg", post: "नाशिक पोलीस" },
  { name: "Aute Nitin", photo: "/Successful student pho/polic/Aute_Nitin_(Mumbai_Police).jpg_Just_202606041509.jpeg", post: "मुंबई पोलीस" },
  { name: "Deepali Kale", photo: "/Successful student pho/polic/Deepali Kale-Mumbai.jpeg", post: "मुंबई पोलीस" },
  { name: "Gayatri", photo: "/Successful student pho/polic/Gayatri.jpeg", post: "पोलीस विभाग" },
  { name: "Madhuri Chaure", photo: "/Successful student pho/polic/Madhuri Chaure.jpeg", post: "पोलीस विभाग" },
  { name: "Mahesh Kachre", photo: "/Successful student pho/polic/Mahesh Kachre-.jpeg", post: "पोलीस विभाग" },
  { name: "Mujahid Shekh", photo: "/Successful student pho/polic/Mujahid Shekh.jpeg", post: "पोलीस विभाग" },
  { name: "Nirmala Rokade", photo: "/Successful student pho/polic/Nirmala Rokade Clerk.jpg", post: "लिपिक" },
  { name: "Mahajan", photo: "/Successful student pho/polic/mahajan.jpeg", post: "पोलीस विभाग" }
];

interface PoliceDetailsPageProps {
  onBack: () => void;
  onRegister: () => void;
  setView: (view: any) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
}

export const PoliceDetailsPage: React.FC<PoliceDetailsPageProps> = ({
  onBack,
  onRegister,
  setView,
  setIsRegistrationModalOpen
}) => {
  const navigate = useNavigate();
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
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
              <ShieldCheck size={20} />
            </div>
            <div>
              <span className="text-xl font-display font-black text-dark block leading-none">पोलीस भरती</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">महाराष्ट्र पोलीस</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a 
              href="https://policerecruitment2024.mahait.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors flex items-center gap-2"
            >
              <Globe size={14} /> भरती पोर्टल
            </a>
            <a 
              href="https://play.google.com/store/apps/details?id=co.lazarus.nqvxi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#111111] text-white rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-primary hover:text-dark transition-all flex items-center gap-2 border border-white/10"
            >
              Get Police Bharti Course @ ₹11 on App
            </a>
            <button 
              onClick={() => setIsRegistrationModalOpen(true)}
              className="btn-primary-new px-6 py-2.5 text-[10px]"
            >
              प्रशिक्षण सुरू करा
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-8 bg-white relative overflow-hidden">
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
                    आमचे यशस्वी पोलीस विद्यार्थी
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
                  {POLICE_STUDENTS.map((student, idx) => (
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
                  {POLICE_STUDENTS.map((student, idx) => (
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
            <span className="text-[10px] font-bold uppercase tracking-widest">अभ्यासक्रमांकडे परत जा</span>
          </button>

          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-black text-dark leading-tight mb-4">
              महाराष्ट्र <span className="text-primary text-glow">पोलीस</span> <br />भरती प्रशिक्षण
            </h1>
            <p className="text-xl text-body font-body leading-relaxed max-w-3xl">
              महाराष्ट्र राज्य पोलीस भरतीसाठी सर्वसमावेशक मार्गदर्शन. अर्ज भरण्यापासून ते शारीरिक चाचणी आणि लेखी परीक्षेतील यशापर्यंत संपूर्ण तयारी.
            </p>
          </div>
        </div>
      </header>

      <main className="py-0">
        <div className="section-container space-y-0">
          
          {/* SECTION 1: PROCESS */}
          <section className="scroll-mt-32">
            <header className="mb-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <UserPlus size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">अर्ज प्रक्रिया</h2>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all">
                <h3 className="text-lg font-display font-black text-dark uppercase mb-4">भरती प्रक्रिया चक्र</h3>
                <p className="text-sm text-body leading-relaxed">
                  २०१९ नंतर: सहसा आधी लेखी परीक्षा आणि त्यानंतर शारीरिक चाचणी घेतली जाते. अधिकृत अधिसूचनेनुसार हा क्रम बदलू शकतो.
                </p>
              </div>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all">
                <h3 className="text-lg font-display font-black text-dark uppercase mb-4">एकाधिक अर्ज</h3>
                <p className="text-sm text-body leading-relaxed">
                  उमेदवार आता वेगवेगळ्या जिल्ह्यांमध्ये विविध पदांसाठी (चालक, बँड्समन इत्यादी) स्वतंत्रपणे अर्ज करू शकतात.
                </p>
              </div>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all">
                <h3 className="text-lg font-display font-black text-dark uppercase mb-4">परीक्षा/अर्ज शुल्क</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-xs text-muted uppercase font-bold">खुला प्रवर्ग</span>
                    <span className="text-sm font-black text-dark">₹४५०</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs text-muted uppercase font-bold">राखीव प्रवर्ग</span>
                    <span className="text-sm font-black text-dark">₹३५०</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm">
               <h3 className="text-2xl font-display font-black text-dark uppercase mb-8 flex items-center gap-3">
                 <FileText className="text-primary" /> आवश्यक कागदपत्रे
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <ul className="space-y-4">
                     {[
                       "शैक्षणिक प्रमाणपत्रे (१० वी/१२ वी उत्तीर्ण)", 
                       "महाराष्ट्र अधिवास प्रमाणपत्र (डोमासाइल)", 
                       "जात प्रमाणपत्र (लागू असल्यास)",
                       "नॉन-क्रिमी लेयर प्रमाणपत्र (लागू असल्यास)"
                     ].map((doc, i) => (
                       <li key={i} className="flex items-center gap-3 text-sm text-body">
                          <CheckCircle2 size={18} className="text-primary shrink-0" />
                          <span>{doc}</span>
                       </li>
                     ))}
                  </ul>
                  <ul className="space-y-4">
                     {[
                       "वाहन चालक परवाना (चालक पदासाठी)", 
                       "बँड्समन प्रमाणपत्र (लागू असल्यास)", 
                       "क्रीडा प्रमाणपत्र (खेळाडू आरक्षणासाठी असल्यास)",
                       "वैध ओळखपत्र (आधार कार्ड/पॅन कार्ड)"
                     ].map((doc, i) => (
                       <li key={i} className="flex items-center gap-3 text-sm text-body">
                          <CheckCircle2 size={18} className="text-primary shrink-0" />
                          <span>{doc}</span>
                       </li>
                     ))}
                  </ul>
               </div>
            </div>
          </section>

          {/* SECTION 2: ELIGIBILITY */}
          <section className="scroll-mt-32">
            <header className="mb-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <ShieldCheck size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">पात्रता निकष</h2>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                 { icon: Zap, label: "शैक्षणिक पात्रता", val: "पोलीस शिपाई पदासाठी १२ वी उत्तीर्ण, चालक/बँड्समन पदासाठी १० वी उत्तीर्ण आवश्यक." },
                 { icon: Clock, label: "वयोमर्यादा", val: "१८ ते २८ वर्षे (खुला प्रवर्ग), राखीव प्रवर्गासाठी नियमांनुसार ३३ वर्षांपर्यंत सूट." },
                 { icon: Ruler, label: "उंची", val: "पुरुष उमेदवार: किमान १६५ सेमी | महिला उमेदवार: किमान १५५ सेमी" },
                 { icon: Scale, label: "वजन / छाती", val: "महिलांचे वजन: किमान ४५ किलो | पुरुषांची छाती: किमान ७९ सेमी (५ सेमी फुगवून)" },
               ].map((item, i) => (
                 <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:border-primary transition-all">
                    <item.icon className="text-primary mb-6" size={28} />
                    <h4 className="text-sm font-display font-black text-dark uppercase mb-3">{item.label}</h4>
                    <p className="text-xs text-body leading-relaxed">{item.val}</p>
                 </div>
               ))}
            </div>
          </section>

          {/* SECTION 3: PHYSICAL TEST */}
          <section className="scroll-mt-32">
            <header className="mb-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Dumbbell size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">मैदानी चाचणी (शारीरिक चाचणी)</h2>
              </div>
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full" />
                  <h4 className="text-2xl font-display font-black uppercase text-dark mb-10 border-l-4 border-primary pl-6">पुरुष (मुलांसाठी - ५० गुण)</h4>
                  <div className="space-y-8">
                     {[
                       { task: "१६०० मीटर धावणे", sub: "वेळ लक्ष्य: ५ मिनिटे १० सेकंदात पूर्ण", pts: "२०" },
                       { task: "१०० मीटर धावणे", sub: "वेळ लक्ष्य: ११.५ सेकंदात पूर्ण", pts: "१५" },
                       { task: "गोळाफेक (७.२५ किलो)", sub: "गोळाफेक अंतर लक्ष्य: ८.५ मीटर", pts: "१५" }
                     ].map((row, i) => (
                       <div key={i} className="flex justify-between items-center group/item border-b border-gray-50 pb-6">
                          <div>
                            <h5 className="text-lg font-display font-black uppercase mb-1 text-dark">{row.task}</h5>
                            <p className="text-xs text-muted font-bold">{row.sub}</p>
                          </div>
                          <span className="text-3xl font-display font-black text-primary">{row.pts}</span>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm relative overflow-hidden group">
                  <h4 className="text-2xl font-display font-black uppercase text-dark mb-10 border-l-4 border-primary pl-6">महिला (मुलींसाठी - ५० गुण)</h4>
                  <div className="space-y-8">
                     {[
                       { task: "८०० मीटर धावणे", sub: "वेळ लक्ष्य: २ मिनिटे ५० सेकंदात पूर्ण", pts: "२०" },
                       { task: "१०० मीटर धावणे", sub: "वेळ लक्ष्य: १४ सेकंदात पूर्ण", pts: "१५" },
                       { task: "गोळाफेक (४ किलो)", sub: "गोळाफेक अंतर लक्ष्य: ६.० मीटर", pts: "१५" }
                     ].map((row, i) => (
                       <div key={i} className="flex justify-between items-center group/item border-b border-gray-50 pb-6">
                          <div>
                            <h5 className="text-lg font-display font-black uppercase mb-1 text-dark">{row.task}</h5>
                            <p className="text-xs text-muted font-bold">{row.sub}</p>
                          </div>
                          <span className="text-3xl font-display font-black text-primary">{row.pts}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </section>

          {/* SECTION 4: WRITTEN TEST */}
          <section className="scroll-mt-32">
            <header className="mb-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <FileText size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">लेखी परीक्षा</h2>
              </div>
            </header>
 
            <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                   <div className="lg:col-span-4 space-y-6">
                       <div className="p-8 bg-primary rounded-[2rem] text-dark">
                          <p className="text-[10px] font-bold text-dark/60 uppercase tracking-widest mb-2">एकूण गुण</p>
                          <p className="text-5xl font-display font-black">१००</p>
                       </div>
                      <div className="p-8 bg-gray-50 rounded-[2rem]">
                          <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">वेळ / कालावधी</p>
                          <p className="text-2xl font-display font-black text-dark">९० मिनिटे</p>
                      </div>
                   </div>
                   <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {[
                        { t: "अंकगणित", d: "संख्यांचे प्रकार, अपूर्णांक, नफा-तोटा, सरासरी, काळ-काम-वेग", m: "२५" },
                        { t: "बुद्धिमत्ता चाचणी", d: "संख्यामालिका, तार्किक प्रश्न, नातेसंबंध, दिशा ज्ञान", m: "२५" },
                        { t: "मराठी व्याकरण", d: "संधी, समास, समानार्थी व विरुद्धार्थी शब्द, वर्णमाला, प्रयोग", m: "२५" },
                        { t: "सामान्य ज्ञान व चालू घडामोडी", d: "इतिहास, भूगोल, चालू घडामोडी, क्रीडा, पुरस्कार व सामान्य विज्ञान", m: "२५" },
                      ].map((sub, i) => (
                        <div key={i} className="p-6 bg-white border border-gray-100 rounded-2xl hover:border-primary transition-all group">
                           <div className="flex justify-between items-start mb-3">
                              <h4 className="text-sm font-display font-black text-dark uppercase">{sub.t}</h4>
                              <span className="text-xs font-bold text-primary">{sub.m} गुण</span>
                           </div>
                           <p className="text-xs text-body leading-relaxed">{sub.d}</p>
                        </div>
                      ))}
                   </div>
                </div>
            </div>
          </section>
 
          {/* SECTION 5: STRATEGY */}
          <section className="scroll-mt-32">
            <header className="mb-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Target size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-dark uppercase tracking-tight">यशस्वी दिनचर्या व रणनीती</h2>
              </div>
            </header>
 
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white rounded-3xl p-10 border border-gray-100 hover:shadow-xl transition-all">
                  <Utensils className="text-primary mb-8" size={32} />
                  <h3 className="text-xl font-display font-black text-dark uppercase mb-4 border-b-2 border-primary/20 pb-4">संतुलित आहार</h3>
                  <ul className="space-y-4 text-sm text-body">
                    <li className="flex gap-3"><ChevronRight size={16} className="text-primary shrink-0" /> प्रथिनेयुक्त आहार (कडधान्ये, अंडी, दूध इ.)</li>
                    <li className="flex gap-3"><ChevronRight size={16} className="text-primary shrink-0" /> शारीरिक ताकदीसाठी भरपूर हिरव्या पालेभाज्या</li>
                    <li className="flex gap-3"><ChevronRight size={16} className="text-primary shrink-0" /> शरीर हायड्रेटेड ठेवण्यासाठी भरपूर पाणी पिणे (४ लिटर+)</li>
                  </ul>
               </div>
               <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-xl shadow-primary/5">
                  <Clock className="text-primary mb-8" size={32} />
                  <h3 className="text-xl font-display font-black text-dark uppercase mb-4 border-b-2 border-primary/20 pb-4">दैनिक दिनचर्या</h3>
                  <ul className="space-y-4 text-sm text-body">
                    <li className="flex gap-3"><ChevronRight size={16} className="text-primary shrink-0" /> शारीरिक ताजेतवान्यासाठी किमान ७ तासांची गाढ झोप</li>
                    <li className="flex gap-3"><ChevronRight size={16} className="text-primary shrink-0" /> पहाटेची नियमित मैदानी तालीम आणि वेळेवर सराव</li>
                    <li className="flex gap-3"><ChevronRight size={16} className="text-primary shrink-0" /> रोज वर्तमानपत्रांचे वाचन आणि महत्त्वाचे चालू घडामोडीचे मुद्दे</li>
                  </ul>
               </div>
               <div className="bg-white rounded-3xl p-10 border border-gray-100 hover:shadow-xl transition-all">
                  <Users className="text-primary mb-8" size={32} />
                  <h3 className="text-xl font-display font-black text-dark uppercase mb-4 border-b-2 border-primary/20 pb-4">स्मार्ट अभ्यास</h3>
                  <ul className="space-y-4 text-sm text-body">
                    <li className="flex gap-3"><ChevronRight size={16} className="text-primary shrink-0" /> मागील ५ ते १० वर्षांच्या प्रश्नपत्रिका वेळ लावून सोडवणे</li>
                    <li className="flex gap-3"><ChevronRight size={16} className="text-primary shrink-0" /> परीक्षेत वारंवार विचारल्या जाणाऱ्या महत्त्वाच्या घटकांवर लक्ष</li>
                    <li className="flex gap-3"><ChevronRight size={16} className="text-primary shrink-0" /> परीक्षेच्या ऐनवेळी जलद उजळणीसाठी स्वतःच्या शॉर्ट नोट्स</li>
                  </ul>
               </div>
            </div>
 
            <div className="mt-16 p-10 bg-primary rounded-[2.5rem] text-center shadow-lg shadow-primary/20">
               <p className="text-2xl font-display font-black text-dark uppercase leading-tight">
                  शिस्तबद्ध शारीरिक प्रशिक्षण आणि तज्ज्ञ शिक्षकांच्या मार्गदर्शनासाठी आजच बी. के. करिअर अकॅडमीमध्ये प्रवेश घ्या.
               </p>
            </div>
          </section>
 
        </div>
      </main>
 
      {/* Footer CTA */}
      <section className="bg-white border-t border-gray-100 py-16 text-center relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-primary/5 z-0" />
         <div className="section-container relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-black text-dark uppercase mb-8 leading-tight">
               कर्तव्याच्या हाकेला <span className="text-primary text-glow">साद</span> द्या!
            </h2>
            <p className="text-body mb-12 max-w-2xl mx-auto text-lg font-body">
               पोलीस वर्दी मिळवण्याचा तुमचा प्रवास योग्य मार्गदर्शनाने सुरू होतो. नाशिकमधील आमच्या नवीन बॅचमध्ये सहभागी व्हा.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <button onClick={onRegister} className="btn-primary-new px-12 py-5 text-lg group">
                  नवीन बॅच २०२६ साठी नोंदणी करा
               </button>
               <button 
                onClick={() => navigate('/admission')}
                className="btn-outline-new px-12 py-5 text-lg"
              >
                प्रवेश प्रक्रियेकडे जा
               </button>
            </div>
         </div>
      </section>
    </motion.div>
  );
};
 
export default PoliceDetailsPage;

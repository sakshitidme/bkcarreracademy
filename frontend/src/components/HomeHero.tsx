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

const SUCCESSFUL_STUDENTS = [
  { name: "Anita Jadhav", photo: "/Successful student pho/polic/Anita Jadhav Nsk.jpeg", post: "Nashik Police" },
  { name: "Anjali Sahani", photo: "/Successful student pho/polic/Anjali Sahani Nsk.jpeg", post: "Nashik Police" },
  { name: "Aute Nitin", photo: "/Successful student pho/polic/Aute_Nitin_(Mumbai_Police).jpg_Just_202606041509.jpeg", post: "Mumbai Police" },
  { name: "Deepali Kale", photo: "/Successful student pho/polic/Deepali Kale-Mumbai.jpeg", post: "Mumbai Police" },
  { name: "Gayatri", photo: "/Successful student pho/polic/Gayatri.jpeg", post: "Police Department" },
  { name: "Madhuri Chaure", photo: "/Successful student pho/polic/Madhuri Chaure.jpeg", post: "Police Department" },
  { name: "Mahesh Kachre", photo: "/Successful student pho/polic/Mahesh Kachre-.jpeg", post: "Police Department" },
  { name: "Mujahid Shekh", photo: "/Successful student pho/polic/Mujahid Shekh.jpeg", post: "Police Department" },
  { name: "Nirmala Rokade", photo: "/Successful student pho/polic/Nirmala Rokade Clerk.jpg", post: "Clerk" },
  { name: "Mahajan", photo: "/Successful student pho/polic/mahajan.jpeg", post: "Police Department" }
];

const IPS_STUDENTS = [
  { name: "Bharat Nagre", photo: "/Successful student pho/IPS/Bharat Nagre.jpeg", post: "UPSC / IPS" },
  { name: "Chaudhari", photo: "/Successful student pho/IPS/Chaudhari PSI.jpg", post: "PSI" },
  { name: "Darade Soniya", photo: "/Successful student pho/IPS/Darade Soniya.jpeg", post: "UPSC / IPS" },
  { name: "Dattraj Tandale", photo: "/Successful student pho/IPS/Dattraj Tandale.jpeg", post: "UPSC / IPS" },
  { name: "Dattu Sadgir", photo: "/Successful student pho/IPS/Dattu Sadgır Clerk.jpg", post: "Clerk" },
  { name: "Ganesh Tarage", photo: "/Successful student pho/IPS/Ganesh Tarage.jpeg", post: "UPSC / IPS" },
  { name: "Gite", photo: "/Successful student pho/IPS/Gite PSI.jpg", post: "PSI" }
];

const SSC_STUDENTS = [
  { name: "Pratibha Shinde", photo: "/Successful student pho/scc/Pratibha Shinde.jpeg", post: "SSC" },
  { name: "Roshan Makne", photo: "/Successful student pho/scc/Roshan Makne-.jpeg", post: "SSC" },
  { name: "Shelar Navnath", photo: "/Successful student pho/scc/Shelar Navnath (Nsk Gramin Police).jpg", post: "SSC" },
  { name: "Sunil Khairnar", photo: "/Successful student pho/scc/Sunil Khairnar.jpeg", post: "SSC" },
  { name: "Vaibhav Kadam", photo: "/Successful student pho/scc/Vaibhav Kadam Nsk Police.jpg", post: "SSC" },
  { name: "Yogesh Apsunde", photo: "/Successful student pho/scc/Yogesh Apsunde Nsk Police.jpg", post: "SSC" },
  { name: "Yogesh Wagh", photo: "/Successful student pho/scc/Yogesh Wagh (Pune Police).jpg", post: "SSC" },
  { name: "Yogita Gaikar", photo: "/Successful student pho/scc/yogita gaikar nsk police.jpg", post: "SSC" }
];

const RRB_STUDENTS = [
  { name: "Khandale", photo: "/Successful student pho/RRB/Khandale.jpg", post: "RRB" },
  { name: "Patil", photo: "/Successful student pho/RRB/Patil PSI.jpg", post: "RRB" },
  { name: "Raj Panhale", photo: "/Successful student pho/RRB/RAJ PANHALE.jpeg", post: "RRB" },
  { name: "Ratnamala", photo: "/Successful student pho/RRB/Ratnamala.jpeg", post: "RRB" },
  { name: "Ravindra Patil", photo: "/Successful student pho/RRB/Ravindra Patil.jpg", post: "RRB" },
  { name: "Swapnil Shinde", photo: "/Successful student pho/RRB/Swapnil Shinde.jpeg", post: "RRB" },
  { name: "Ujwala Rokade", photo: "/Successful student pho/RRB/UjwalaRokade.jpeg", post: "RRB" }
];

const TAIT_STUDENTS = [
  { name: "Pravin Ingawale", photo: "/Successful student pho/TAIT/7.jpeg", post: "TAIT" },
  { name: "Dr. Kavita Patil", photo: "/Successful student pho/TAIT/and.jpeg", post: "TAIT" },
  { name: "Anil Mhaske", photo: "/Successful student pho/TAIT/anil.jpeg", post: "TAIT" },
  { name: "Priyanka Mashelkar", photo: "/Successful student pho/TAIT/hoo.jpeg", post: "TAIT" },
  { name: "Shraddha Pandey", photo: "/Successful student pho/TAIT/k.jpeg", post: "TAIT" },
  { name: "Karishma Nair", photo: "/Successful student pho/TAIT/krema.jpeg", post: "TAIT" },
  { name: "Onkareshwar Kanchangire", photo: "/Successful student pho/TAIT/noker.jpeg", post: "TAIT" },
  { name: "Pratik Khamatkar", photo: "/Successful student pho/TAIT/prikte.jpeg", post: "TAIT" },
  { name: "Akshay Konde", photo: "/Successful student pho/TAIT/rfgggg.jpeg", post: "TAIT" },
  { name: "Joshi Rohit Prakash", photo: "/Successful student pho/TAIT/rohi.jpeg", post: "TAIT" }
];

const IBPS_STUDENTS = [
  { name: "Vasundhara Ajay Gulhana", photo: "/Successful student pho/ibps/Vasundhara Ajay Gulhana.jpeg", post: "IBPS" },
  { name: "Sanghmitra Khobragade", photo: "/Successful student pho/ibps/sam.jpeg", post: "IBPS" },
  { name: "Shubham Jadhav", photo: "/Successful student pho/ibps/sumb.jpeg", post: "IBPS" },
  { name: "Tushar Pralhad Jadhav", photo: "/Successful student pho/ibps/tush.jpeg", post: "IBPS" },
  { name: "Vaibhav Kajale", photo: "/Successful student pho/ibps/vah.jpeg", post: "IBPS" },
  { name: "Vivek Dattatraya Bhasme", photo: "/Successful student pho/ibps/vike.jpeg", post: "IBPS" },
  { name: "Shrikrishnanath Panchal", photo: "/Successful student pho/ibps/wadawdawdad.jpeg", post: "IBPS" },
  { name: "Sneha Mehra", photo: "/Successful student pho/ibps/wadsaaw.jpeg", post: "IBPS" }
];

const MBA_CET_STUDENTS = [
  { name: "Achiever", photo: "/Successful student pho/MBA CET/111.jpeg", post: "MBA CET" },
  { name: "Achiever", photo: "/Successful student pho/MBA CET/555.jpeg", post: "MBA CET" },
  { name: "Achiever", photo: "/Successful student pho/MBA CET/5555.jpeg", post: "MBA CET" },
  { name: "Achiever", photo: "/Successful student pho/MBA CET/58523.jpeg", post: "MBA CET" },
  { name: "Achiever", photo: "/Successful student pho/MBA CET/789.jpeg", post: "MBA CET" },
  { name: "Achiever", photo: "/Successful student pho/MBA CET/84354.jpeg", post: "MBA CET" },
  { name: "Achiever", photo: "/Successful student pho/MBA CET/888.jpeg", post: "MBA CET" },
  { name: "Achiever", photo: "/Successful student pho/MBA CET/889.jpeg", post: "MBA CET" },
  { name: "Achiever", photo: "/Successful student pho/MBA CET/989.jpeg", post: "MBA CET" }
];

const MES_STUDENTS = [
  { name: "Achiever", photo: "/Successful student pho/MES/1.jpeg", post: "MES" },
  { name: "Achiever", photo: "/Successful student pho/MES/44.jpeg", post: "MES" },
  { name: "Achiever", photo: "/Successful student pho/MES/5.jpeg", post: "MES" },
  { name: "Achiever", photo: "/Successful student pho/MES/55.jpeg", post: "MES" },
  { name: "Achiever", photo: "/Successful student pho/MES/6.jpeg", post: "MES" },
  { name: "Achiever", photo: "/Successful student pho/MES/77.jpeg", post: "MES" },
  { name: "Achiever", photo: "/Successful student pho/MES/8.jpeg", post: "MES" },
  { name: "Achiever", photo: "/Successful student pho/MES/88.jpeg", post: "MES" }
];

export const HomeHero: React.FC<HomeHeroProps> = ({
  onRegistration,
  onAdmission,
  heroContent
}) => {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
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
      {/* ─── PREMIUM DYNAMIC SUCCESS STORIES MARQUEE BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full relative z-30 group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFC72C]/0 via-[#FFC72C]/10 to-[#FFC72C]/0 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="w-full bg-[#0a0a0a]/90 backdrop-blur-xl border-y border-[#FFC72C]/30 py-2.5 px-6 shadow-[0_15px_40px_rgba(255,199,44,0.15)] relative overflow-hidden flex flex-col gap-2">
          <div className="flex items-center justify-center gap-3 z-10 px-4">
            <div className="h-[1px] bg-gradient-to-r from-transparent to-[#FFC72C]/20 flex-grow max-w-[150px]" />
            <div className="flex items-center gap-2">
              <GraduationCap className="text-[#FFC72C] w-4 h-4" />
              <span className="text-[#FFC72C] font-display font-bold text-[10px] md:text-xs uppercase tracking-[0.25em]">
                Successful Students of Ours
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
                animation: 'marquee-scroll 65s linear infinite',
                animationPlayState: isMarqueePaused ? 'paused' : 'running',
                width: 'max-content'
              }}
            >
              {/* Copy 1 */}
              {SUCCESSFUL_STUDENTS.map((student, idx) => (
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
                        // fallback if path issues
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

              {IPS_STUDENTS.map((student, idx) => (
                <div
                  key={`s1-ips-${idx}`}
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

              {TAIT_STUDENTS.map((student, idx) => (
                <div
                  key={`s1-tait-${idx}`}
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

              {IBPS_STUDENTS.map((student, idx) => (
                <div
                  key={`s1-ibps-${idx}`}
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

              {SSC_STUDENTS.map((student, idx) => (
                <div
                  key={`s1-ssc-${idx}`}
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

              {RRB_STUDENTS.map((student, idx) => (
                <div
                  key={`s1-rrb-${idx}`}
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

              {MBA_CET_STUDENTS.map((student, idx) => (
                <div
                  key={`s1-mbacet-${idx}`}
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

              {MES_STUDENTS.map((student, idx) => (
                <div
                  key={`s1-mes-${idx}`}
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
              {SUCCESSFUL_STUDENTS.map((student, idx) => (
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

              {/* Golden Divider Line */}
              <div className="w-[3px] self-stretch min-h-[60px] bg-gradient-to-b from-transparent via-[#FFC72C] to-transparent shadow-[0_0_8px_#FFC72C] mx-4 shrink-0" />

              {IPS_STUDENTS.map((student, idx) => (
                <div
                  key={`s2-ips-${idx}`}
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

              {TAIT_STUDENTS.map((student, idx) => (
                <div
                  key={`s2-tait-${idx}`}
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

              {IBPS_STUDENTS.map((student, idx) => (
                <div
                  key={`s2-ibps-${idx}`}
                  className="flex items-center gap-4 bg-white/5 border border-white/10 hover:border-[#FFC72C]/50 px-5 py-2.5 rounded-2xl backdrop-blur-sm transition-all duration-3000"
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

              {SSC_STUDENTS.map((student, idx) => (
                <div
                  key={`s2-ssc-${idx}`}
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

              {RRB_STUDENTS.map((student, idx) => (
                <div
                  key={`s2-rrb-${idx}`}
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

              {MBA_CET_STUDENTS.map((student, idx) => (
                <div
                  key={`s2-mbacet-${idx}`}
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

              {MES_STUDENTS.map((student, idx) => (
                <div
                  key={`s2-mes-${idx}`}
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
            </div>
          </div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="section-container relative z-10 my-auto mt-6">
        {(() => {
          const hasVideos = true;
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
                    href="https://play.google.com/store/apps/details?id=co.lazarus.nqvxi"
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

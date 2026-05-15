import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Linkedin, Twitter, ExternalLink } from 'lucide-react';

interface StaffMember {
  id: number;
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
}

interface StaffCardProps {
  member: StaffMember;
  index: number;
  isCentered?: boolean;
}

export const StaffCard: React.FC<StaffCardProps> = ({ member, index, isCentered = false }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col h-full transition-all duration-500 overflow-visible w-full min-h-[420px] cursor-pointer items-center justify-center"
    >
      {/* 3D Floating Glow */}
      <div className="absolute inset-0 bg-brand/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-1000" />
      
      
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="relative mb-12"
      >
         <motion.div 
            style={{ transform: "translateZ(80px)" }}
            animate={isCentered ? { 
              rotateY: [0, 360],
              y: [0, -15, 0]
            } : { 
              rotateY: 0,
              y: 0
            }}
            transition={{ 
              duration: isCentered ? 30 : 0.8,
              repeat: isCentered ? Infinity : 0,
              ease: "linear"
            }}
            className="w-64 h-64 rounded-full border-4 border-brand shadow-[0_30px_70px_rgba(245,166,35,0.4)] overflow-hidden transition-all duration-700 group-hover:scale-110 bg-white/10 backdrop-blur-sm"
          >
            <motion.img
              src={member.image}
              alt={`${member.name} at BK Career Academy`}
              animate={{
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-full h-full object-cover"
              style={{ 
                objectPosition: 'center 10%',
                backfaceVisibility: 'hidden', 
                WebkitBackfaceVisibility: 'hidden',
                transform: 'translate3d(0, 0, 0)',
                imageRendering: 'high-quality',
                willChange: 'transform'
              }}
              referrerPolicy="no-referrer"
            />
         </motion.div>
      </div>


      <div 
        style={{ transform: "translateZ(100px)" }}
        className="flex flex-col items-center text-center relative z-10"
      >
        <div className="mb-4">
          <span className="inline-block px-4 py-1.5 bg-brand/90 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-brand/20 border border-brand/20">
            {member.specialty}
          </span>
        </div>
 
        <h3 className={`text-4xl font-display font-black leading-tight mb-3 uppercase tracking-tighter transition-all duration-700 drop-shadow-2xl ${isCentered ? 'text-brand scale-125' : 'text-white/90 scale-90'}`}>
          {member.name}
        </h3>
        
        <p className={`text-base font-body leading-relaxed max-w-sm px-6 transition-all duration-700 drop-shadow-lg ${isCentered ? 'text-white opacity-100' : 'text-white/70 opacity-100'}`}>
          {member.bio}
        </p>
      </div>
    </motion.div>
  );
};

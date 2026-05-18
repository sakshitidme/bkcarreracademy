import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface StudentSuccessShortsProps {
  media?: any[];
}

const FALLBACK_SHORTS = [
  { id: 'z18YX4x1Lw8', title: 'Success Story 1' },
  { id: 'Jof92fozWuk', title: 'Success Story 2' },
  { id: 'wn7i39rNblw', title: 'Success Story 3' },
  { id: 'qYp8-uA-kMc', title: 'Success Story 4' },
];

export const StudentSuccessShorts: React.FC<StudentSuccessShortsProps> = ({ media }) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const cardWidth = isMobile ? 220 : 320;
  const xOffset = isMobile ? 160 : (isTablet ? 280 : 350);
  const zOffset = isMobile ? 100 : 200;

  const getYouTubeId = (url: string) => {
    if (!url) return '';
    if (url.length === 11) return url;
    const match = url.match(/(?:https?:\/\/)?(?:www\.|m\.)?(?:youtu\.be\/|youtube\.com\/(?:shorts\/|embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/i);
    return (match && match[1]) ? match[1] : url;
  };

  const rawItems = useMemo(() => {
    const src =
      media && media.length > 0
        ? media.map((m: any) => ({ id: getYouTubeId(m.src), title: m.title }))
        : FALLBACK_SHORTS;
    return src as { id: string; title: string }[];
  }, [media]);

  const [rotation, setRotation] = useState(0);
  const totalItems = rawItems.length;
  const angleIncrement = totalItems > 0 ? 360 / totalItems : 90;

  useEffect(() => {
    if (totalItems <= 1) return;
    const timer = setInterval(() => {
      setRotation((prev) => prev - angleIncrement);
    }, 6000);
    return () => clearInterval(timer);
  }, [angleIncrement, totalItems]);

  return (
    <div className={`relative w-full ${isMobile ? 'h-[450px]' : 'h-[600px]'} flex items-center justify-center overflow-hidden`} style={{ perspective: '2000px' }}>
      <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
        <AnimatePresence>
          {rawItems.map((item, idx) => {
            const angle = (idx * angleIncrement) + rotation;
            const normalizedAngle = ((angle % 360) + 360) % 360;
            const rad = normalizedAngle * (Math.PI / 180);
            
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);
            
            const isFront = cos > 0.98; // Very close to 1
            const depthFactor = (cos + 1) / 2; // Maps from 1 (front) to 0 (back)

            const x = sin * xOffset;
            const z = cos * zOffset * (cos > 0 ? 1 : 1.5); // Push back further if in back hemisphere
            const rotateY = sin * 45; // Turn towards center
            
            const opacity = 0.1 + 0.9 * Math.pow(depthFactor, 1.5);
            const scale = 0.6 + 0.4 * depthFactor;
            const zIndex = Math.round(40 * depthFactor);
            const blurAmount = Math.max(0, 10 - 10 * depthFactor);
            const filter = blurAmount > 0 ? `blur(${blurAmount}px)` : 'none';

            return (
              <motion.div
                key={`${item.id}-${idx}`}
                className="absolute rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-dark"
                initial={false}
                animate={{
                  x,
                  z,
                  rotateY,
                  opacity,
                  scale,
                  filter
                }}
                transition={{
                  duration: 1.5,
                  ease: [0.23, 1, 0.32, 1]
                }}
                style={{ 
                  width: `${cardWidth}px`,
                  zIndex,
                  aspectRatio: '9/16',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden'
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${item.id}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&loop=1&playlist=${item.id}`}
                  title={item.title || 'Success Story'}
                  className="w-full h-full pointer-events-none"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
                
                {isFront && (
                  <div className="absolute top-4 left-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
                    </span>
                    Success
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      {totalItems > 1 && (
        <div className={`absolute ${isMobile ? 'bottom-2' : 'bottom-10'} left-1/2 -translate-x-1/2 flex gap-4 z-50`}>
          <button 
            onClick={() => setRotation(prev => prev + angleIncrement)}
            className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all`}
          >
            ←
          </button>
          <button 
            onClick={() => setRotation(prev => prev - angleIncrement)}
            className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all`}
          >
            →
          </button>
        </div>
      )}
    </div>

  );
};

export default StudentSuccessShorts;

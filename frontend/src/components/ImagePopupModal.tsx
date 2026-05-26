import React, { useEffect, useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

interface Popup {
  _id: string;
  title: string;
  mediaUrl: string;
  mediaType: 'image' | 'youtube';
  notice: string;
  link?: string;
  isDefault?: boolean;
}

interface ImagePopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageClick?: () => void;
}

export default function ImagePopupModal({ isOpen, onClose, onImageClick }: ImagePopupModalProps) {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [loading, setLoading] = useState(true);

  // The default hardcoded counseling popup
  const defaultPopup: Popup = {
    _id: "default-counseling",
    title: "Free Counseling",
    mediaUrl: "/123.jpeg",
    mediaType: "image",
    notice: "आजच योग्य दिशा निवडा, यशाची निश्चिती करा!",
    isDefault: true
  };

  useEffect(() => {
    if (isOpen) {
      fetch('/api/popups/active')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            // Always prepend the default free counseling popup
            setPopups([defaultPopup, ...data.data]);
          } else {
            setPopups([defaultPopup]);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch popups", err);
          // If backend fails, still show the default one
          setPopups([defaultPopup]);
          setLoading(false);
        });
    }
  }, [isOpen]);

  if (!isOpen || loading || popups.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Close Button */}
      <button 
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-black/40 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-dark transition-all z-50 cursor-pointer shadow-lg"
      >
        <X size={20} />
      </button>

      {/* Main Container */}
      <div className="relative w-full max-w-6xl z-10 flex flex-col items-center max-h-screen justify-center">
        {/* Horizontal Scrollable Row */}
        <div 
          className="flex gap-4 md:gap-6 overflow-x-auto w-full snap-x snap-mandatory pb-8 pt-4 px-4 items-center justify-start" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {popups.map((popup) => {
            const isClickable = true;
            
            // Generate youtube embed URL if needed
            let youtubeUrl = popup.mediaUrl;
            
            // Rewrite legacy /uploads/ paths to /api/uploads/ to bypass Nginx strict static routing
            let displayMediaUrl = popup.mediaUrl;
            if (displayMediaUrl && displayMediaUrl.startsWith('/uploads/')) {
              displayMediaUrl = '/api' + displayMediaUrl;
            }

            if (popup.mediaType === 'youtube' && youtubeUrl) {
              if (youtubeUrl.includes('watch?v=')) {
                youtubeUrl = youtubeUrl.replace('watch?v=', 'embed/');
                const ampersandPos = youtubeUrl.indexOf('&');
                if (ampersandPos !== -1) {
                  youtubeUrl = youtubeUrl.substring(0, ampersandPos);
                }
              } else if (youtubeUrl.includes('youtu.be/')) {
                youtubeUrl = youtubeUrl.replace('youtu.be/', 'youtube.com/embed/');
              } else if (youtubeUrl.includes('/shorts/')) {
                youtubeUrl = youtubeUrl.replace('/shorts/', '/embed/');
              }
            }

            return (
              <div 
                key={popup._id} 
                className={`relative w-[55vw] max-w-[200px] md:w-[85vw] md:max-w-md shrink-0 snap-center bg-white rounded-[0.75rem] md:rounded-[2rem] overflow-hidden shadow-2xl flex flex-col ${popups.length === 1 ? 'mx-auto' : ''} ${isClickable ? 'cursor-pointer group' : ''}`}
                onClick={() => {
                  if (popup.isDefault && onImageClick) {
                    onImageClick();
                  } else {
                    const fullMediaUrl = displayMediaUrl.startsWith('http') 
                      ? displayMediaUrl 
                      : `${window.location.origin}${displayMediaUrl}`;
                    const msg = `Hi, I have an inquiry regarding: ${popup.title}${popup.notice ? ` - ${popup.notice}` : ''}`;
                    window.open(`https://wa.me/918080195558?text=${encodeURIComponent(msg)}`, '_blank');
                  }
                }}
              >
                {/* Media Container */}
                <div className="w-full relative bg-gray-50 flex items-center justify-center overflow-hidden">
                  {popup.mediaType === 'youtube' ? (
                    <iframe 
                      src={youtubeUrl} 
                      title={popup.title}
                      className="w-full aspect-[4/5] object-cover"
                      allowFullScreen
                    />
                  ) : (
                    <img 
                      src={displayMediaUrl} 
                      alt={popup.title} 
                      onError={(e) => {
                        console.error('Popup Image Failed to Load:', displayMediaUrl);
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // Prevent infinite loop
                        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#6b7280">Image not uploaded</text><text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#9ca3af">Please re-upload on live site</text></svg>`;
                        target.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
                      }}
                      className="w-full max-h-[35vh] md:max-h-[65vh] object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                
                {/* Notice & Link Action */}
                <div className="bg-white p-2 md:p-5 text-center flex flex-col gap-1.5 md:gap-3">
                  {popup.notice && (
                    <p className="text-dark font-semibold text-[10px] md:text-[15px] leading-tight">
                      {popup.notice}
                    </p>
                  )}
                  {isClickable && (
                      <div className="mx-auto bg-primary text-dark px-3 py-1.5 md:px-6 md:py-2.5 rounded-full font-display font-black uppercase text-[8px] md:text-[11px] tracking-widest flex items-center gap-1 md:gap-2 shadow-md w-fit transition-transform group-hover:scale-105">
                        {popup.isDefault ? "Inquiry" : "Inquiry"}
                        <ArrowRight size={10} className="md:w-[14px] md:h-[14px]" />
                      </div>
                    )}
                  </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* CSS to hide scrollbar for webkit browsers */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}

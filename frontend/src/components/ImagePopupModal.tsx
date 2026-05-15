import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';

interface ImagePopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageClick: () => void;
}

export default function ImagePopupModal({ isOpen, onClose, onImageClick }: ImagePopupModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-dark/60 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden group cursor-pointer"
            onClick={onImageClick}
          >
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-dark transition-all z-20"
            >
              <X size={20} />
            </button>

            <div className="relative overflow-hidden">
              <img 
                src="/123.jpeg" 
                alt="Special Announcement" 
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute bottom-6 left-0 right-0 px-8 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <div className="bg-primary text-dark px-6 py-3 rounded-full font-display font-black uppercase text-[9px] tracking-widest flex items-center gap-3 shadow-2xl">
                  Click to Register Now
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

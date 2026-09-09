import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Share2, X } from 'lucide-react';
import { MIND_MAPS_DATA, MindMapItem, TODAY_DATE } from '../data/mindMapsData';
import InteractiveMindMap, { TODAY_DYNAMIC_MIND_MAP } from './InteractiveMindMap';

interface FeaturedMindMapProps {
    className?: string;
}

export const FeaturedMindMap: React.FC<FeaturedMindMapProps> = ({ className = '' }) => {
    const getInitialMindMap = (): MindMapItem => {
        const todayMatch = MIND_MAPS_DATA.find((item) => item.date === TODAY_DATE);
        if (todayMatch) return todayMatch;
        return MIND_MAPS_DATA[0];
    };

    const [activeMindMap] = useState<MindMapItem>(getInitialMindMap);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    return (
        <section className={`relative my-8 ${className}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <InteractiveMindMap
                    data={TODAY_DYNAMIC_MIND_MAP}
                    onExpandLightbox={() => setIsLightboxOpen(true)}
                />
            </div>

            {/* FULLSCREEN LIGHTBOX MODAL */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-dark/90 backdrop-blur-md p-4 flex flex-col items-center justify-center"
                    >
                        {/* Lightbox Controls Top Bar */}
                        <div className="w-full max-w-6xl flex items-center justify-between text-white mb-4">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                                    {TODAY_DYNAMIC_MIND_MAP.category} • {TODAY_DYNAMIC_MIND_MAP.date}
                                </span>
                                <h3 className="text-lg font-bold truncate max-w-xl">
                                    {TODAY_DYNAMIC_MIND_MAP.centralTitle}
                                </h3>
                            </div>

                            <div className="flex items-center gap-3">
                                <a
                                    href={activeMindMap.image}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                                    title="Download Image"
                                >
                                    <Download size={20} />
                                </a>
                                <button
                                    onClick={() => {
                                        if (navigator.share) {
                                            navigator.share({
                                                title: TODAY_DYNAMIC_MIND_MAP.centralTitle,
                                                url: window.location.href,
                                            });
                                        } else {
                                            navigator.clipboard.writeText(window.location.href);
                                            alert('Link copied to clipboard!');
                                        }
                                    }}
                                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                                    title="Share"
                                >
                                    <Share2 size={20} />
                                </button>
                                <button
                                    onClick={() => setIsLightboxOpen(false)}
                                    className="p-2.5 rounded-xl bg-primary text-dark font-bold hover:bg-amber-400 transition-colors"
                                    title="Close Lightbox"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Lightbox Full View */}
                        <div className="relative w-full max-w-6xl max-h-[85vh] flex items-center justify-center overflow-auto rounded-2xl bg-black/40 border border-white/10 p-4">
                            <div className="w-full">
                                <InteractiveMindMap data={TODAY_DYNAMIC_MIND_MAP} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default FeaturedMindMap;

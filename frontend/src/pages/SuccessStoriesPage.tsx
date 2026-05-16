import React from 'react';
import { motion } from 'motion/react';
import { Star, ArrowLeft, Quote, MessageSquareQuote } from 'lucide-react';
import { Story } from '../data/stories';

interface SuccessStoriesPageProps {
  stories: Story[];
  onBack: () => void;
  onAddYours: () => void;
}

export const SuccessStoriesPage: React.FC<SuccessStoriesPageProps> = ({ stories, onBack, onAddYours }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-bg min-h-screen pt-20 pb-12"
    >
      <div className="section-container">
        {/* Header */}
        <header className="mb-1">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-muted mb-1 hover:text-primary transition-all"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Back to Academy</span>
          </button>
          
          <div className="max-w-3xl">
            <p className="label-text mb-4">Aspirant Journeys</p>
            <h1 className="text-5xl md:text-7xl font-display font-black text-dark leading-tight mb-8">
              Success <span className="text-primary">Chronicles</span>
            </h1>
            <p className="body-text text-xl">
              Real results from real aspirants. Discover the journeys of those who turned their administrative dreams into reality with BK Career Academy's expert guidance.
            </p>
          </div>
        </header>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-3xl p-10 border border-gray-100 hover:border-primary/30 transition-all flex flex-col shadow-sm hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-0.5 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      fill={i < story.rating ? "currentColor" : "transparent"} 
                      className={i < story.rating ? "text-primary" : "text-gray-100"}
                    />
                  ))}
                </div>
                <MessageSquareQuote size={24} className="text-primary/10 group-hover:text-primary/20 transition-colors" />
              </div>

              <blockquote className="text-lg font-body leading-relaxed text-dark/80 italic flex-grow mb-12">
                 "{story.content}"
              </blockquote>

              <div className="flex items-center gap-4 pt-8 border-t border-gray-50">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-xl font-display font-black text-primary group-hover:bg-primary group-hover:text-dark transition-colors border border-gray-100">
                  {story.initials}
                </div>
                <div>
                  <h4 className="text-lg font-display font-black text-dark leading-none mb-1">{story.name}</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted">{story.role || 'Successful Candidate'}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Share Section */}
        <section className="mt-1 p-12 md:p-20 bg-white border border-gray-100 rounded-[3rem] text-center relative overflow-hidden shadow-sm">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
           <div className="relative z-10">
             <h2 className="text-4xl md:text-5xl font-display font-black text-dark leading-tight mb-8">
               Are You the <span className="text-primary text-glow">Next</span> Milestone?
             </h2>
             <p className="text-body mb-12 max-w-xl mx-auto">
               Your success can inspire thousands. Share your journey and help fellow aspirants navigate their path to success.
             </p>
             <button 
               onClick={onAddYours}
               className="btn-primary-new px-12 py-5"
             >
               Share Your Story Now
             </button>
           </div>
        </section>
      </div>
    </motion.div>
  );
};

export default SuccessStoriesPage;

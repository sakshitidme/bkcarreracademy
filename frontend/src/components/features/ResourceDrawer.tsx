import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Globe, 
  ExternalLink, 
  Plus, 
  Minus 
} from 'lucide-react';
import { ExamResource, ResourceLink } from '../../data/govtResources';

interface ResourceDrawerProps {
  exam: ExamResource | null;
  onClose: () => void;
}

const ResourceMenuItem: React.FC<{ 
  item: ResourceLink; 
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ item, isExpanded, onToggle }) => {
  if (item.isSubmenu && item.children) {
    return (
      <div className="border border-gray-100 rounded-xl overflow-hidden transition-all">
        <button 
          onClick={onToggle}
          className={`w-full flex items-center justify-between p-4 text-left transition-colors ${isExpanded ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'}`}
        >
          <span className="text-xs font-bold text-dark uppercase">{item.title}</span>
          {isExpanded ? <Minus size={16} className="text-primary" /> : <Plus size={16} className="text-muted" />}
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white border-t border-gray-50"
            >
              {item.children.map((child, idx) => (
                <a 
                  key={idx} 
                  href={child.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block py-3 pl-14 pr-6 text-[13px] text-body hover:text-primary hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-all font-body relative"
                >
                  <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-gray-100 group-hover:bg-primary/30 transition-colors" />
                  <div className="absolute left-8 top-1/2 w-3 h-[1px] bg-gray-100 group-hover:bg-primary/30 transition-colors" />
                  {child.title}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <a 
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all group"
    >
      <span className="text-xs font-bold text-dark uppercase">{item.title}</span>
      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
        <ExternalLink size={14} className="text-primary" />
      </div>
    </a>
  );
};

export const ResourceDrawer: React.FC<ResourceDrawerProps> = ({ exam, onClose }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  if (!exam) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-[1000] flex justify-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-12 right-0 w-full md:w-[450px] h-[calc(100vh-48px)] bg-white z-[1001] shadow-2xl flex flex-col overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-white border-b border-gray-100 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl p-2">
                <img src={exam.logo} alt="" className="w-full h-full object-contain" />
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-primary transition-all text-dark"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-[1px] w-4 bg-primary"></div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Official Resources</span>
              </div>
              <h2 className="text-2xl font-display font-black text-dark uppercase tracking-tight">{exam.name}</h2>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <div className="mb-6">
              <h3 className="text-sm font-display font-black text-dark uppercase mb-2">About This Repository</h3>
              <p className="text-xs text-muted leading-relaxed font-body">{exam.description}</p>
              <a 
                href={exam.officialWebsite} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-[10px] font-bold text-primary uppercase tracking-widest hover:underline"
              >
                <Globe size={14} /> Visit Official Website <ExternalLink size={12} />
              </a>
            </div>

            <div className="space-y-4">
              {exam.resources.map((section, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-gray-100"></span>
                    {section.title}
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {section.items.map((item, i) => (
                      <ResourceMenuItem 
                        key={i} 
                        item={item} 
                        isExpanded={expandedItems.includes(item.title)}
                        onToggle={() => toggleExpand(item.title)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <button 
              onClick={() => window.open(exam.officialWebsite, '_blank')}
              className="w-full bg-primary text-dark py-4 font-display font-black uppercase text-[11px] tracking-widest flex items-center justify-center gap-2 hover:bg-dark hover:text-primary transition-all shadow-lg shadow-primary/20"
            >
              <Globe size={16} /> Open Government Portal
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

import React from 'react';

export default function ProjectModal({ project, onClose, triggerToast }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-[#0e0e0e] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#222222] bg-[#141414]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[10px] uppercase font-mono tracking-widest border border-white/20">
              {project.category}
            </span>
            <span className="text-xs text-[#888888] font-mono">Status: {project.stats.status}</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#222222] hover:bg-white hover:text-black text-white flex items-center justify-center transition-colors text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Clean Typography Header */}
          <div className="p-6 rounded-xl border border-[#222222] bg-[#141414] relative overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans uppercase tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-green-400 mt-1.5 font-mono">{project.tagline}</p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#777777] mb-2">SYSTEM OVERVIEW</h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">{project.description}</p>
          </div>

          {/* Key Engineering Highlights */}
          {project.highlights && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#777777] mb-3">KEY HIGHLIGHTS & ARCHITECTURE</h3>
              <ul className="space-y-2">
                {project.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Metrics & Stats Grid */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-[#141414] rounded-xl border border-[#222222]">
            <div>
              <div className="text-[10px] font-mono uppercase text-[#777777]">GitHub Stars</div>
              <div className="text-base font-bold text-white font-mono mt-0.5">★ {project.stats.stars}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-[#777777]">Forks</div>
              <div className="text-base font-bold text-white font-mono mt-0.5">⑂ {project.stats.forks}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-[#777777]">Telemetry Benchmark</div>
              <div className="text-base font-bold text-green-400 font-mono mt-0.5">{project.stats.metrics}</div>
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#777777] mb-3">TECHNOLOGY STACK</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 bg-[#1a1a1a] border border-[#333333] rounded-md text-xs font-mono text-white/90"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#222222] bg-[#141414]">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg bg-[#222222] hover:bg-[#333333] text-white text-xs font-mono font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
            onClick={() => triggerToast && triggerToast(`Opening ${project.title} Repo`)}
          >
            <span>VIEW SOURCE CODE</span>
          </a>

          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 rounded-lg bg-white hover:bg-neutral-200 text-black text-xs font-bold uppercase tracking-wider transition-colors"
            onClick={() => triggerToast && triggerToast(`Launching Live Demo`)}
          >
            LAUNCH DEMO ↗
          </a>
        </div>
      </div>
    </div>
  );
}

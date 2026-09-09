import React, { useState, useRef, useEffect } from 'react';
import { PROJECTS } from '../data/projectsData';

export default function InteractiveTerminal({ onNavigate }) {
  const [history, setHistory] = useState([
    { type: 'system', text: 'SYSTEM INTERACTIVE TERMINAL v4.2 [CONNECTED]' },
    { type: 'system', text: 'Type "help" or click command pills below to execute commands.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isMatrix, setIsMatrix] = useState(true);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (history.length > 2 && bodyRef.current) {
      bodyRef.current.scrollTo({
        top: bodyRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history]);

  const handleCommand = (cmdStr) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    if (!cleanCmd) return;

    const newHistory = [...history, { type: 'input', text: `$ ${cmdStr}` }];

    switch (cleanCmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:
  help       - Display command list
  projects   - Output list of featured projects & status
  skills     - Display core technical stack rating
  bio        - Overview of developer background & philosophy
  contact    - Retrieve contact channels & handle
  stats      - Display live operational metrics
  matrix     - Toggle green matrix terminal theme effect
  clear      - Wipe terminal screen console history`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `FEATURED PROJECTS LIST (${PROJECTS.length} Items):
${PROJECTS.map((p, i) => `  [${i + 1}] ${p.title.padEnd(35)} | ${p.category.padEnd(16)} | ${p.stats.status}`).join('\n')}

Scroll down to the Projects section or click on any project card to inspect specs!`
        });
        if (onNavigate) {
          setTimeout(() => {
            onNavigate('projects');
          }, 800);
        }
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `CORE SKILL RATINGS:
  - Java (Full-Stack)       : [██████████████████░░] 92%
  - JavaScript / TypeScript : [████████████████████] 96%
  - C++ (OOP / Embedded)    : [████████████████░░░░] 88%
  - React.js & Next.js      : [███████████████████░] 97%
  - Node.js & Express.js    : [███████████████████░] 96%
  - SQL & NoSQL Databases   : [███████████████████░] 93%`
        });
        if (onNavigate) {
          setTimeout(() => {
            onNavigate('skills');
          }, 800);
        }
        break;

      case 'bio':
        newHistory.push({
          type: 'output',
          text: `DEVELOPER BIO & PHILOSOPHY:
  Name: ROHAN DUSANE
  Role: Full-Stack Software Developer
  Motto: "Precision engineering, clean code, and robust software architecture."
  Location: Nashik, Maharashtra, India
  Focus: Scalable web apps, IoT safety systems, and high-performance backends.`
        });
        if (onNavigate) {
          setTimeout(() => {
            onNavigate('about');
          }, 800);
        }
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `CONTACT CHANNELS:
  Telegram : t.me/Rohan_Official
  GitHub   : github.com/rohan20004
  LinkedIn : linkedin.com/in/rohan-dusane-3b49723a2/
  Email    : rohandusane100@gmail.com`
        });
        if (onNavigate) {
          setTimeout(() => {
            onNavigate('about');
          }, 800);
        }
        break;

      case 'stats':
        newHistory.push({
          type: 'output',
          text: `SYSTEM TELEMETRY:
  Uptime      : 99.99%
  Projects    : 9 Completed / Deployed
  Commits     : 2,500+ Code Pushes
  Response    : <12ms Execution Speed
  Status      : AVAILABLE FOR HIGH-IMPACT COLLABORATIONS`
        });
        if (onNavigate) {
          setTimeout(() => {
            onNavigate('skills');
          }, 800);
        }
        break;

      case 'matrix':
        setIsMatrix(prev => !prev);
        newHistory.push({
          type: 'system',
          text: 'Matrix rain screen overlay toggled.'
        });
        break;

      case 'clear':
        setHistory([{ type: 'system', text: 'Terminal screen cleared.' }]);
        setInputVal('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${cmdStr}". Type "help" for available commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  const quickCmds = ['help', 'projects', 'skills', 'bio', 'stats', 'contact', 'matrix', 'clear'];

  return (
    <div className={`w-full bg-[#0a0a0a] border transition-all duration-500 rounded-xl overflow-hidden shadow-2xl font-mono text-xs relative ${
      isMatrix ? 'border-green-500/30 shadow-[0_0_20px_rgba(0,255,0,0.15)]' : 'border-[#222222]'
    }`}>
      {/* Terminal Header Bar */}
      <div className="bg-[#141414] px-4 py-3 border-b border-[#222222] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className={`ml-2 font-medium text-[11px] tracking-wider uppercase transition-colors duration-500 ${
            isMatrix ? 'text-green-500/80 drop-shadow-[0_0_2px_rgba(34,197,94,0.3)]' : 'text-[#888888]'
          }`}>
            ROHAN_OS_SHELL_v4.2 — ZSH
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#666666]">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span>ONLINE</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div ref={bodyRef} className="p-4 sm:p-6 min-h-[260px] max-h-[360px] overflow-y-auto space-y-2 leading-relaxed selection:bg-white selection:text-black relative">
        {isMatrix && <MatrixRainCanvas />}
        <div className="relative z-10 space-y-2">
          {history.map((item, idx) => (
            <div key={idx} className="whitespace-pre-wrap">
              {item.type === 'system' && <span className={isMatrix ? 'text-green-500/60' : 'text-neutral-400'}>{item.text}</span>}
              {item.type === 'input' && <span className={isMatrix ? 'text-green-400 font-bold' : 'text-white font-bold'}>{item.text}</span>}
              {item.type === 'output' && <span className={isMatrix ? 'text-green-500' : 'text-neutral-300'}>{item.text}</span>}
              {item.type === 'error' && <span className="text-red-400">{item.text}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Command Pills Bar */}
      <div className="px-4 py-2 bg-[#111111] border-t border-[#222222] flex flex-wrap gap-2 items-center relative z-10">
        <span className="text-[#666666] text-[10px] uppercase font-bold tracking-wider mr-1">Quick:</span>
        {quickCmds.map((cmd) => (
          <button
            key={cmd}
            onClick={() => setInputVal(cmd)}
            className="px-2.5 py-1 rounded bg-[#1e1e1e] hover:bg-[#333333] text-white/80 hover:text-white text-[10px] tracking-widest uppercase transition-colors border border-[#333333] cursor-pointer btn-click-pop"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Input Form */}
      <form onSubmit={onSubmit} className="bg-[#0f0f0f] px-4 py-3 border-t border-[#222222] flex items-center gap-2 relative z-10">
        <span className="text-green-400 font-bold">$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type command here... (e.g. help, projects, skills)"
          className={`w-full bg-transparent focus:outline-none placeholder-[#555555] font-mono text-xs ${
            isMatrix ? 'text-green-400 font-bold' : 'text-white'
          }`}
        />
        <button type="submit" className="px-3 py-1 bg-white text-black font-bold uppercase rounded text-[10px] hover:bg-neutral-200 transition-colors cursor-pointer btn-click-pop">
          RUN
        </button>
      </form>
    </div>
  );
}

// Matrix falling rain overlay component
function MatrixRainCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const chars = '01';
    const alphabet = chars.split('');
    
    const fontSize = 12;
    const columns = canvas.width / fontSize;
    
    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = Math.random() * -100; // randomized start offset
    }
    
    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.08)'; // trails opacity
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        
        // draw the character
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        
        // reset drop if it goes out of screen boundaries
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };
    
    const interval = setInterval(draw, 75);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none opacity-25 z-0"
    />
  );
}

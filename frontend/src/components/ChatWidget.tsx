import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ArrowRight, Quote, Ticket, User, Phone, MessageSquare, Globe, Shield, Clock } from 'lucide-react';



export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isRaisingTicket, setIsRaisingTicket] = useState(false);
  const [ticketForm, setTicketForm] = useState(() => {
    const userStr = typeof window !== 'undefined' ? localStorage.getItem('bk_authorized_user') : null;
    const user = userStr ? JSON.parse(userStr) : {};
    return { 
      name: user.name !== 'Guest' ? (user.name || '') : '', 
      phone: user.phone !== '0000000000' ? (user.phone || '') : '', 
      issue: '' 
    };
  });
  const [messages, setMessages] = useState<{role: 'bot' | 'user', text: string}[]>([
    { role: 'bot', text: 'OFFICIAL COMMUNICATION: I am the Chief Academic Dean at BK Career Academy. I am authorized to provide strategic guidance for UPSC, MPSC, and related administrative recruitment protocols. State your query clearly.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setShowPopup(false);
      return;
    }

    const showTimer = setTimeout(() => {
      setShowPopup(true);
    }, 2000); // Show after 2 seconds

    const hideTimer = setTimeout(() => {
      setShowPopup(false);
    }, 3000); // Remove after 1 second of visibility (3s total)

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isRaisingTicket]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg = message;
    setMessage('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history: messages })
      });
      
      const data = await response.json();
      if (data.success) {
        setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: "ADMINISTRATIVE ERROR: Connection to protocol server lost." }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "COMMUNICATION FAILURE: Direct all inquiries to the official hotline." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRaiseTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTyping(true);
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketForm)
      });
      const data = await response.json();
      if (data.success) {
        const whatsappMsg = `Hi BK Academy, I have raised a ticket.\n\nName: ${ticketForm.name}\nPhone: ${ticketForm.phone}\nIssue: ${ticketForm.issue}`;
        const whatsappUrl = `https://wa.me/918080195558?text=${encodeURIComponent(whatsappMsg)}`;
        
        setMessages(prev => [...prev, { 
          role: 'bot', 
          text: `✅ OFFICIAL RECORD: Ticket Raised. Ref Name: ${ticketForm.name}. I have also prepared a WhatsApp report for administrative priority.` 
        }]);
        
        // Add a special button for WhatsApp
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'bot', 
            text: `Click below to automatically forward this to our headquarters (8080195558) for faster processing: \n\n[SEND ON WHATSAPP](${whatsappUrl})` 
          }]);
        }, 1000);

        setIsRaisingTicket(false);
        setTicketForm({ name: '', phone: '', issue: '' });
      }
    } catch (err: any) {
      console.error('Ticket Error:', err);
      setMessages(prev => [...prev, { role: 'bot', text: `ERROR: Protocol submission failed. Contact headquarters directly.` }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-[90]">
      <AnimatePresence>
        {showPopup && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="absolute bottom-24 right-0 mb-4 bg-white p-6 rounded-3xl shadow-2xl border-l-8 border-primary w-80 z-30 pointer-events-none"
          >
            <div className="text-primary font-black text-[10px] uppercase tracking-widest mb-2">Academic Guidance</div>
            <div className="text-dark font-display font-black text-lg leading-tight">
              Aspirant, how can we assist your strategic preparation today?
            </div>
            {/* Triangle Tip */}
            <div className="absolute bottom-[-10px] right-6 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white" />
          </motion.div>
        )}

        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 md:bottom-24 right-0 w-[calc(100vw-2rem)] md:w-96 bg-white border-2 border-dark overflow-hidden flex flex-col h-[75vh] md:h-[500px] shadow-2xl"
          >
            <div className="bg-white p-5 flex items-center justify-between border-b border-gray-100 rounded-t-[2.5rem] shadow-sm relative z-20">
              <div className="flex items-center gap-4">
                <motion.div 
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 0 }}
                  className="w-12 h-12 bg-gray-50 p-2 rounded-2xl border-2 border-primary shadow-lg shadow-primary/10"
                >
                  <img src="/Ashok%20stambh.png" alt="Ashok Stambh" className="w-full h-full object-contain" />
                </motion.div>
                <div>
                  <div className="text-dark font-display font-black text-[13px] uppercase tracking-tight">Chief Academic Dean</div>
                  <div className="text-primary text-[9px] uppercase font-mono font-black tracking-widest">Official Channel • JAY HIND</div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 hover:bg-primary hover:text-dark transition-all flex items-center justify-center"
              >
                <X size={18} strokeWidth={3} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/50 backdrop-blur-sm scroll-smooth">
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`p-4 px-5 text-[13px] rounded-3xl shadow-sm max-w-[85%] ${msg.role === 'user' ? 'bg-primary text-dark font-black rounded-tr-none' : 'bg-white border border-gray-100 text-dark font-medium rounded-tl-none'}`}>
                    {msg.text.includes('[') ? (
                      <div>
                        {msg.text.split(/(\[.*?\]\(.*?\))/).map((part, index) => {
                          const match = part.match(/\[(.*?)\]\((.*?)\)/);
                          if (match) {
                            return (
                              <a 
                                key={index} 
                                href={match[2]} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 mt-2 font-black uppercase text-[10px] hover:bg-green-700 transition-all rounded-sm shadow-md"
                              >
                                <MessageSquare size={12} />
                                {match[1]}
                              </a>
                            );
                          }
                          return <span key={index}>{part}</span>;
                        })}
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>
                </motion.div>
              ))}
              
              {!isRaisingTicket && (
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <button 
                      onClick={() => setIsRaisingTicket(true)}
                      className="flex items-center gap-2 bg-dark text-primary px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider hover:bg-primary hover:text-dark transition-all rounded-lg shadow-lg"
                    >
                      <Ticket size={14} /> Raise a Ticket
                    </button>
                  </div>

                  {/* Strategic Hub Quick Links */}
                  <div className="grid grid-cols-2 gap-2 mt-4 animate-up">
                    {[
                      { label: 'UPSC Portal', icon: <Globe size={12} />, color: 'bg-blue-50 text-blue-600', url: 'https://upsc.gov.in' },
                      { label: 'MPSC Portal', icon: <Shield size={12} />, color: 'bg-red-50 text-red-600', url: 'https://mpsc.gov.in' },
                      { label: 'Exam Calendar', icon: <Clock size={12} />, color: 'bg-orange-50 text-orange-600', url: '/syllabus' },
                      { label: 'Insights Hub', icon: <Star size={12} />, color: 'bg-purple-50 text-purple-600', url: '/success-stories' },
                    ].map((hub, idx) => (
                      <a 
                        key={idx}
                        href={hub.url}
                        target={hub.url.startsWith('http') ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 p-2.5 rounded-xl border border-gray-100 hover:shadow-md transition-all group ${hub.color}`}
                      >
                        <div className="p-1.5 rounded-lg bg-white shadow-sm group-hover:scale-110 transition-transform">
                          {hub.icon}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-tight text-dark">{hub.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {isRaisingTicket && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border-2 border-primary/20 p-6 space-y-4 rounded-[2rem] shadow-xl"
                >
                  <div className="text-[11px] font-black text-dark uppercase flex items-center gap-2 tracking-widest">
                    <Ticket size={14} className="text-primary" /> New Support Ticket
                  </div>
                  <div className="space-y-3">
                    <div className="relative">
                      <User size={12} className="absolute left-4 top-3.5 text-gray-400" />
                        <input 
                          placeholder="Full Name (e.g. Rohan Mane)"
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 text-dark text-xs rounded-xl focus:border-primary outline-none transition-all placeholder:text-gray-400"
                          value={ticketForm.name}
                          onChange={e => setTicketForm({...ticketForm, name: e.target.value})}
                        />
                    </div>
                    <div className="relative">
                      <Phone size={12} className="absolute left-4 top-3.5 text-gray-400" />
                        <input 
                          placeholder="Contact No (e.g. 9890xxxxxx)"
                          type="tel"
                          maxLength={10}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 text-dark text-xs rounded-xl focus:border-primary outline-none transition-all placeholder:text-gray-400"
                          value={ticketForm.phone}
                          onChange={e => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setTicketForm({...ticketForm, phone: val});
                          }}
                        />
                    </div>
                    <div className="relative">
                      <MessageSquare size={12} className="absolute left-4 top-3.5 text-gray-400" />
                      <textarea 
                        placeholder="Describe your issue..."
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 text-dark text-xs rounded-xl focus:border-primary outline-none h-24 resize-none transition-all placeholder:text-gray-400"
                        value={ticketForm.issue}
                        onChange={e => setTicketForm({...ticketForm, issue: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleRaiseTicket}
                      disabled={!ticketForm.name || ticketForm.phone.length !== 10 || !ticketForm.issue}
                      className="flex-grow bg-primary text-black py-2 text-[11px] font-bold uppercase disabled:opacity-50 rounded-xl"
                    >
                      Submit Ticket
                    </button>
                    <button 
                      onClick={() => setIsRaisingTicket(false)}
                      className="px-6 border border-gray-100 text-gray-400 text-[11px] font-bold uppercase hover:bg-gray-50 transition-colors rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
                           {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white p-3 border border-gray-100 flex gap-1.5 rounded-2xl shadow-sm">
                    <div className="w-1.5 h-1.5 bg-primary animate-bounce rounded-full" />
                    <div className="w-1.5 h-1.5 bg-primary animate-bounce [animation-delay:0.2s] rounded-full" />
                  </div>
                </motion.div>
              )}
            </div>

            {!isRaisingTicket && (
              <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-3">
              <input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Submit your administrative query..."
                className="flex-grow bg-gray-50 border border-gray-100 px-5 py-3.5 text-dark text-xs outline-none focus:border-primary focus:bg-white transition-all rounded-2xl placeholder:text-gray-400"
              />
              <button type="submit" className="w-12 h-12 bg-dark text-primary rounded-2xl flex items-center justify-center hover:bg-primary hover:text-dark transition-all shadow-xl shadow-dark/10 group">
                <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -8, 0],
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            "0 20px 40px -10px rgba(245, 166, 35, 0.3)",
            "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-dark text-primary rounded-2xl flex items-center justify-center shadow-2xl z-[100] border-2 border-primary group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={28} strokeWidth={3} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative"
            >
              <MessageSquare size={28} strokeWidth={3} />
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-dark"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

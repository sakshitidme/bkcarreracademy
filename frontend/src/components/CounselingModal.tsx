import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  BookOpen, 
  GraduationCap, 
  Target, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  School,
  Sparkles
} from 'lucide-react';

interface CounselingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  { id: 1, title: 'Identity', icon: User },
  { id: 2, title: 'Academic', icon: GraduationCap },
  { id: 3, title: 'Strategy', icon: Target },
  { id: 4, title: 'Schedule', icon: Calendar }
];

export default function CounselingModal({ isOpen, onClose }: CounselingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    institution: '',
    currentClass: '',
    stream: '',
    primaryInterest: '',
    guidanceType: '',
    mode: 'Offline',
    preferredDate: '',
    preferredTime: '',
    accuracyDeclaration: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    if (name === 'whatsapp') {
      const cleaned = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: cleaned }));
    } else {
      setFormData(prev => ({ ...prev, [name]: val }));
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 4) {
      nextStep();
      return;
    }

    if (!formData.accuracyDeclaration) {
      alert("Please confirm the accuracy declaration.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/registration/counseling-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (response.ok && data.success) {
        setIsSubmitted(true);
      } else {
        alert("Error: " + (data.message || "Failed to submit request"));
      }
    } catch (err) {
      console.error(err);
      alert("System connection error. Please check your internet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants = {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 }
  };

  const inputClass = "w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-body focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all";
  const labelClass = "text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-1 mb-2 block";

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
            className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-white border-b border-gray-100 p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-dark hover:bg-primary transition-all z-20 shadow-sm group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-dark rotate-3">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-black text-dark uppercase tracking-tight leading-none">Free Counseling</h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mt-1">Personalized Success Roadmap</p>
                  </div>
                </div>

                {/* Progress Bar */}
                {!isSubmitted && (
                  <div className="flex justify-between items-center mt-8 relative">
                    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2" />
                    <motion.div 
                      className="absolute top-1/2 left-0 h-[2px] bg-primary -translate-y-1/2"
                      animate={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                    />
                    {STEPS.map(step => (
                      <button 
                        key={step.id}
                        type="button"
                        onClick={() => setCurrentStep(step.id)}
                        className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-125 ${
                          currentStep >= step.id ? 'bg-primary text-dark scale-110 shadow-lg shadow-primary/20' : 'bg-gray-100 border border-gray-200 text-muted hover:border-primary/50'
                        }`}
                      >
                        <step.icon size={18} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Form Body */}
            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key={currentStep}
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-8"
                    onSubmit={handleSubmit}
                  >
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                          <div className="space-y-2">
                            <label className={labelClass}>Student Name</label>
                            <div className="relative">
                              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-muted" size={18} />
                              <input 
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Your full legal name"
                                className={inputClass + " pl-14"}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Email Address</label>
                            <div className="relative">
                              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-muted" size={18} />
                              <input 
                                required
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="official@example.com"
                                className={inputClass + " pl-14"}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>WhatsApp Number</label>
                            <div className="relative">
                              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-muted" size={18} />
                              <input 
                                required
                                type="tel"
                                name="whatsapp"
                                maxLength={10}
                                value={formData.whatsapp}
                                onChange={handleInputChange}
                                placeholder="10-digit mobile number"
                                className={inputClass + " pl-14"}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className={labelClass}>Institution Name</label>
                          <div className="relative">
                            <School className="absolute left-5 top-1/2 -translate-y-1/2 text-muted" size={18} />
                            <input 
                              required
                              name="institution"
                              value={formData.institution}
                              onChange={handleInputChange}
                              placeholder="Current School or College"
                              className={inputClass + " pl-14"}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className={labelClass}>Current Class</label>
                            <select 
                              required
                              name="currentClass"
                              value={formData.currentClass}
                              onChange={handleInputChange}
                              className={inputClass}
                            >
                              <option value="">Select Class</option>
                              <option value="10th">10th (X)</option>
                              <option value="11th">11th (XI)</option>
                              <option value="12th">12th (XII)</option>
                              <option value="Repeaters">12th Pass (Repeaters)</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Stream Selection</label>
                            <select 
                              required
                              name="stream"
                              value={formData.stream}
                              onChange={handleInputChange}
                              className={inputClass}
                            >
                              <option value="">Select Stream</option>
                              <option value="Science">Science</option>
                              <option value="Commerce">Commerce</option>
                              <option value="Arts">Arts</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className={labelClass}>Primary Career Interest</label>
                          <select 
                            required
                            name="primaryInterest"
                            value={formData.primaryInterest}
                            onChange={handleInputChange}
                            className={inputClass}
                          >
                            <option value="">Select Target Exam</option>
                            <option value="JEE">JEE (Engineering)</option>
                            <option value="NEET">NEET (Medical)</option>
                            <option value="NDA">NDA (Defense)</option>
                            <option value="UPSC/MPSC">UPSC / MPSC</option>
                            <option value="Other">Other Government Exams</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>Guidance Type Needed</label>
                          <select 
                            required
                            name="guidanceType"
                            value={formData.guidanceType}
                            onChange={handleInputChange}
                            className={inputClass}
                          >
                            <option value="">Where do you need help?</option>
                            <option value="Scholarship">Scholarship Opportunities</option>
                            <option value="Exam Strategy">Exam Patterns & Strategy</option>
                            <option value="Planning">Academic Planning</option>
                            <option value="Course">Course Selection</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className={labelClass}>Counseling Mode</label>
                            <select 
                              required
                              name="mode"
                              value={formData.mode}
                              onChange={handleInputChange}
                              className={inputClass}
                            >
                              <option value="Offline">Offline (In-Class)</option>
                              <option value="Online">Online (Virtual)</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Preferred Date</label>
                            <input 
                              required
                              type="date"
                              name="preferredDate"
                              min={new Date().toISOString().split('T')[0]}
                              max="2030-12-31"
                              value={formData.preferredDate}
                              onChange={handleInputChange}
                              className={inputClass}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>Preferred Time Slot (10AM - 6PM)</label>
                          <select 
                            required
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleInputChange}
                            className={inputClass}
                          >
                            <option value="">Select Time</option>
                            <option value="10:00 AM">10:00 AM</option>
                            <option value="11:30 AM">11:30 AM</option>
                            <option value="1:00 PM">01:00 PM</option>
                            <option value="3:00 PM">03:00 PM</option>
                            <option value="4:30 PM">04:30 PM</option>
                            <option value="6:00 PM">06:00 PM</option>
                          </select>
                        </div>
                        <div className="pt-4">
                          <label className="flex items-start gap-3 cursor-pointer group">
                            <input 
                              required
                              type="checkbox"
                              name="accuracyDeclaration"
                              checked={formData.accuracyDeclaration}
                              onChange={handleInputChange}
                              className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
                            />
                            <span className="text-xs text-muted leading-relaxed group-hover:text-dark transition-colors">
                              I hereby declare that all provided information is accurate and correct to the best of my knowledge.
                            </span>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 pt-6">
                      {currentStep === 1 ? (
                        <button 
                          type="button"
                          onClick={onClose}
                          className="flex-1 px-8 py-4 border-2 border-gray-100 rounded-2xl font-display font-black uppercase text-[10px] tracking-widest hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center justify-center gap-2"
                        >
                          Cancel
                        </button>
                      ) : (
                        <button 
                          type="button"
                          onClick={prevStep}
                          className="flex-1 px-8 py-4 border-2 border-gray-100 rounded-2xl font-display font-black uppercase text-[10px] tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                        >
                          <ArrowLeft size={14} /> Back
                        </button>
                      )}
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-[2] bg-primary text-dark px-8 py-4 rounded-2xl font-display font-black uppercase text-[10px] tracking-widest hover:bg-dark hover:text-primary transition-all shadow-xl shadow-primary/10 flex items-center justify-center gap-2 group disabled:opacity-50"
                      >
                        {currentStep === 4 ? (isSubmitting ? 'Scheduling...' : 'Confirm Session') : 'Continue'}
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-24 h-24 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
                      <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-4xl font-display font-black text-dark uppercase tracking-tight mb-4">Session Scheduled!</h2>
                    <p className="body-text max-w-sm mx-auto mb-10 leading-relaxed">
                      Our senior academic counselor has received your request. You will receive a confirmation on <span className="text-dark font-bold">{formData.whatsapp}</span> shortly.
                    </p>
                    <button 
                      onClick={onClose}
                      className="bg-primary text-dark px-12 py-5 rounded-2xl font-display font-black uppercase text-[11px] tracking-widest hover:bg-dark hover:text-primary transition-all shadow-xl shadow-primary/10"
                    >
                      Return to Website
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

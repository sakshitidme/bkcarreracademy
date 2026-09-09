import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown, CheckCircle2, Send } from 'lucide-react';
import { EXAM_CATEGORIES } from '../data/constants';

type InquiryFormData = {
  name: string;
  email: string;
  phone: string;
  category: string;
  subCategory: string;
  address: string;
};

const INITIAL_FORM: InquiryFormData = {
  name: '',
  email: '',
  phone: '',
  category: '',
  subCategory: '',
  address: ''
};

export default function RegistrationModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<InquiryFormData>(INITIAL_FORM);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getSubExams = () => {
    const selectedCat = EXAM_CATEGORIES.find(c => c.title === formData.category);
    if (selectedCat) {
      return selectedCat.subcategories.flatMap(s => s.exams);
    }
    return [];
  };

  const allSubExams = getSubExams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    let { name, value } = e.target;
    if (name === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json().catch(() => null);

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert(result?.message || 'Inquiry submission failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Error submitting inquiry form:', err);
      alert(`Could not connect to the inquiry server. (${err.message}). Please check if the backend is running.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setIsSubmitted(false);
    setFormData(INITIAL_FORM);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetModal, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-dark/40 backdrop-blur-md"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <button
              onClick={handleClose}
              className="absolute top-8 right-8 p-2 text-muted hover:text-dark transition-colors"
            >
              <X size={24} />
            </button>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <header className="mb-10">
                    <p className="label-text mb-2">Connect with us</p>
                    <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">Expert Consultation</h2>
                    <p className="text-sm text-body mt-2">Start your journey with a personalized roadmap from our senior mentors.</p>
                  </header>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">Full Name</label>
                        <input
                          required
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your Name"
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-primary/50 focus:bg-white transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">Email Address</label>
                        <input
                          required
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email"
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-primary/50 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">Phone Number</label>
                        <input
                          required
                          name="phone"
                          type="tel"
                          pattern="[0-9]{10}"
                          maxLength={10}
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="10-digit number"
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-primary/50 focus:bg-white transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">Exam Category</label>
                        <div className="relative">
                          <select
                            required
                            name="category"
                            value={formData.category}
                            onChange={(e) => {
                              const value = e.target.value;
                              setFormData((prev) => ({ ...prev, category: value, subCategory: '' }));
                            }}
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 text-sm appearance-none focus:outline-none focus:border-primary/50 focus:bg-white transition-all cursor-pointer"
                          >
                            <option value="">Select Category</option>
                            {EXAM_CATEGORIES.map(cat => (
                              <option key={cat.id} value={cat.title}>{cat.title}</option>
                            ))}
                            <option value="Other">Other</option>
                          </select>
                          <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">Target Examination</label>
                      <div className="relative">
                        <select
                          required
                          name="subCategory"
                          value={formData.subCategory}
                          onChange={handleInputChange}
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 text-sm appearance-none focus:outline-none focus:border-primary/50 focus:bg-white transition-all cursor-pointer"
                        >
                          <option value="">Select Exam</option>
                          {allSubExams.map((exam) => (
                            <option key={exam} value={exam}>{exam}</option>
                          ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary-new py-4 flex items-center justify-center gap-2 group"
                    >
                      {isSubmitting ? 'Sending Request...' : 'Get Career Roadmap'}
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight mb-4">Request Received</h2>
                  <p className="body-text max-w-sm mx-auto mb-10">
                    A senior mentor from {formData.category} department will contact you within 24 hours to discuss your roadmap.
                  </p>
                  <button
                    onClick={handleClose}
                    className="btn-outline-new px-12 py-4"
                  >
                    Got it, Thanks
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

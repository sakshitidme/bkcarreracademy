import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  X, CheckCircle2, Download, Star, ChevronDown, 
  User, BookOpen, Phone, MapPin, ShieldCheck, 
  Upload, GraduationCap, Languages, Heart,
  Camera, Edit3, Save, FileText
} from 'lucide-react';
import { EXAM_CATEGORIES } from '../data/constants';

interface AdmissionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdmissionFormModal({ isOpen, onClose }: AdmissionFormModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    photo: null as File | null,
    signature: null as File | null,
    schoolName: '',
    salutation: '',
    surname: '',
    firstName: '',
    middleName: '',
    surnameLocal: '',
    firstNameLocal: '',
    middleNameLocal: '',
    motherName: '',
    motherTongue: '',
    dob: '',
    age: '',
    gender: '',
    mobileSelf: '',
    mobileParents: '',
    email: '',
    isIndianNational: '',
    isMaharashtraDomiciled: '',
    canReadWriteSpeakMarathi: '',
    marathiRead: '',
    marathiWrite: '',
    marathiSpeak: '',
    maritalStatus: '',
    isDisabled: '',
    disabilityType: '',
    category: '',
    isNonCreamyLayer: '',
    motherOccupation: '',
    motherMobile: '',
    motherEducation: '',
    courses: [] as string[],
    subCourse: '',
    courseDuration: '',
    date: new Date().toISOString().split('T')[0],
    place: '',
    registrationNo: '',
    formNo: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0];
      if (file) {
        if (file.size > 1024 * 1024) {
          alert('File size must be less than 1MB');
          return;
        }
        setFormData(prev => ({ ...prev, [name]: file }));
      }
    } else {
      if (name === 'motherMobile' || name === 'mobileSelf' || name === 'mobileParents') {
        const numericValue = value.replace(/\D/g, '').slice(0, 10);
        setFormData(prev => ({ ...prev, [name]: numericValue }));
        return;
      }
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    if (formData.dob) {
      const birthDate = new Date(formData.dob);
      if (isNaN(birthDate.getTime())) return;
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      if (calculatedAge >= 0 && calculatedAge < 150) {
        setFormData(prev => ({ ...prev, age: calculatedAge.toString() }));
      }
    }
  }, [formData.dob]);

  useEffect(() => {
    if (isOpen && !isSubmitted) {
       const fetchNumbers = async () => {
          try {
            const res = await fetch('/api/registration/next-form-meta');
            const data = await res.json();
            if (data.success) {
               setFormData(prev => ({
                  ...prev,
                  registrationNo: data.nextRegNo || "GENERATED ON SUBMIT",
                  formNo: data.nextFormNo
               }));
            }
          } catch (err) { 
            const ts = Date.now().toString().slice(-4);
            setFormData(prev => ({ ...prev, registrationNo: `BK-2026-F${ts}`, formNo: `FRM-F${ts}` }));
          }
       };
       fetchNumbers();
    }
  }, [isOpen, isSubmitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.surname || !formData.courses[0] || !formData.photo || !formData.signature) {
      alert('Please fill in required fields and upload photo/signature');
      return;
    }
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          formDataToSend.append(key, value);
        } else if (Array.isArray(value)) {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value as string);
        }
      });
      
      const response = await fetch('/api/registration/submit', {
        method: 'POST',
        body: formDataToSend
      });
      
      const data = await response.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, registrationNo: data.regNo, formNo: data.formNo }));
        setIsSubmitting(false);
        setIsSubmitted(true);
      } else {
        alert('Server error: Could not submit form');
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const generatePDF = async () => {
    try {
      await fetch('/api/track/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: 'AdmissionFormPDF', studentName: `${formData.firstName} ${formData.surname}` })
      });
    } catch(err) {}
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>BK Admission Form</title><style>@page { size: A4; margin: 10mm; } body { font-family: 'Times New Roman', serif; padding: 5px; font-size: 10.5px; line-height: 1.3; } .header { text-align: center; margin-bottom: 10px; padding: 8px; background: #1a1a1a; color: white; } .form-title { text-align: center; font-size: 14px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 5px; } .section { margin-bottom: 8px; } .section-title { font-weight: bold; font-size: 9.5px; border-left: 3px solid #e74c3c; padding-left: 6px; } .filled-value { padding: 2px 5px; background: #f9f9f9; border-bottom: 1px solid #000; min-height: 18px; font-weight: 500; } .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; } .photo-box { width: 100px; height: 120px; border: 2px solid #333; display: flex; align-items: center; justify-content: center; margin: 0 auto; }</style></head>
      <body><div class="header">BK Educational & Welfare Society</div><div class="form-title">Admission Form</div><div style="text-align:center;margin:10px 0;"><div class="photo-box">Photo</div></div><div class="section"><div class="section-title">Details</div><div class="grid"><div>Reg No: ${formData.registrationNo}</div><div>Form No: ${formData.formNo}</div><div>Name: ${formData.firstName} ${formData.surname}</div><div>Course: ${formData.courses[0]}</div><div>Mobile: ${formData.mobileSelf}</div></div></div></body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const Section = ({ title, icon: Icon, children, delay = 0 }: any) => (
    <motion.div 
      initial={{ opacity: 0, y: 30, rotateX: -5 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, type: 'spring' }}
      className="bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] transition-all group"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center text-ink shadow-[0_4px_15px_rgba(247,147,26,0.3)] group-hover:scale-110 transition-transform duration-500">
          <Icon size={24} />
        </div>
        <div>
          <h3 className="text-xl font-display font-black text-ink uppercase tracking-tight">{title}</h3>
          <div className="h-1 w-12 bg-brand rounded-full mt-1 group-hover:w-20 transition-all duration-500" />
        </div>
      </div>
      {children}
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 overflow-hidden bg-ink/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 50, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 50, rotateX: -10 }}
            transition={{ type: 'spring', damping: 20 }}
            className="relative w-full max-w-5xl bg-[#F8F9FA] rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] z-50 flex flex-col h-[95vh] overflow-hidden border border-white/50"
          >
            {/* Glossy Header */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-white/50 p-6 md:px-12 flex justify-between items-center shrink-0">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-ink rounded-2xl flex items-center justify-center text-brand shadow-xl">
                    <GraduationCap size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-black text-ink uppercase tracking-tighter leading-none">Admission <span className="text-brand">Portal</span></h2>
                    <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mt-1">BK Career Academy 2026 Batch</p>
                  </div>
               </div>
               
               <div className="hidden md:flex gap-4">
                  <div className="px-4 py-2 bg-ink/5 rounded-xl border border-ink/10 flex flex-col items-center">
                    <span className="text-[8px] font-bold text-muted uppercase tracking-widest">Reg No</span>
                    <span className="text-xs font-mono font-black text-brand">{formData.registrationNo || '••••'}</span>
                  </div>
                  <div className="px-4 py-2 bg-ink/5 rounded-xl border border-ink/10 flex flex-col items-center">
                    <span className="text-[8px] font-bold text-muted uppercase tracking-widest">Form No</span>
                    <span className="text-xs font-mono font-black text-ink">{formData.formNo || '••••'}</span>
                  </div>
               </div>

               <button 
                  onClick={onClose}
                  className="p-3 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
               >
                  <X size={24} />
               </button>
            </div>

            {/* Scrollable Form Content */}
            <div 
              ref={containerRef}
              className="flex-1 overflow-y-auto p-6 md:p-12 space-y-12 scrollbar-hide perspective-[1000px]"
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-12">
                   {/* Step 1: Course */}
                   <Section title="Course Selection" icon={BookOpen} delay={0.1}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-3">
                           <label className="text-xs font-black uppercase text-muted flex items-center gap-2">Category <Star size={10} className="text-brand" fill="currentColor" /></label>
                           <div className="relative">
                             <select name="courses" value={formData.courses[0] || ''} onChange={(e) => setFormData(prev => ({ ...prev, courses: [e.target.value], subCourse: '' }))} className="w-full bg-white border-2 border-ink/5 rounded-2xl px-6 py-4 text-sm font-bold appearance-none focus:border-brand transition-all outline-none">
                               <option value="">Select Category</option>
                               {EXAM_CATEGORIES.map(cat => <option key={cat.id} value={cat.title}>{cat.title}</option>)}
                               <option value="Other">Other</option>
                             </select>
                             <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-muted" size={18} />
                           </div>
                         </div>
                         <div className="space-y-3">
                           <label className="text-xs font-black uppercase text-muted">Specific Exam</label>
                           <div className="relative">
                             <select name="subCourse" value={formData.subCourse} onChange={handleInputChange} className="w-full bg-white border-2 border-ink/5 rounded-2xl px-6 py-4 text-sm font-bold appearance-none focus:border-brand transition-all outline-none">
                               <option value="">Select Exam</option>
                               {EXAM_CATEGORIES.find(cat => cat.title === formData.courses[0])?.subcategories.flatMap(sub => sub.exams).map(exam => <option key={exam} value={exam}>{exam}</option>)}
                               <option value="Other">Other</option>
                             </select>
                             <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-muted" size={18} />
                           </div>
                         </div>
                         <div className="md:col-span-2 space-y-3">
                           <label className="text-xs font-black uppercase text-muted">Course Duration</label>
                           <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                             {["6 Months", "1 Year", "3 Years", "5 Years"].map(dur => (
                               <button key={dur} type="button" onClick={() => setFormData(prev => ({ ...prev, courseDuration: dur }))} className={`px-4 py-3 rounded-xl border-2 font-black text-[10px] uppercase transition-all ${formData.courseDuration === dur ? 'bg-brand border-brand text-ink shadow-lg shadow-brand/20 scale-[1.05]' : 'bg-white border-ink/5 text-muted hover:border-brand/30'}`}>
                                 {dur}
                               </button>
                             ))}
                           </div>
                         </div>
                      </div>
                   </Section>

                   {/* Step 2: Personal Info */}
                   <Section title="Personal Information" icon={User} delay={0.2}>
                      <div className="space-y-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                           <div className="space-y-2">
                             <label className="text-xs font-black uppercase text-muted">Salutation</label>
                             <select name="salutation" value={formData.salutation} onChange={handleInputChange} className="w-full bg-white border-b-2 border-ink/10 py-3 text-sm font-bold outline-none focus:border-brand transition-all">
                               <option value="">---</option>
                               {["Shri", "Smt.", "Kumar", "Kumari"].map(s => <option key={s} value={s}>{s}</option>)}
                             </select>
                           </div>
                           <div className="space-y-2">
                             <label className="text-xs font-black uppercase text-muted">Surname</label>
                             <input type="text" name="surname" value={formData.surname} onChange={handleInputChange} className="w-full bg-white border-b-2 border-ink/10 py-3 text-sm font-bold outline-none focus:border-brand" />
                           </div>
                           <div className="space-y-2">
                             <label className="text-xs font-black uppercase text-muted">First Name</label>
                             <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-white border-b-2 border-ink/10 py-3 text-sm font-bold outline-none focus:border-brand" />
                           </div>
                           <div className="space-y-2">
                             <label className="text-xs font-black uppercase text-muted">Middle Name</label>
                             <input type="text" name="middleName" value={formData.middleName} onChange={handleInputChange} className="w-full bg-white border-b-2 border-ink/10 py-3 text-sm font-bold outline-none focus:border-brand" />
                           </div>
                        </div>

                        <div className="p-8 bg-brand/5 rounded-[2rem] border border-brand/10 space-y-6">
                           <div className="flex items-center gap-3">
                             <Languages className="text-brand" size={18} />
                             <p className="text-[10px] font-black uppercase text-ink tracking-widest italic">Full Name (In Local Language)</p>
                           </div>
                           <div className="grid grid-cols-3 gap-6">
                             <input type="text" name="surnameLocal" value={formData.surnameLocal} onChange={handleInputChange} placeholder="Surname (Marathi)" className="bg-transparent border-b border-brand/20 py-2 text-sm font-bold outline-none focus:border-brand" />
                             <input type="text" name="firstNameLocal" value={formData.firstNameLocal} onChange={handleInputChange} placeholder="First Name (Marathi)" className="bg-transparent border-b border-brand/20 py-2 text-sm font-bold outline-none focus:border-brand" />
                             <input type="text" name="middleNameLocal" value={formData.middleNameLocal} onChange={handleInputChange} placeholder="Middle Name (Marathi)" className="bg-transparent border-b border-brand/20 py-2 text-sm font-bold outline-none focus:border-brand" />
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                           <div className="space-y-3">
                             <label className="text-xs font-black uppercase text-muted">Date of Birth</label>
                             <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full bg-white border-2 border-ink/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-brand" />
                           </div>
                           <div className="space-y-3">
                             <label className="text-xs font-black uppercase text-muted">Gender</label>
                             <div className="flex bg-white rounded-2xl border-2 border-ink/5 overflow-hidden">
                                {["Male", "Female", "Other"].map(g => (
                                  <button key={g} type="button" onClick={() => setFormData(prev => ({ ...prev, gender: g }))} className={`flex-1 py-4 text-[10px] font-black uppercase transition-all ${formData.gender === g ? 'bg-ink text-brand' : 'text-muted hover:bg-ink/5'}`}>
                                    {g}
                                  </button>
                                ))}
                             </div>
                           </div>
                           <div className="space-y-3">
                             <label className="text-xs font-black uppercase text-muted">Age (Auto)</label>
                             <div className="w-full bg-ink text-brand rounded-2xl px-6 py-4 text-sm font-black text-center shadow-lg">
                                {formData.age ? `${formData.age} Years` : '---'}
                             </div>
                           </div>
                        </div>
                      </div>
                   </Section>

                   {/* Step 3: Contact */}
                   <Section title="Contact Details" icon={Phone} delay={0.3}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-6">
                            <div className="space-y-3">
                              <label className="text-xs font-black uppercase text-muted">Mobile (Self)</label>
                              <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-muted font-bold text-sm">+91</span>
                                <input type="tel" name="mobileSelf" value={formData.mobileSelf} onChange={handleInputChange} className="w-full bg-white border-2 border-ink/5 rounded-2xl pl-16 pr-6 py-4 text-sm font-bold outline-none focus:border-brand" placeholder="9876..." />
                              </div>
                            </div>
                            <div className="space-y-3">
                              <label className="text-xs font-black uppercase text-muted">Email Address</label>
                              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-white border-2 border-ink/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-brand" placeholder="example@email.com" />
                            </div>
                         </div>
                         <div className="space-y-6">
                            <div className="space-y-3">
                              <label className="text-xs font-black uppercase text-muted">Mobile (Parent)</label>
                              <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-muted font-bold text-sm">+91</span>
                                <input type="tel" name="mobileParents" value={formData.mobileParents} onChange={handleInputChange} className="w-full bg-white border-2 border-ink/5 rounded-2xl pl-16 pr-6 py-4 text-sm font-bold outline-none focus:border-brand" placeholder="9876..." />
                              </div>
                            </div>
                            <div className="space-y-3">
                              <label className="text-xs font-black uppercase text-muted">School/College Name</label>
                              <input type="text" name="schoolName" value={formData.schoolName} onChange={handleInputChange} className="w-full bg-white border-2 border-ink/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-brand" />
                            </div>
                         </div>

                         <div className="md:col-span-2 p-8 bg-ink/5 rounded-[2.5rem] border border-ink/10 space-y-8">
                            <div className="flex items-center gap-4">
                               <Heart className="text-red-500" size={24} fill="currentColor" />
                               <h4 className="text-sm font-black uppercase text-ink">Parental Information</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                               <div className="space-y-4">
                                  <input type="text" name="motherName" value={formData.motherName} onChange={handleInputChange} placeholder="Mother's Name" className="w-full bg-transparent border-b-2 border-ink/10 py-2 text-sm font-bold outline-none focus:border-brand" />
                                  <input type="text" name="motherOccupation" value={formData.motherOccupation} onChange={handleInputChange} placeholder="Occupation" className="w-full bg-transparent border-b-2 border-ink/10 py-2 text-sm font-bold outline-none focus:border-brand" />
                               </div>
                               <div className="space-y-4">
                                  <input type="text" name="motherTongue" value={formData.motherTongue} onChange={handleInputChange} placeholder="Mother Tongue" className="w-full bg-transparent border-b-2 border-ink/10 py-2 text-sm font-bold outline-none focus:border-brand" />
                                  <div className="grid grid-cols-2 gap-4">
                                    <input type="tel" name="motherMobile" value={formData.motherMobile} onChange={handleInputChange} placeholder="Mobile" className="w-full bg-transparent border-b-2 border-ink/10 py-2 text-sm font-bold outline-none focus:border-brand" />
                                    <input type="text" name="motherEducation" value={formData.motherEducation} onChange={handleInputChange} placeholder="Education" className="w-full bg-transparent border-b-2 border-ink/10 py-2 text-sm font-bold outline-none focus:border-brand" />
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </Section>

                   {/* Step 4: Eligibility */}
                   <Section title="Eligibility & Category" icon={ShieldCheck} delay={0.4}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-6">
                            <div className="space-y-3">
                              <label className="text-xs font-black uppercase text-muted">Category Selection</label>
                              <div className="relative">
                                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-white border-2 border-ink/5 rounded-2xl px-6 py-4 text-sm font-bold appearance-none focus:border-brand outline-none">
                                  <option value="">Select Category</option>
                                  {["ST", "ESBC", "SC", "DT(A)", "SBC(A)", "Open", "NT(B)", "NT(C)", "NT(D)", "OBC", "SBC"].map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-muted" size={18} />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                               {[
                                 { label: 'Indian?', name: 'isIndianNational' },
                                 { label: 'Maharashtra?', name: 'isMaharashtraDomiciled' }
                               ].map(item => (
                                 <div key={item.name} className="space-y-2">
                                   <label className="text-[10px] font-black uppercase text-muted">{item.label}</label>
                                   <div className="flex bg-white rounded-xl border border-ink/10 overflow-hidden h-12">
                                     <button type="button" onClick={() => setFormData(prev => ({ ...prev, [item.name]: 'Yes' }))} className={`flex-1 text-[10px] font-black uppercase transition-all ${formData[item.name as keyof typeof formData] === 'Yes' ? 'bg-brand text-ink' : 'text-muted'}`}>Yes</button>
                                     <button type="button" onClick={() => setFormData(prev => ({ ...prev, [item.name]: 'No' }))} className={`flex-1 text-[10px] font-black uppercase transition-all ${formData[item.name as keyof typeof formData] === 'No' ? 'bg-red-600 text-white' : 'text-muted'}`}>No</button>
                                   </div>
                                 </div>
                               ))}
                            </div>
                         </div>

                         <div className="space-y-6">
                            <div className="space-y-3">
                               <label className="text-xs font-black uppercase text-muted">Marathi Proficiency</label>
                               <div className="p-4 bg-white rounded-2xl border-2 border-ink/5 space-y-4">
                                  <div className="flex items-center justify-between border-b border-ink/5 pb-3">
                                     <span className="text-[10px] font-black uppercase text-ink">Read/Write/Speak?</span>
                                     <div className="flex gap-2">
                                        <button type="button" onClick={() => setFormData(prev => ({ ...prev, canReadWriteSpeakMarathi: 'Yes' }))} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${formData.canReadWriteSpeakMarathi === 'Yes' ? 'bg-brand text-ink' : 'bg-ink/5 text-muted'}`}>Yes</button>
                                        <button type="button" onClick={() => setFormData(prev => ({ ...prev, canReadWriteSpeakMarathi: 'No' }))} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${formData.canReadWriteSpeakMarathi === 'No' ? 'bg-red-600 text-white' : 'bg-ink/5 text-muted'}`}>No</button>
                                     </div>
                                  </div>
                                  <div className="flex gap-4">
                                     {['Read', 'Write', 'Speak'].map(s => {
                                        const key = `marathi${s}` as keyof typeof formData;
                                        const active = formData[key] === 'Yes';
                                        return (
                                          <button key={s} type="button" onClick={() => setFormData(prev => ({ ...prev, [key]: active ? 'No' : 'Yes' }))} className={`flex items-center gap-2 group`}>
                                            <div className={`w-4 h-4 rounded border-2 transition-all ${active ? 'bg-brand border-brand' : 'border-ink/10 group-hover:border-brand/50'}`} />
                                            <span className={`text-[10px] font-bold uppercase transition-colors ${active ? 'text-ink' : 'text-muted'}`}>{s}</span>
                                          </button>
                                        );
                                     })}
                                  </div>
                               </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                               <div className="space-y-2">
                                 <label className="text-xs font-black uppercase text-muted">PWD Status</label>
                                 <select name="isDisabled" value={formData.isDisabled} onChange={handleInputChange} className="w-full bg-white border-b-2 border-ink/10 py-3 text-sm font-bold outline-none focus:border-brand">
                                   <option value="No">No</option>
                                   <option value="Yes">Yes</option>
                                 </select>
                               </div>
                               <div className="space-y-2">
                                 <label className="text-xs font-black uppercase text-muted">Place</label>
                                 <input type="text" name="place" value={formData.place} onChange={handleInputChange} className="w-full bg-white border-b-2 border-ink/10 py-3 text-sm font-bold outline-none focus:border-brand" placeholder="City" />
                               </div>
                            </div>
                         </div>
                      </div>
                   </Section>

                   {/* Step 5: Finalize */}
                   <Section title="Document Uploads" icon={Upload} delay={0.5}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                         <div className="space-y-4">
                            <label className="text-xs font-black uppercase text-muted flex items-center gap-2"><Camera size={14} className="text-brand" /> Student Photo</label>
                            <div className="relative aspect-[4/5] bg-ink/5 rounded-[2rem] border-4 border-dashed border-ink/10 flex flex-col items-center justify-center p-8 transition-all hover:border-brand hover:bg-brand/5 group cursor-pointer overflow-hidden">
                               {formData.photo ? (
                                  <div className="text-center">
                                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                                       <CheckCircle2 size={40} className="text-white" />
                                    </div>
                                    <p className="text-xs font-black text-ink uppercase tracking-tight truncate max-w-[180px]">{formData.photo.name}</p>
                                    <button onClick={(e) => { e.stopPropagation(); setFormData(prev => ({ ...prev, photo: null })); }} className="text-[10px] font-black text-red-600 uppercase mt-4 hover:underline">Replace File</button>
                                  </div>
                               ) : (
                                  <>
                                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500">
                                       <Camera size={32} className="text-brand" />
                                    </div>
                                    <p className="text-xs font-black text-ink uppercase tracking-widest">Select Photo</p>
                                    <p className="text-[10px] text-muted mt-2 font-medium italic">(MAX 1MB, JPG/PNG)</p>
                                  </>
                               )}
                               <input type="file" name="photo" accept="image/*" onChange={handleInputChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                            </div>
                         </div>

                         <div className="space-y-4">
                            <label className="text-xs font-black uppercase text-muted flex items-center gap-2"><Edit3 size={14} className="text-ink" /> Signature</label>
                            <div className="relative aspect-[4/5] bg-ink/5 rounded-[2rem] border-4 border-dashed border-ink/10 flex flex-col items-center justify-center p-8 transition-all hover:border-ink hover:bg-ink/5 group cursor-pointer overflow-hidden">
                               {formData.signature ? (
                                  <div className="text-center">
                                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                                       <CheckCircle2 size={40} className="text-white" />
                                    </div>
                                    <p className="text-xs font-black text-ink uppercase tracking-tight truncate max-w-[180px]">{formData.signature.name}</p>
                                    <button onClick={(e) => { e.stopPropagation(); setFormData(prev => ({ ...prev, signature: null })); }} className="text-[10px] font-black text-red-600 uppercase mt-4 hover:underline">Replace File</button>
                                  </div>
                               ) : (
                                  <>
                                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500">
                                       <Edit3 size={32} className="text-ink" />
                                    </div>
                                    <p className="text-xs font-black text-ink uppercase tracking-widest">Select Signature</p>
                                    <p className="text-[10px] text-muted mt-2 font-medium italic">(MAX 1MB, JPG/PNG)</p>
                                  </>
                               )}
                               <input type="file" name="signature" accept="image/*" onChange={handleInputChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                            </div>
                         </div>
                      </div>
                   </Section>

                   {/* Form Footer */}
                   <div className="pt-12 pb-24 flex flex-col items-center gap-8">
                      <div className="max-w-xl text-center space-y-4">
                         <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/10 text-brand rounded-full text-[10px] font-black uppercase tracking-widest">
                            <ShieldCheck size={12} /> Secure Submission
                         </div>
                         <p className="text-xs text-muted font-medium italic leading-relaxed">
                            "By clicking confirm, I declare that all information provided is accurate and I accept the terms of BK Career Academy."
                         </p>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative px-16 py-6 bg-ink text-brand rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                      >
                         <div className="absolute inset-0 bg-brand/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                         <span className="relative z-10 flex items-center gap-4 font-display font-black uppercase tracking-[0.3em] text-sm">
                           {isSubmitting ? 'Processing...' : 'Confirm Admission'}
                           <ArrowRightIcon size={20} className="group-hover:translate-x-2 transition-transform" />
                         </span>
                      </button>
                   </div>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-2xl mx-auto py-20 text-center space-y-12"
                >
                   <div className="relative inline-block">
                      <div className="w-40 h-40 bg-brand rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                        <Star size={64} className="text-ink" fill="currentColor" />
                      </div>
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                        className="absolute inset-0 border-4 border-dashed border-brand/20 rounded-[3rem] -m-4" 
                      />
                   </div>

                   <div className="space-y-4">
                      <h2 className="text-5xl font-display font-black text-ink uppercase tracking-tighter leading-none">Admission<br/><span className="text-brand">Confirmed!</span></h2>
                      <p className="text-sm text-muted font-medium italic max-w-sm mx-auto">Welcome to the elite league of future administrators. Your journey with BK Career Academy has officially begun.</p>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <button onClick={generatePDF} className="flex items-center justify-center gap-4 bg-ink text-brand font-display font-black uppercase text-xs tracking-widest py-6 rounded-3xl hover:bg-brand hover:text-ink transition-all shadow-xl group">
                         <Download size={20} className="group-hover:translate-y-1 transition-transform" /> Print Record
                      </button>
                      <button onClick={onClose} className="bg-white text-ink font-display font-black uppercase text-xs tracking-widest py-6 rounded-3xl hover:bg-ink/5 transition-all border-2 border-ink/10 shadow-sm">
                         Back to Home
                      </button>
                   </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ArrowRightIcon({ size, className }: { size: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
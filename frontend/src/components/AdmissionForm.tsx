import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Phone, MapPin, 
  ChevronRight, ArrowLeft, CheckCircle2, 
  GraduationCap, Target, Calendar,
  Users, Info, X, Camera, Edit3, Download, Mail
} from 'lucide-react';

// --- Custom Internal Components ---

const InputField = ({ label, placeholder, name, value, onChange, icon: Icon, type = "text", ...props }: any) => {
  return (
    <div className="w-full relative">
      <label className="block font-black uppercase text-[11px] tracking-widest text-brand-dark/60 mb-2 ml-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
          <Icon size={18} strokeWidth={2} />
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-white border border-gray-200 py-3.5 pl-12 pr-6 rounded-xl font-medium text-brand-dark transition-all duration-300 outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/5"
          {...props}
        />
      </div>
    </div>
  );
};

const SelectField = ({ label, name, value, onChange, options, icon: Icon }: any) => {
  return (
    <div className="w-full relative">
      <label className="block font-black uppercase text-[11px] tracking-widest text-brand-dark/60 mb-2 ml-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
          <Icon size={18} strokeWidth={2} />
        </div>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-white border border-gray-200 py-3.5 pl-12 pr-12 rounded-xl font-medium text-brand-dark transition-all duration-300 outline-none appearance-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/5"
        >
          <option value="" disabled>{`Select ${label}`}</option>
          {options.map((opt: string) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
          <ChevronRight size={18} className="rotate-90" />
        </div>
      </div>
    </div>
  );
};

const SummaryItem = ({ label, value }: { label: string, value: string }) => (
  <div>
    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{label}</p>
    <p className="font-bold text-brand-dark uppercase tracking-tight text-sm">{value || 'N/A'}</p>
  </div>
);

const EXAM_DATA: any = {
  "MPSC": ["State Services (Rajyaseva)", "PSI/STI/ASO (Combined)", "Engineering Services", "Forest Services", "Agriculture Services", "Technical Assistant"],
  "UPSC": ["Civil Services (CSE)", "CDS (Defence)", "NDA/NA", "IES (Engineering)", "CMS (Medical)", "CAPF (Assistant Commandant)"],
  "SSC": ["CGL (Graduate Level)", "CHSL (10+2)", "MTS", "CPO (Police)", "Stenographer", "JE (Junior Engineer)"],
  "BANKING": ["IBPS PO", "IBPS Clerk", "SBI PO", "SBI Clerk", "RBI Grade B", "RRB Assistant"],
  "RAILWAY": ["NTPC", "Group D", "ALP & Technician", "JE (Railway)", "RPF Constable/SI"],
  "DEFENCE": ["Indian Army Bharti", "Indian Navy", "Indian Airforce (AFACT)", "Coastal Guard"],
  "TEACHING": ["CTET", "MAHATET", "KVS/NVS Recruitment", "SET/NET"],
  "POLICE": ["Maharashtra Police Bharti", "SRPF", "Driver Police", "Cyber Security"],
  "INSURANCE": ["LIC ADO/AAO", "GIC Assistant", "NIACL", "ESIC"],
  "MEDICAL": ["NEET (UG/PG)", "Nursing Recruitment", "Pharmacist Exam"],
  "ENGINEERING": ["GATE", "PSU Recruitments", "BARC/ISRO"],
  "LAW": ["CLAT", "Judicial Services", "Legal Officer"]
};

const FileField = ({ label, name, onChange, fileName, icon: Icon, description }: any) => {
  return (
    <div className="w-full relative">
      <label className="block font-black uppercase text-[11px] tracking-widest text-brand-dark/60 mb-2 ml-1">
        {label}
      </label>
      <div className="relative group">
        <label className="flex items-center gap-4 w-full bg-white border-2 border-dashed border-gray-200 p-4 rounded-xl cursor-pointer hover:border-brand-red transition-all group overflow-hidden">
          <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-brand-red/5 group-hover:text-brand-red transition-all">
            <Icon size={24} strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-black uppercase tracking-widest text-brand-dark group-hover:text-brand-red transition-colors">
              {fileName ? <span className="text-green-600">File Selected</span> : "Click to upload"}
            </p>
            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tight truncate max-w-[200px]">
              {fileName || description}
            </p>
          </div>
          <input
            type="file"
            name={name}
            onChange={onChange}
            className="hidden"
            accept="image/*"
          />
        </label>
      </div>
    </div>
  );
};

const InstitutionalHeader = ({ regNo }: { regNo?: string }) => (
  <div className="institutional-header p-6 pr-16 md:p-8 md:pr-20 pb-4 grid grid-cols-1 md:grid-cols-3 print:grid-cols-3 items-start gap-6 relative">
    {/* Left Branding */}
    <div className="flex flex-col items-center md:items-start print:items-start text-center md:text-left print:text-left space-y-3">
      <div>
        <h1 className="text-xl md:text-3xl font-serif font-black text-[#800000] leading-tight uppercase tracking-tight">
          <span className="text-red-600">BK</span> Educational & Welfare Society
        </h1>
        <p className="text-xs md:text-sm font-black text-brand-dark/60 uppercase tracking-[0.15em]">
          <span className="text-red-600">BK</span> Group of Education
        </p>
      </div>
      
      <div className="flex items-center gap-2 text-brand-red font-black">
        <Phone size={14} md:size={16} fill="currentColor" />
        <span className="text-sm md:text-base tracking-[0.1em]">+91 80801 95558</span>
      </div>
    </div>

    {/* Center Branding / Logo */}
    <div className="flex flex-col items-center text-center order-first md:order-none print:order-none">
      <p className="text-sm md:text-base print:text-base font-serif italic text-brand-dark/80 mb-2">
        ॥ न हि ज्ञानेन सदृशं पवित्रमिह विद्यते ॥
      </p>
      <p className="text-sm md:text-xl print:text-xl font-black text-brand-red uppercase tracking-[0.25em] mb-3">
        We Shape Careers...
      </p>
      <div className="w-20 h-20 md:w-28 md:h-28 print:w-28 print:h-28 bg-white shadow-xl rounded-2xl p-3 border border-gray-50">
        <img src="/bk.png" alt="BK Logo" className="w-full h-full object-contain" />
      </div>
    </div>

    {/* Right: Address only */}
    <div className="flex flex-col items-center md:items-end print:items-end text-center md:text-right print:text-right md:ml-auto print:ml-auto gap-3">
      <div className="max-w-[280px]">
        <p className="text-sm md:text-base leading-relaxed">
          <span className="text-brand-dark font-black uppercase tracking-tight leading-tight text-sm md:text-base">
            2nd Floor, Gajanan Plaza, Gharpure Ghat Road, Ashok Stambh, Nashik, Maharashtra
          </span>
        </p>
      </div>
    </div>
  </div>
);

// --- Main Form Component ---

export default function AdmissionForm({ onBackHome }: { onBackHome?: () => void }) {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [nextRegNo, setNextRegNo] = useState('');
  const [submittedRegNo, setSubmittedRegNo] = useState('');

  const [formData, setFormData] = useState({
    // Step 1: Personal
    schoolName: '',
    salutation: '',
    firstName: '',
    middleName: '',
    surname: '',
    dob: '',
    gender: '',
    age: '',
    phone: '',
    parentPhone: '',
    email: '',
    // Step 2: Category
    category: '',
    subCategory: '',
    targetExam: '',
    subCourse: '',
    learningMode: '',
    // Step 3: Academic
    currentClass: '',
    previousScore: '',
    boardName: '',
    passingYear: '',
    // Step 4: Final
    referredBy: '',
    declaration: false,
    photo: null as File | null,
    signature: null as File | null
  });

  React.useEffect(() => {
    fetch('/api/registration/next-form-meta')
      .then(res => res.json())
      .then(result => {
        if (result.success) setNextRegNo(result.nextRegNo);
      })
      .catch(err => console.error("Error fetching meta:", err));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      if (file.size > 1024 * 1024) {
        alert(`${name === 'photo' ? 'Photo' : 'Signature'} file size must be less than 1MB.`);
        e.target.value = '';
        return;
      }
      setFormData(prev => ({ ...prev, [name]: file }));
    }
  };

  const handleDownload = () => {
    // Save original title
    const originalTitle = document.title;
    
    // Create new title with student name and reg no
    const studentName = `${formData.firstName} ${formData.surname}`.trim() || 'Student';
    const regNo = isSuccess ? submittedRegNo : nextRegNo;
    const fileName = `Admission_Form_${studentName.replace(/\s+/g, '_')}${regNo ? `_${regNo}` : ''}`;
    
    // Set new title
    document.title = fileName;
    
    // Slight delay to ensure browser registers the title change for the save dialog
    setTimeout(() => {
      window.print();
      // Revert title after printing
      document.title = originalTitle;
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'dob') {
      const birthDate = new Date(value);
      if (!isNaN(birthDate.getTime())) {
        const today = new Date();
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          calculatedAge--;
        }
        setFormData(prev => ({ 
          ...prev, 
          dob: value, 
          age: calculatedAge >= 0 ? calculatedAge.toString() : '' 
        }));
      } else {
        setFormData(prev => ({ ...prev, dob: value }));
      }
    } else if (name === 'phone' || name === 'parentPhone') {
      const cleaned = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: cleaned }));
    } else if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.phone || formData.phone.length !== 10) return alert("Please enter a valid 10-digit phone number.");
      if (!formData.parentPhone || formData.parentPhone.length !== 10) return alert("Please enter a valid 10-digit parent's phone number.");
      if (formData.phone === formData.parentPhone) return alert("Candidate and Parent phone numbers cannot be the same.");
    }
    setStep(prev => Math.min(prev + 1, 3));
  };
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.declaration) return alert("Please accept the declaration.");
    setIsSubmitting(true);

    // Final Comprehensive Validation (Ensures fields aren't skipped via stepper)
    const requiredFields = [
      { key: 'phone', label: 'Candidate Phone (10 digits)' },
      { key: 'parentPhone', label: 'Parent Phone (10 digits)' },
      { key: 'email', label: 'Email Address' },
      { key: 'dob', label: 'Date of Birth' },
      { key: 'gender', label: 'Gender' },
      { key: 'schoolName', label: 'School/College Name' },
      { key: 'targetExam', label: 'Target Exam' },
      { key: 'subCourse', label: 'Specific Course' }
    ];

    for (const field of requiredFields) {
      if (!formData[field.key as keyof typeof formData]) {
        setIsSubmitting(false);
        return alert(`MANDATORY FIELD MISSING: Please provide your ${field.label}.`);
      }
    }

    if (formData.phone.length !== 10 || formData.parentPhone.length !== 10) {
       setIsSubmitting(false);
       return alert("VALIDATION ERROR: Phone numbers must be exactly 10 digits.");
    }
    
    try {
      const data = new FormData();
      // Append all text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'photo' && key !== 'signature') {
          data.append(key, value as string);
        }
      });

      // Append files
      if (formData.photo) data.append('photo', formData.photo);
      if (formData.signature) data.append('signature', formData.signature);
      
      // Map fields to backend expectations
      data.append('mobileSelf', formData.phone);
      data.append('mobileParents', formData.parentPhone);
      data.append('examCategory', formData.targetExam);
      
      // Filter out empty courses
      const selectedCourses = [formData.subCourse].filter(c => c);
      data.append('courses', JSON.stringify(selectedCourses));
      
      // Mandatory fields for backend middleware
      data.append('firstNameLocal', formData.firstName || 'Candidate');
      data.append('surnameLocal', formData.surname || 'Name');

      console.log("Submitting Admission Form:", Object.fromEntries(data.entries()));

      const response = await fetch('/api/registration/submit', {
        method: 'POST',
        body: data
      });

      const result = await response.json();
      console.log("Submission Result:", result);

      if (result.success) {
        // --- RAZORPAY INTEGRATION ---
        const orderRes = await fetch('/api/payment/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ admissionId: result.data.id })
        });
        const orderData = await orderRes.json();
        
        if (!orderData.success) {
          setIsSubmitting(false);
          return alert("Failed to initialize payment. Please contact support.");
        }

        const options = {
          key: orderData.key,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "BK Career Academy",
          description: "Application Fee",
          order_id: orderData.orderId,
          handler: async function (response: any) {
            try {
              const verifyRes = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  admissionId: result.data.id
                })
              });
              const verifyData = await verifyRes.json();
              
              if (verifyData.success) {
                setSubmittedRegNo(result.data.regNo);
                setIsSuccess(true);
                // Trigger auto download after a short delay
                setTimeout(() => handleDownload(), 1000);
              } else {
                alert("Payment verification failed. Your form is saved but unpaid.");
                setIsSubmitting(false);
              }
            } catch (err) {
              console.error(err);
              alert("Error verifying payment.");
              setIsSubmitting(false);
            }
          },
          prefill: {
            name: `${formData.firstName} ${formData.surname}`,
            email: formData.email,
            contact: formData.phone
          },
          theme: { color: "#800000" },
          modal: {
            ondismiss: function() {
              setIsSubmitting(false);
            }
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
          alert("Payment unsuccessful. Please try again.");
        });
        rzp.open();
        // Do not set isSubmitting(false) here, let modal.ondismiss handle it if closed
        return; 
      } else {
        const errorMsg = result.message || (result.error && result.error.join(', ')) || "Submission failed";
        alert(errorMsg);
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Submission Error:", err);
      alert("A network error occurred. Please try again.");
      setIsSubmitting(false);
    }
    // Removed the finally block so that isSubmitting remains true while Razorpay is open
  };

  if (isSuccess || isPreview) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] py-12 px-4 md:px-6 print:py-0 print:px-0 print:bg-white">
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            html, body {
              height: auto !important;
              overflow: visible !important;
              background: white !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            .print\\:hidden { display: none !important; }
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            @page {
              margin: 0;
              size: A4 portrait;
            }

            /* Scale the entire page content to fit A4 */
            body * { visibility: hidden; }
            .admission-print-root, .admission-print-root * { visibility: visible; }
            .print\\:hidden, .print\\:hidden * { display: none !important; visibility: hidden !important; }

            .admission-print-root {
              width: 100% !important;
              height: 100vh !important;
              position: absolute !important;
              top: 0 !important;
              left: 0 !important;
              background: white !important;
              padding: 10mm !important;
              box-sizing: border-box !important;
              margin: 0 !important;
              display: flex !important;
              flex-direction: column !important;
            }
          }
        `}} />
        <div className="admission-print-root max-w-4xl mx-auto print:max-w-none print:w-full">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-white print:rounded-none print:shadow-none print:border-none print:p-0 print:flex print:flex-col print:flex-grow"
          >
            {/* Header in PDF */}
            <div className="border-b-2 border-brand-red/10 relative pt-16 md:pt-10 print:pt-0">
              <InstitutionalHeader regNo={isSuccess ? submittedRegNo : nextRegNo} />
            </div>

            <div className="content-area p-6 md:p-10 print:p-2 relative print:flex print:flex-col print:flex-grow">
              <div className="status-row flex flex-col md:flex-row print:flex-row items-center md:items-start print:items-start justify-between gap-8 mb-12 print:mb-6">
                <div className="flex flex-col items-center md:items-start print:items-start text-center md:text-left print:text-left">
                  <div className="w-12 h-12 print:w-10 print:h-10 bg-green-50 rounded-full flex items-center justify-center mb-4 print:mb-2">
                    <CheckCircle2 size={24} className="text-green-500" />
                  </div>
                  <h2 className="text-sm md:text-base font-display font-black uppercase text-brand-dark mb-1 tracking-wider">
                    {isSuccess ? "Application Submitted" : "Application Preview"}
                  </h2>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    {isSuccess ? "Protocol Verification in Progress" : "Draft Record for Institutional Review"}
                  </p>
                </div>

                {/* Passport Photo - Always visible */}
                <div className="photo-box w-36 h-44 bg-gray-50 rounded-xl border-2 border-brand-red/20 overflow-hidden shadow-lg flex-shrink-0">
                  {formData.photo ? (
                    <img
                      src={URL.createObjectURL(formData.photo)}
                      alt="Candidate"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                      <span className="text-[9px] font-bold uppercase mt-2 tracking-widest text-gray-400">Passport Photo</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Data Summary Grid */}
              <div className="data-grid space-y-12 print:space-y-4 print:flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-x-16 gap-y-10 print:gap-y-4">
                  {/* Column 1: Candidate Info */}
                  <div className="data-section space-y-6 print:space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brand-dark border-b-2 border-brand-dark/10 pb-2">Candidate Information</h4>
                    <div className="space-y-5 print:space-y-3">
                      <SummaryItem label="Full Name" value={`${formData.salutation} ${formData.firstName} ${formData.middleName} ${formData.surname}`} />
                      <SummaryItem label="Date of Birth" value={`${formData.dob} (${formData.age} Years)`} />
                      <SummaryItem label="Gender" value={formData.gender} />
                      <SummaryItem label="School/College" value={formData.schoolName} />
                      <SummaryItem label="Phone" value={formData.phone} />
                      <SummaryItem label="Parent's Phone" value={formData.parentPhone} />
                      <SummaryItem label="Email" value={formData.email} />
                    </div>
                  </div>

                  {/* Column 2: Academic Selection */}
                  <div className="space-y-6 print:space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brand-dark border-b-2 border-brand-dark/10 pb-2">Academic Selection</h4>
                    <div className="space-y-5 print:space-y-3">
                      <SummaryItem label="Target Exam" value={formData.targetExam} />
                      <SummaryItem label="Specific Course" value={formData.subCourse} />
                      <SummaryItem label="Learning Mode" value={formData.learningMode} />
                      <SummaryItem label="Category" value={formData.category} />
                    </div>
                  </div>
                </div>

                <div className="declaration-box bg-gray-50 p-8 rounded-[30px] mt-12 print:mt-auto print:p-6 border border-gray-100 print:bg-white print:border-gray-200">
                  <p className="text-[10px] font-bold text-gray-500 leading-relaxed italic text-center">
                    "I hereby declare that all information provided is true to the best of my knowledge. I agree to abide by the rules and regulations of BK Career Academy."
                  </p>
                  <div className="mt-10 flex justify-between items-end border-t border-gray-100 pt-6 print:mt-6 print:pt-4">
                    <div className="flex flex-col gap-3">
                      <p className="text-[10px] font-black uppercase text-brand-dark tracking-tighter">Submission Date</p>
                      <p className="text-xs font-bold text-gray-400">{new Date().toLocaleDateString()}</p>
                      {/* Registration No Box - Bottom */}
                      {(isSuccess ? submittedRegNo : nextRegNo) && (
                        <div className="bg-brand-red/5 border-2 border-brand-red/30 px-4 py-2 rounded-xl text-center mt-2 inline-block">
                          <p className="text-[8px] font-black text-brand-red uppercase tracking-widest leading-none mb-1">Registration No</p>
                          <p className="text-lg font-black text-brand-red leading-none">{isSuccess ? submittedRegNo : nextRegNo}</p>
                        </div>
                      )}
                    </div>

                    {/* Signature Area - Bottom Right */}
                    <div className="text-right flex flex-col items-center">
                       {formData.signature && (
                         <div className="w-32 h-10 mb-1">
                           <img
                             src={URL.createObjectURL(formData.signature)}
                             alt="Signature"
                             className="w-full h-full object-contain"
                           />
                         </div>
                       )}
                       <div className="h-0.5 w-40 bg-gray-300 mb-2" />
                       <p className="text-[10px] font-black uppercase text-brand-dark tracking-widest">Candidate Signature</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="print:hidden flex flex-col md:flex-row gap-4 justify-center mt-12 pt-12 border-t border-gray-50">
                <button 
                  onClick={handleDownload}
                  className="px-10 py-4 bg-brand-red text-white rounded-xl font-black uppercase tracking-widest hover:bg-brand-dark transition-all shadow-xl flex items-center justify-center gap-3 group"
                >
                  <Download size={18} className="group-hover:-translate-y-1 transition-transform" /> Download {isPreview ? 'Draft' : 'PDF'}
                </button>
                {isPreview && (
                  <button 
                    onClick={() => setIsPreview(false)}
                    className="px-10 py-4 bg-brand-dark text-white rounded-xl font-black uppercase tracking-widest hover:bg-brand-red transition-all shadow-xl flex items-center justify-center gap-3"
                  >
                    <ArrowLeft size={18} /> Back to Edit
                  </button>
                )}
                {!isPreview && (
                  <button 
                    onClick={onBackHome}
                    className="px-10 py-4 bg-brand-dark text-white rounded-xl font-black uppercase tracking-widest hover:bg-brand-red transition-all shadow-xl flex items-center justify-center gap-3"
                  >
                    Done
                  </button>
                )}
                <button 
                  onClick={onBackHome}
                  className="px-10 py-4 bg-white border-2 border-gray-100 text-brand-dark rounded-xl font-black uppercase tracking-widest hover:border-brand-red hover:text-brand-red transition-all"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] py-8 px-4 md:px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="bg-white rounded-[40px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)] overflow-hidden relative border border-white">
          
          {/* Close Button */}
          {onBackHome && (
            <button 
              onClick={onBackHome}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-brand-red hover:text-white transition-all z-50 print:hidden shadow-sm"
            >
              <X size={20} />
            </button>
          )}

          {/* Institutional Header - Matching Screenshot */}
          <InstitutionalHeader regNo={nextRegNo} />

          {/* Double Separator Line */}
          <div className="px-8">
            <div className="h-0.5 w-full bg-brand-red/20 mb-1" />
            <div className="h-0.5 w-full bg-[#800000]" />
          </div>

          {/* Stepper Implementation */}
          <div className="px-8 py-6">
            <div className="flex justify-between items-center relative mb-8 max-w-4xl mx-auto">
              {[
                { id: 1, label: "Personal" },
                { id: 2, label: "Exam" },
                { id: 3, label: "Uploads" }
              ].map((s, idx) => (
                <div key={s.id} className="flex items-center gap-4 group cursor-pointer" onClick={() => setStep(s.id)}>
                   <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-all duration-500 ${
                        step === s.id ? 'bg-[#800000] text-white scale-110 shadow-lg shadow-brand-red/20' : 
                        step > s.id ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {step > s.id ? <CheckCircle2 size={16} /> : s.id}
                      </div>
                      <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${
                        step === s.id ? 'text-[#800000]' : 'text-gray-300 group-hover:text-gray-400'
                      }`}>
                        {s.label}
                      </span>
                   </div>
                   {idx < 2 && (
                     <div className="w-12 md:w-24 h-1 bg-gray-50 mx-4 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: step > s.id ? '100%' : '0%' }}
                          className="h-full bg-green-500 transition-all duration-500"
                        />
                     </div>
                   )}
                </div>
              ))}
            </div>

            {/* Form Fields Section */}
            <div className="min-h-[400px]">
              <form onSubmit={handleSubmit} className="space-y-8">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-1">
                           <InputField 
                            label="School/College Name" 
                            name="schoolName" 
                            value={formData.schoolName} 
                            onChange={handleInputChange} 
                            placeholder="Enter Institution Name" 
                            icon={GraduationCap} 
                          />
                        </div>
                        <div className="md:col-span-1">
                           <SelectField 
                            label="Salutation" 
                            name="salutation" 
                            value={formData.salutation} 
                            onChange={handleInputChange} 
                            options={["Mr.", "Ms.", "Mrs.", "Dr."]} 
                            icon={User} 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <InputField 
                          label="First Name" 
                          name="firstName" 
                          value={formData.firstName} 
                          onChange={handleInputChange} 
                          placeholder="John" 
                          icon={User} 
                        />
                        <InputField 
                          label="Middle Name" 
                          name="middleName" 
                          value={formData.middleName} 
                          onChange={handleInputChange} 
                          placeholder="Robert" 
                          icon={Users} 
                        />
                        <InputField 
                          label="Surname" 
                          name="surname" 
                          value={formData.surname} 
                          onChange={handleInputChange} 
                          placeholder="Doe" 
                          icon={Info} 
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <InputField 
                          label="Date of Birth" 
                          name="dob" 
                          type="date"
                          max={new Date().toISOString().split('T')[0]}
                          value={formData.dob} 
                          onChange={handleInputChange} 
                          icon={Calendar} 
                        />
                        <SelectField 
                          label="Gender" 
                          name="gender" 
                          value={formData.gender} 
                          onChange={handleInputChange} 
                          options={["Male", "Female", "Transgender", "Other"]} 
                          icon={Users} 
                        />
                        <InputField 
                          label="Age" 
                          name="age" 
                          type="number"
                          value={formData.age} 
                          onChange={handleInputChange} 
                          placeholder="Age" 
                          icon={Info} 
                          readOnly
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <InputField 
                          label="Candidate Phone" 
                          name="phone" 
                          type="tel"
                          value={formData.phone} 
                          onChange={handleInputChange} 
                          placeholder="10-digit number" 
                          icon={Phone} 
                        />
                        <InputField 
                          label="Parent's Phone" 
                          name="parentPhone" 
                          type="tel"
                          value={formData.parentPhone} 
                          onChange={handleInputChange} 
                          placeholder="Emergency contact" 
                          icon={Phone} 
                        />
                        <InputField 
                          label="Email ID" 
                          name="email" 
                          type="email"
                          value={formData.email} 
                          onChange={handleInputChange} 
                          placeholder="example@mail.com" 
                          icon={Mail} 
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <SelectField 
                          label="Caste Category" 
                          name="category" 
                          value={formData.category} 
                          onChange={handleInputChange} 
                          options={["General", "OBC", "SC", "ST", "VJNT", "EWS", "SBC"]} 
                          icon={Users} 
                        />
                        <SelectField 
                          label="Target Examination" 
                          name="targetExam" 
                          value={formData.targetExam} 
                          onChange={handleInputChange} 
                          options={Object.keys(EXAM_DATA)} 
                          icon={Target} 
                        />
                      </div>

                      {formData.targetExam && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        >
                          <SelectField 
                            label={`Specific Course (${formData.targetExam})`} 
                            name="subCourse" 
                            value={formData.subCourse} 
                            onChange={handleInputChange} 
                            options={EXAM_DATA[formData.targetExam] || []} 
                            icon={GraduationCap} 
                          />
                          <SelectField 
                            label="Learning Mode" 
                            name="learningMode" 
                            value={formData.learningMode} 
                            onChange={handleInputChange} 
                            options={["Offline (Classroom)", "Online (Live)", "Hybrid"]} 
                            icon={Info} 
                          />
                        </motion.div>
                      )}
                    </motion.div>
                  )}



                  {step === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FileField 
                          label="Passport Size Photo" 
                          name="photo" 
                          icon={Camera} 
                          fileName={formData.photo?.name}
                          description="Max 1MB (JPG/PNG)"
                          onChange={handleFileChange}
                        />
                        <FileField 
                          label="Candidate Signature" 
                          name="signature" 
                          icon={Edit3} 
                          fileName={formData.signature?.name}
                          description="Max 1MB (JPG/PNG)"
                          onChange={handleFileChange}
                        />
                      </div>
                      

                      
                      <div className="pt-8 border-t border-gray-100">
                        <label className="flex items-start gap-4 cursor-pointer group p-3 md:p-5 bg-brand-red/5 rounded-2xl border-2 border-transparent hover:border-brand-red/20 transition-all">
                          <input 
                            type="checkbox" 
                            name="declaration"
                            checked={formData.declaration}
                            onChange={handleInputChange}
                            className="mt-1 w-6 h-6 rounded border-gray-300 text-brand-red focus:ring-brand-red transition-all cursor-pointer" 
                          />
                          <div className="flex-1">
                            <p className="text-[11px] font-black uppercase tracking-widest text-brand-dark mb-1">Declaration & Acceptance</p>
                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark/50 leading-relaxed select-none group-hover:text-brand-dark transition-colors">
                              I declare that all information provided is true to the best of my knowledge. I agree to abide by the rules and regulations of BK Career Academy.
                            </span>
                          </div>
                        </label>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer Navigation */}
                <div className="flex justify-between items-center pt-12 border-t border-gray-50">
                   <button
                    type="button"
                    onClick={prevStep}
                    disabled={step === 1 || isSubmitting}
                    className={`flex items-center gap-3 font-black uppercase tracking-[0.2em] text-[10px] transition-all ${
                      step === 1 ? 'opacity-0 pointer-events-none' : 'text-brand-dark/40 hover:text-brand-red'
                    }`}
                  >
                    <ArrowLeft size={16} /> Previous
                  </button>

                  <div className="flex flex-wrap gap-4 items-center justify-end">
                    {step === 3 && (
                      <button
                        type="button"
                        onClick={() => setIsPreview(true)}
                        className="flex items-center gap-2 text-brand-dark/40 hover:text-brand-red font-black uppercase tracking-[0.2em] text-[10px] transition-all mr-4"
                      >
                        <Download size={14} /> Print Draft
                      </button>
                    )}
                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center gap-4 bg-brand-dark text-white px-6 md:px-10 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-red transition-all active:scale-95 shadow-xl shadow-brand-dark/10"
                      >
                        Next Step <ChevronRight size={16} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-4 bg-brand-dark text-white px-6 md:px-12 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-red transition-all active:scale-95 shadow-xl shadow-brand-dark/20 disabled:opacity-50"
                      >
                        {isSubmitting ? 'Finalizing...' : 'Submit Application'}
                        {!isSubmitting && <CheckCircle2 size={16} />}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Institutional Footer Signature */}
          <div className="bg-gray-50 p-6 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark/20">
              Institutional Protocol Verification Required • Official Enrollment Form v2.6.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, FileText, CreditCard, Mail, Phone, MapPin } from 'lucide-react';

interface PoliciesPageProps {
  initialTab?: 'privacy' | 'terms' | 'refund';
}

export const PoliciesPage: React.FC<PoliciesPageProps> = ({ initialTab = 'privacy' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'refund'>(initialTab);

  useEffect(() => {
    if (location.pathname.includes('privacy')) setActiveTab('privacy');
    else if (location.pathname.includes('terms')) setActiveTab('terms');
    else if (location.pathname.includes('refund')) setActiveTab('refund');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const tabs = [
    { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
    { id: 'terms', label: 'Terms of Use', icon: FileText },
    { id: 'refund', label: 'Refund Policy', icon: CreditCard },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-bg min-h-screen relative pt-20 md:pt-24 pb-16"
    >
      {/* Premium Header */}
      <header className="bg-white border-b border-gray-100 py-12 relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-[-20deg] origin-top translate-x-20 pointer-events-none" />
        
        <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="max-w-4xl">
            <button 
              onClick={() => navigate('/')}
              className="group flex items-center gap-2 text-muted mb-6 hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">Back to Home</span>
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-4">
              <ShieldCheck size={12} className="text-primary" />
              <span className="text-[9px] font-black uppercase tracking-widest text-primary">Official Governance</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-black text-dark leading-none tracking-tight mb-4 uppercase">
              Institutional <span className="text-primary">Policies</span>
            </h1>

            <p className="text-base text-body font-body max-w-2xl leading-relaxed">
              Transparent governance, data privacy guidelines, and operational terms for BK Career Academy students and portal visitors.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1 bg-white rounded-3xl p-4 border border-gray-100 shadow-sm sticky top-28 space-y-2">
            <h3 className="text-[10px] font-black text-muted uppercase tracking-[0.3em] px-4 pt-2 pb-2">Policy Navigation</h3>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    navigate(`/${tab.id}`);
                  }}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-display font-bold text-xs uppercase tracking-widest transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-primary text-dark shadow-lg shadow-primary/10 translate-x-1'
                      : 'text-body hover:bg-gray-50 hover:text-dark'
                  }`}
                >
                  <Icon size={18} className={activeTab === tab.id ? 'text-dark' : 'text-primary'} />
                  {tab.label}
                </button>
              );
            })}

            <div className="pt-6 mt-6 border-t border-gray-100 px-4 space-y-4">
              <h4 className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Corporate Contact</h4>
              <div className="flex items-start gap-3 text-xs text-body">
                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                <span>2nd Floor, Gajanan Plaza, Gharpura Ghat Rd, Nashik, Maharashtra 422002</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-body">
                <Phone size={16} className="text-primary shrink-0" />
                <span>0253-2313962 / 9890633962</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-body break-all">
                <Mail size={16} className="text-primary shrink-0" />
                <span>bkgroupofeducation@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Policy Text Container */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-6 md:p-12 border border-gray-100 shadow-sm min-h-[600px]">
            <AnimatePresence mode="wait">
              {activeTab === 'privacy' && (
                <motion.div
                  key="privacy"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="border-b border-gray-100 pb-6">
                    <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight mb-2">Privacy Policy</h2>
                    <p className="text-xs text-muted font-bold tracking-widest uppercase">Last Updated: May 16, 2026 | BK Career Academy</p>
                  </div>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-black text-dark uppercase tracking-tight">1. Introduction</h3>
                    <p className="text-body leading-relaxed font-body text-sm md:text-base">
                      Welcome to BK Career Academy ("we," "our," or "us"), a premier coaching institute operating in Nashik since 2009. We are deeply committed to protecting the privacy and personal information of our students, aspirants, and portal visitors. This Privacy Policy governs the collection, usage, maintenance, and protection of data collected through our website (bkeducation.in), student registration portals, admission forms, and counseling applications.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-black text-dark uppercase tracking-tight">2. Information We Collect</h3>
                    <p className="text-body leading-relaxed font-body text-sm md:text-base">
                      To deliver high-quality mentorship and streamline our enrollment workflows, we collect the following categories of information:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-body font-body text-sm md:text-base">
                      <li><strong className="text-dark">Personal Identification Data:</strong> Full Name, Date of Birth, Gender, Residential Address, Email Address, and Mobile Phone Numbers submitted during online admission or free demo bookings.</li>
                      <li><strong className="text-dark">Academic & Examination Details:</strong> Educational qualifications, target competitive exams (UPSC, MPSC Rajyaseva, Police Bharti, Banking, SSC CGL), past attempt history, and optional subjects.</li>
                      <li><strong className="text-dark">Transaction & Billing Data:</strong> Payment confirmation receipts, fee installment logs, and transaction IDs generated during online course registration (processed securely via authorized bank payment gateways).</li>
                      <li><strong className="text-dark">System & Usage Metrics:</strong> IP addresses, browser types, device identifiers, and portal navigation patterns collected anonymously to optimize our high-density UI/UX performance.</li>
                    </ul>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-black text-dark uppercase tracking-tight">3. How We Use Your Data</h3>
                    <p className="text-body leading-relaxed font-body text-sm md:text-base">
                      The information collected is strictly utilized for core academic and institutional administration purposes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-body font-body text-sm md:text-base">
                      <li>Processing online admission applications and allocating classroom/online batch seats.</li>
                      <li>Scheduling personalized academic counseling sessions, expert demo lectures, and interview guidance panels.</li>
                      <li>Disseminating crucial examination notifications, official government resource updates, mock test schedules, and hall tickets.</li>
                      <li>Maintaining permanent institutional records for student attendance, test series performance evaluations, and success story archives.</li>
                      <li>Improving portal infrastructure and providing prompt student technical support.</li>
                    </ul>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-black text-dark uppercase tracking-tight">4. Data Protection & Sharing</h3>
                    <p className="text-body leading-relaxed font-body text-sm md:text-base">
                      We adopt robust data collection, storage, and processing practices paired with advanced security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our portal.
                    </p>
                    <p className="text-body leading-relaxed font-body text-sm md:text-base">
                      <strong className="text-dark">No Third-Party Marketing:</strong> BK Career Academy strictly does not sell, trade, or rent student personal identification information to any external commercial marketing agencies, third-party coaching institutes, or data brokers.
                    </p>
                    <p className="text-body leading-relaxed font-body text-sm md:text-base">
                      We may share generic aggregated demographic information not linked to any personal identification information with our official academic partners and trusted service providers solely for operating the platform (e.g., automated SMS/Email gateway providers for class notifications).
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-black text-dark uppercase tracking-tight">5. Your Rights & Consent</h3>
                    <p className="text-body leading-relaxed font-body text-sm md:text-base">
                      By submitting your details via our portal forms (such as the Admission Form, Counseling Modal, or Lead Login), you expressly consent to being contacted by BK Career Academy academic counselors via Phone, SMS, WhatsApp, or Email regarding course details and exam guidance.
                    </p>
                    <p className="text-body leading-relaxed font-body text-sm md:text-base">
                      Students maintain the right to review, update, or request the removal of their personal profile data by submitting a formal written request to our Corporate Office at Nashik or via email to <code className="text-primary font-bold">bkgroupofeducation@gmail.com</code>.
                    </p>
                  </section>
                </motion.div>
              )}

              {activeTab === 'terms' && (
                <motion.div
                  key="terms"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="border-b border-gray-100 pb-6">
                    <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight mb-2">Terms of Use</h2>
                    <p className="text-xs text-muted font-bold tracking-widest uppercase">Last Updated: May 16, 2026 | BK Career Academy</p>
                  </div>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-black text-dark uppercase tracking-tight">1. Acceptance of Terms</h3>
                    <p className="text-body leading-relaxed font-body text-sm md:text-base">
                      By accessing, browsing, or utilizing the BK Career Academy web portal (bkeducation.in), registering for counseling, booking free demo lectures, or enrolling in our flagship competitive examination courses (UPSC, MPSC, Banking, SSC, Police Bharti, etc.), you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Use. If you do not agree with any clause stated herein, please refrain from using our platform.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-black text-dark uppercase tracking-tight">2. Intellectual Property Rights</h3>
                    <p className="text-body leading-relaxed font-body text-sm md:text-base">
                      All proprietary academic content, curriculum designs, printed study materials, online mock test series, video lectures, student success shorts, graphics, logos, and software infrastructure featured on this portal are the sole intellectual property of BK Career Academy and are protected by Indian copyright and trademark laws.
                    </p>
                    <p className="text-body leading-relaxed font-body text-sm md:text-base">
                      <strong className="text-dark">Prohibited Actions:</strong> Students and portal visitors are strictly prohibited from modifying, copying, distributing, transmitting, displaying, publishing, selling, licensing, or creating derivative works from any institutional material for commercial or public purposes without prior written authorization from the Director of BK Career Academy.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-black text-dark uppercase tracking-tight">3. Student Code of Conduct</h3>
                    <p className="text-body leading-relaxed font-body text-sm md:text-base">
                      To ensure an elite, disciplined, and productive learning environment, all enrolled candidates are mandated to adhere to the Institutional Code of Conduct:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-body font-body text-sm md:text-base">
                      <li>Maintaining punctuality, academic integrity, and respectful behavior toward faculty mentors and fellow aspirants during offline classroom sessions in Nashik and online virtual classes.</li>
                      <li>Protecting the confidentiality of personal portal login credentials. Sharing student account access with external non-enrolled individuals will result in immediate account suspension without refund.</li>
                      <li>Refraining from any disruptive, defamatory, or unlawful conduct that brings disrepute to the academy.</li>
                    </ul>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-black text-dark uppercase tracking-tight">4. Limitation of Liability & Disclaimers</h3>
                    <p className="text-body leading-relaxed font-body text-sm md:text-base">
                      <strong className="text-dark">Academic Effort & Selection Disclaimer:</strong> While BK Career Academy provides state-of-the-art coaching, expert faculty from Delhi and Pune, comprehensive study notes, and rigorous test series, cracking competitive government examinations (UPSC, MPSC, Banking, SSC) is fundamentally dependent on the individual candidate's dedication, merit, and self-study efforts.
                    </p>
                    <p className="text-body leading-relaxed font-body text-sm md:text-base">
                      BK Career Academy explicitly disclaims any absolute guarantee of specific ranking, preliminary/mains qualification, or final job selection in any public sector recruitment examination. We shall not be held liable for any direct, indirect, incidental, or consequential damages arising from examination outcomes.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-black text-dark uppercase tracking-tight">5. Modifications to Portal & Terms</h3>
                    <p className="text-body leading-relaxed font-body text-sm md:text-base">
                      We reserve the right to modify, suspend, or discontinue any academic program, portal feature, fee structure, or examination module at any time without prior notice. BK Career Academy also reserves the right to update these Terms of Use periodically. Continued usage of the portal following any changes signifies your acceptance of the revised terms.
                    </p>
                  </section>
                </motion.div>
              )}

              {activeTab === 'refund' && (
                <motion.div
                  key="refund"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="border-b border-gray-100 pb-6">
                    <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight mb-2">Refund & Fee Policy</h2>
                    <p className="text-xs text-muted font-bold tracking-widest uppercase">Last Updated: May 16, 2026 | BK Career Academy</p>
                  </div>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-black text-dark uppercase tracking-tight">1. Policy Overview</h3>
                    <p className="text-body leading-relaxed font-body text-sm md:text-base">
                      At BK Career Academy, our primary goal is student satisfaction, academic excellence, and transparent financial governance. This Refund Policy establishes clear, equitable guidelines regarding tuition fees, admission bookings, and study material charges for our specialized offline and online batches.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-black text-dark uppercase tracking-tight">2. Non-Refundable Registration Charges</h3>
                    <p className="text-body leading-relaxed font-body text-sm md:text-base">
                      <strong className="text-dark">Seat Booking & Counseling Fees:</strong> Any initial registration fees, seat booking charges, or nominal payments made to secure admission for Free Demos, Workshops, or upcoming flagship batches are <strong className="text-red-600">strictly non-refundable</strong>. These charges cover immediate administrative setup, portal onboarding, and classroom infrastructure reservation.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-black text-dark uppercase tracking-tight">3. Tuition Fee Refund Guidelines</h3>
                    <p className="text-body leading-relaxed font-body text-sm md:text-base">
                      For candidates enrolled in comprehensive full-year classroom or online coaching programs (such as UPSC Civil Services, MPSC Rajyaseva 1-Year Foundation, or Combined SSC/Banking batches), refund requests are governed by the following conditional timeline:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-body font-body text-sm md:text-base">
                      <li><strong className="text-dark">Within 7 Calendar Days:</strong> A candidate may apply for a partial tuition fee refund within 7 calendar days from the official date of batch commencement. The refund will be processed subject to a mandatory pro-rata deduction for classes already conducted, administrative overheads, and the full market cost of any physical study bags, books, or notes already issued to the student.</li>
                      <li><strong className="text-dark">After 7 Calendar Days:</strong> <strong className="text-red-600">No refund applications will be accepted or entertained under any circumstances</strong> once 7 calendar days have elapsed from the scheduled batch start date.</li>
                    </ul>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-black text-dark uppercase tracking-tight">4. Excluded & Non-Refundable Programs</h3>
                    <p className="text-body leading-relaxed font-body text-sm md:text-base">
                      Please note that fees paid for the following specialized academic modules are 100% non-refundable from the moment of payment:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-body font-body text-sm md:text-base">
                      <li>Short-term Crash Courses & Fast-Track Revision Batches.</li>
                      <li>Online Mock Test Series, Daily Practice Portals, and Test Evaluation packages.</li>
                      <li>Specialized Interview Guidance Panels & Mock Interview Sessions.</li>
                      <li>Printed Book Bundles and Postal Study Material packages once dispatched.</li>
                    </ul>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-black text-dark uppercase tracking-tight">5. Refund Application Process</h3>
                    <p className="text-body leading-relaxed font-body text-sm md:text-base">
                      All eligible refund requests must be submitted in writing by the student or parent/guardian at our Corporate Office in Nashik, accompanied by the original fee receipt and institutional ID card. Alternatively, a formal request can be emailed to <code className="text-primary font-bold">bkgroupofeducation@gmail.com</code>.
                    </p>
                    <p className="text-body leading-relaxed font-body text-sm md:text-base">
                      Upon official approval by the management account department, eligible refund amounts will be credited back to the original bank account or payment method within <strong className="text-dark">14 to 21 working days</strong>.
                    </p>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </main>
    </motion.div>
  );
};

export default PoliciesPage;

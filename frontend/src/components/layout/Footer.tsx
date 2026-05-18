import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Users, Phone, Mail, MapPin } from 'lucide-react';
import { SocialIcon } from '../common/SocialIcon';

interface FooterProps {
  setView: (view: any) => void;
  setSelectedCategory: (id: number | null) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
  setSelectedExamName?: (name: string) => void;
}

const VisitorCounter = () => {
  const [count, setCount] = React.useState(125432);
  
  React.useEffect(() => {
    fetch('/api/visitor-count')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCount(data.count);
        }
      })
      .catch(() => {});

    const timer = setInterval(() => {
      setCount(prev => prev + 1);
    }, Math.random() * 15000 + 8000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-8 pt-8 border-t border-gray-100">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <Users size={18} />
        </div>
        <div>
          <p className="text-xl font-display font-bold text-dark leading-none">
            {count.toLocaleString()}
          </p>
          <p className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">
            Students Mentored
          </p>
        </div>
      </div>
    </div>
  );
};

const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M4 4l11.733 16h4.267l-11.733-16z" />
    <path d="M4 20l6.768-6.768m2.46-2.46L20 4" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ setView, setSelectedCategory, setIsRegistrationModalOpen, setSelectedExamName }) => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-0 pb-12">
      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-16 pt-6 pb-12 md:pt-8 md:pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 lg:gap-y-12 mb-10 items-start">
          
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-1 order-1">
            <Link to="/" className="flex items-center gap-3 mb-8" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="font-display font-black text-xl text-red-600">BK</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-display font-black uppercase leading-none text-dark">Career Academy</span>
              </div>
            </Link>
            <p className="body-text text-sm mb-8">
              Empowering students since 2009 with elite coaching for UPSC, MPSC, and other competitive exams. Your success is our primary goal.
            </p>
            <div className="flex gap-4">
              <SocialIcon Icon={Facebook} href="https://www.facebook.com/profile.php?id=61581568062602" />
              <SocialIcon Icon={Instagram} href="https://www.instagram.com/bk_groupofeducation/" />
              <SocialIcon Icon={XIcon} href="https://x.com/BKTimesNews" />
              <SocialIcon Icon={Youtube} href="https://www.youtube.com/@bkcareeracademy2025" />
            </div>
          </div>

          {/* Programs */}
          <div className="col-span-1 order-2">
            <h4 className="sub-heading text-sm mb-8 uppercase tracking-widest text-muted">Exams We Cover</h4>
            <ul className="space-y-4 text-sm font-medium text-body">
              <li><Link to="/exam/UPSC" className="hover:text-primary transition-colors block py-0.5">UPSC Civil Services</Link></li>
              <li><Link to="/mpsc" className="hover:text-primary transition-colors block py-0.5">MPSC State Services</Link></li>
              <li><Link to="/exam/SSC" className="hover:text-primary transition-colors block py-0.5">SSC & Banking</Link></li>
              <li><Link to="/police" className="hover:text-primary transition-colors block py-0.5">Police Bharti</Link></li>
              <li><Link to="/exam/TET" className="hover:text-primary transition-colors block py-0.5">Teaching Exams</Link></li>
            </ul>
          </div>

          {/* Quick Links (Support) */}
          <div className="col-span-2 lg:col-span-1 order-4 lg:order-3 pt-4 lg:pt-0 border-t border-gray-100 lg:border-t-0">
            <h4 className="sub-heading text-sm mb-8 uppercase tracking-widest text-muted">Support</h4>
            <ul className="space-y-4 text-sm font-medium text-body">
              <li><a href="https://wa.me/918080195558" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors block py-0.5">Contact Support</a></li>
              <li><button onClick={() => setIsRegistrationModalOpen(true)} className="hover:text-primary transition-colors block py-0.5 text-left">Book a Demo</button></li>
              <li><Link to="/#success-stories" onClick={() => { if(window.location.pathname === '/') document.getElementById('success-stories')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-primary transition-colors block py-0.5">Our Success Stories</Link></li>
            </ul>
          </div>

          {/* Office */}
          <div className="col-span-1 order-3 lg:order-4">
            <h4 className="sub-heading text-sm mb-8 uppercase tracking-widest text-muted">Corporate Office</h4>
            <div className="space-y-6">
              <div className="flex gap-3 items-start">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-body leading-relaxed">
                  2nd Floor, Gajanan Plaza,<br />
                  Gharpura Ghat Rd, Nashik,<br />
                  Maharashtra 422002
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a href="tel:9890633962" className="flex items-center gap-3 text-dark font-bold hover:text-primary transition-colors py-0.5">
                  <Phone size={18} className="text-primary shrink-0" />
                  <span>9890633962</span>
                </a>
                <a href="tel:02532313962" className="flex items-center gap-3 text-dark font-bold hover:text-primary transition-colors py-0.5">
                  <Phone size={18} className="text-primary shrink-0" />
                  <span>0253-2313962</span>
                </a>
                <a href="mailto:bkgroupofeducation@gmail.com" className="flex items-center gap-3 text-sm text-body hover:text-primary transition-colors py-0.5 break-all">
                  <Mail size={18} className="text-primary shrink-0" />
                  <span>bkgroupofeducation@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-muted font-bold uppercase tracking-widest">
            © 2026 BK Career Academy. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-bold text-muted uppercase tracking-widest">
            <Link to="/privacy" className="hover:text-primary transition-colors py-0.5 block">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors py-0.5 block">Terms of Use</Link>
            <Link to="/refund" className="hover:text-primary transition-colors py-0.5 block">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

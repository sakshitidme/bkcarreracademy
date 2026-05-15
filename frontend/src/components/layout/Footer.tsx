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
    <footer className="bg-white border-t border-gray-100 pt-12 pb-12">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-1">
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
          <div>
            <h4 className="sub-heading text-sm mb-8 uppercase tracking-widest text-muted">Exams We Cover</h4>
            <ul className="space-y-4 text-sm font-medium text-body">
              <li><Link to="/exam/UPSC" className="hover:text-primary transition-colors">UPSC Civil Services</Link></li>
              <li><Link to="/mpsc" className="hover:text-primary transition-colors">MPSC State Services</Link></li>
              <li><Link to="/exam/SSC" className="hover:text-primary transition-colors">SSC & Banking</Link></li>
              <li><Link to="/police" className="hover:text-primary transition-colors">Police Bharti</Link></li>
              <li><Link to="/exam/TET" className="hover:text-primary transition-colors">Teaching Exams</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="sub-heading text-sm mb-8 uppercase tracking-widest text-muted">Support</h4>
            <ul className="space-y-4 text-sm font-medium text-body">
              <li><a href="https://wa.me/918080195558" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Contact Support</a></li>
              <li><button onClick={() => setIsRegistrationModalOpen(true)} className="hover:text-primary transition-colors">Book a Demo</button></li>
              <li><Link to="/#success-stories" onClick={() => { if(window.location.pathname === '/') document.getElementById('success-stories')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-primary transition-colors">Our Success Stories</Link></li>
            </ul>
          </div>

          {/* Office */}
          <div>
            <h4 className="sub-heading text-sm mb-8 uppercase tracking-widest text-muted">Corporate Office</h4>
            <div className="space-y-6">
              <div className="flex gap-3">
                <MapPin size={18} className="text-primary shrink-0" />
                <p className="text-sm text-body leading-relaxed">
                  2nd Floor, Gajanan Plaza,<br />
                  Gharpura Ghat Rd, Nashik,<br />
                  Maharashtra 422002
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a href="tel:9890633962" className="flex items-center gap-3 text-dark font-bold hover:text-primary transition-colors">
                  <Phone size={18} className="text-primary" />
                  9890633962
                </a>
                <a href="tel:02532313962" className="flex items-center gap-3 text-dark font-bold hover:text-primary transition-colors">
                  <Phone size={18} className="text-primary" />
                  0253-2313962
                </a>
                <a href="mailto:bkgroupofeducation@gmail.com" className="flex items-center gap-3 text-sm text-body hover:text-primary transition-colors">
                  <Mail size={18} className="text-primary" />
                  bkgroupofeducation@gmail.com
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
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-primary transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { motion } from 'motion/react';
import { Info, Shield, Globe, Award, Target, Users, BookOpen, Quote, CheckCircle2, ArrowRight } from 'lucide-react';

const OrganizationCard = ({ name, url, logo }: { name: string; url: string; logo?: string }) => {
  const fullUrl = url.startsWith('http') ? url : `https://${url}`;
  const isAvailable = url !== "Coming Soon";

  return (
    <a 
      href={isAvailable ? fullUrl : '#'} 
      target={isAvailable ? "_blank" : undefined}
      rel={isAvailable ? "noopener noreferrer" : undefined}
      className={`group bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 border border-gray-100 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col justify-between h-full ${!isAvailable ? 'cursor-default' : 'cursor-pointer'}`}
    >
      <div>
        <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-50 rounded-xl md:rounded-2xl mb-4 md:mb-6 flex items-center justify-center group-hover:bg-primary/10 transition-colors overflow-hidden border border-gray-100">
          {typeof logo === 'string' ? (
            <img src={logo} alt={`${name} Logo`} className="w-full h-full object-contain p-1" />
          ) : (
            <Shield size={40} className="text-primary" />
          )}
        </div>
        <h3 className="text-base md:text-xl font-display font-black text-dark uppercase tracking-tight leading-tight mb-1 md:mb-2 group-hover:text-primary transition-colors line-clamp-2">{name}</h3>
        <p className="text-[9px] md:text-[10px] font-bold text-muted uppercase tracking-widest truncate">{url.replace('https://', '').replace('www.', '')}</p>
      </div>
      {isAvailable && (
        <div className="mt-4 md:mt-8 flex items-center gap-1.5 md:gap-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-primary group-hover:gap-2 md:group-hover:gap-3 transition-all whitespace-nowrap">
          Explore Academy <ArrowRight size={14} className="shrink-0" />
        </div>
      )}
    </a>
  );
};

export const AboutUs = () => {
  const networks = [
    { name: "Dr. Adv. Er. Bhagwan Elmame", url: "https://drbhagwan.in/", logo: "/boss.jpeg" },
    { name: "BK Science Academy", url: "https://bkscience.in", logo: "/images/about_logos/bk.png" },
    { name: "BK Sports Academy", url: "https://www.bksports.in/", logo: "/images/about_logos/bksports.png" },
    { name: "BK Times", url: "https://www.bktimes.co.in/", logo: "/images/about_logos/bktimes.png" },
    { name: "Gurukul Vidya Niketan", url: "https://bkgurukul.in/testimonials", logo: "/images/about_logos/GurukulLogo.jpg" },
    { name: "Sanskar English Medium School", url: "https://www.bksanskar.in/", logo: "/SanskarLogopage-BuCH7rsc.jpg" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-bg"
    >
      {/* Founder Section */}
      <section className="pt-20 pb-1">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="relative z-10 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl shadow-dark/20">
                <img 
                  src="/boss.jpeg" 
                  alt="Dr. Adv. Er. Bhagwan Elmame" 
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl border border-gray-100 shadow-xl max-w-[320px] z-20">
                <h3 className="text-xl font-display font-black text-dark uppercase tracking-tight leading-tight">
                  Dr. Adv. Er. <br />Bhagwan Elmame
                </h3>
                <p className="text-primary font-bold uppercase tracking-widest text-[10px] mt-2">Secretary & Founder</p>
              </div>
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
            </div>

            <div className="space-y-1">
              <div>
                <h2 className="section-heading text-left">
                  A Message from <span className="text-primary">Our Visionary</span>
                </h2>
                <div className="w-20 h-1.5 bg-primary mt-6 rounded-full" />
              </div>
              
              <div className="space-y-6 text-lg text-body leading-relaxed italic">
                <Quote className="text-primary opacity-20 mb-4" size={48} />
                <p>
                  "True education is not just about passing exams; it's about building character, confidence, and a sense of responsibility towards society."
                </p>
                <p className="not-italic text-muted text-base">
                  Over the last 15 years, we have evolved into a thriving ecosystem of excellence. Our journey started with a simple dream of making quality education accessible to everyone in Nashik and beyond.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-100">
                {[
                  { val: '15+', label: 'Years of Legacy' },
                  { val: '10K+', label: 'Students Guided' },
                  { val: '2000+', label: 'Selections' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-display font-black text-dark">{stat.val}</div>
                    <div className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network Section */}
      <section className="py-1 bg-white">
        <div className="section-container">
          <header className="mb-1 text-center max-w-3xl mx-auto">
            <p className="label-text mb-4">Our Ecosystem</p>
            <h2 className="section-heading">
              Our Educational <span className="text-primary">Network</span>
            </h2>
            <p className="body-text mt-4">
              Providing holistic development across various disciplines, from traditional schooling to professional coaching and sports.
            </p>
          </header>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {networks.map((org, i) => (
              <OrganizationCard key={i} {...org} />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutUs;

import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";

// Components
import RegistrationModal from './components/RegistrationModal';
import AddStoryModal from './components/AddStoryModal';
import ChatWidget from './components/ChatWidget';
import ImagePopupModal from './components/ImagePopupModal';
import CounselingModal from './components/CounselingModal';
import ScrollToTop from './components/ScrollToTop';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import SEO from './components/common/SEO';
import AdmissionForm from './components/AdmissionForm';

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const Courses = lazy(() => import('./pages/Courses'));
const SyllabusPortal = lazy(() => import('./pages/SyllabusPortal'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const SuccessStoriesPage = lazy(() => import('./pages/SuccessStoriesPage'));
const MPSCDetailsPage = lazy(() => import('./pages/MPSCDetailsPage'));
const PoliceDetailsPage = lazy(() => import('./pages/PoliceDetailsPage'));
const MAHATETDetailsPage = lazy(() => import('./pages/MAHATETDetailsPage'));
const DynamicExamDetailsPage = lazy(() => import('./pages/DynamicExamDetailsPage'));
const SSCDetailsPage = lazy(() => import('./pages/SSCDetailsPage'));
const UPSCDetailsPage = lazy(() => import('./pages/UPSCDetailsPage'));
const GeneralExamDetailsPage = lazy(() => import('./pages/GeneralExamDetailsPage'));
const AdminPortal = lazy(() => import('./components/AdminPortal'));
const LeadLogin = lazy(() => import('./components/LeadLogin'));
const PoliciesPage = lazy(() => import('./pages/PoliciesPage'));

// Data
import { INITIAL_STORIES, Story } from './data/stories';
import { EXAM_CATEGORIES } from './data/constants';
import { GOVT_RESOURCES, ExamResource } from './data/govtResources';
import { ResourceDrawer } from './components/features/ResourceDrawer';

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-12 h-12 border-4 border-ink border-t-brand animate-spin rounded-full"></div>
  </div>
);

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Map current location to a view string for legacy components if needed
  const getViewFromPath = (path: string) => {
    if (path === '/') return 'home';
    if (path.startsWith('/courses')) return 'courses';
    if (path === '/syllabus') return 'syllabus';
    if (path === '/about') return 'about';
    if (path === '/success-stories') return 'successStories';
    if (path === '/mpsc') return 'courseDetailMPSC';
    if (path === '/police') return 'courseDetailPolice';
    if (path === '/mahatet') return 'courseDetailMAHATET';
    if (path === '/ssc') return 'courseDetailSSC';
    if (path === '/upsc') return 'courseDetailUPSC';
    if (['/banking', '/railway', '/defence', '/teaching', '/insurance', '/engineering'].includes(path)) return `courseDetail${path.slice(1).toUpperCase()}`;
    if (path.startsWith('/exam/')) return 'dynamicExamDetail';
    if (path === '/admin-portal') return 'adminLogin';
    return 'home';
  };

  const view = getViewFromPath(location.pathname);
  const setView = (v: string) => {
    const paths: Record<string, string> = {
      home: '/',
      courses: '/courses',
      syllabus: '/syllabus',
      about: '/about',
      successStories: '/success-stories',
      courseDetailMPSC: '/mpsc',
      courseDetailPolice: '/police',
      courseDetailMAHATET: '/mahatet',
      courseDetailSSC: '/ssc',
      courseDetailUPSC: '/upsc',
      courseDetailBANKING: '/banking',
      courseDetailRAILWAY: '/railway',
      courseDetailDEFENCE: '/defence',
      courseDetailTEACHING: '/teaching',
      courseDetailINSURANCE: '/insurance',
      courseDetailENGINEERING: '/engineering',
      courseDetailMBACET: '/mbacet',
      adminLogin: '/admin-portal'
    };
    if (paths[v]) navigate(paths[v]);
  };

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSyllabusId, setSelectedSyllabusId] = useState<number | null>(null);
  const [selectedExamName, setSelectedExamName] = useState<string>('');
  const [selectedResource, setSelectedResource] = useState<ExamResource | null>(null);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isAddStoryModalOpen, setIsAddStoryModalOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isCounselingModalOpen, setIsCounselingModalOpen] = useState(false);

  const [stories, setStories] = useState<Story[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bk_success_stories");
      return saved ? JSON.parse(saved) : INITIAL_STORIES;
    }
    return INITIAL_STORIES;
  });

  useEffect(() => {
    localStorage.setItem("bk_success_stories", JSON.stringify(stories));
  }, [stories]);

  const handleAddStory = (newStory: Omit<Story, 'id' | 'initials'>) => {
    const story: Story = {
      ...newStory,
      id: Date.now(),
      initials: newStory.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    };
    setStories(prev => [story, ...prev]);
  };
  
  const [isAuthorized, setIsAuthorized] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("bk_authorized_user") ? true : false;
    }
    return false;
  });

  const [isGuest, setIsGuest] = useState(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("bk_authorized_user") || "{}");
      return user.isGuest === true;
    }
    return false;
  });

  const [showMandatoryLogin, setShowMandatoryLogin] = useState(false);
  const [dynamicCourses, setDynamicCourses] = useState<any[]>([]);
  const [dynamicExams, setDynamicExams] = useState<any[]>([]);
  const [quickAccessList, setQuickAccessList] = useState<any[]>([]);

  const fetchAllContent = async () => {
    try {
      const endpoints = [
        '/api/content/courses',
        '/api/content/upsc_hub',
        '/api/content/quick_exam_access',
        '/api/content/exams'
      ];
      
      const responses = await Promise.all(endpoints.map(url => fetch(url)));
      const dataResults = await Promise.all(responses.map(async (res, idx) => {
        if (!res.ok) return { items: [] };
        try { return await res.json(); } catch (e) { return { items: [] }; }
      }));

      const [coursesData, upscData, quickData, examsData] = dataResults;
      
      const courses = [
        ...(coursesData.items || []), 
        ...(upscData.items || [])
      ].filter(item => item.section !== 'exams')
      .map(item => ({
        ...item,
        id: item._id, 
        image: item.image || '/home/card1.png',
        isRecent: true
      }));

      const exams = (examsData.items || [])
        .filter(item => item.section === 'exams')
        .map(item => ({
        ...item,
        id: item._id,
        image: item.image || '/home/card1.png',
        isRecent: true
      }));
      
      setDynamicCourses(courses);
      setDynamicExams(exams);
      setQuickAccessList(quickData.items || []);
    } catch (err) {
      console.error("Failed to fetch dynamic content:", err);
    }
  };

  useEffect(() => {
    fetchAllContent();
    
    // Trigger Image Popup after refresh/load
    const timer = setTimeout(() => {
      setIsImagePopupOpen(true);
    }, 3500); // 3.5 second delay (between 3 to 4 seconds)
    
    return () => clearTimeout(timer);
  }, []);

  // Handle Hash Scrolling (e.g., for Success Stories anchor)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Small delay to ensure page content is rendered
    }
  }, [location]);

  // Scroll to absolute top on route/pathname change
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const handleLeadLogin = (data: any, skip: boolean = false) => {
    localStorage.setItem("bk_authorized_user", JSON.stringify({ ...data, isGuest: skip, ts: new Date().toISOString() }));
    setIsAuthorized(true);
    setIsGuest(skip);
    setShowMandatoryLogin(false);
  };

  return (
    <ErrorBoundary fallback="A critical error occurred. Please refresh the page.">
      <div className="relative min-h-screen bg-background text-ink font-body selection:bg-brand selection:text-ink overflow-x-hidden">
        <AnimatePresence>
          {!isAuthorized && <LeadLogin onLogin={handleLeadLogin} />}
          {showMandatoryLogin && <LeadLogin onLogin={handleLeadLogin} showSkip={false} onCancel={() => setShowMandatoryLogin(false)} />}
        </AnimatePresence>

        <Routes>
          <Route path="/admin-portal" element={<AdminPortal onBack={() => navigate('/')} onUpdate={fetchAllContent} />} />
          <Route path="/admission" element={<AdmissionForm onBackHome={() => navigate('/')} />} />
          
          <Route path="*" element={
            <>
              <Navbar 
                setView={setView} 
                setSelectedCategory={setSelectedCategory} 
                setSelectedSyllabusId={setSelectedSyllabusId}
                setIsRegistrationModalOpen={setIsRegistrationModalOpen}
                setIsCounselingModalOpen={setIsCounselingModalOpen}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />

              <main className="pl-0 md:pl-64 relative min-h-screen pt-0">
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]" 
                  style={{
                    backgroundImage: `linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }}
                />
                <div className="relative z-10 overflow-x-hidden">
                  <Suspense fallback={<PageLoader />}>
                    <AnimatePresence mode="wait">
                      <Routes location={location} key={location.pathname}>
                        <Route path="/" element={
                          <>
                            <SEO 
                              title="BK Career Academy | UPSC, MPSC & Competitive Exam Coaching Nashik"
                              description="Join Nashik's most trusted coaching academy for UPSC, MPSC, Banking, and SSC exams. Expert guidance and proven success."
                              canonical="https://bkeducation.in/"
                              jsonLd={{
                                "@context": "https://schema.org",
                                "@type": "EducationalOrganization",
                                "name": "BK Career Academy",
                                "url": "https://bkeducation.in",
                                "logo": "https://bkeducation.in/logo.png",
                                "description": "Nashik's leading coaching institute for UPSC, MPSC, and Banking exams.",
                                "address": {
                                  "@type": "PostalAddress",
                                  "streetAddress": "2nd Floor, Gajanan Plaza, Gharpura Ghat Rd",
                                  "addressLocality": "Nashik",
                                  "addressRegion": "Maharashtra",
                                  "postalCode": "422002",
                                  "addressCountry": "IN"
                                },
                                "contactPoint": {
                                  "@type": "ContactPoint",
                                  "telephone": "+91-253-2313962",
                                  "contactType": "admissions"
                                }
                              }}
                            />
                            <Home 
                              setView={setView} 
                              setSelectedCategory={setSelectedCategory} 
                              setIsRegistrationModalOpen={setIsRegistrationModalOpen}
                              setIsAddStoryModalOpen={setIsAddStoryModalOpen}
                              dynamicCourses={dynamicCourses}
                              dynamicExams={dynamicExams}
                              stories={stories.slice(0, 2)}
                              setSelectedExamName={setSelectedExamName}
                              quickAccessList={quickAccessList}
                            />
                          </>
                        } />
                        <Route path="/courses" element={
                          <>
                            <SEO 
                              title="Explore Courses | UPSC, MPSC, Banking, SSC | BK Academy"
                              description="Discover our specialized coaching programs for civil services and competitive exams in Nashik."
                              canonical="https://bkeducation.in/courses"
                            />
                            <Courses 
                              selectedCategory={selectedCategory}
                              activeNavCategory={EXAM_CATEGORIES[0].id}
                              dynamicCourses={dynamicCourses}
                              dynamicExams={dynamicExams}
                              onViewSyllabus={(id) => {
                                setSelectedSyllabusId(id);
                                if (id === 1) navigate('/syllabus');
                                else alert("Full content for this category is coming soon.");
                              }}
                              onViewMPSC={() => navigate('/mpsc')}
                              onViewPolice={() => navigate('/police')}
                              onViewMAHATET={() => navigate('/mahatet')}
                              onViewSSC={() => navigate('/ssc')}
                              onViewUPSC={() => navigate('/upsc')}
                              onViewBanking={() => navigate('/banking')}
                              onViewRailway={() => navigate('/railway')}
                              onViewDefence={() => navigate('/defence')}
                              onViewTeaching={() => navigate('/teaching')}
                              onViewInsurance={() => navigate('/insurance')}
                              onViewEngineering={() => navigate('/engineering')}
                              onViewDynamicExam={(examName) => {
                                setSelectedExamName(examName);
                                navigate(`/exam/${encodeURIComponent(examName)}`);
                              }}
                               onRegister={() => setIsRegistrationModalOpen(true)}
                              onSelectCategory={setSelectedCategory}
                              setSelectedResource={setSelectedResource}
                            />
                          </>
                        } />
                        <Route path="/syllabus" element={
                          <>
                            <SEO 
                              title="Detailed UPSC Syllabus & Exam Pattern | BK Academy"
                              description="Get the complete UPSC Civil Services syllabus, exam pattern, and preparation strategy."
                              canonical="https://bkeducation.in/syllabus"
                            />
                            <SyllabusPortal 
                              onBack={() => navigate('/')}
                              onRegister={() => setIsRegistrationModalOpen(true)}
                              setIsRegistrationModalOpen={setIsRegistrationModalOpen}
                              setSelectedResource={setSelectedResource}
                            />
                          </>
                        } />
                        <Route path="/about" element={
                          <>
                            <SEO 
                              title="About Us | Our Vision & Success Stories | BK Academy"
                              description="Learn about BK Career Academy's 15-year legacy of empowering students in Nashik."
                              canonical="https://bkeducation.in/about"
                            />
                            <AboutUs />
                          </>
                        } />
                        <Route path="/success-stories" element={
                          <>
                            <SEO 
                              title="Success Stories | Real Results from Our Students"
                              description="Read inspiring stories from our successful candidates who cracked UPSC, MPSC, and Banking exams."
                              canonical="https://bkeducation.in/success-stories"
                            />
                            <SuccessStoriesPage 
                              stories={stories} 
                              onBack={() => navigate('/')} 
                              onAddYours={() => setIsAddStoryModalOpen(true)}
                            />
                          </>
                        } />
                        <Route path="/mpsc" element={
                          <>
                            <SEO 
                              title="MPSC Coaching in Nashik | Syllabus & Batch Details"
                              description="Ace the MPSC Rajyaseva and Subordinate Services exams with our targeted coaching."
                              canonical="https://bkeducation.in/mpsc"
                            />
                            <MPSCDetailsPage 
                              onBack={() => navigate('/courses')}
                              onRegister={() => setIsRegistrationModalOpen(true)}
                              setView={setView}
                              setIsRegistrationModalOpen={setIsRegistrationModalOpen}
                            />
                          </>
                        } />
                        <Route path="/police" element={
                          <>
                            <SEO 
                              title="Police Bharti Training Nashik | Physical & Written Prep"
                              description="Complete preparation for Maharashtra Police Recruitment in Nashik."
                              canonical="https://bkeducation.in/police"
                            />
                            <PoliceDetailsPage 
                              onBack={() => navigate('/courses')}
                              onRegister={() => setIsRegistrationModalOpen(true)}
                              setView={setView}
                              setIsRegistrationModalOpen={setIsRegistrationModalOpen}
                            />
                          </>
                        } />
                        <Route path="/mahatet" element={
                          <>
                            <SEO 
                              title="MAHA TET Exam Coaching | Teacher Eligibility Test Prep"
                              description="Prepare for MAHA TET and CTET with Nashik's leading experts."
                              canonical="https://bkeducation.in/mahatet"
                            />
                            <MAHATETDetailsPage 
                              onBack={() => navigate('/courses')}
                              onRegister={() => setIsRegistrationModalOpen(true)}
                              setView={setView}
                              setIsRegistrationModalOpen={setIsRegistrationModalOpen}
                            />
                          </>
                        } />
                        <Route path="/exam/:examName" element={
                          <DynamicExamDetailsPage 
                            examName={selectedExamName}
                            onBack={() => navigate('/courses')}
                            onRegister={() => setIsRegistrationModalOpen(true)}
                            setIsRegistrationModalOpen={setIsRegistrationModalOpen}
                          />
                        } />
                        <Route path="/banking" element={
                          <GeneralExamDetailsPage 
                            categoryId="banking" 
                            onBack={() => navigate('/courses')} 
                            onRegister={() => setIsRegistrationModalOpen(true)} 
                            setView={setView} 
                            setIsRegistrationModalOpen={setIsRegistrationModalOpen} 
                          />
                        } />
                        <Route path="/railway" element={
                          <GeneralExamDetailsPage 
                            categoryId="railway" 
                            onBack={() => navigate('/courses')} 
                            onRegister={() => setIsRegistrationModalOpen(true)} 
                            setView={setView} 
                            setIsRegistrationModalOpen={setIsRegistrationModalOpen} 
                          />
                        } />
                        <Route path="/defence" element={
                          <GeneralExamDetailsPage 
                            categoryId="defence" 
                            onBack={() => navigate('/courses')} 
                            onRegister={() => setIsRegistrationModalOpen(true)} 
                            setView={setView} 
                            setIsRegistrationModalOpen={setIsRegistrationModalOpen} 
                          />
                        } />
                        <Route path="/teaching" element={
                          <GeneralExamDetailsPage 
                            categoryId="teaching" 
                            onBack={() => navigate('/courses')} 
                            onRegister={() => setIsRegistrationModalOpen(true)} 
                            setView={setView} 
                            setIsRegistrationModalOpen={setIsRegistrationModalOpen} 
                          />
                        } />
                        <Route path="/insurance" element={
                          <GeneralExamDetailsPage 
                            categoryId="insurance" 
                            onBack={() => navigate('/courses')} 
                            onRegister={() => setIsRegistrationModalOpen(true)} 
                            setView={setView} 
                            setIsRegistrationModalOpen={setIsRegistrationModalOpen} 
                          />
                        } />
                        <Route path="/engineering" element={
                          <GeneralExamDetailsPage 
                            categoryId="engineering" 
                            onBack={() => navigate('/courses')} 
                            onRegister={() => setIsRegistrationModalOpen(true)} 
                            setView={setView} 
                            setIsRegistrationModalOpen={setIsRegistrationModalOpen} 
                          />
                        } />
                        <Route path="/mbacet" element={
                          <GeneralExamDetailsPage 
                            categoryId="mbacet" 
                            onBack={() => navigate('/courses')} 
                            onRegister={() => setIsRegistrationModalOpen(true)} 
                            setView={setView} 
                            setIsRegistrationModalOpen={setIsRegistrationModalOpen} 
                          />
                        } />
                        <Route path="/upsc" element={
                          <>
                            <SEO 
                              title="UPSC Exam Coaching Nashik | IAS, IPS, IFS Prep | BK Academy"
                              description="Elite civil services coaching in Nashik. Join our specialized batches for UPSC preparation."
                              canonical="https://bkeducation.in/upsc"
                            />
                            <UPSCDetailsPage 
                              onBack={() => navigate('/courses')}
                              onRegister={() => setIsRegistrationModalOpen(true)}
                              setView={setView}
                              setIsRegistrationModalOpen={setIsRegistrationModalOpen}
                            />
                          </>
                        } />
                        <Route path="/ssc" element={
                          <>
                            <SEO 
                              title="SSC Exam Coaching Nashik | CGL, CHSL, MTS Prep | BK Academy"
                              description="Ace the SSC examinations with our specialized coaching for central government jobs."
                              canonical="https://bkeducation.in/ssc"
                            />
                            <SSCDetailsPage 
                              onBack={() => navigate('/courses')}
                              onRegister={() => setIsRegistrationModalOpen(true)}
                              setView={setView}
                              setIsRegistrationModalOpen={setIsRegistrationModalOpen}
                            />
                          </>
                        } />
                        <Route path="/privacy" element={<PoliciesPage initialTab="privacy" />} />
                        <Route path="/terms" element={<PoliciesPage initialTab="terms" />} />
                        <Route path="/refund" element={<PoliciesPage initialTab="refund" />} />
                      </Routes>
                    </AnimatePresence>
                  </Suspense>

                  <Footer 
                    setView={setView}
                    setSelectedCategory={setSelectedCategory}
                    setIsRegistrationModalOpen={setIsRegistrationModalOpen}
                    setSelectedExamName={setSelectedExamName}
                  />
                </div>
              </main>

              <RegistrationModal 
                isOpen={isRegistrationModalOpen} 
                onClose={() => setIsRegistrationModalOpen(false)} 
              />

              <AddStoryModal 
                isOpen={isAddStoryModalOpen}
                onClose={() => setIsAddStoryModalOpen(false)}
                onAdd={handleAddStory}
              />

              <div onClickCapture={(e) => { if(isGuest) { e.stopPropagation(); setShowMandatoryLogin(true); } }}>
                <ChatWidget />
              </div>

              <ScrollToTop />
              <ResourceDrawer 
                exam={selectedResource} 
                onClose={() => setSelectedResource(null)} 
              />

              <ImagePopupModal 
                isOpen={isImagePopupOpen}
                onClose={() => setIsImagePopupOpen(false)}
                onImageClick={() => {
                  setIsImagePopupOpen(false);
                  setIsCounselingModalOpen(true);
                }}
              />

              <CounselingModal 
                isOpen={isCounselingModalOpen}
                onClose={() => setIsCounselingModalOpen(false)}
              />
            </>
          } />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

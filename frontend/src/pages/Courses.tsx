import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import ExamCategoryCard from '../components/features/ExamCategoryCard';
import CourseCard from '../components/CourseCard';
import { EXAM_CATEGORIES } from '../data/constants';

interface CoursesProps {
  selectedCategory: number | null;
  activeNavCategory: number;
  dynamicCourses: any[];
  dynamicExams: any[];
  onViewSyllabus: (id: number) => void;
  onRegister: () => void;
  onSelectCategory: (id: number | null) => void;
  onViewMPSC: () => void;
  onViewPolice: () => void;
  onViewMAHATET: () => void;
  onViewSSC: () => void;
  onViewUPSC: () => void;
  onViewBanking: () => void;
  onViewRailway: () => void;
  onViewDefence: () => void;
  onViewTeaching: () => void;
  onViewInsurance: () => void;
  onViewEngineering: () => void;
  onViewDynamicExam?: (examName: string) => void;
  setSelectedResource: (resource: any) => void;
}

export const Courses: React.FC<CoursesProps> = ({
  selectedCategory,
  dynamicCourses,
  onViewSyllabus,
  onRegister,
  onSelectCategory,
  onViewMPSC,
  onViewPolice,
  onViewMAHATET,
  onViewSSC,
  onViewUPSC,
  onViewBanking,
  onViewRailway,
  onViewDefence,
  onViewTeaching,
  onViewInsurance,
  onViewEngineering,
  onViewDynamicExam,
  setSelectedResource
}) => {
  const [activeCipherId, setActiveCipherId] = React.useState<number | null>(null);
  const [examDates, setExamDates] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const [examsResp, coursesResp, upscResp] = await Promise.all([
          fetch('/api/content/exams'),
          fetch('/api/content/courses'),
          fetch('/api/content/upsc_hub')
        ]);
        
        const [examsData, coursesData, upscData] = await Promise.all([
          examsResp.json(),
          coursesResp.json(),
          upscResp.json()
        ]);
        
        const allItems = [
          ...(examsData.items || []),
          ...(coursesData.items || []),
          ...(upscData.items || [])
        ];

        const map: Record<string, string> = {};
        allItems.forEach((item: any) => {
          if (item.examDate && item.category) {
            const cleanKey = item.category.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
            if (!map[cleanKey]) {
              map[cleanKey] = item.examDate;
            }
          }
        });
        setExamDates(map);
      } catch (e) { console.error("Date Fetch Failed:", e); }
    };
    fetchDates();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-dark"
    >
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
        <div className="section-container relative z-10">
          <header className="mb-16 text-center max-w-4xl mx-auto">
            <p className="text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-4">Our Curriculum</p>
            <h2 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
              Explore Our <span className="text-primary">Programs</span>
            </h2>
            <p className="text-gray-400 font-medium text-lg md:text-xl leading-relaxed">
              Achieve your administrative goals with our systematically structured courses. 
              From UPSC to MPSC, we provide verified guidance for every milestone.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-12">
               <button 
                 onClick={() => onSelectCategory(null)}
                 className={`px-8 py-4 rounded-2xl font-display font-bold uppercase tracking-widest transition-all duration-300 ${!selectedCategory ? 'bg-primary text-dark shadow-xl shadow-primary/20' : 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700'}`}
               >
                 All Exams
               </button>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-start mb-0">
            {EXAM_CATEGORIES.map((category, idx) => {
              const cleanKey = category.title.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
              const examDate = examDates[cleanKey] || null;

              return (
                <ExamCategoryCard 
                  key={category.id}
                  category={category}
                  idx={idx}
                  isOpen={activeCipherId === category.id}
                  onToggle={() => setActiveCipherId(activeCipherId === category.id ? null : category.id)}
                  onViewSyllabus={() => onViewSyllabus(category.id)}
                  onRegister={onRegister}
                  isSelected={selectedCategory === category.id}
                  onSelect={() => onSelectCategory(selectedCategory === category.id ? null : category.id)}
                  onViewMPSC={onViewMPSC}
                  onViewPolice={onViewPolice}
                  onViewMAHATET={onViewMAHATET}
                  onViewSSC={onViewSSC}
                  onViewUPSC={onViewUPSC}
                  onViewBanking={onViewBanking}
                  onViewRailway={onViewRailway}
                  onViewDefence={onViewDefence}
                  onViewTeaching={onViewTeaching}
                  onViewInsurance={onViewInsurance}
                  onViewEngineering={onViewEngineering}
                  onViewDynamicExam={onViewDynamicExam}
                  setSelectedResource={setSelectedResource}
                  examDate={examDate}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic Courses Section */}
      {dynamicCourses.length > 0 && !selectedCategory && (
        <section className="py-0 bg-white border-t border-gray-100">
          <div className="section-container">
            <div className="flex flex-col mb-1">
              <p className="label-text mb-1">Special Batches</p>
              <h2 className="section-heading">
                Specialized <span className="text-primary">Programs</span>
              </h2>
              <p className="body-text mt-4 max-w-2xl">
                Tailored coaching modules focusing on specific exam patterns and latest syllabus updates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {dynamicCourses.map((course, index) => (
                <CourseCard 
                  key={course._id || course.id} 
                  course={course} 
                  index={index} 
                  onClick={() => {
                    if (course.subCategory || course.title) {
                      onViewDynamicExam && onViewDynamicExam(course.subCategory || course.title);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
};

export default Courses;

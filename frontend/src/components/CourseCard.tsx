import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  isRecent: boolean;
  image: string;
}

interface CourseCardProps {
  course: Course;
  index: number;
  onClick?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, index, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onClick={onClick}
      className="group bg-white rounded-2xl border border-gray-100 p-3.5 md:p-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      {/* Badge & Rating */}
      <div className="flex justify-between items-center mb-3 gap-1">
        <span className="bg-primary/10 text-dark text-[9px] md:text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest truncate max-w-[70%]">
          {course.category}
        </span>
        <div className="flex items-center gap-1 text-primary shrink-0">
          <Star size={12} fill="currentColor" />
          <span className="text-[10px] font-black text-dark">4.9</span>
        </div>
      </div>

      {/* Image/Logo */}
      <div className="flex justify-center mb-3">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gray-50 flex items-center justify-center p-1.5 group-hover:bg-primary/10 transition-colors">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Info */}
      <h3 className="sub-heading text-sm md:text-base mb-1 group-hover:text-primary transition-colors line-clamp-2">
        {course.title}
      </h3>
      <p className="body-text text-[11px] md:text-xs mb-4 line-clamp-2">
        Learn with {course.instructor || "Expert Mentors"} in our comprehensive batch designed for success.
      </p>

      {/* Footer */}
      <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-gray-50/50 sm:border-none sm:pt-0">
        <span className="text-[9px] md:text-[10px] font-bold text-muted uppercase tracking-widest">Starts Next Week</span>
        <button className="flex items-center gap-1.5 text-primary group/btn">
          <span className="btn-text text-[10px] md:text-xs font-bold">View Batches</span>
          <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export default CourseCard;

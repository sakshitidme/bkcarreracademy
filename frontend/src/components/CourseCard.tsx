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
      className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      {/* Badge & Rating */}
      <div className="flex justify-between items-center mb-6">
        <span className="bg-primary/10 text-dark text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
          {course.category}
        </span>
        <div className="flex items-center gap-1 text-primary">
          <Star size={12} fill="currentColor" />
          <span className="text-[10px] font-black text-dark">4.9</span>
        </div>
      </div>

      {/* Image/Logo */}
      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 rounded-2xl bg-gray-50 flex items-center justify-center p-4 group-hover:bg-primary/10 transition-colors">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Info */}
      <h3 className="sub-heading mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {course.title}
      </h3>
      <p className="body-text text-sm mb-8">
        Learn with {course.instructor || "Expert Mentors"} in our comprehensive batch designed for success.
      </p>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between">
        <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Starts Next Week</span>
        <button className="flex items-center gap-2 text-primary group/btn">
          <span className="btn-text">View Batches</span>
          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export default CourseCard;

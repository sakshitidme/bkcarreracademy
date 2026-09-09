import React from 'react';

interface SkeletonCardProps {
  className?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-[2.5rem] border border-gray-100 p-6 shadow-xl flex flex-col gap-6 overflow-hidden relative ${className}`}>
      {/* Top Header with Avatar and Title Placeholder */}
      <div className="flex items-center gap-4">
        {/* Avatar Placeholder */}
        <div className="w-14 h-14 rounded-full animate-shimmer shrink-0 shadow-sm border border-gray-50/50" />
        
        {/* Title & Subtitle Placeholders */}
        <div className="flex flex-col gap-2.5 flex-grow">
          <div className="h-4 w-3/4 rounded-lg animate-shimmer" />
          <div className="h-3 w-1/2 rounded-lg animate-shimmer opacity-70" />
        </div>
      </div>

      {/* Main Image Placeholder */}
      <div className="w-full h-48 sm:h-56 rounded-3xl animate-shimmer shadow-inner border border-gray-50/50 relative overflow-hidden">
        {/* Decorative subtle badge placeholder */}
        <div className="absolute top-4 left-4 w-20 h-6 rounded-full animate-shimmer bg-black/5" />
      </div>

      {/* Text Lines Placeholders */}
      <div className="flex flex-col gap-3 mt-2">
        <div className="h-4 w-full rounded-lg animate-shimmer" />
        <div className="h-4 w-5/6 rounded-lg animate-shimmer" />
        <div className="h-4 w-2/3 rounded-lg animate-shimmer opacity-70" />
      </div>

      {/* Bottom Footer / Button Placeholder */}
      <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
        <div className="h-8 w-28 rounded-2xl animate-shimmer" />
        <div className="h-8 w-8 rounded-full animate-shimmer" />
      </div>
    </div>
  );
};

export default SkeletonCard;

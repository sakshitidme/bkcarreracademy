import React from 'react';

export const BrandLogo = ({ className = "", onDoubleClick }: { className?: string; onDoubleClick?: () => void }) => (
  <div 
    onDoubleClick={onDoubleClick}
    className={`relative flex items-center justify-center ${className} transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 shadow-sm bg-white hover:shadow-md hover:border-primary/30`}
  >
    <img 
      src="/bk.png" 
      alt="BK Career Academy Logo" 
      className="w-full h-full object-contain p-1"
    />
  </div>
);

export default BrandLogo;

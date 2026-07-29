import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className = '',
  showText = true,
}) => {
  const containerSizes = {
    sm: 'w-8 h-8',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
  };

  return (
    <div className={`flex items-center space-x-2.5 shrink-0 ${className}`}>
      <div className={`relative ${containerSizes[size]} flex items-center justify-center shrink-0`}>
        <img
          src="/logo.png?v=3"
          alt="Inventra Logo"
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {showText && (
        <span className={`font-extrabold ${textSizes[size]} text-slate-900 dark:text-white tracking-tight whitespace-nowrap group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors`}>
          Inventra<span className="text-emerald-500">.AI</span>
        </span>
      )}
    </div>
  );
};

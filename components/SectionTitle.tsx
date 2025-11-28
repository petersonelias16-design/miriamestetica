import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, centered = true }) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
      <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <div className="flex flex-col items-center">
             <p className="font-sans text-gray-500 font-light max-w-2xl mx-auto text-lg leading-relaxed">
            {subtitle}
            </p>
             <div className="w-16 h-[1px] bg-rose-300 mt-6"></div>
        </div>
      )}
    </div>
  );
};
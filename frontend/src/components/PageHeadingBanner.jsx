import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PageHeadingBanner Component
 * Deep Navy banner matching the client design PDF (pages 7, 9, 12, 15, 17, 18)
 */
const PageHeadingBanner = ({ title, subtitle, breadcrumbs = [] }) => {
  return (
    <div className="bg-gradient-to-r from-[#0B1528] via-[#0F1B2F] to-[#162744] text-white pt-28 sm:pt-36 lg:pt-40 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-slate-800">
      {/* Subtle perspective road / landscape lines matching PDF */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1200 400">
          <line x1="600" y1="400" x2="600" y2="120" stroke="#38BDF8" strokeWidth="2" strokeDasharray="12 12" />
          <polygon points="560,400 640,400 605,120 595,120" fill="rgba(255,255,255,0.05)" />
          <line x1="0" y1="200" x2="1200" y2="200" stroke="#FFFFFF" strokeWidth="1" opacity="0.1" />
        </svg>
      </div>

      {/* Ambient glow effects */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FF6B00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-slate-400 mb-4">
            <Link to="/" className="text-slate-300 hover:text-[#FF6B00] transition-colors">Home</Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <span className="text-slate-600">/</span>
                {crumb.path ? (
                  <Link to={crumb.path} className="text-slate-300 hover:text-[#FF6B00] transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-white font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="max-w-3xl text-slate-300 text-sm sm:text-base md:text-lg font-normal leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeadingBanner;

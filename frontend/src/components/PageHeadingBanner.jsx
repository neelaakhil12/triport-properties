import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PageHeadingBanner Component
 * Matches the client wireframe screenshot with a bold Black (#111111) banner
 * and distinctive font styling ("About the company", "Importance of the Triport city")
 */
const PageHeadingBanner = ({ title, subtitle, breadcrumbs = [] }) => {
  return (
    <div className="bg-[#111111] text-white py-14 sm:py-20 px-4 relative overflow-hidden border-b-2 border-zinc-800">
      {/* Subtle background glow effect */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center justify-center space-x-2 text-xs uppercase tracking-wider text-zinc-400 mb-4">
            <Link to="/" className="hover:text-[#38BDF8] transition-colors">Home</Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <span className="text-zinc-600">/</span>
                {crumb.path ? (
                  <Link to={crumb.path} className="hover:text-[#38BDF8] transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-[#38BDF8] font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Heading in stylish client script / handwriting accent as displayed in the client mockup */}
        <h1 className="client-script-title text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-wide mb-3 drop-shadow-sm">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="max-w-3xl mx-auto text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeadingBanner;

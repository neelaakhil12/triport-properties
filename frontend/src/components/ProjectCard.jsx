import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Ruler, ArrowRight, PhoneCall, Compass } from 'lucide-react';

const ProjectCard = ({ project, onEnquire }) => {
  return (
    <div
      data-aos="fade-up"
      className="bg-white rounded-2xl overflow-hidden border border-zinc-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
    >
      {/* Image & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
        <img
          src={project.featuredImage}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-[#38BDF8] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
          {project.propertyCategory}
        </div>
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{project.approvalStatus?.split(' ')[0] || 'Approved'}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center text-xs text-zinc-500 mb-1.5 gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
            <span className="truncate">{project.location}</span>
          </div>

          <h3 className="text-xl font-bold text-zinc-900 group-hover:text-[#38BDF8] transition-colors leading-snug mb-2">
            {project.name}
          </h3>

          <p className="text-zinc-600 text-xs leading-relaxed line-clamp-2 mb-4">
            {project.shortDescription}
          </p>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs py-3 border-y border-zinc-100 mb-4 bg-zinc-50/60 rounded-lg p-2.5">
            <div>
              <span className="text-zinc-400 block text-[10px] uppercase font-semibold">Plot Sizes</span>
              <span className="font-semibold text-zinc-800">{project.availablePlotSizes}</span>
            </div>
            <div>
              <span className="text-zinc-400 block text-[10px] uppercase font-semibold">Total Area</span>
              <span className="font-semibold text-zinc-800">{project.totalLandArea}</span>
            </div>
            <div className="col-span-2 pt-1 border-t border-zinc-200/50 flex items-center justify-between">
              <span className="text-zinc-500 text-[11px] flex items-center gap-1">
                <Compass className="w-3 h-3 text-zinc-400" />
                <span className="truncate max-w-[180px]">{project.roadAccess}</span>
              </span>
              <span className="text-emerald-700 font-bold text-xs">{project.status || 'Available'}</span>
            </div>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div>
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="text-[10px] uppercase text-zinc-400 block font-semibold">Pricing</span>
              <span className="text-lg font-extrabold text-zinc-900">{project.priceRange}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/projects/${project.slug || project._id}`}
              className="w-full inline-flex items-center justify-center space-x-1.5 bg-black hover:bg-zinc-800 text-white py-2.5 px-3 rounded-xl text-xs font-semibold transition-all shadow-sm"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => onEnquire && onEnquire(project)}
              className="w-full inline-flex items-center justify-center space-x-1.5 bg-[#38BDF8] hover:bg-sky-400 text-black py-2.5 px-3 rounded-xl text-xs font-semibold transition-all shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Request Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

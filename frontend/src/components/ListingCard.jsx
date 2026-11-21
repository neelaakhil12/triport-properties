import React from 'react';
import { MapPin, ShieldCheck, CheckCircle2, PhoneCall, Tag } from 'lucide-react';

const ListingCard = ({ listing, onEnquire }) => {
  const statusColor = {
    Available: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Reserved: 'bg-amber-50 text-amber-700 border-amber-200',
    Sold: 'bg-red-50 text-red-700 border-red-200'
  }[listing.status] || 'bg-zinc-50 text-zinc-700 border-zinc-200';

  return (
    <div
      data-aos="fade-up"
      className="bg-white rounded-2xl overflow-hidden border border-zinc-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="relative aspect-[16/9] bg-zinc-100 overflow-hidden">
        <img
          src={listing.images?.[0] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'}
          alt={listing.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-black/80 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
          {listing.plotNumberOrRef}
        </div>
        <div className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full border shadow-sm ${statusColor}`}>
          {listing.status}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center text-xs text-zinc-500 mb-1 gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="truncate">{listing.location}</span>
          </div>

          <h4 className="font-bold text-base text-zinc-900 mb-2 leading-tight hover:text-[#38BDF8] transition-colors">
            {listing.title}
          </h4>

          <div className="bg-zinc-50 rounded-lg p-2.5 space-y-1.5 text-xs text-zinc-700 mb-3 border border-zinc-100">
            <div className="flex justify-between">
              <span className="text-zinc-500">Plot/Land Size:</span>
              <span className="font-semibold text-zinc-900">{listing.plotOrLandSize}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Land Type:</span>
              <span className="font-semibold text-zinc-900">{listing.landType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Road Access:</span>
              <span className="font-semibold text-zinc-900">{listing.roadAccess}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Key Connectivity:</span>
              <span className="text-zinc-700 text-right truncate max-w-[170px]" title={listing.distanceToKeyPoints}>
                {listing.distanceToKeyPoints}
              </span>
            </div>
          </div>

          {/* Documents Verified */}
          {listing.verifiedDocuments?.length > 0 && (
            <div className="mb-4">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                Verified Documents:
              </span>
              <div className="flex flex-wrap gap-1">
                {listing.verifiedDocuments.map((doc, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-100 font-medium"
                  >
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 mr-1" />
                    {doc}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="pt-3 border-t border-zinc-100 flex items-center justify-between mb-3">
            <div>
              <span className="text-[10px] text-zinc-400 block uppercase font-semibold">Demand / Price</span>
              <span className="text-lg font-black text-zinc-900">{listing.priceRange}</span>
            </div>
            <span className="text-xs bg-sky-50 text-sky-800 px-2.5 py-1 rounded font-semibold border border-sky-100">
              Facing: {listing.facing || 'East'}
            </span>
          </div>

          <button
            onClick={() => onEnquire && onEnquire(listing)}
            disabled={listing.status === 'Sold'}
            className="w-full inline-flex items-center justify-center space-x-1.5 bg-[#111111] hover:bg-zinc-800 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white py-2.5 px-3 rounded-xl text-xs font-semibold transition-all shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>{listing.status === 'Sold' ? 'Sold Out' : 'Request Plot Availability'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;

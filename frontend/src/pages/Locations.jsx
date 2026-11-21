import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Compass, AlertTriangle, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import PageHeadingBanner from '../components/PageHeadingBanner';
import api from '../api/client';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await api.get('/locations');
        if (res.data?.data) {
          setLocations(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load locations', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  return (
    <div className="bg-white">
      {/* Black Banner Heading with script accent */}
      <PageHeadingBanner
        title="Importance of the Triport city"
        subtitle="Every Route Leads to Growth. The corridor is connected by highways, rail, air and sea, giving buyers versatile options to use and resell their land."
        breadcrumbs={[{ label: 'Locations & Connectivity' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
        {/* Intro Card */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest block">
            Corridor Geography & Logistics
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
            Multi-Modal Growth Convergence
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            The Tirupati–Naidupeta Growth Corridor serves as the vital geographic land bridge connecting Rayalaseema's cultural & academic center with the Chennai-Bengaluru industrial sphere and Andhra Pradesh’s deep-water seaports.
          </p>
        </div>

        {/* Locations List */}
        <div className="space-y-16">
          {locations.map((loc, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={loc._id || idx}
                data-aos="fade-up"
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 rounded-3xl border border-zinc-200 bg-white shadow-sm hover:shadow-lg transition-shadow ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : ''}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-md border border-zinc-200 aspect-[16/10] bg-zinc-100 group">
                    <img
                      src={loc.image}
                      alt={loc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/80 text-[#38BDF8] text-xs font-bold px-3 py-1 rounded-full uppercase">
                      {loc.name.split(' ')[0]}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className={`lg:col-span-7 space-y-5 ${isEven ? 'lg:order-1' : ''}`}>
                  <div>
                    <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest block mb-1">
                      {loc.corridorRole}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
                      {loc.name}
                    </h3>
                  </div>

                  <p className="text-zinc-700 text-sm leading-relaxed">
                    {loc.description}
                  </p>

                  {/* Distance Grid */}
                  {loc.distances?.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>Verified Distance & Travel Times:</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {loc.distances.map((d, dIdx) => (
                          <div
                            key={dIdx}
                            className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between"
                          >
                            <span className="text-zinc-600 truncate mr-2">{d.destination}</span>
                            <span className="font-bold text-zinc-900 shrink-0">
                              {d.distanceKm} <span className="text-zinc-400 font-normal">({d.travelTime})</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Highlights */}
                  {loc.connectivityHighlights?.length > 0 && (
                    <div className="space-y-1.5 pt-1 text-xs text-zinc-600">
                      <span className="font-semibold text-zinc-800 block">Infrastructure Attributes:</span>
                      {loc.connectivityHighlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start space-x-2">
                          <span className="text-[#38BDF8] font-bold">•</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Source Notice */}
                  <div className="pt-2 flex items-center space-x-2 text-[11px] text-zinc-400 border-t border-zinc-100">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{loc.verifiedStatus}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Infrastructure Official Disclaimer */}
        <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 flex items-start space-x-3.5 text-xs text-amber-900 max-w-4xl mx-auto shadow-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold block uppercase tracking-wider">Official Infrastructure Disclaimer:</span>
            <p className="leading-relaxed">
              Infrastructure projects can change over time. We share verified official notifications from NHAI, APIIC, TUDA, and the Ports Authority, and we do not guarantee future property appreciation or prices. Independent legal and revenue verification is strongly advised prior to committing funds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;

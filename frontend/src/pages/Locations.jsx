import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Navigation,
  Compass,
  AlertTriangle,
  ShieldCheck,
  Clock,
  ArrowRight,
  Sprout,
  GraduationCap,
  Factory,
  Ship,
  PhoneCall
} from 'lucide-react';
import PageHeadingBanner from '../components/PageHeadingBanner';
import EnquiryModal from '../components/EnquiryModal';
import OrangeCTABanner from '../components/OrangeCTABanner';

const Locations = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const zones = [
    {
      tag: "GREEN BELT",
      title: "Naidupeta countryside",
      desc: "Farm land, orchards and open land for farming, farmhouses and long-term holding.",
      details: "Villages and land types available: Menakuru, Pellakuru, Doravarisatram, Mallam, and Chittamuru belt with sweet groundwater aquifers.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
      color: "text-emerald-600 bg-emerald-50"
    },
    {
      tag: "EDUCATIONAL HUB",
      title: "Tirupati",
      desc: "IIT Tirupati, IISER Tirupati and universities, plus pilgrimage and healthcare demand.",
      details: "65 km to city centre · Steady year-round residential rental demand from faculty, doctors, and students.",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
      color: "text-indigo-600 bg-indigo-50"
    },
    {
      tag: "INDUSTRIAL CORRIDOR",
      title: "Naidupeta – Sullurpeta – Tada",
      desc: "Industrial and manufacturing belt with growing workforce housing needs.",
      details: "Host to global manufacturers, Apache SEZ, Sri City proximity, electronics clusters, and ISRO Space Centre.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      color: "text-sky-600 bg-sky-50"
    },
    {
      tag: "HIGHWAYS",
      title: "National Highway 16",
      desc: "Access for trucks, commuters and inter-city travel.",
      details: "6-Lane high-speed economic artery connecting Chennai, Naidupeta, Nellore, and Visakhapatnam.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      color: "text-amber-600 bg-amber-50"
    },
    {
      tag: "AIRPORT",
      title: "Tirupati Airport (TIR)",
      desc: "Domestic and regional air connections.",
      details: "45 km via 4-lane expressway with direct commercial flights to Hyderabad, Bengaluru, Delhi, and Mumbai.",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
      color: "text-teal-600 bg-teal-50"
    },
    {
      tag: "PORTS & IMPORT–EXPORT",
      title: "Krishnapatnam · Dugarajapatnam · Ramayapatnam",
      desc: "Sea links for import–export trade, warehousing and logistics.",
      details: "Deep-water seaports handling multi-commodity container cargo, coastal trade, and EXIM logistics parks.",
      image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80",
      color: "text-blue-600 bg-blue-50"
    }
  ];

  return (
    <div className="bg-white">
      {/* 1. Header Banner matching PDF Page 12 */}
      <PageHeadingBanner
        title="Every Route Leads to Growth"
        subtitle="The corridor is connected by highways, rail, air and sea, which gives buyers many ways to use and resell their land."
        breadcrumbs={[{ label: 'Locations' }]}
      />

      {/* 2. GROWTH ZONES & CONNECTIVITY (PDF Page 12) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] block">
            Growth Zones & Connectivity
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Where growth is coming from
          </h2>
        </div>

        {/* 6 Cards Grid matching PDF Page 12 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {zones.map((zone, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="h-52 overflow-hidden bg-slate-100 relative">
                  <img
                    src={zone.image}
                    alt={zone.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B1528] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {zone.tag}
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-3">
                  <h3 className="text-xl font-bold text-slate-900">
                    {zone.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {zone.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 text-xs font-medium text-slate-500 mt-2">
                {zone.details}
              </div>
            </div>
          ))}
        </div>

        {/* Note Disclaimer Box matching PDF Page 12 */}
        <div className="mt-10 p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-900">
          <strong>Note:</strong> Infrastructure projects can change. We share the latest official information, and we do not guarantee future prices.
        </div>
      </section>

      {/* 3. CORRIDOR MAP SECTION (PDF Page 13 - Deep Navy) */}
      <section className="bg-[#0B1528] text-white py-16 sm:py-24 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Distances List */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] block">
                  Corridor Map
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  See how it all connects
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Distances confirmed from verified road networks and official survey data.
                </p>
              </div>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="w-5 h-5 text-indigo-400" />
                    <div>
                      <div className="text-sm font-bold text-white">Educational Hub (Tirupati)</div>
                      <div className="text-xs text-slate-400">IIT, IISER, universities, plus pilgrimage and healthcare demand</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded-md">65 km</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center space-x-3">
                    <Sprout className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="text-sm font-bold text-white">Green Belt</div>
                      <div className="text-xs text-slate-400">Farm land and open countryside around Naidupeta</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-md">Local</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center space-x-3">
                    <Factory className="w-5 h-5 text-sky-400" />
                    <div>
                      <div className="text-sm font-bold text-white">Naidupeta – Sullurpeta – Tada</div>
                      <div className="text-xs text-slate-400">Industrial and manufacturing belt</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-sky-400 bg-sky-400/10 px-2.5 py-1 rounded-md">25 - 45 km</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center space-x-3">
                    <Navigation className="w-5 h-5 text-amber-400" />
                    <div>
                      <div className="text-sm font-bold text-white">Highways</div>
                      <div className="text-xs text-slate-400">National highway access for trucks, commuters and inter-city travel (NH 16)</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md">Direct</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center space-x-3">
                    <Compass className="w-5 h-5 text-teal-400" />
                    <div>
                      <div className="text-sm font-bold text-white">Airport</div>
                      <div className="text-xs text-slate-400">Tirupati Airport for domestic and regional connections</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-teal-400 bg-teal-400/10 px-2.5 py-1 rounded-md">45 km</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center space-x-3">
                    <Ship className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-sm font-bold text-white">Ports</div>
                      <div className="text-xs text-slate-400">Krishnapatnam, Dugarajapatnam and Ramayapatnam for trade and logistics</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-400 bg-blue-400/10 px-2.5 py-1 rounded-md">35 - 70 km</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center space-x-2 bg-[#FF6B00] hover:bg-[#e05e00] text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all shadow-lg"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Talk to an Advisor</span>
                </button>
              </div>
            </div>

            {/* Right Schematic Map SVG */}
            <div className="lg:col-span-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
                <div className="text-xs font-mono text-slate-500 mb-4 flex items-center justify-between">
                  <span>Schematic · not to scale</span>
                  <span className="text-slate-400">Bay of Bengal (East)</span>
                </div>

                <svg className="w-full h-80 sm:h-96" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 320 0 L 400 0 L 400 400 L 330 400 Z" fill="#0C2340" opacity="0.6" />
                  <text x="350" y="200" fill="#38BDF8" fontSize="11" opacity="0.4" transform="rotate(90 350,200)">Bay of Bengal</text>

                  <line x1="280" y1="30" x2="290" y2="380" stroke="#F59E0B" strokeWidth="4" />
                  <text x="240" y="30" fill="#F59E0B" fontSize="10" fontWeight="bold">NH 16</text>

                  <line x1="285" y1="180" x2="140" y2="280" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4" />

                  <circle cx="282" cy="50" r="5" fill="#EF4444" />
                  <text x="150" y="55" fill="#E2E8F0" fontSize="10">▲ Ramayapatnam Port</text>

                  <circle cx="284" cy="110" r="6" fill="#F59E0B" />
                  <text x="175" y="115" fill="#E2E8F0" fontSize="11" fontWeight="bold">Krishnapatnam Port</text>

                  <circle cx="285" cy="180" r="8" fill="#10B981" />
                  <text x="195" y="185" fill="#10B981" fontSize="12" fontWeight="bold">Naidupeta (Base)</text>

                  <circle cx="310" cy="220" r="5" fill="#F59E0B" />
                  <text x="210" y="225" fill="#E2E8F0" fontSize="10">Dugarajapatnam Port</text>

                  <circle cx="287" cy="250" r="6" fill="#38BDF8" />
                  <text x="205" y="255" fill="#E2E8F0" fontSize="11">Sullurpeta (Industry)</text>

                  <circle cx="288" cy="310" r="6" fill="#38BDF8" />
                  <text x="220" y="315" fill="#E2E8F0" fontSize="11">Tada (Industry)</text>

                  <text x="250" y="375" fill="#94A3B8" fontSize="10">Chennai (South) ↓</text>

                  <circle cx="140" cy="280" r="9" fill="#818CF8" />
                  <text x="70" y="275" fill="#818CF8" fontSize="12" fontWeight="bold">Tirupati</text>
                  <text x="45" y="290" fill="#94A3B8" fontSize="9">Educational Hub</text>

                  <circle cx="180" cy="320" r="5" fill="#38BDF8" />
                  <text x="125" y="335" fill="#38BDF8" fontSize="10">✈ Tirupati Airport</text>
                </svg>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-4 border-t border-slate-800">
                  <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /><span>Green belt</span></span>
                  <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-400" /><span>Industrial corridor</span></span>
                  <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-400" /><span>Educational hub</span></span>
                  <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /><span>Ports & trade</span></span>
                  <span className="flex items-center space-x-1.5"><span className="w-3 h-1 bg-amber-500" /><span>NH 16</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INVESTMENT GUIDE (PDF Page 13) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] block">
            Investment Guide
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            How we help you invest safely
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Five clear steps from first call to registration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="text-3xl font-black text-[#FF6B00]">01</div>
            <h3 className="font-bold text-base text-slate-900">Tell us your goal</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Home, business, farming or long-term holding.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="text-3xl font-black text-sky-500">02</div>
            <h3 className="font-bold text-base text-slate-900">Shortlist locations</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We match your budget and purpose to the right part of the corridor.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="text-3xl font-black text-emerald-500">03</div>
            <h3 className="font-bold text-base text-slate-900">Verify the land</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Title, encumbrance, layout approval and boundary survey.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="text-3xl font-black text-indigo-500">04</div>
            <h3 className="font-bold text-base text-slate-900">Visit with us</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Site visit with local guidance on access, neighbours and development.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="text-3xl font-black text-amber-500">05</div>
            <h3 className="font-bold text-base text-slate-900">Complete the purchase</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Registration support and a document checklist, with a lawyer for final sign-off.
            </p>
          </div>
        </div>
      </section>

      {/* 5. ORANGE CTA BANNER (PDF Page 13 & 14) */}
      <OrangeCTABanner />

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialService="Corridor Location Guidance"
      />
    </div>
  );
};

export default Locations;

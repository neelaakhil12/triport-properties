import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Target, Eye, MapPin, Award, Users, FileText, ArrowRight, Navigation, Compass, AlertTriangle, Clock } from 'lucide-react';
import PageHeadingBanner from '../components/PageHeadingBanner';
import api from '../api/client';
import EnquiryModal from '../components/EnquiryModal';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [locations, setLocations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, locRes] = await Promise.all([
          api.get('/settings/about'),
          api.get('/locations')
        ]);
        if (aboutRes.data?.data) {
          setAboutData(aboutRes.data.data);
        }
        if (locRes.data?.data) {
          setLocations(locRes.data.data);
        }
      } catch (err) {
        console.error('Failed to load about and locations data:', err);
      }
    };
    fetchData();
  }, []);

  const heading = aboutData?.heading || "Advisors for Land, Built on Local Knowledge";
  const introduction = aboutData?.introduction || "We are a land investment advisory based on the Tirupati–Naidupeta corridor. Our role is to help you make a sound decision, not just a sale. We explain the location, the infrastructure plans, the title and approval status, and the likely use of the land before you commit.";
  const promise = aboutData?.ourPromise || "We recommend only the land we would be comfortable buying ourselves.";
  const vision = aboutData?.vision || "To be the most trusted, transparent, and legally rigorous land investment advisory on India's east-coast growth corridors.";
  const mission = aboutData?.mission || "Empower every buyer—from a first-time plot buyer to a multi-national corporation—with verified land records, factual infrastructure updates, and complete transaction integrity.";
  const localExpertise = aboutData?.localExpertise || "Our advisors live and breathe the Tirupati-Naidupeta corridor. We verify ground realities, revenue records, and planned development firsthand.";
  const transparency = aboutData?.transparency || "Every recommendation is backed by documented title chain, approved layout sanctions, and physical road connectivity checks.";

  return (
    <div className="bg-white">
      {/* Black Banner Heading with script accent */}
      <PageHeadingBanner
        title="About the company"
        subtitle="Advisors for Land, Built on Local Knowledge and Stringent Verification."
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* Main Introduction */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div data-aos="fade-right" className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest bg-sky-50 px-3 py-1 rounded-md">
              Our Identity & Purpose
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] leading-tight">
              {heading}
            </h2>
            <p className="text-zinc-600 text-base sm:text-lg leading-relaxed">
              {introduction}
            </p>

            {/* Highlighted Our Promise */}
            <div className="p-6 rounded-2xl bg-amber-50/70 border-l-4 border-amber-500 my-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                Our Non-Negotiable Promise
              </span>
              <p className="text-xl font-serif italic text-amber-950 font-medium">
                "{promise}"
              </p>
            </div>

            {/* Our Approach (3 Pillars) */}
            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-bold text-zinc-900">Our Advisory Approach:</h3>
              <div className="grid grid-cols-1 gap-3 text-sm text-zinc-700">
                <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
                  <div className="w-6 h-6 rounded-full bg-[#38BDF8] text-black font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div>
                    <span className="font-bold text-zinc-900 block">Plain-Language Advice</span>
                    <span>No pressure to buy. We break down revenue jargons and explain ground truths clearly.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
                  <div className="w-6 h-6 rounded-full bg-[#38BDF8] text-black font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div>
                    <span className="font-bold text-zinc-900 block">Verification of Records & Layout Approvals</span>
                    <span>No recommendation is issued without checking 30-year Encumbrance, TUDA/DTCP sanctions, and physical access.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
                  <div className="w-6 h-6 rounded-full bg-[#38BDF8] text-black font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div>
                    <span className="font-bold text-zinc-900 block">Advice for All Stakeholders</span>
                    <span>Dedicated tailored frameworks for individuals, families, farmers, institutions, and NRI investors.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-zinc-200">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80"
                alt="Triport corridor inspection"
                className="w-full h-[360px] object-cover"
              />
              <div className="p-6 bg-zinc-900 text-white">
                <div className="flex items-center space-x-2 text-[#38BDF8] text-xs font-bold uppercase mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Ground Reality Audits</span>
                </div>
                <p className="text-zinc-300 text-xs leading-relaxed">
                  Every parcel recommended by Triport undergoes GPS boundary survey, road connectivity verification, and revenue link-document checks.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-sky-50 border border-sky-200 text-sky-950 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm">Need Independent Due Diligence?</h4>
                <p className="text-xs text-sky-800">Speak directly with our senior corridor land advisor.</p>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="bg-black hover:bg-zinc-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shrink-0"
              >
                Consult Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              data-aos="fade-up"
              className="bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-[#38BDF8] flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-sky-700" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-3">Our Vision</h3>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                {vision}
              </p>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-3">Our Mission</h3>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                {mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BLACK HEADING BANNER: "Importance of the Triport city" (Integrated into About Page) */}
      <section id="locations" className="bg-[#111111] text-white py-14 sm:py-16 text-center border-y border-zinc-800 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="client-script-title text-4xl sm:text-5xl md:text-6xl text-white font-normal mb-3">
            Importance of the Triport city
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light max-w-2xl mx-auto">
            Every Route Leads to Growth. The corridor is connected by highways, rail, air and sea, giving buyers versatile options to use and resell their land.
          </p>
        </div>
      </section>

      {/* Corridor Geography & Locations Section */}
      <section className="py-16 sm:py-20 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Intro Card */}
          <div data-aos="fade-up" className="bg-white border border-zinc-200 rounded-3xl p-8 max-w-4xl mx-auto text-center space-y-3 shadow-sm">
            <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest block">
              Corridor Geography & Multi-Modal Logistics
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
              Multi-Modal Growth Convergence
            </h3>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              The Tirupati–Naidupeta Growth Corridor serves as the vital geographic land bridge connecting Rayalaseema's cultural & academic center with the Chennai-Bengaluru industrial sphere and Andhra Pradesh’s deep-water seaports.
            </p>
          </div>

          {/* Locations Grid / Cards */}
          <div className="space-y-12">
            {locations.map((loc, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={loc._id || idx}
                  data-aos="fade-up"
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 rounded-3xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow"
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
                  <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-1' : ''}`}>
                    <div>
                      <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest block mb-1">
                        {loc.corridorRole}
                      </span>
                      <h4 className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
                        {loc.name}
                      </h4>
                    </div>

                    <p className="text-zinc-700 text-sm leading-relaxed">
                      {loc.description}
                    </p>

                    {/* Distance Grid */}
                    {loc.distances?.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-800 flex items-center gap-1.5">
                          <Navigation className="w-3.5 h-3.5 text-[#38BDF8]" />
                          <span>Verified Distance & Travel Times:</span>
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {loc.distances.map((d, dIdx) => (
                            <div
                              key={dIdx}
                              className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between"
                            >
                              <span className="font-semibold text-zinc-800">{d.to}</span>
                              <span className="font-bold text-[#38BDF8] bg-sky-50 px-2 py-0.5 rounded">
                                {d.distanceKm} km ({d.travelTimeMins} mins)
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Consult with a Land Advisor"
        defaultType="General"
      />
    </div>
  );
};

export default About;

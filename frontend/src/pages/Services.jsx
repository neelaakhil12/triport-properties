import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Store,
  Layers,
  TrendingUp,
  Sprout,
  Factory,
  Check,
  ArrowRight,
  ShieldCheck,
  Building,
  Truck,
  HeartPulse,
  GraduationCap
} from 'lucide-react';
import PageHeadingBanner from '../components/PageHeadingBanner';
import EnquiryModal from '../components/EnquiryModal';
import OrangeCTABanner from '../components/OrangeCTABanner';

const Services = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleEnquire = (serviceName) => {
    setSelectedService(serviceName);
    setModalOpen(true);
  };

  return (
    <div className="bg-white">
      {/* 1. Header Banner matching PDF Page 9 */}
      <PageHeadingBanner
        title="Land options for every investment goal"
        subtitle="Six ways to invest in the corridor, each backed by verification and plain-language advice."
        breadcrumbs={[{ label: 'Services' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20 sm:space-y-28">
        {/* Service 1: Residential Plots (Image on Right) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#FF6B00] flex items-center justify-center">
              <Building2 className="w-6 h-6 text-[#FF6B00]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Residential Plots
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Plots in developing layouts close to housing demand, schools and transport. Best for end-use or long-term family homes.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1">
              <span className="inline-flex items-center space-x-1.5 bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Check className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>Layout approval checked</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Check className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>Near schools & transport</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Check className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>Family-home friendly</span>
              </span>
            </div>
            <div className="pt-2">
              <button
                onClick={() => handleEnquire('Residential Plots')}
                className="inline-flex items-center space-x-2 text-sm font-bold text-slate-900 hover:text-[#FF6B00] border border-slate-300 hover:border-[#FF6B00] px-6 py-3 rounded-full transition-colors"
              >
                <span>Enquire About This</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/10] bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                alt="Residential Layout"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Service 2: Commercial Plots (Image on Left) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 lg:order-2 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#38BDF8] flex items-center justify-center">
              <Store className="w-6 h-6 text-[#38BDF8]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Commercial Plots
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Plots on main roads and near industrial and transport hubs. Suited to shops, offices, warehouses and service businesses.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1">
              <span className="inline-flex items-center space-x-1.5 bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Check className="w-3.5 h-3.5 text-sky-500" />
                <span>Main-road frontage</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Check className="w-3.5 h-3.5 text-sky-500" />
                <span>Near industrial hubs</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Check className="w-3.5 h-3.5 text-sky-500" />
                <span>Business-ready access</span>
              </span>
            </div>
            <div className="pt-2">
              <button
                onClick={() => handleEnquire('Commercial Plots')}
                className="inline-flex items-center space-x-2 text-sm font-bold text-slate-900 hover:text-[#FF6B00] border border-slate-300 hover:border-[#FF6B00] px-6 py-3 rounded-full transition-colors"
              >
                <span>Enquire About This</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/10] bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"
                alt="Commercial Highway Plot"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Service 3: Open Plots (Image on Right) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Layers className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Open Plots
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Approved open plots for steady appreciation as surrounding areas develop. Best for patient investors building wealth over time.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1">
              <span className="inline-flex items-center space-x-1.5 bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Approved layouts</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Clear boundaries</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Growth-area locations</span>
              </span>
            </div>
            <div className="pt-2">
              <button
                onClick={() => handleEnquire('Open Plots')}
                className="inline-flex items-center space-x-2 text-sm font-bold text-slate-900 hover:text-[#FF6B00] border border-slate-300 hover:border-[#FF6B00] px-6 py-3 rounded-full transition-colors"
              >
                <span>Enquire About This</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/10] bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80"
                alt="Open Plots Development"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Service 4: Open Land for Investment (Image on Left) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 lg:order-2 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Open Land for Investment
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Larger parcels for long-term holding. With a clear view of future use and exit options.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1">
              <span className="inline-flex items-center space-x-1.5 bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Check className="w-3.5 h-3.5 text-indigo-500" />
                <span>Future-use study</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Check className="w-3.5 h-3.5 text-indigo-500" />
                <span>Exit options mapped</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Check className="w-3.5 h-3.5 text-indigo-500" />
                <span>Long-horizon holding</span>
              </span>
            </div>
            <div className="pt-2">
              <button
                onClick={() => handleEnquire('Open Land for Investment')}
                className="inline-flex items-center space-x-2 text-sm font-bold text-slate-900 hover:text-[#FF6B00] border border-slate-300 hover:border-[#FF6B00] px-6 py-3 rounded-full transition-colors"
              >
                <span>Enquire About This</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/10] bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1000&q=80"
                alt="Open Land Parcel"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Service 5: Farm Lands (Image on Right) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-lime-50 text-lime-600 flex items-center justify-center">
              <Sprout className="w-6 h-6 text-lime-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Farm Lands
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Agricultural land for farming, orchards or future conversion. With checks on soil, water access and land-use rules.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1">
              <span className="inline-flex items-center space-x-1.5 bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Check className="w-3.5 h-3.5 text-lime-600" />
                <span>Soil & water checks</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Check className="w-3.5 h-3.5 text-lime-600" />
                <span>Land-use rules reviewed</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Check className="w-3.5 h-3.5 text-lime-600" />
                <span>Orchard or crop ready</span>
              </span>
            </div>
            <div className="pt-2">
              <button
                onClick={() => handleEnquire('Farm Lands')}
                className="inline-flex items-center space-x-2 text-sm font-bold text-slate-900 hover:text-[#FF6B00] border border-slate-300 hover:border-[#FF6B00] px-6 py-3 rounded-full transition-colors"
              >
                <span>Enquire About This</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/10] bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80"
                alt="Agricultural Farmland"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Service 6: Corporate Land Bank (Split Banner - PDF Page 10) */}
        <section className="bg-[#0B1528] text-white rounded-3xl overflow-hidden border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] block">
                Corporate Land Bank
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Land banks for <br />growing businesses
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                We help companies secure land ahead of expansion.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
                <div className="flex items-start space-x-2 text-xs sm:text-sm text-slate-200">
                  <Check className="w-4 h-4 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                  <span>Requirement study: size, access, utilities, zoning</span>
                </div>
                <div className="flex items-start space-x-2 text-xs sm:text-sm text-slate-200">
                  <Check className="w-4 h-4 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                  <span>Shortlisting and site visits</span>
                </div>
                <div className="flex items-start space-x-2 text-xs sm:text-sm text-slate-200">
                  <Check className="w-4 h-4 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                  <span>Title and approval due diligence</span>
                </div>
                <div className="flex items-start space-x-2 text-xs sm:text-sm text-slate-200">
                  <Check className="w-4 h-4 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                  <span>Negotiation support</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => handleEnquire('Corporate Land Bank')}
                className="inline-flex items-center space-x-2 bg-[#FF6B00] hover:bg-[#e05e00] text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all shadow-lg hover:-translate-y-0.5"
              >
                <span>Discuss Your Requirement</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
              alt="Industrial Corporate Land"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1528] via-transparent to-transparent lg:block hidden" />
          </div>
        </section>

        {/* Section: Who We Build Land Banks For (PDF Page 11) */}
        <section className="pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] block">
              Who We Build Land Banks For
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Built for expansion plans
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-3">
              <Factory className="w-8 h-8 text-slate-700 mx-auto" />
              <div className="font-bold text-sm text-slate-900">Factories</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-3">
              <Building className="w-8 h-8 text-slate-700 mx-auto" />
              <div className="font-bold text-sm text-slate-900">Warehouses</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-3">
              <Truck className="w-8 h-8 text-slate-700 mx-auto" />
              <div className="font-bold text-sm text-slate-900">Logistics Centres</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-3">
              <HeartPulse className="w-8 h-8 text-slate-700 mx-auto" />
              <div className="font-bold text-sm text-slate-900">Hospitals</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-3 col-span-2 sm:col-span-1">
              <GraduationCap className="w-8 h-8 text-slate-700 mx-auto" />
              <div className="font-bold text-sm text-slate-900">Institutions</div>
            </div>
          </div>
        </section>
      </div>

      {/* Orange CTA Banner (PDF Page 11) */}
      <OrangeCTABanner />

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialService={selectedService || 'General Land Advisory'}
      />
    </div>
  );
};

export default Services;

import React, { useState } from 'react';
import { Building2, Search, FileCheck, Handshake, CheckCircle2, Send, Loader2, Factory, Warehouse, Compass } from 'lucide-react';
import PageHeadingBanner from '../components/PageHeadingBanner';
import api from '../api/client';

const CorporateLandBank = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    industry: '',
    requiredLandArea: '',
    preferredLocation: '',
    projectRequirements: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const services = [
    {
      num: '01',
      title: 'Requirement Study',
      details: 'Size, road access, utilities (power sub-stations, water lines from Kandaleru), and zoning alignment with APIIC & regional master plans.',
      icon: Search
    },
    {
      num: '02',
      title: 'Shortlisting & Site Visits',
      details: 'Comprehensive site dossiers covering topographical contours, flood levels, soil load-bearing capacity, and turning radii for heavy commercial cargo trailers.',
      icon: Compass
    },
    {
      num: '03',
      title: 'Title & Due Diligence Coordination',
      details: '30-year Encumbrance verification, Section 22-A prohibited records check, Webland revenue history, and boundary stone survey demarcation.',
      icon: FileCheck
    },
    {
      num: '04',
      title: 'Negotiation & Acquisition Support',
      details: 'Single-owner or multi-parcel land aggregation with transparent milestone payments, escrow support, and liaison with revenue/sub-registrar authorities.',
      icon: Handshake
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        name: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        type: 'Corporate',
        interestedIn: 'Land Bank for Companies',
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        industry: formData.industry,
        requiredLandArea: formData.requiredLandArea,
        preferredLocation: formData.preferredLocation,
        projectRequirements: formData.projectRequirements,
        message: formData.message || `Corporate requirement for ${formData.requiredLandArea} in ${formData.preferredLocation}`
      };

      const res = await api.post('/enquiries', payload);
      if (res.data.success) {
        setSuccess(true);
        setFormData({
          companyName: '',
          contactPerson: '',
          email: '',
          phone: '',
          industry: '',
          requiredLandArea: '',
          preferredLocation: '',
          projectRequirements: '',
          message: ''
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit corporate enquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Black Banner Heading with script accent */}
      <PageHeadingBanner
        title="Land Banks for Growing Businesses"
        subtitle="We help manufacturing conglomerates, logistics providers, and corporate enterprises secure strategic land parcels ahead of expansion along the Tirupati-Naidupeta Growth Corridor."
        breadcrumbs={[{ label: 'Corporate Land Banks' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div data-aos="fade-right" className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest bg-sky-50 px-3 py-1 rounded-md">
              Institutional & Industrial Land Aggregation
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] leading-tight">
              Strategic Land Acquisition with Institutional-Grade Due Diligence
            </h2>
            <p className="text-zinc-600 text-base leading-relaxed">
              Securing 5 to 100+ acres for industrial plants, automated warehousing, data centres, or private institutions requires more than simple brokering. It demands rigorous title chain examination, highway access rights from NHAI, environmental clearances, and reliable utility connectivity.
            </p>
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
              <h4 className="font-bold text-zinc-900 text-sm">Target Expansion Nodes:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700">
                <div className="flex items-center space-x-2">
                  <Factory className="w-4 h-4 text-[#38BDF8]" />
                  <span>Naidupeta Industrial SEZ Node</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Warehouse className="w-4 h-4 text-[#38BDF8]" />
                  <span>Sri City Peripheral Growth Belt</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Warehouse className="w-4 h-4 text-[#38BDF8]" />
                  <span>Renigunta Electronics Manufacturing Corridor</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Factory className="w-4 h-4 text-[#38BDF8]" />
                  <span>Krishnapatnam Port Road Freight Corridor</span>
                </div>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-zinc-200">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80"
                alt="Corporate Land Aggregation"
                className="w-full h-[380px] object-cover"
              />
              <div className="p-6 bg-zinc-950 text-white">
                <span className="text-xs text-[#38BDF8] font-bold uppercase tracking-wider block mb-1">
                  Institutional Guarantee
                </span>
                <p className="text-xs text-zinc-300">
                  Clean single-owner titles, verified revenue boundaries, and full APIIC / Town Planning zoning feasibility.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Corporate Services */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest block mb-2">
              Our Structured Approach
            </span>
            <h2 className="text-3xl font-extrabold text-[#222222]">
              Corporate Land Advisory Framework
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#38BDF8] tracking-widest">
                        {item.num}
                      </span>
                      <Icon className="w-5 h-5 text-zinc-500" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900">{item.title}</h3>
                    <p className="text-xs text-zinc-600 leading-relaxed">{item.details}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Corporate Enquiry Form */}
        <div className="bg-zinc-900 text-white rounded-3xl p-8 sm:p-12 border border-zinc-800 shadow-2xl">
          <div className="max-w-2xl mx-auto text-center mb-10 space-y-2">
            <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest block">
              Confidential Discussion
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Discuss Your Corporate Requirement
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Submit your company's land criteria. Our Principal Advisory Partner will initiate contact under standard Non-Disclosure terms.
            </p>
          </div>

          {success ? (
            <div className="p-10 bg-zinc-800 rounded-2xl text-center space-y-4 max-w-lg mx-auto">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
              <h4 className="text-xl font-bold text-white">Requirement Registered</h4>
              <p className="text-sm text-zinc-300">
                Thank you. Our institutional land banking team will reach out to schedule an executive briefing.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-5">
              {error && (
                <div className="p-3 bg-red-950 border border-red-800 text-red-300 text-xs rounded-xl">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Logistics India Pvt Ltd"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Contact Person Name & Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Srinivas Rao, VP Expansion"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="srinivas@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Phone / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 99000 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Industry Sector *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Warehousing / Automotive"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Required Land Area *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 15 to 25 Acres"
                    value={formData.requiredLandArea}
                    onChange={(e) => setFormData({ ...formData, requiredLandArea: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Preferred Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. NH-16 / Naidupeta"
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Project Specific Requirements (Power, Water, Heavy Vehicle Access) *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Mention road width requirements (e.g. 60ft+ frontage), HT power proximity, timeline to possession..."
                  value={formData.projectRequirements}
                  onChange={(e) => setFormData({ ...formData, projectRequirements: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:ring-2 focus:ring-[#38BDF8]"
                />
              </div>

              <div className="pt-3 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#38BDF8] hover:bg-sky-400 text-black px-10 py-4 rounded-full font-bold text-base transition-all shadow-lg hover:scale-105"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-black" />
                      <span>Submitting Corporate Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-black" />
                      <span>Discuss Your Requirement</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CorporateLandBank;

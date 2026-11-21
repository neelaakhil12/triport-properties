import React, { useState } from 'react';
import { Globe, ShieldCheck, CheckCircle2, PhoneCall, MessageCircle, AlertTriangle, Send, Loader2, Video, Calendar } from 'lucide-react';
import PageHeadingBanner from '../components/PageHeadingBanner';
import api from '../api/client';

const NRIServices = () => {
  const [formData, setFormData] = useState({
    name: '',
    countryOfResidence: '',
    phone: '',
    whatsAppNumber: '',
    email: '',
    interestedIn: 'Residential Plots',
    budgetRange: '₹30 Lakhs - ₹60 Lakhs',
    preferredLocation: 'Tirupati / Airport Road',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const servicesList = [
    { title: 'Remote Property Consultation', desc: 'Detailed 1-on-1 virtual briefings over Zoom or Google Meet with our senior corridor advisors.' },
    { title: 'Property Shortlisting', desc: 'Custom property portfolios matching your investment horizon, risk appetite, and budget.' },
    { title: 'Virtual Property Tours', desc: 'High-definition 4K video walkthroughs and drone aerial views of boundaries and access roads.' },
    { title: 'Site Visit Coordination', desc: 'Coordinated physical inspection for your family members, parents, or appointed local representatives.' },
    { title: 'Documentation Assistance', desc: 'Procurement of Encumbrance Certificates, 1B Adangal records, Webland passbooks, and layout maps.' },
    { title: 'Title & Approval Verification', desc: 'Coordination with established high-court civil property advocates for legal title search opinions.' },
    { title: 'Registration Assistance', desc: 'Support with Power of Attorney (PoA) stamping, consular attestation, and sub-registrar scheduling.' },
    { title: 'Local Property Support', desc: 'Post-registration stone fencing, boundary demarcations, and periodic photographic updates.' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        type: 'NRI'
      };

      const res = await api.post('/enquiries', payload);
      if (res.data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          countryOfResidence: '',
          phone: '',
          whatsAppNumber: '',
          email: '',
          interestedIn: 'Residential Plots',
          budgetRange: '₹30 Lakhs - ₹60 Lakhs',
          preferredLocation: 'Tirupati / Airport Road',
          message: ''
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit NRI enquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Black Banner Heading with script accent */}
      <PageHeadingBanner
        title="Your Trusted Land Investment Partner in India"
        subtitle="Invest in your roots with confidence. Triport Properties helps NRIs explore land opportunities across the Tirupati–Naidupeta Growth Corridor with local assistance and transparent guidance."
        breadcrumbs={[{ label: 'NRI Services' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
        {/* Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div data-aos="fade-right" className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest bg-sky-50 px-3 py-1 rounded-md">
              Specialized Non-Resident Indian Advisory
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] leading-tight">
              Bridging the Distance Between You and Your Heritage Land
            </h2>
            <p className="text-zinc-600 text-base leading-relaxed">
              Managing land investments from abroad often presents challenges: lack of transparent local updates, confusing title records, and uncertainty around zoning. Triport Properties provides overseas Indians a trusted, professional point of contact on the ground in Andhra Pradesh.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-zinc-700">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Time-zone flexible video meetings</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Full NRE/NRO banking guidance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified TUDA & DTCP layouts only</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Independent legal advocate opinion</span>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-zinc-200">
              <img
                src="https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1000&q=80"
                alt="NRI Land Advisory"
                className="w-full h-[360px] object-cover"
              />
              <div className="p-6 bg-zinc-950 text-white space-y-2">
                <h4 className="font-bold text-sm text-[#38BDF8] flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  <span>Serving NRIs Across USA, UK, UAE, Singapore & Canada</span>
                </h4>
                <p className="text-xs text-zinc-400">
                  Transparent video inspections, digital documentation, and family site visit coordination.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 8 NRI Services Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest block mb-2">
              End-To-End Remote Support
            </span>
            <h2 className="text-3xl font-extrabold text-[#222222]">
              Services Curated for Non-Resident Indians
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesList.map((srv, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 50}
                className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#38BDF8] uppercase tracking-wider block mb-2">
                    Step 0{idx + 1}
                  </span>
                  <h4 className="font-bold text-base text-zinc-900 mb-2">{srv.title}</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">{srv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Notice: FEMA Guidelines on Agricultural Land */}
        <div className="p-8 rounded-3xl bg-amber-50/80 border-2 border-amber-300 space-y-3">
          <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span className="uppercase tracking-wider">Statutory Legal Guidance on NRI / OCI Property Ownership:</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
            Under the Foreign Exchange Management Act (FEMA) and Reserve Bank of India (RBI) regulations, Non-Resident Indians (NRIs) and Overseas Citizens of India (OCIs) are fully eligible to purchase <strong>residential plots, houses, commercial buildings, and commercial plots</strong> without prior RBI approval.
          </p>
          <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-semibold">
            However, NRIs and OCIs CANNOT directly purchase agricultural land, plantation property, or farmhouses in India (unless inherited from an Indian resident). At Triport Properties, we ensure all our overseas clients are advised strictly within compliance of Indian foreign exchange laws.
          </p>
        </div>

        {/* Dedicated NRI Enquiry Form */}
        <div className="bg-zinc-900 text-white rounded-3xl p-8 sm:p-12 border border-zinc-800 shadow-2xl">
          <div className="max-w-3xl mx-auto text-center mb-10 space-y-2">
            <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest block">
              Direct NRI Desk
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Connect With Our Senior NRI Advisor
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Fill in your details below to schedule a time-zone compatible phone or Zoom consultation.
            </p>
          </div>

          {success ? (
            <div className="p-10 bg-zinc-800 rounded-2xl text-center space-y-4 max-w-lg mx-auto">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
              <h4 className="text-xl font-bold text-white">NRI Consultation Booked!</h4>
              <p className="text-sm text-zinc-300">
                Our NRI desk specialist will connect with you on WhatsApp / Email within 24 hours.
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
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Varma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:ring-2 focus:ring-[#38BDF8] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Country of Residence *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. USA / UAE / Singapore"
                    value={formData.countryOfResidence}
                    onChange={(e) => setFormData({ ...formData, countryOfResidence: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:ring-2 focus:ring-[#38BDF8] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Phone (with country code) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 408 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 / +91 ..."
                    value={formData.whatsAppNumber}
                    onChange={(e) => setFormData({ ...formData, whatsAppNumber: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Property Category
                  </label>
                  <select
                    value={formData.interestedIn}
                    onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:ring-2 focus:ring-[#38BDF8]"
                  >
                    <option value="Residential Plots">Residential Plots (Approved Layouts)</option>
                    <option value="Commercial Plots">Commercial Plots</option>
                    <option value="Open Plots">Open Plots</option>
                    <option value="Open Land for Investment">Open Land Parcels</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Budget Range
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:ring-2 focus:ring-[#38BDF8]"
                  >
                    <option value="₹20 Lakhs - ₹40 Lakhs">₹20 Lakhs - ₹40 Lakhs ($25k - $50k)</option>
                    <option value="₹40 Lakhs - ₹80 Lakhs">₹40 Lakhs - ₹80 Lakhs ($50k - $100k)</option>
                    <option value="₹80 Lakhs - ₹1.5 Crores">₹80 Lakhs - ₹1.5 Crores ($100k - $180k)</option>
                    <option value="Above ₹1.5 Crores">Above ₹1.5 Crores ($180k+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Preferred Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Renigunta / Tirupati / Naidupeta"
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Message / Consultation Notes *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Share details on your goal, preferred call time zone, or specific corridor queries..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
                      <span>Scheduling NRI Consultation...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-black" />
                      <span>Connect With Our NRI Advisor</span>
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

export default NRIServices;

import React, { useState } from 'react';
import {
  Globe,
  Video,
  FileCheck,
  Scale,
  Landmark,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  PhoneCall,
  ArrowRight,
  Eye,
  Key,
  Users,
  Compass
} from 'lucide-react';
import PageHeadingBanner from '../components/PageHeadingBanner';
import EnquiryModal from '../components/EnquiryModal';

const NRIServices = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const countries = [
    'USA', 'UK', 'UAE', 'Saudi Arabia', 'Qatar',
    'Kuwait', 'Singapore', 'Australia', 'Canada'
  ];

  const pillars = [
    {
      title: "Live video site visits",
      desc: "Walk the plot with us on a video call, plus drone footage and geo-tagged photos of boundaries, access road and neighbourhood."
    },
    {
      title: "Document verification & digital vault",
      desc: "Title, encumbrance, layout approval and survey checked, then shared securely so you and your family can see every paper."
    },
    {
      title: "Legal & Power of Attorney support",
      desc: "Guidance on registering in person or through a Power of Attorney, with a qualified lawyer for drafting and final sign-off."
    },
    {
      title: "Banking & payment guidance",
      desc: "Help paying through your NRE / NRO accounts by normal banking channels, with a chartered accountant for tax questions."
    },
    {
      title: "Registration support",
      desc: "Appointment, document checklist and stamp duty steps handled, so a short trip home — or your PoA holder — is enough."
    },
    {
      title: "Property care after purchase",
      desc: "Boundary stones and fencing, periodic site inspections with photo reports, encroachment watch and tax payment reminders."
    },
    {
      title: "Resale & leasing help",
      desc: "When you are ready, we help you lease, develop or sell — with the same transparency as when you bought."
    },
    {
      title: "Family point of contact",
      desc: "Prefer your parents or siblings to visit? We guide them on site and keep you in the loop."
    }
  ];

  const steps = [
    { num: "01", title: "Video call", desc: "Share your goal, budget and timeline in a call at a time that suits you." },
    { num: "02", title: "Shortlist & tour", desc: "We shortlist eligible plots and walk you through them live on video." },
    { num: "03", title: "Verify", desc: "Full document checks, shared in your digital vault." },
    { num: "04", title: "Pay & register", desc: "Payment through banking channels; registration in person or by PoA." },
    { num: "05", title: "Ongoing care", desc: "Inspections, photo reports and support whenever you need it." }
  ];

  const faqs = [
    {
      q: "Can NRIs buy land in India?",
      a: "Yes. Under Reserve Bank of India (RBI) and FEMA regulations, Non-Resident Indians (NRIs) and Overseas Citizens of India (OCIs) are fully permitted to acquire residential and commercial plots in India. Agricultural land, farmhouses, and plantation properties cannot be acquired by purchase (permitted only by inheritance)."
    },
    {
      q: "Do I need to travel to India to buy?",
      a: "No. You can complete the legal purchase without traveling to India by executing a Special Power of Attorney (PoA) in favor of a trusted family member or our legal counsel, duly notarized and apostilled/consularized at the Indian Embassy in your country of residence."
    },
    {
      q: "How do I pay from abroad?",
      a: "All purchase payments and stamp duty charges must be remitted through legitimate inward banking channels using your NRE (Non-Resident External) or NRO (Non-Resident Ordinary) bank accounts in India. We coordinate with registered chartered accountants to provide full FEMA & tax compliance."
    },
    {
      q: "How will I know the land is genuine?",
      a: "Every parcel recommended by Triport undergoes a 30-year revenue title search, Encumbrance Certificate (EC) audit, verification of government sanction orders (TUDA / DTCP), physical boundary stone demarcation, and drone GPS coordinate confirmation uploaded to your secure digital vault."
    },
    {
      q: "Who looks after the land after I buy?",
      a: "Triport provides post-purchase property care: installation of boundary stones and fencing, geo-tagged photo inspections every quarter, encroachment surveillance, property tax payment tracking, and assistance with utility connections."
    }
  ];

  return (
    <div className="bg-white">
      {/* 1. Header Banner matching PDF Page 18 */}
      <PageHeadingBanner
        title="Invest back home, with someone you trust on the ground"
        subtitle="Special care for NRI investors: we act as your eyes, ears and hands in the corridor — from the first video tour to looking after your land for years after you buy."
        breadcrumbs={[{ label: 'NRI Services' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20 sm:space-y-28">
        {/* 2. WHY NRIS CHOOSE TRI-PORT (PDF Page 18) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] block">
              Why NRIs Choose Tri-Port
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Distance should not mean risk
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Buying land from abroad usually means relying on relatives, unclear updates and long trips for every step. We give you one accountable team, honest updates in your time zone, and every document checked before you pay a rupee.
            </p>

            {/* Serving investors in pills */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-500 block mb-3">
                Serving investors in:
              </span>
              <div className="flex flex-wrap gap-2">
                {countries.map((c) => (
                  <span
                    key={c}
                    className="text-xs font-medium bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full border border-slate-200"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4 Feature Cards Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-sky-50/70 p-6 rounded-3xl border border-sky-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
                <Users className="w-5 h-5 text-sky-600" />
              </div>
              <h3 className="font-bold text-base text-slate-900">One relationship manager</h3>
              <p className="text-xs text-slate-600 leading-relaxed">A single person who knows your file end to end</p>
            </div>

            <div className="bg-amber-50/70 p-6 rounded-3xl border border-amber-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#FF6B00] flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#FF6B00]" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Calls in your time zone</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Evening and weekend IST slots for the US, UK, Gulf and beyond</p>
            </div>

            <div className="bg-emerald-50/70 p-6 rounded-3xl border border-emerald-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Verified before you pay</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Title, encumbrance and approvals checked first</p>
            </div>

            <div className="bg-indigo-50/70 p-6 rounded-3xl border border-indigo-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Key className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Care after you buy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">We keep watching your land while you are away</p>
            </div>
          </div>
        </section>

        {/* 3. SPECIAL CARE FOR NRI INVESTORS - 8 PILLARS (PDF Page 18 & 19) */}
        <section className="pt-6">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] block">
              Special Care For NRI Investors
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Everything handled, nothing hidden
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A complete service designed for investors who cannot be here every week.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#FF6B00] flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-base text-slate-900 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. WHAT NRIS CAN BUY - FEMA COMPLIANCE (PDF Page 19) */}
        <section className="bg-amber-50/40 border border-amber-200/80 rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] block">
                FEMA Regulations
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                What NRIs can buy — we keep you compliant
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Under India’s FEMA rules, NRIs and OCIs can buy residential and commercial property, but generally cannot buy agricultural land, plantation property or farmhouses (except by inheritance). We only recommend land you are allowed to own, and confirm the current rules with a qualified advisor before you commit.
              </p>
            </div>

            {/* Compliance Table matching PDF Page 19 */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 space-y-3.5 shadow-sm">
              <div className="flex items-center justify-between py-2 border-b border-slate-100 text-sm">
                <span className="font-semibold text-slate-800">Residential plots</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Allowed</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100 text-sm">
                <span className="font-semibold text-slate-800">Commercial plots</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Allowed</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100 text-sm">
                <span className="font-semibold text-slate-800">Approved open plots (non-agricultural)</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Allowed</span>
              </div>
              <div className="flex items-center justify-between py-2 text-sm">
                <span className="font-semibold text-slate-800">Farm land, plantations, farmhouses</span>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full">Not allowed*</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                *Except by inheritance. Rules can change — always confirm with your legal or tax advisor.
              </p>
            </div>
          </div>
        </section>

        {/* 5. HOW IT WORKS - 5 STEPS (PDF Page 19) */}
        <section className="pt-6">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] block">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              From abroad to owner in five steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3"
              >
                <div className="text-3xl font-black text-[#FF6B00]">{step.num}</div>
                <h3 className="font-bold text-base text-slate-900">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. NRI QUESTIONS - ACCORDION FAQ (PDF Page 19 & 20) */}
        <section className="pt-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] block">
              NRI Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Answers before you ask
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Can’t find your question? Message us on WhatsApp.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between font-bold text-sm sm:text-base text-slate-900 hover:text-[#FF6B00] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg font-bold text-slate-400">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. BOOK A CALL IN YOUR TIME ZONE - DEEP NAVY BANNER (PDF Page 20) */}
        <section className="bg-[#0B1528] text-white rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Book a call in your time zone
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Tell us where you are and when suits you. Your NRI relationship manager will call you.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 flex-shrink-0">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center space-x-2 bg-[#FF6B00] hover:bg-[#e05e00] text-white px-7 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all shadow-lg hover:-translate-y-0.5"
            >
              <span>Schedule an NRI Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/919848012345?text=Hello%20Triport%20Properties,%20I%20am%20an%20NRI%20investor%20and%20would%20like%20to%20schedule%20a%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white hover:bg-slate-100 text-slate-900 px-7 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all shadow-md hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </section>
      </div>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialService="NRI Advisory Consultation"
      />
    </div>
  );
};

export default NRIServices;

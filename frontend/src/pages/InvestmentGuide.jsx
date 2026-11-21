import React, { useState } from 'react';
import { Target, MapPin, ShieldCheck, Footprints, CheckCircle2, ArrowRight, PhoneCall } from 'lucide-react';
import PageHeadingBanner from '../components/PageHeadingBanner';
import EnquiryModal from '../components/EnquiryModal';

const InvestmentGuide = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const steps = [
    {
      step: 1,
      title: 'Tell Us Your Goal',
      description: 'Home, business, farming, or long-term holding.',
      details: 'We begin with an in-depth requirement conversation. Whether you plan to build a family villa in 3 years, establish a warehouse, cultivate an orchard, or create a 7-year capital holding, your purpose dictates the right zoning and location.',
      icon: Target
    },
    {
      step: 2,
      title: 'Shortlist Locations',
      description: 'We match your budget and purpose to the right part of the corridor.',
      details: 'We filter the corridor axis: temple-demand proximity in Tirupati, highway commercial frontages on NH-71, or logistics connectivity approaching Naidupeta and Krishnapatnam port. You receive a curated portfolio with factual connectivity data.',
      icon: MapPin
    },
    {
      step: 3,
      title: 'Verify the Land',
      description: 'Title check, encumbrance check, layout approval and boundary survey.',
      details: 'The core of our advisory: We verify 30-year Encumbrance Certificates, revenue Webland 1B records, Field Measurement Book (FMB) survey sketches, and TUDA/DTCP sanction final LP approvals. Zero unapproved land is ever presented.',
      icon: ShieldCheck
    },
    {
      step: 4,
      title: 'Visit With Us',
      description: 'Site visit with local guidance on access, neighbours and development.',
      details: 'Our senior corridor advisor accompanies you or your family on a physical site inspection. We inspect physical road widths, neighborhood developments, groundwater availability, and high-tension line clearances firsthand.',
      icon: Footprints
    },
    {
      step: 5,
      title: 'Complete the Purchase',
      description: 'Registration support and document checklist, with a qualified lawyer recommended for final sign-off.',
      details: 'We support document drafting, verify link document chains, and coordinate registration at the sub-registrar office. We always recommend independent legal verification with an advocate of your choice before final registry.',
      icon: CheckCircle2
    }
  ];

  return (
    <div className="bg-white">
      {/* Black Banner Heading with script accent */}
      <PageHeadingBanner
        title="How We Help You Invest Safely"
        subtitle="Our 5-step transparent due diligence and advisory process protects your capital from speculative pitfalls and title ambiguities."
        breadcrumbs={[{ label: 'Investment Guide' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Timeline / Process */}
        <div className="relative border-l-2 border-[#38BDF8] ml-4 sm:ml-32 md:ml-40 space-y-14">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="relative pl-8 sm:pl-12 group"
              >
                {/* Number Badge & Icon on timeline */}
                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-black border-2 border-[#38BDF8] text-white flex items-center justify-center font-bold text-xs shadow-md group-hover:bg-[#38BDF8] group-hover:text-black transition-colors">
                  {item.step}
                </div>

                {/* Left Step Label for larger screens */}
                <div className="hidden sm:block absolute -left-36 top-1 text-right w-28 text-xs font-bold uppercase tracking-wider text-zinc-400 group-hover:text-[#38BDF8] transition-colors">
                  Step 0{item.step}
                </div>

                {/* Content Box */}
                <div className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#38BDF8] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-sky-800" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-zinc-900">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#38BDF8] font-bold">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <p className="text-zinc-600 text-sm leading-relaxed mt-4 pt-3 border-t border-zinc-200/60">
                    {item.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 p-8 sm:p-12 bg-black text-white rounded-3xl text-center space-y-5">
          <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest block">
            Ready to Begin Step 1?
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            Tell Us What You Are Looking For
          </h3>
          <p className="text-zinc-300 text-sm max-w-xl mx-auto font-light">
            No sales pitches. Just plain-language guidance, clear revenue records, and realistic corridor insights.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center space-x-2 bg-[#38BDF8] hover:bg-sky-400 text-black px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-lg hover:scale-105"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Initiate Free Advisory Consultation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Start Your 5-Step Land Advisory"
        defaultType="General"
      />
    </div>
  );
};

export default InvestmentGuide;

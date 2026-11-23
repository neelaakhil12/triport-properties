import React, { useState } from 'react';
import { MessageCircle, PhoneCall } from 'lucide-react';
import EnquiryModal from './EnquiryModal';

const OrangeCTABanner = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const whatsappNumber = "919848012345";

  return (
    <>
      <section className="bg-[#FF6B00] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-black/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Not sure where to invest?
            </h2>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed font-normal">
              Book a free consultation. We will listen to your goal and show you the right part of the corridor, with no pressure to buy.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center space-x-2 bg-[#0B1528] hover:bg-[#111F38] text-white px-7 py-3.5 rounded-full text-sm sm:text-base font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              <PhoneCall className="w-4 h-4 text-[#FF6B00]" />
              <span>Book a Free Consultation</span>
            </button>

            <a
              href={`https://wa.me/${whatsappNumber}?text=Hello%20Triport%20Properties,%20I%20would%20like%20to%20book%20a%20free%20consultation%20regarding%20land%20investment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white hover:bg-zinc-100 text-[#0B1528] px-7 py-3.5 rounded-full text-sm sm:text-base font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialService="General Land Advisory"
      />
    </>
  );
};

export default OrangeCTABanner;

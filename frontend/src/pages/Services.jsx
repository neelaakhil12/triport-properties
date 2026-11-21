import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, PhoneCall, Sparkles, UserCheck } from 'lucide-react';
import PageHeadingBanner from '../components/PageHeadingBanner';
import api from '../api/client';
import EnquiryModal from '../components/EnquiryModal';

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        if (res.data?.data) {
          setServices(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load services:', err);
      }
    };
    fetchServices();
  }, []);

  const handleEnquire = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  return (
    <div className="bg-white">
      {/* Black Banner Heading with script accent */}
      <PageHeadingBanner
        title="Land Options for Every Investment Goal"
        subtitle="Vetted residential layouts, commercial highway parcels, agro holdings, and strategic corporate land banks across the Tirupati-Naidupeta corridor."
        breadcrumbs={[{ label: 'Services' }]}
      />

      {/* Services List */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {services.map((service, index) => {
          const isEven = index % 2 === 1;
          return (
            <div
              key={service._id || index}
              data-aos="fade-up"
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-zinc-50/60 p-6 sm:p-10 rounded-3xl border border-zinc-200/80 shadow-sm hover:shadow-md transition-shadow ${
                isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Column */}
              <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : ''}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-zinc-200 aspect-[4/3] bg-zinc-100 group">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-[#38BDF8] text-xs font-bold px-3 py-1 rounded-full uppercase">
                    Service 0{index + 1}
                  </div>
                </div>
              </div>

              {/* Text Details Column */}
              <div className={`lg:col-span-7 space-y-5 ${isEven ? 'lg:order-1' : ''}`}>
                <div>
                  <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest block mb-1">
                    {service.tagline || 'Specialized Land Advisory'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
                    {service.name}
                  </h3>
                </div>

                <p className="text-zinc-700 text-sm sm:text-base leading-relaxed">
                  {service.fullDescription || service.shortDescription}
                </p>

                {/* Key Benefits */}
                {service.benefits?.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                      Key Highlights & Verification:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700">
                      {service.benefits.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ideal For */}
                {service.idealFor?.length > 0 && (
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-zinc-500 flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Best Suited For:</span>
                    </span>
                    {service.idealFor.map((target, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs bg-white text-zinc-800 px-2.5 py-1 rounded-md border border-zinc-200 font-medium"
                      >
                        {target}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                <div className="pt-3">
                  <button
                    onClick={() => handleEnquire(service)}
                    className="inline-flex items-center space-x-2 bg-black hover:bg-zinc-800 text-white px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    <PhoneCall className="w-4 h-4 text-[#38BDF8]" />
                    <span>Enquire About {service.name}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Enquire About ${selectedService?.name || 'Land Service'}`}
        defaultService={selectedService?.name || 'Residential Plots'}
        targetTitle={selectedService?.name || ''}
      />
    </div>
  );
};

export default Services;

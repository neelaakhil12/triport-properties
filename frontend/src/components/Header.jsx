import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PhoneCall, MessageCircle } from 'lucide-react';
import api from '../api/client';
import EnquiryModal from './EnquiryModal';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [generalSettings, setGeneralSettings] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const fetchGeneral = async () => {
      try {
        const res = await api.get('/settings/general');
        if (res.data?.data) {
          setGeneralSettings(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load header settings', err);
      }
    };
    fetchGeneral();
  }, []);

  // 7 Navigation Links matching the Client Design PDF (Pages 1, 7, 9, 12, 15, 17, 18)
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Locations', path: '/locations' },
    { name: 'Listings', path: '/listings' },
    { name: 'NRI Services', path: '/nri-services' },
    { name: 'Contact', path: '/contact' },
  ];

  const whatsapp = generalSettings?.whatsappNumber || '+91 98480 12345';

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg py-2.5 border-b border-slate-200/80'
            : 'bg-white/90 backdrop-blur-xl py-3.5 sm:py-4 border-b border-slate-200/60 shadow-md'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between">
            {/* Left: Client Logo - 100% Crisp & High-Contrast on Glassy White Background */}
            <div className="flex items-center min-w-0">
              <Link to="/" className="flex items-center group py-0.5 mr-4 sm:mr-8 lg:mr-10 xl:mr-14 flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="Triport Properties - Every Route Leads to Growth"
                  className="h-11 sm:h-14 md:h-16 lg:h-[72px] w-auto object-contain group-hover:scale-102 transition-transform drop-shadow-sm"
                />
              </Link>

              {/* Desktop Navigation (Exact 7 Links from PDF) */}
              <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                {navLinks.map((link) => {
                  const isActive =
                    location.pathname === link.path ||
                    (link.path === '/listings' && location.pathname.startsWith('/projects'));
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`px-3 py-2 xl:px-3.5 xl:py-2 rounded-lg text-sm transition-all whitespace-nowrap font-bold ${
                        isActive
                          ? 'text-[#FF6B00] border-b-2 border-[#FF6B00] rounded-none'
                          : 'text-slate-800 hover:text-[#FF6B00] hover:bg-slate-100/60'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right: CTA Button - "Book a Free Consultation" in vibrant orange */}
            <div className="hidden lg:flex items-center space-x-3 flex-shrink-0 ml-3">
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="inline-flex items-center space-x-2 bg-[#FF6B00] hover:bg-[#e05e00] text-white px-5 py-2.5 rounded-full text-xs xl:text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
              >
                <span>Book a Free Consultation</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="bg-[#FF6B00] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm"
              >
                Consult
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-800 hover:bg-slate-100 focus:outline-none transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer (Glassy Modal Style) */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-3 duration-200">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.path ||
                  (link.path === '/listings' && location.pathname.startsWith('/projects'));
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-amber-50 text-[#FF6B00]'
                        : 'text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-slate-200 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setEnquiryModalOpen(true);
                }}
                className="w-full bg-[#FF6B00] hover:bg-[#e05e00] text-white text-center py-3 rounded-full text-sm font-bold shadow-md"
              >
                Book a Free Consultation
              </button>

              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Triport%20Properties,%20I%20am%20interested%20in%20land%20advisory.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-full text-xs font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Consultation Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        initialService="Free Land Advisory Consultation"
      />
    </>
  );
};

export default Header;

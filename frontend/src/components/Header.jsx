import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PhoneCall, Compass, ShieldCheck, UserCircle, MessageSquare } from 'lucide-react';
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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'NRI Services', path: '/nri-services' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const phone = generalSettings?.phone || '+91 877 225 9988';
  const whatsapp = generalSettings?.whatsappNumber || '+91 98480 12345';

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-2 sm:py-3 border-b border-zinc-200' : 'bg-white py-2.5 sm:py-4.5 border-b border-zinc-100 shadow-sm'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between">
            {/* Left: Prominent Logo with clean mobile-safe scaling & generous desktop gap */}
            <div className="flex items-center min-w-0">
              <Link to="/" className="flex items-center group py-0.5 mr-3 sm:mr-8 lg:mr-10 xl:mr-14 flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="Triport Properties"
                  className="h-12 sm:h-16 md:h-20 lg:h-[84px] max-w-[140px] xs:max-w-[170px] sm:max-w-none w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-sm"
                />
              </Link>

              {/* Desktop Navigation with 7 clean items */}
              <nav className="hidden lg:flex items-center space-x-1.5 xl:space-x-3">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`px-3 py-2 xl:px-4 xl:py-2.5 rounded-lg text-sm transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-black text-white shadow-sm font-semibold'
                          : 'text-zinc-700 hover:bg-zinc-100 hover:text-[#38BDF8] font-medium'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right: CTA Button */}
            <div className="hidden lg:flex items-center space-x-3 flex-shrink-0 ml-3">
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="inline-flex items-center space-x-2 bg-black hover:bg-zinc-800 text-white px-4 py-2 xl:px-5 xl:py-2.5 rounded-full text-xs xl:text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4 text-[#38BDF8]" />
                <span>Talk to an Advisor</span>
              </button>
            </div>

            {/* Mobile Actions: Advisor Quick Button & Hamburger */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 lg:hidden flex-shrink-0">
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full bg-black text-white text-[11px] sm:text-xs font-semibold flex items-center space-x-1 shadow-sm whitespace-nowrap"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span className="hidden xs:inline">Advisor</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 sm:p-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 focus:outline-none transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-zinc-200 px-4 pt-3 pb-6 space-y-1 shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block px-4 py-2.5 rounded-lg text-base font-semibold ${
                      isActive
                        ? 'bg-black text-white'
                        : 'text-zinc-800 hover:bg-zinc-100'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-zinc-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setEnquiryModalOpen(true);
                }}
                className="w-full flex items-center justify-center space-x-2 bg-black text-white py-3 rounded-lg font-semibold shadow-md"
              >
                <PhoneCall className="w-4 h-4 text-[#38BDF8]" />
                <span>Talk to an Advisor</span>
              </button>

              <div className="flex items-center justify-center px-2 pt-2 text-xs font-medium text-zinc-600">
                <a
                  href={`tel:${phone}`}
                  className="hover:underline flex items-center gap-1 text-zinc-700"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#38BDF8]" />
                  Call: {phone}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Advisor Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        title="Consult With Our Land Investment Advisor"
        defaultType="General"
      />
    </>
  );
};

export default Header;

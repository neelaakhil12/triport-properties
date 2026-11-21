import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck, MessageCircle, ExternalLink } from 'lucide-react';
import api from '../api/client';

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings/general');
        if (res.data?.data) {
          setSettings(res.data.data);
        }
      } catch (err) {
        console.error('Error loading footer settings', err);
      }
    };
    fetchSettings();
  }, []);

  const companyName = settings?.companyName || 'Triport Properties';
  const tagline = settings?.tagline || 'Every Route Leads to Growth. Join the Growth Corridor.';
  const email = settings?.email || 'advisory@triportproperties.com';
  const phone = settings?.phone || '+91 877 225 9988';
  const whatsapp = settings?.whatsappNumber || '+91 98480 12345';
  const address = settings?.officeAddress || 'Triport Tower, 3rd Floor, Near Regional Science Centre, Alipiri - Renigunta Bypass Road, Tirupati, Andhra Pradesh - 517501, India';
  const hours = settings?.officeHours || 'Mon - Sat: 9:00 AM - 6:30 PM | Sun: Site Visits by Prior Appointment';
  const disclaimer = settings?.footerDisclaimer || 'Information on this site is for general guidance only and is not an offer to sell. Buyers should verify title, approvals and documents independently and consult a qualified lawyer before purchase.';

  return (
    <footer className="bg-[#5C4033] text-white pt-16 pb-10 border-t-4 border-[#38BDF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tagline Banner with Transparent Logo */}
        <div className="pb-10 mb-12 border-b border-[#7A5645] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="mb-4">
              <Link
                to="/"
                className="inline-block group py-1"
                title="Triport Properties"
              >
                <img
                  src="/logo.png"
                  alt="Triport Properties"
                  className="h-14 sm:h-20 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-[0_0_1px_rgba(255,255,255,0.7)]"
                />
              </Link>
            </div>
            <p className="text-amber-200/90 text-base sm:text-lg font-medium max-w-xl">{tagline}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Triport%20Properties%20team,%20I%20am%20interested%20in%20land%20investment%20options.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-[#38BDF8] hover:bg-sky-300 text-black px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#7A5645]">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold tracking-wide text-[#38BDF8] uppercase text-xs">About Our Advisory</h4>
            <p className="text-amber-100/80 text-sm leading-relaxed">
              We are a dedicated land investment advisory operating across the Tirupati-Naidupeta Growth Corridor in Andhra Pradesh. We guide individuals, families, and corporates to verified and legally compliant land opportunities.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-xs text-amber-200">
              <ShieldCheck className="w-5 h-5 text-[#38BDF8]" />
              <span>Verified Titles • Layout Sanctions • Site Access</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold tracking-wide text-[#38BDF8] uppercase text-xs">Quick Links</h4>
            <ul className="space-y-2 text-sm text-amber-100/90">
              <li>
                <Link to="/" className="hover:text-[#38BDF8] transition-colors flex items-center space-x-1">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#38BDF8] transition-colors">
                  About Triport Properties
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#38BDF8] transition-colors">
                  Featured Corridor Projects
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#38BDF8] transition-colors">
                  Land Advisory Services
                </Link>
              </li>
              <li>
                <Link to="/about#locations" className="hover:text-[#38BDF8] transition-colors">
                  Growth Corridor Connectivity
                </Link>
              </li>
              <li>
                <Link to="/nri-services" className="hover:text-[#38BDF8] transition-colors">
                  NRI Investment Advisory
                </Link>
              </li>
              <li>
                <Link to="/corporate-land-bank" className="hover:text-[#38BDF8] transition-colors">
                  Corporate Land Banks
                </Link>
              </li>
              <li>
                <Link to="/investment-guide" className="hover:text-[#38BDF8] transition-colors">
                  Safe Investment Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Land Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold tracking-wide text-[#38BDF8] uppercase text-xs">Land Advisory Services</h4>
            <ul className="space-y-2 text-sm text-amber-100/90">
              <li>
                <Link to="/services" className="hover:text-[#38BDF8] transition-colors">
                  Residential Plots (TUDA/DTCP)
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#38BDF8] transition-colors">
                  Commercial Highway Plots
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#38BDF8] transition-colors">
                  Approved Open Plots
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#38BDF8] transition-colors">
                  Open Land for Capital Holding
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#38BDF8] transition-colors">
                  Fertile Farm Lands
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#38BDF8] transition-colors">
                  Industrial Corporate Land Banks
                </Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-[#38BDF8] transition-colors">
                  Corridor News & Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold tracking-wide text-[#38BDF8] uppercase text-xs">Advisory Office</h4>
            <ul className="space-y-3 text-sm text-amber-100/90">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{address}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-[#38BDF8] transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-[#38BDF8] transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <span className="text-xs">{hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-8 space-y-4 text-xs text-amber-200/70">
          <div className="p-4 rounded-lg bg-[#422D24] border border-[#7A5645] leading-relaxed">
            <span className="font-bold text-amber-100 block mb-1">Statutory Disclaimer:</span>
            {disclaimer}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div>
              &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-amber-100/80">
              <Link to="/about" className="hover:underline">Privacy Policy</Link>
              <span>•</span>
              <Link to="/about" className="hover:underline">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

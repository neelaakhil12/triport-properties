import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
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

  const phone = settings?.phone || '+91 98480 12345';
  const email = settings?.email || 'advisory@triport.in';
  const address = settings?.officeAddress || 'Triport Advisory Center, Near Highway Junction, Naidupeta, Tirupati District, Andhra Pradesh - 524126, India';
  const hours = settings?.officeHours || 'Mon – Sat, 9:30 am – 6:30 pm';

  return (
    <footer className="bg-[#0B1528] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-Column Grid matching PDF Exactly */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Advisory Mission (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block group py-1">
              <img
                src="/logo.png"
                alt="Triport Properties"
                className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-md"
              />
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Land and investment advisory for the green belt, industrial corridor, educational hub and port-led trade around Naidupeta.
            </p>
          </div>

          {/* Column 2: Explore (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-100">Explore</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/locations" className="hover:text-white transition-colors">Locations</Link></li>
              <li><Link to="/listings" className="hover:text-white transition-colors">Listings</Link></li>
              <li><Link to="/nri-services" className="hover:text-white transition-colors">NRI Services</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Services (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-100">Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/services" className="hover:text-white transition-colors">Residential Plots</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Commercial Plots</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Open Plots</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Open Land for Investment</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Farm Lands</Link></li>
              <li><Link to="/corporate-land-bank" className="hover:text-white transition-colors">Land Bank for Companies</Link></li>
              <li><Link to="/nri-services" className="text-[#FF6B00] hover:text-[#ff852e] font-medium transition-colors">NRI Services</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-100">Contact</h4>
            <div className="space-y-2.5 text-sm text-slate-300">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#FF6B00] flex-shrink-0 mt-1" />
                <span className="leading-snug">{address}</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#FF6B00] flex-shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-white transition-colors">{phone}</a>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#FF6B00] flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
              </p>
              <p className="flex items-center space-x-2 text-slate-400">
                <Clock className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <span>{hours}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar matching PDF */}
        <div className="pt-8 space-y-4">
          <p className="text-xs text-slate-400 leading-relaxed">
            Disclaimer: Information on this site is for general guidance only and is not an offer to sell. Buyers should verify title, approvals and documents independently and consult a qualified lawyer before purchase. RERA or layout approval numbers are shown on each listing where applicable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-2 gap-2">
            <div>
              &copy; 2026 Tri-Port Properties &middot; <span className="text-slate-400">triport.in</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/contact" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
              <span>&middot;</span>
              <Link to="/contact" className="hover:text-slate-300 transition-colors">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

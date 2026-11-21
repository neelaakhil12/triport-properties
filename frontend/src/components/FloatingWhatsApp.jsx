import React, { useState, useEffect } from 'react';
import api from '../api/client';

const FloatingWhatsApp = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('919848012345');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings/general');
        if (res.data?.data?.whatsappNumber) {
          const clean = res.data.data.whatsappNumber.replace(/[^0-9]/g, '');
          if (clean) setWhatsappNumber(clean);
        }
      } catch (err) {
        // Fallback default is active
      }
    };
    fetchSettings();
  }, []);

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20Triport%20Properties%20team,%20I%20am%20interested%20in%20land%20investment%20opportunities%20in%20the%20Tirupati-Naidupeta%20Growth%20Corridor.`;

  return (
    <aside
      aria-label="Contact options"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center group pointer-events-auto"
    >
      {/* Tooltip on Desktop hover */}
      <span className="hidden md:inline-block mr-3 px-3.5 py-1.5 bg-zinc-900/95 text-white text-xs font-semibold rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-zinc-700">
        Chat on WhatsApp
      </span>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Chat with Triport Properties Advisor"
        className="relative flex items-center justify-center w-13 h-13 sm:w-15 sm:h-15 w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300/60"
      >
        {/* Animated Ripple Pulse */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping -z-10"></span>

        {/* WhatsApp Official SVG Icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2M12.05 20.16C10.57 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16M16.56 14.39C16.31 14.27 15.09 13.67 14.86 13.58C14.64 13.5 14.47 13.46 14.31 13.7C14.15 13.95 13.68 14.5 13.53 14.66C13.39 14.83 13.25 14.85 13 14.73C12.75 14.6 11.7 14.26 10.45 13.15C9.48 12.28 8.83 11.21 8.65 10.89C8.47 10.58 8.63 10.41 8.76 10.28C8.87 10.17 9.01 9.99 9.14 9.84C9.27 9.69 9.31 9.58 9.39 9.42C9.47 9.25 9.43 9.11 9.37 8.99C9.31 8.86 8.82 7.66 8.62 7.17C8.42 6.69 8.22 6.75 8.06 6.74C7.92 6.73 7.76 6.73 7.59 6.73C7.43 6.73 7.16 6.79 6.93 7.04C6.71 7.29 6.09 7.87 6.09 9.05C6.09 10.23 6.95 11.37 7.07 11.53C7.19 11.7 8.76 14.11 11.17 15.15C11.74 15.4 12.19 15.55 12.53 15.66C13.11 15.84 13.63 15.82 14.05 15.76C14.52 15.69 15.49 15.17 15.69 14.6C15.89 14.03 15.89 13.54 15.83 13.44C15.77 13.34 15.61 13.28 15.36 13.16Z" />
        </svg>
      </a>
    </aside>
  );
};

export default FloatingWhatsApp;

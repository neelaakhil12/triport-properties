import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Compass,
  MapPin,
  MessageSquare,
  Users,
  Building2,
  Factory,
  GraduationCap,
  Ship,
  Sparkles,
  Layers,
  Sprout,
  Store,
  TrendingUp,
  FileText,
  Navigation,
  Check,
  Star
} from 'lucide-react';
import api from '../api/client';
import EnquiryModal from '../components/EnquiryModal';
import OrangeCTABanner from '../components/OrangeCTABanner';

const Home = () => {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState(null);
  const [activeEngine, setActiveEngine] = useState(0);

  // 4 Growth Engines matching PDF Page 1 & 2
  const growthEngines = [
    {
      id: "01",
      name: "Green Belt",
      subtitle: "Farm lands, orchards and open countryside",
      desc: "Fertile farm land and open countryside around Naidupeta — for farming, orchards, farmhouses and long-term holding.",
      bestFor: ["Farm Lands", "Open Land for Investment"],
      dotColor: "#10B981", // Green
      pinX: "38%",
      pinY: "72%"
    },
    {
      id: "02",
      name: "Industrial Corridor",
      subtitle: "Naidupeta – Sullurpeta – Tada belt",
      desc: "The Naidupeta – Sullurpeta – Tada belt is one of Andhra Pradesh’s major industrial corridors, drawing factories, suppliers and a growing workforce.",
      bestFor: ["Commercial Plots", "Land Bank for Companies"],
      dotColor: "#38BDF8", // Sky blue
      pinX: "68%",
      pinY: "65%"
    },
    {
      id: "03",
      name: "Educational Hub",
      subtitle: "Tirupati’s institutes and universities",
      desc: "Tirupati is home to IIT Tirupati, IISER Tirupati and long-established universities — steady housing demand from students, faculty and families.",
      bestFor: ["Residential Plots", "Open Plots"],
      dotColor: "#818CF8", // Indigo
      pinX: "30%",
      pinY: "52%"
    },
    {
      id: "04",
      name: "Ports & Trade",
      subtitle: "Import–export through coastal ports",
      desc: "Krishnapatnam port links the region to coastal and export trade, with Ramayapatnam and Dugarajapatnam adding future capacity.",
      bestFor: ["Commercial Plots", "Warehousing & logistics land"],
      dotColor: "#FF6B00", // Orange
      pinX: "78%",
      pinY: "48%"
    }
  ];

  // Auto-cycle through engines every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveEngine((prev) => (prev + 1) % growthEngines.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Fetch listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get('/listings?limit=4');
        if (res.data?.data) {
          setFeaturedListings(res.data.data.slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to load listings', err);
      }
    };
    fetchListings();
  }, []);

  const defaultListings = [
    {
      id: "l1",
      category: "Farm Land",
      title: "[Village], near Naidupeta",
      location: "Naidupeta Countryside",
      size: "[X] acres",
      approval: "Agricultural · [status]",
      roadAccess: "33ft Blacktop Road",
      toNH16: "4.5 km",
      priceRange: "[₹ range]",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "l2",
      category: "Residential Plot",
      title: "[Layout name], Naidupeta",
      location: "Near Airport Road Junction",
      size: "[XXX] sq. yd",
      approval: "Layout approved · [No.]",
      roadAccess: "40ft Internal CC Road",
      toNH16: "2.5 km",
      priceRange: "[₹ range]",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "l3",
      category: "Commercial Plot",
      title: "Near [industrial hub], Sullurpeta",
      location: "NH-16 Corridor",
      size: "[XXX] sq. yd",
      approval: "[Approval status]",
      roadAccess: "150ft Highway Frontage",
      toNH16: "Direct Access",
      priceRange: "[₹ range]",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "l4",
      category: "Open Land",
      title: "[Survey No.], near Tada",
      location: "Tada Belt Expansion",
      size: "[X] acres",
      approval: "[Approval status]",
      roadAccess: "60ft Industrial Link Road",
      toNH16: "3.2 km",
      priceRange: "[₹ range]",
      image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const displayListings = featuredListings.length > 0 ? featuredListings : defaultListings;

  // 10 Verified Client Reviews
  const allClientReviews = [
    {
      id: 1,
      clientName: "Harsha Lanka",
      location: "Hyderabad, India",
      role: "Residential Plot (Corridor Prime Greens)",
      quote: "Satish and team are absolutely wonderful to work with. It is like having a friend on the inside who is working for you. They responded fast all the time and got us the best plot under our budget. Team was honest and forthright – no games. After dealing with several other agents, we felt lucky to find Triport."
    },
    {
      id: 2,
      clientName: "Vinod Kumar E",
      location: "NRI Investor, Canada",
      role: "2-Acre Investment Parcel near Naidupeta",
      quote: "Buying the right plot or agricultural parcel when you stay overseas in Canada is never easy. But the Triport team made it absolutely seamless. They coordinated the title checks, boundary stones, and video walk-throughs with complete clarity. We will continue to recommend them to all our family and friends."
    },
    {
      id: 3,
      clientName: "Hari Krishna P",
      location: "Industrial Vendor, Hyderabad",
      role: "Commercial Plot along Highway",
      quote: "The team helped us with an open plot with clear title near the expansion corridor. They were extremely helpful, open, transparent, and reliable through the whole process. They really cared about us, understood our commercial access needs from the very first discussion, and even assured us with factual resale and development data."
    },
    {
      id: 4,
      clientName: "Dr. S. R. Murthy",
      location: "Bengaluru, India",
      role: "TUDA Approved Open Plot",
      quote: "Exceptional legal due diligence. The title chain and encumbrance certificates were vetted and explained in plain language without unnecessary jargon."
    },
    {
      id: 5,
      clientName: "K. Rajeshwari",
      location: "Chennai, Tamil Nadu",
      role: "Farm Land near Naidupeta",
      quote: "Purchased fertile farmland with abundant water. Honest advisors who live and work right on the corridor."
    },
    {
      id: 6,
      clientName: "Venkatramana Reddy",
      location: "Tirupati, AP",
      role: "Commercial Highway Plot",
      quote: "Top-notch local ground knowledge. Guided us to NH-16 frontage land before prices surged."
    },
    {
      id: 7,
      clientName: "Anand & Priya Joshi",
      location: "Pune, Maharashtra",
      role: "Long-term Land Investment",
      quote: "Very straightforward team. No artificial pressure to buy, only factual guidance on infrastructure and future exits."
    },
    {
      id: 8,
      clientName: "Suresh Baburao",
      location: "Dubai, UAE",
      role: "NRI Portfolio Investor",
      quote: "Their NRI advisory is world-class. From Power of Attorney support to NRE banking guidance, everything was handled cleanly."
    },
    {
      id: 9,
      clientName: "G. Chandra Shekar",
      location: "Nellore, AP",
      role: "Industrial Logistics Parcel",
      quote: "Curated multi-acre land for our warehousing setup near Krishnapatnam port link. Outstanding execution."
    },
    {
      id: 10,
      clientName: "P. Madhusudhan Rao",
      location: "Vijayawada, AP",
      role: "Gated Layout Plot",
      quote: "True professionals. Highly recommended for anyone seeking safe and verified property in the Tirupati–Naidupeta belt."
    }
  ];

  return (
    <div className="bg-white">
      {/* ======================================================== */}
      {/* 1. HERO SECTION (EXACT DESIGN MATCHING PDF PAGE 1)       */}
      {/* ======================================================== */}
      <section className="relative min-h-[680px] sm:min-h-[760px] lg:min-h-[820px] bg-[#08101E] text-white overflow-hidden flex items-center pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-28">
        {/* Full-width vector artwork of the perspective highway and green agricultural parcels matching PDF */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          {/* Mobile Optimized Highway Vector Artwork (Visible on screens < md) - Perfectly Centered, Never Cut Off */}
          <svg
            className="w-full h-full object-cover md:hidden"
            viewBox="0 0 600 1100"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="heroSkyMobile" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#08101E" />
                <stop offset="40%" stopColor="#0D1C34" />
                <stop offset="70%" stopColor="#1E3A5F" />
                <stop offset="88%" stopColor="#8A3D12" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              <radialGradient id="sunGlowMobile" cx="80%" cy="42%" r="28%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
                <stop offset="55%" stopColor="#D97706" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#08101E" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="highwayAsphaltMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="100%" stopColor="#1E293B" />
              </linearGradient>
            </defs>

            {/* Sky Background */}
            <rect x="0" y="0" width="600" height="390" fill="url(#heroSkyMobile)" />

            {/* Sun Glow on Far Right Horizon */}
            <circle cx="480" cy="370" r="130" fill="url(#sunGlowMobile)" />

            {/* Distant Hills / Horizon Line */}
            <path
              d="M 0 380 Q 150 365 300 375 T 600 370 L 600 390 L 0 390 Z"
              fill="#183623"
              opacity="0.95"
            />

            {/* Left Far Fields */}
            <polygon points="0,380 290,380 240,500 0,530" fill="#2E5A2A" />
            <polygon points="0,530 240,500 190,680 0,720" fill="#3D7336" />
            <polygon points="0,720 190,680 140,1100 0,1100" fill="#295125" />

            {/* Right Far Fields */}
            <polygon points="310,380 600,380 600,530 360,500" fill="#3E7538" />
            <polygon points="360,500 600,530 600,720 410,680" fill="#284E23" />
            <polygon points="410,680 600,720 600,1100 460,1100" fill="#366831" />

            {/* Centered Perspective Highway */}
            <polygon points="292,375 308,375 460,1100 140,1100" fill="url(#highwayAsphaltMobile)" />

            {/* Center Dashed Lane Line */}
            <line
              x1="300"
              y1="375"
              x2="300"
              y2="1100"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeDasharray="26 18"
            />

            {/* Yellow Highway Shoulders */}
            <line x1="292" y1="375" x2="140" y2="1100" stroke="#F59E0B" strokeWidth="2.5" opacity="0.75" />
            <line x1="308" y1="375" x2="460" y2="1100" stroke="#F59E0B" strokeWidth="2.5" opacity="0.75" />

            {/* Field Grid Borders */}
            <line x1="0" y1="530" x2="240" y2="500" stroke="#52944B" strokeWidth="1.5" opacity="0.4" />
            <line x1="0" y1="720" x2="190" y2="680" stroke="#52944B" strokeWidth="1.5" opacity="0.4" />
            <line x1="360" y1="500" x2="600" y2="530" stroke="#52944B" strokeWidth="1.5" opacity="0.4" />
            <line x1="410" y1="680" x2="600" y2="720" stroke="#52944B" strokeWidth="1.5" opacity="0.4" />

            {/* Location Pin Markers on Mobile */}
            <g transform="translate(80, 600) scale(1)">
              <circle cx="12" cy="12" r="12" fill="#FFFFFF" opacity="0.9" />
              <path d="M12 4 C8 4 5 7 5 11 C5 15 12 22 12 22 C12 22 19 15 19 11 C19 7 16 4 12 4 Z" fill="#10B981" />
              <circle cx="12" cy="10" r="3" fill="#FFFFFF" />
            </g>
            <g transform="translate(480, 580) scale(1)">
              <circle cx="12" cy="12" r="12" fill="#FFFFFF" opacity="0.9" />
              <path d="M12 4 C8 4 5 7 5 11 C5 15 12 22 12 22 C12 22 19 15 19 11 C19 7 16 4 12 4 Z" fill="#FF6B00" />
              <circle cx="12" cy="10" r="3" fill="#FFFFFF" />
            </g>
            <g transform="translate(190, 440) scale(0.85)">
              <circle cx="12" cy="12" r="12" fill="#FFFFFF" opacity="0.9" />
              <path d="M12 4 C8 4 5 7 5 11 C5 15 12 22 12 22 C12 22 19 15 19 11 C19 7 16 4 12 4 Z" fill="#818CF8" />
              <circle cx="12" cy="10" r="3" fill="#FFFFFF" />
            </g>
            <g transform="translate(380, 440) scale(0.85)">
              <circle cx="12" cy="12" r="12" fill="#FFFFFF" opacity="0.9" />
              <path d="M12 4 C8 4 5 7 5 11 C5 15 12 22 12 22 C12 22 19 15 19 11 C19 7 16 4 12 4 Z" fill="#38BDF8" />
              <circle cx="12" cy="10" r="3" fill="#FFFFFF" />
            </g>
          </svg>

          {/* Desktop Highway Vector Artwork (Visible on screens >= md) */}
          <svg
            className="w-full h-full object-cover hidden md:block"
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Sky Twilight Gradient - Deep Navy on Left, Sunset Glow strictly on Far Right */}
              <linearGradient id="heroSky" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#08101E" />
                <stop offset="45%" stopColor="#0D1C34" />
                <stop offset="68%" stopColor="#183152" />
                <stop offset="85%" stopColor="#964816" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              {/* Sun Horizon Glow situated on the right horizon */}
              <radialGradient id="sunGlow" cx="88%" cy="46%" r="25%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#D97706" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#08101E" stopOpacity="0" />
              </radialGradient>

              {/* Highway Asphalt Gradient */}
              <linearGradient id="highwayAsphalt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="100%" stopColor="#1E293B" />
              </linearGradient>
            </defs>

            {/* Sky Background */}
            <rect x="0" y="0" width="1600" height="430" fill="url(#heroSky)" />

            {/* Sun Glow on Far Right Horizon */}
            <circle cx="1380" cy="410" r="150" fill="url(#sunGlow)" />

            {/* Distant Hills / Horizon Line */}
            <path
              d="M 0 420 Q 400 395 800 410 T 1600 405 L 1600 430 L 0 430 Z"
              fill="#183623"
              opacity="0.95"
            />

            {/* Green Field Parcels (Geometric agricultural grid perspective) */}
            {/* Left Far Fields */}
            <polygon points="0,420 500,420 400,520 0,550" fill="#2E5A2A" />
            <polygon points="500,420 750,420 680,520 400,520" fill="#3D7336" />
            <polygon points="750,420 980,410 930,520 680,520" fill="#295125" />

            {/* Right Far Fields */}
            <polygon points="1040,410 1250,420 1200,520 1010,520" fill="#3E7538" />
            <polygon points="1250,420 1600,420 1600,550 1200,520" fill="#284E23" />

            {/* Mid Foreground Fields - Layer 2 */}
            <polygon points="0,550 400,520 320,680 0,720" fill="#386A32" />
            <polygon points="400,520 680,520 600,680 320,680" fill="#4B8544" />
            <polygon points="680,520 930,520 860,680 600,680" fill="#366831" />

            <polygon points="1010,520 1200,520 1280,680 1060,680" fill="#437D3C" />
            <polygon points="1200,520 1600,550 1600,740 1280,680" fill="#2F5C2B" />

            {/* Foreground Fields - Layer 3 */}
            <polygon points="0,720 320,680 200,900 0,900" fill="#2E5828" />
            <polygon points="320,680 600,680 480,900 200,900" fill="#427A3A" />
            <polygon points="600,680 860,680 760,900 480,900" fill="#31602D" />

            <polygon points="1060,680 1280,680 1420,900 1140,900" fill="#4A8643" />
            <polygon points="1280,680 1600,740 1600,900 1420,900" fill="#254B20" />

            {/* Perspective Highway (from horizon (990, 410) down to foreground (760, 900) to (1140, 900)) */}
            <polygon points="985,410 1005,410 1140,900 760,900" fill="url(#highwayAsphalt)" />

            {/* White Dashed Center Lane Line */}
            <line
              x1="995"
              y1="410"
              x2="950"
              y2="900"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeDasharray="28 20"
            />

            {/* Yellow Highway Shoulders */}
            <line x1="985" y1="410" x2="760" y2="900" stroke="#F59E0B" strokeWidth="2.5" opacity="0.7" />
            <line x1="1005" y1="410" x2="1140" y2="900" stroke="#F59E0B" strokeWidth="2.5" opacity="0.7" />

            {/* Field Grid Borders (Light Green Lines) */}
            <line x1="400" y1="520" x2="0" y2="550" stroke="#52944B" strokeWidth="1.5" opacity="0.4" />
            <line x1="680" y1="520" x2="400" y2="520" stroke="#52944B" strokeWidth="1.5" opacity="0.4" />
            <line x1="320" y1="680" x2="600" y2="680" stroke="#52944B" strokeWidth="1.5" opacity="0.4" />
            <line x1="600" y1="680" x2="860" y2="680" stroke="#52944B" strokeWidth="1.5" opacity="0.4" />
            <line x1="1010" y1="520" x2="1200" y2="520" stroke="#52944B" strokeWidth="1.5" opacity="0.4" />
            <line x1="1060" y1="680" x2="1280" y2="680" stroke="#52944B" strokeWidth="1.5" opacity="0.4" />

            {/* Location Pin Markers on the fields (matching PDF Page 1) */}
            <g transform="translate(480, 620) scale(1.1)">
              <circle cx="12" cy="12" r="12" fill="#FFFFFF" opacity="0.9" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))" />
              <path d="M12 4 C8 4 5 7 5 11 C5 15 12 22 12 22 C12 22 19 15 19 11 C19 7 16 4 12 4 Z" fill="#10B981" />
              <circle cx="12" cy="10" r="3" fill="#FFFFFF" />
            </g>

            <g transform="translate(1320, 610) scale(1.1)">
              <circle cx="12" cy="12" r="12" fill="#FFFFFF" opacity="0.9" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))" />
              <path d="M12 4 C8 4 5 7 5 11 C5 15 12 22 12 22 C12 22 19 15 19 11 C19 7 16 4 12 4 Z" fill="#FF6B00" />
              <circle cx="12" cy="10" r="3" fill="#FFFFFF" />
            </g>

            <g transform="translate(710, 480) scale(0.9)">
              <circle cx="12" cy="12" r="12" fill="#FFFFFF" opacity="0.9" />
              <path d="M12 4 C8 4 5 7 5 11 C5 15 12 22 12 22 C12 22 19 15 19 11 C19 7 16 4 12 4 Z" fill="#818CF8" />
              <circle cx="12" cy="10" r="3" fill="#FFFFFF" />
            </g>

            <g transform="translate(1180, 470) scale(0.9)">
              <circle cx="12" cy="12" r="12" fill="#FFFFFF" opacity="0.9" />
              <path d="M12 4 C8 4 5 7 5 11 C5 15 12 22 12 22 C12 22 19 15 19 11 C19 7 16 4 12 4 Z" fill="#38BDF8" />
              <circle cx="12" cy="10" r="3" fill="#FFFFFF" />
            </g>
          </svg>
        </div>

        {/* Content Container (Grid layout matching PDF Page 1) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                  Every Route Leads <br className="hidden sm:inline" />
                  to Growth
                </h1>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#FF6B00] tracking-tight leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
                  Join the Growth Corridor
                </div>
              </div>

              <p className="text-white text-base sm:text-lg md:text-xl font-semibold leading-relaxed max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Land and investment advisory where four growth engines meet — the green belt, the industrial corridor, the educational hub and port-led import–export trade.
              </p>

              {/* Dual Action Buttons matching PDF Page 1 */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/listings"
                  className="inline-flex items-center space-x-2 bg-[#FF6B00] hover:bg-[#e05e00] text-white px-7 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Explore Land Options</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => {
                    setSelectedItemForModal(null);
                    setModalOpen(true);
                  }}
                  className="inline-flex items-center space-x-2 bg-[#0B1528]/60 hover:bg-[#0B1528] text-white border border-white/40 px-6 py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Talk to an Advisor</span>
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </button>
              </div>

              {/* Slider Counter 01 / 04 matching PDF Page 1 */}
              <div className="flex items-center space-x-4 pt-4 text-sm font-bold text-slate-300">
                <span className="text-white font-mono tracking-wider text-base">
                  0{activeEngine + 1} / 0{growthEngines.length}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveEngine((prev) => (prev === 0 ? growthEngines.length - 1 : prev - 1))}
                    className="w-9 h-9 rounded-full bg-[#0B1528]/80 border border-slate-700/80 flex items-center justify-center text-white hover:bg-[#FF6B00] hover:border-[#FF6B00] transition-colors"
                    aria-label="Previous Growth Engine"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveEngine((prev) => (prev + 1) % growthEngines.length)}
                    className="w-9 h-9 rounded-full bg-[#0B1528]/80 border border-slate-700/80 flex items-center justify-center text-white hover:bg-[#FF6B00] hover:border-[#FF6B00] transition-colors"
                    aria-label="Next Growth Engine"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: 4 Floating Dark Engine Cards (Down by down / stacked on both mobile and desktop) */}
            <div className="lg:col-span-5 pt-4 lg:pt-0 space-y-3 sm:space-y-3.5">
              {growthEngines.map((engine, idx) => {
                const isActive = activeEngine === idx;
                return (
                  <div
                    key={engine.id}
                    onClick={() => setActiveEngine(idx)}
                    className={`w-full p-4 sm:p-5 rounded-2xl cursor-pointer transition-all border backdrop-blur-md ${
                      isActive
                        ? 'bg-[#0B1528]/95 border-[#10B981] shadow-2xl translate-x-1 ring-1 ring-[#10B981]/50'
                        : 'bg-[#0B1528]/75 border-white/10 hover:bg-[#0B1528]/90 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span
                          className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm"
                          style={{ backgroundColor: engine.dotColor }}
                        />
                        <h3 className="font-bold text-sm sm:text-base text-white">
                          {engine.name}
                        </h3>
                      </div>
                      <span className="text-xs font-mono font-semibold text-slate-400">
                        {engine.id}
                      </span>
                    </div>
                    <p className="text-xs sm:text-xs text-slate-300 pl-6 pt-1 leading-relaxed">
                      {engine.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. TRUST HIGHLIGHTS BAR (PDF Page 1)                     */}
      {/* ======================================================== */}
      <section className="bg-white border-b border-slate-200/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#38BDF8] flex items-center justify-center flex-shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5 text-[#38BDF8]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 leading-snug">Verified before we recommend</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Title, encumbrance and layout approvals checked</p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#FF6B00] flex items-center justify-center flex-shrink-0 mt-0.5">
              <MessageSquare className="w-5 h-5 text-[#FF6B00]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 leading-snug">Plain-language advice</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">No jargon, no pressure to buy</p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 leading-snug">Individuals to corporates</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Families, farmers, investors and companies</p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 leading-snug">Free first consultation</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Talk through your goal before you commit</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. WHY THIS CORRIDOR - FOUR GROWTH ENGINES (PDF Page 1&2)*/}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] block">
              Why This Corridor
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Four growth engines, one corridor
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-1">
              Land here draws demand from farming, industry, education and trade at the same time — so your investment never relies on a single story.
            </p>
          </div>

          <Link
            to="/locations"
            className="inline-flex items-center space-x-2 text-sm font-bold text-slate-800 hover:text-[#FF6B00] border border-slate-300 hover:border-[#FF6B00] px-5 py-2.5 rounded-full transition-colors flex-shrink-0 self-start md:self-auto"
          >
            <span>Explore Locations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Cards Grid matching PDF Pages 1 & 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 01: Green Belt */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between">
            <div>
              <div className="h-56 sm:h-64 overflow-hidden bg-slate-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80"
                  alt="Green Belt"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white">
                  <span className="text-xs font-bold uppercase tracking-wider bg-black/60 px-3 py-1 rounded-full border border-white/20">
                    01 Growth Engine
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-3">
                <h3 className="text-2xl font-bold text-slate-900">Green Belt</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Fertile farm land and open countryside around Naidupeta — for farming, orchards, farmhouses and long-term holding.
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 mr-1">Best for:</span>
              <span className="text-xs font-medium bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">Farm Lands</span>
              <span className="text-xs font-medium bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">Open Land for Investment</span>
            </div>
          </div>

          {/* Card 02: Industrial Corridor */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between">
            <div>
              <div className="h-56 sm:h-64 overflow-hidden bg-slate-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80"
                  alt="Industrial Corridor"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white">
                  <span className="text-xs font-bold uppercase tracking-wider bg-black/60 px-3 py-1 rounded-full border border-white/20">
                    02 Growth Engine
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-3">
                <h3 className="text-2xl font-bold text-slate-900">Industrial Corridor</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  The Naidupeta – Sullurpeta – Tada belt is one of Andhra Pradesh’s major industrial corridors, drawing factories, suppliers and a growing workforce.
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 mr-1">Best for:</span>
              <span className="text-xs font-medium bg-sky-50 text-sky-700 px-3 py-1 rounded-full">Commercial Plots</span>
              <span className="text-xs font-medium bg-sky-50 text-sky-700 px-3 py-1 rounded-full">Land Bank for Companies</span>
            </div>
          </div>

          {/* Card 03: Educational Hub */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between">
            <div>
              <div className="h-56 sm:h-64 overflow-hidden bg-slate-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80"
                  alt="Educational Hub"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white">
                  <span className="text-xs font-bold uppercase tracking-wider bg-black/60 px-3 py-1 rounded-full border border-white/20">
                    03 Growth Engine
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-3">
                <h3 className="text-2xl font-bold text-slate-900">Educational Hub</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Tirupati is home to IIT Tirupati, IISER Tirupati and long-established universities — steady housing demand from students, faculty and families.
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 mr-1">Best for:</span>
              <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">Residential Plots</span>
              <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">Open Plots</span>
            </div>
          </div>

          {/* Card 04: Ports & Import–Export */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between">
            <div>
              <div className="h-56 sm:h-64 overflow-hidden bg-slate-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1000&q=80"
                  alt="Ports & Import-Export"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white">
                  <span className="text-xs font-bold uppercase tracking-wider bg-black/60 px-3 py-1 rounded-full border border-white/20">
                    04 Growth Engine
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-3">
                <h3 className="text-2xl font-bold text-slate-900">Ports & Import–Export</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Krishnapatnam port links the region to coastal and export trade, with Ramayapatnam and Dugarajapatnam adding future capacity.
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 mr-1">Best for:</span>
              <span className="text-xs font-medium bg-amber-50 text-amber-700 px-3 py-1 rounded-full">Commercial Plots</span>
              <span className="text-xs font-medium bg-amber-50 text-amber-700 px-3 py-1 rounded-full">Warehousing & logistics land</span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. STATS BAR (PDF Page 2 - Deep Navy #0B1528)             */}
      {/* ======================================================== */}
      <section className="bg-[#0B1528] text-white py-14 px-4 sm:px-6 lg:px-8 border-y border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-left">
          <div className="space-y-1 border-l-2 border-[#FF6B00] pl-4">
            <div className="text-4xl sm:text-5xl font-black text-white">6</div>
            <div className="text-sm font-bold text-slate-200">Land categories</div>
            <div className="text-xs text-slate-400">From residential plots to corporate land banks</div>
          </div>

          <div className="space-y-1 border-l-2 border-[#38BDF8] pl-4">
            <div className="text-4xl sm:text-5xl font-black text-white">4</div>
            <div className="text-sm font-bold text-slate-200">Growth engines</div>
            <div className="text-xs text-slate-400">Green belt, industry, education and ports</div>
          </div>

          <div className="space-y-1 border-l-2 border-emerald-500 pl-4">
            <div className="text-4xl sm:text-5xl font-black text-white">5</div>
            <div className="text-sm font-bold text-slate-200">Verification steps</div>
            <div className="text-xs text-slate-400">Title, encumbrance, approvals, survey and site visit</div>
          </div>

          <div className="space-y-1 border-l-2 border-amber-400 pl-4">
            <div className="text-4xl sm:text-5xl font-black text-white">0</div>
            <div className="text-sm font-bold text-slate-200">Pressure to buy</div>
            <div className="text-xs text-slate-400">Advice first — you decide when you are ready</div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. WHO WE ARE - BUY LAND WITH CONFIDENCE (PDF Page 2)   */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] block">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Buy land with confidence, not guesswork
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Tri-Port Properties helps individuals, families and companies buy land with confidence. We advise on residential plots, commercial plots, open plots, open land for investment, farm land and land banks for companies — always with a clear view of location, connectivity and approvals.
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 text-sm font-bold text-slate-900 hover:text-[#FF6B00] border border-slate-300 hover:border-[#FF6B00] px-6 py-3 rounded-full transition-colors"
              >
                <span>About Tri-Port</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl bg-slate-100 aspect-[16/10] border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
                alt="Corridor landscape"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-slate-100 shadow-2xl">
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-full bg-amber-50 text-[#FF6B00] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Our promise</h4>
                    <p className="text-sm sm:text-base font-semibold text-slate-900 mt-1 leading-snug">
                      We recommend only the land we would be comfortable buying ourselves.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. WHAT WE OFFER - LAND OPTIONS (PDF Page 3)             */}
      {/* ======================================================== */}
      <section className="bg-slate-50 py-16 sm:py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] block">
                What We Offer
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Land options for every investment goal
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 text-sm font-bold text-slate-800 hover:text-[#FF6B00] border border-slate-300 hover:border-[#FF6B00] px-5 py-2.5 rounded-full transition-colors flex-shrink-0 self-start md:self-auto bg-white"
            >
              <span>All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#FF6B00] flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[#FF6B00]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Residential Plots</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Plots in developing layouts close to housing demand, schools and transport.
                </p>
              </div>
              <Link to="/services" className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#FF6B00] hover:text-[#e05e00]">
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#38BDF8] flex items-center justify-center">
                  <Store className="w-6 h-6 text-[#38BDF8]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Commercial Plots</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Main-road plots near industrial and transport hubs for shops, offices and warehouses.
                </p>
              </div>
              <Link to="/services" className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#FF6B00] hover:text-[#e05e00]">
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Layers className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Open Plots</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Approved open plots for steady appreciation as surrounding areas develop.
                </p>
              </div>
              <Link to="/services" className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#FF6B00] hover:text-[#e05e00]">
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Open Land for Investment</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Larger parcels for long-term holding, with a clear view of future use and exit.
                </p>
              </div>
              <Link to="/services" className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#FF6B00] hover:text-[#e05e00]">
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-lime-50 text-lime-600 flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-lime-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Farm Lands</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Agricultural land for farming, orchards or future conversion, with soil and water checks.
                </p>
              </div>
              <Link to="/services" className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#FF6B00] hover:text-[#e05e00]">
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center">
                  <Factory className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Land Bank for Companies</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Curated land for factories, warehouses, logistics, hospitals and institutions.
                </p>
              </div>
              <Link to="/corporate-land-bank" className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#FF6B00] hover:text-[#e05e00]">
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. THE CORRIDOR MAP (PDF Page 3 & 4 - Deep Navy)        */}
      {/* ======================================================== */}
      <section className="bg-[#0B1528] text-white py-16 sm:py-24 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] block">
                  The Corridor Map
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Four growth zones, connected by road, air and sea
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  More ways in means more ways to use and resell your land.
                </p>
              </div>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="w-5 h-5 text-indigo-400" />
                    <div>
                      <div className="text-sm font-bold text-white">Educational Hub (Tirupati)</div>
                      <div className="text-xs text-slate-400">IIT, IISER, universities, plus pilgrimage and healthcare demand</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded-md">65 km</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center space-x-3">
                    <Sprout className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="text-sm font-bold text-white">Green Belt</div>
                      <div className="text-xs text-slate-400">Farm land and open countryside around Naidupeta</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-md">Local</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center space-x-3">
                    <Factory className="w-5 h-5 text-sky-400" />
                    <div>
                      <div className="text-sm font-bold text-white">Naidupeta – Sullurpeta – Tada</div>
                      <div className="text-xs text-slate-400">Industrial and manufacturing belt</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-sky-400 bg-sky-400/10 px-2.5 py-1 rounded-md">25 - 45 km</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center space-x-3">
                    <Navigation className="w-5 h-5 text-amber-400" />
                    <div>
                      <div className="text-sm font-bold text-white">Highways</div>
                      <div className="text-xs text-slate-400">National highway access for trucks, commuters and inter-city travel (NH 16)</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md">Direct</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center space-x-3">
                    <Compass className="w-5 h-5 text-teal-400" />
                    <div>
                      <div className="text-sm font-bold text-white">Airport</div>
                      <div className="text-xs text-slate-400">Tirupati Airport for domestic and regional connections</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-teal-400 bg-teal-400/10 px-2.5 py-1 rounded-md">45 km</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center space-x-3">
                    <Ship className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-sm font-bold text-white">Ports</div>
                      <div className="text-xs text-slate-400">Krishnapatnam, Dugarajapatnam and Ramayapatnam for trade and logistics</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-400 bg-blue-400/10 px-2.5 py-1 rounded-md">35 - 70 km</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/locations"
                  className="inline-flex items-center space-x-2 bg-[#FF6B00] hover:bg-[#e05e00] text-white px-6 py-3 rounded-full font-bold text-sm transition-all"
                >
                  <span>Explore Locations</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
                <div className="text-xs font-mono text-slate-500 mb-4 flex items-center justify-between">
                  <span>Schematic · not to scale</span>
                  <span className="text-slate-400">Bay of Bengal (East)</span>
                </div>

                <svg className="w-full h-80 sm:h-96" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 320 0 L 400 0 L 400 400 L 330 400 Z" fill="#0C2340" opacity="0.6" />
                  <text x="350" y="200" fill="#38BDF8" fontSize="11" opacity="0.4" transform="rotate(90 350,200)">Bay of Bengal</text>

                  <line x1="280" y1="30" x2="290" y2="380" stroke="#F59E0B" strokeWidth="4" />
                  <text x="240" y="30" fill="#F59E0B" fontSize="10" fontWeight="bold">NH 16</text>

                  <line x1="285" y1="180" x2="140" y2="280" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4" />

                  <circle cx="282" cy="50" r="5" fill="#EF4444" />
                  <text x="150" y="55" fill="#E2E8F0" fontSize="10">▲ Ramayapatnam Port</text>

                  <circle cx="284" cy="110" r="6" fill="#F59E0B" />
                  <text x="175" y="115" fill="#E2E8F0" fontSize="11" fontWeight="bold">Krishnapatnam Port</text>

                  <circle cx="285" cy="180" r="8" fill="#10B981" />
                  <text x="195" y="185" fill="#10B981" fontSize="12" fontWeight="bold">Naidupeta (Base)</text>

                  <circle cx="310" cy="220" r="5" fill="#F59E0B" />
                  <text x="210" y="225" fill="#E2E8F0" fontSize="10">Dugarajapatnam Port</text>

                  <circle cx="287" cy="250" r="6" fill="#38BDF8" />
                  <text x="205" y="255" fill="#E2E8F0" fontSize="11">Sullurpeta (Industry)</text>

                  <circle cx="288" cy="310" r="6" fill="#38BDF8" />
                  <text x="220" y="315" fill="#E2E8F0" fontSize="11">Tada (Industry)</text>

                  <text x="250" y="375" fill="#94A3B8" fontSize="10">Chennai (South) ↓</text>

                  <circle cx="140" cy="280" r="9" fill="#818CF8" />
                  <text x="70" y="275" fill="#818CF8" fontSize="12" fontWeight="bold">Tirupati</text>
                  <text x="45" y="290" fill="#94A3B8" fontSize="9">Educational Hub</text>

                  <circle cx="180" cy="320" r="5" fill="#38BDF8" />
                  <text x="125" y="335" fill="#38BDF8" fontSize="10">✈ Tirupati Airport</text>
                </svg>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-4 border-t border-slate-800">
                  <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /><span>Green belt</span></span>
                  <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-400" /><span>Industrial corridor</span></span>
                  <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-400" /><span>Educational hub</span></span>
                  <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /><span>Ports & trade</span></span>
                  <span className="flex items-center space-x-1.5"><span className="w-3 h-1 bg-amber-500" /><span>NH 16</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. INVESTMENT GUIDE (PDF Page 4)                         */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] block">
            Investment Guide
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            How we help you invest safely
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Five clear steps from first call to registration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="text-3xl font-black text-[#FF6B00]">01</div>
            <h3 className="font-bold text-base text-slate-900">Tell us your goal</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Home, business, farming or long-term holding.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="text-3xl font-black text-sky-500">02</div>
            <h3 className="font-bold text-base text-slate-900">Shortlist locations</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We match your budget and purpose to the right part of the corridor.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="text-3xl font-black text-emerald-500">03</div>
            <h3 className="font-bold text-base text-slate-900">Verify the land</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Title, encumbrance, layout approval and boundary survey.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="text-3xl font-black text-indigo-500">04</div>
            <h3 className="font-bold text-base text-slate-900">Visit with us</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Site visit with local guidance on access, neighbours and development.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="text-3xl font-black text-amber-500">05</div>
            <h3 className="font-bold text-base text-slate-900">Complete the purchase</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Registration support and a document checklist, with a lawyer for final sign-off.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 9. AVAILABLE LAND OPTIONS / LISTINGS (PDF Page 4)        */}
      {/* ======================================================== */}
      <section className="bg-slate-50 py-16 sm:py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] block">
                Listings
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Available land options
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Listings change often. Contact us for the latest availability.
              </p>
            </div>

            <Link
              to="/listings"
              className="inline-flex items-center space-x-2 text-sm font-bold text-slate-800 hover:text-[#FF6B00] border border-slate-300 hover:border-[#FF6B00] px-5 py-2.5 rounded-full transition-colors flex-shrink-0 self-start md:self-auto bg-white"
            >
              <span>View All Listings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayListings.map((item, idx) => (
              <div
                key={item._id || item.id || idx}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={item.image || item.images?.[0] || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B1528] text-white text-[11px] font-bold px-3 py-1 rounded-full">
                      {item.category || item.landType}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/95 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-sm">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Docs verified</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-[#FF6B00] transition-colors leading-snug line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                      <div>
                        <span className="text-slate-400 block">Size:</span>
                        <span className="font-semibold text-slate-700">{item.size || item.plotSizes}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">To NH 16:</span>
                        <span className="font-semibold text-slate-700">{item.toNH16 || "4 km"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                  <div className="text-sm font-extrabold text-[#FF6B00]">
                    {item.priceRange || item.pricing}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedItemForModal(item);
                      setModalOpen(true);
                    }}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-slate-900 hover:text-[#FF6B00] transition-colors"
                  >
                    <span>Request Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 10. CORPORATE LAND BANK (PDF Page 5)                     */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1528] text-white rounded-3xl overflow-hidden border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] block">
                Corporate Land Bank
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Land banks for <br />growing businesses
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                We help companies secure land ahead of expansion.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
                <div className="flex items-start space-x-2 text-xs sm:text-sm text-slate-200">
                  <Check className="w-4 h-4 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                  <span>Requirement study: size, access, utilities, zoning</span>
                </div>
                <div className="flex items-start space-x-2 text-xs sm:text-sm text-slate-200">
                  <Check className="w-4 h-4 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                  <span>Shortlisting and site visits</span>
                </div>
                <div className="flex items-start space-x-2 text-xs sm:text-sm text-slate-200">
                  <Check className="w-4 h-4 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                  <span>Title and approval due diligence</span>
                </div>
                <div className="flex items-start space-x-2 text-xs sm:text-sm text-slate-200">
                  <Check className="w-4 h-4 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                  <span>Negotiation support</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                to="/corporate-land-bank"
                className="inline-flex items-center space-x-2 bg-[#FF6B00] hover:bg-[#e05e00] text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all shadow-lg hover:-translate-y-0.5"
              >
                <span>Discuss Your Requirement</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
              alt="Industrial Corporate Land"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1528] via-transparent to-transparent lg:block hidden" />
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 11. INSIGHTS (PDF Page 5)                                */}
      {/* ======================================================== */}
      <section className="bg-slate-50 py-16 sm:py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] block">
              Insights
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Know the corridor before you buy
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Short, practical reads. Every article cites its official sources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider bg-sky-50 text-[#38BDF8] px-3 py-1 rounded-full inline-block">
                  Infrastructure
                </span>
                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  What the latest corridor projects mean for land buyers
                </h3>
                <div className="text-xs text-slate-400">
                  Nov 2026 &middot; 4 min read
                </div>
              </div>
              <Link to="/insights" className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#FF6B00] hover:text-[#e05e00]">
                <span>Read article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full inline-block">
                  Buying checklist
                </span>
                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  Buying a farm plot: the 10 documents to check first
                </h3>
                <div className="text-xs text-slate-400">
                  Oct 2026 &middot; 6 min read
                </div>
              </div>
              <Link to="/insights" className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#FF6B00] hover:text-[#e05e00]">
                <span>Read article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full inline-block">
                  Approvals
                </span>
                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  Land-use and layout approvals, explained simply
                </h3>
                <div className="text-xs text-slate-400">
                  Oct 2026 &middot; 5 min read
                </div>
              </div>
              <Link to="/insights" className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#FF6B00] hover:text-[#e05e00]">
                <span>Read article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 12. OUR CLIENTS SPEAK (REVIEWS MARQUEE STREAM)           */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 bg-white overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] block">
            Real Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Our Clients Speak
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Read how our transparent verification and local guidance helped buyers invest with confidence.
          </p>
        </div>

        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <div className="flex w-max space-x-6 animate-marquee-stream hover:[animation-play-state:paused]">
            {[...allClientReviews, ...allClientReviews].map((review, i) => (
              <div
                key={`${review.id}-${i}`}
                className="w-[340px] sm:w-[400px] bg-slate-50 p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between flex-shrink-0"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star key={starIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    "{review.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 mt-4">
                  <div className="font-bold text-sm text-slate-900">{review.clientName}</div>
                  <div className="text-xs text-slate-500">{review.location} &middot; <span className="text-[#FF6B00]">{review.role}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 13. ORANGE CTA BANNER (PDF Page 5)                       */}
      {/* ======================================================== */}
      <OrangeCTABanner />

      {/* Enquiry Consultation Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item={selectedItemForModal}
      />
    </div>
  );
};

export default Home;
